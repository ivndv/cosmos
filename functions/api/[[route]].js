// Framework Hono
import { Hono } from "hono";
// Adaptador para Cloudflare Pages Functions
import { handle } from "hono/cloudflare-pages";

// Servicios y Validadores
import { CacheService } from "./services/CacheService";
import { NasaClient } from "./services/NasaClient";
import { RateLimiter } from "./services/RateLimiter";
import { EndpointValidator } from "./validators/EndpointValidator";

// Instancias compartidas del worker
const rateLimiter = new RateLimiter();
const cacheService = new CacheService();
const nasaClient = new NasaClient();
const endpointValidator = new EndpointValidator();

const app = new Hono();

/**
 * GET /api/nasa - Proxy hacia la API Planetary de NASA
 */
app.get("/api/nasa", async (c) => {
	// 1. Límite de peticiones por IP (30 req / min)
	const ip = rateLimiter.getClientIP(c);
	if (!rateLimiter.isAllowed(ip)) {
		return c.json(
			{ error: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
			429,
		);
	}

	// 2. Parámetros y credenciales del entorno
	const endpoint = c.req.query("endpoint") || "apod";
	const count = c.req.query("count") || null;
	const apiKey = c.env.NASA_API_KEY;

	// 3. Validación de endpoint permitido
	const validation = endpointValidator.validate(endpoint);
	if (!validation.isValid) {
		return c.json({ error: validation.error }, 400);
	}

	// 4. Consulta en caché (solo para la foto del día; la galería con count se consulta en vivo)
	const isCacheable = cacheService.shouldCache(endpoint, count);
	const cacheKey = cacheService.generateKey(endpoint, count);

	if (isCacheable) {
		const cached = await cacheService.get(cacheKey);
		if (cached) {
			return c.json(cached.data, cached.status);
		}
	}

	// 5. Petición a NASA
	try {
		const { data, status } = await nasaClient.fetchEndpoint(
			endpoint,
			count,
			apiKey,
		);

		// 6. Guarda en caché si corresponde (24h para foto del día) y responde
		if (isCacheable) {
			await cacheService.set(cacheKey, data, status, c);
		}

		return c.json(data, status);
	} catch (err) {
		return c.json({ error: err.message }, err.status || 500);
	}
});

// Exporta el manejador para Cloudflare Pages Functions
export const onRequest = handle(app);
