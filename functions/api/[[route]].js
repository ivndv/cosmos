// Framework Hono
import { Hono } from "hono";
// Adaptador para Cloudflare Pages Functions
import { handle } from "hono/cloudflare-pages";

// Servicios y Validadores
import { CacheService } from "../_services/cacheService";
import {
	CENTROS,
	ImagesClient,
	YEAR_MAX,
	YEAR_MIN,
} from "../_services/imagesClient";
import { NasaClient } from "../_services/nasaClient";
import { RateLimiter } from "../_services/rateLimiter";
import { EndpointValidator } from "../_validators/endpointValidator";

// Instancias compartidas del worker
const rateLimiter = new RateLimiter();
const cacheService = new CacheService();
const nasaClient = new NasaClient();
const imagesClient = new ImagesClient();
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

	// 3b. Galería: librería de imágenes de NASA (sin API key, paginada)
	if (endpoint === "images") {
		const requestedPage = Number.parseInt(c.req.query("page") ?? "1", 10);
		const page =
			Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;
		const q = (c.req.query("q") ?? "").slice(0, 100);

		// Filtros opcionales, siempre validados contra listas y rangos conocidos
		const centerParam = c.req.query("center");
		const center = CENTROS.includes(centerParam) ? centerParam : null;

		const parseYear = (value) => {
			const n = Number.parseInt(value ?? "", 10);
			return Number.isNaN(n) || n < YEAR_MIN || n > YEAR_MAX ? null : n;
		};
		let yearStart = parseYear(c.req.query("yearStart"));
		let yearEnd = parseYear(c.req.query("yearEnd"));
		// Si vienen invertidos, se intercambian
		if (yearStart && yearEnd && yearStart > yearEnd) {
			[yearStart, yearEnd] = [yearEnd, yearStart];
		}

		// Caché de borde: 1 h por combinación de filtros y página
		const imagesKey = cacheService.generateKey("images", {
			page,
			q,
			center,
			yearStart,
			yearEnd,
		});
		const cachedImages = await cacheService.get(imagesKey);
		if (cachedImages) {
			return c.json(cachedImages.data, cachedImages.status);
		}

		try {
			const result = await imagesClient.search({
				q,
				page,
				center,
				yearStart,
				yearEnd,
			});
			await cacheService.set(
				imagesKey,
				result,
				200,
				c,
				cacheService.ttlFor("images"),
			);
			return c.json(result);
		} catch (err) {
			return c.json({ error: err.message }, err.status || 502);
		}
	}

	// 4. Consulta en caché (solo para la foto del día; la galería con count se consulta en vivo)
	const isCacheable = cacheService.shouldCache(endpoint, count);
	const cacheKey = cacheService.generateKey(endpoint, { count });

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
			await cacheService.set(
				cacheKey,
				data,
				status,
				c,
				cacheService.ttlFor(endpoint),
			);
		}

		return c.json(data, status);
	} catch (err) {
		return c.json({ error: err.message }, err.status || 500);
	}
});

// Exporta el manejador para Cloudflare Pages Functions
export const onRequest = handle(app);
