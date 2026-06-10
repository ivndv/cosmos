// Hono
import { Hono } from "hono";
// Cloudflare Pages
import { handle } from "hono/cloudflare-pages";

// Endpoints permitidos por la API de NASA — whitelist contra path traversal
const ALLOWED_ENDPOINTS = new Set(["apod"]);
// Base URL del API de NASA
const NASA_BASE = "https://api.nasa.gov/planetary";
// Tiempo máximo de espera para la respuesta de NASA
const FETCH_TIMEOUT_MS = 60_000;
// Cache en memoria para respuestas de NASA (evita múltiples llamadas lentas)
const cache = new Map();
const CACHE_TTL = 10 * 60_000; // 10 minutos

// Rate limiter en memoria (se resetea al redeploy)
const rateLimit = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

// Obtiene la IP real del cliente desde Cloudflare
function getClientIP(c) {
	return c.req.header("cf-connecting-ip")
		|| c.req.header("x-forwarded-for")?.split(",")[0]?.trim()
		|| "unknown";
}

// Verifica si la IP no ha excedido el límite de requests
function checkRateLimit(ip) {
	const now = Date.now();
	const record = rateLimit.get(ip);

	if (!record || now - record.windowStart > WINDOW_MS) {
		rateLimit.set(ip, { windowStart: now, count: 1 });
		return true;
	}

	if (record.count >= MAX_REQUESTS) return false;

	record.count++;
	return true;
}

// Sanitiza la API key de las URLs para los logs
function sanitizeUrl(url, apiKey) {
	return apiKey ? url.replace(apiKey, "***") : url;
}

const app = new Hono();

// GET /api/nasa - Proxy a la API de NASA con validación de endpoint y rate limiting
app.get("/api/nasa", async (c) => {
	// 1. Rate limiting por IP
	const ip = getClientIP(c);
	if (!checkRateLimit(ip)) {
		return c.json({ error: "Demasiadas solicitudes. Intenta de nuevo más tarde." }, 429);
	}

	// 2. Obtiene el endpoint y la API key del entorno
	const endpoint = c.req.query("endpoint") || "apod";
	const apiKey = c.env.NASA_API_KEY;

	// 3. Rechaza endpoints no permitidos
	if (!ALLOWED_ENDPOINTS.has(endpoint)) {
		return c.json({ error: `endpoint not allowed: ${endpoint}` }, 400);
	}

	// 4. Construye la URL con los parámetros de consulta
	const query = c.req.query("count")
		? `?count=${c.req.query("count")}&api_key=${apiKey}`
		: `?api_key=${apiKey}`;
	const url = `${NASA_BASE}/${endpoint}${query}`;

	// 5. Verifica cache antes de consultar a NASA
	const cacheKey = endpoint + (c.req.query("count") ? `&count=${c.req.query("count")}` : "");
	const cached = cache.get(cacheKey);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return c.json(cached.data, cached.status);
	}

	// 6. Consulta la API de NASA con timeout
	let res;
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
	try {
		res = await fetch(url, { signal: controller.signal });
	} catch (err) {
		console.error("[NASA] Error de red:", err.message, "URL:", sanitizeUrl(url, apiKey));
		const msg = err.name === "AbortError"
			? "La API de NASA tardó demasiado en responder. Intenta de nuevo."
			: "No se pudo conectar con la API de NASA";
		return c.json({ error: msg }, 502);
	} finally {
		clearTimeout(timeout);
	}

	// 7. Parsea y responde con el resultado
	let data;
	try {
		data = await res.json();
	} catch (err) {
		console.error("[NASA] Error al parsear respuesta:", err.message, "Status:", res.status, "URL:", sanitizeUrl(url, apiKey));
		return c.json({ error: "Respuesta inválida de la API de NASA" }, 502);
	}

	// 8. Almacena en cache y responde
	const status = res.ok ? 200 : res.status;
	cache.set(cacheKey, { data, status, timestamp: Date.now() });
	return c.json(data, status);
});

// Exporta el manejador para Cloudflare Pages Functions
export const onRequest = handle(app);
