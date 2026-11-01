// Framework Hono
import { Hono } from "hono";
// Adaptador para Cloudflare Pages Functions
import { handle } from "hono/cloudflare-pages";

// Caché
import { CacheService } from "../_cache";
import { cachePlan } from "../_cache/keys";
// Middlewares
import { cache as cacheMiddleware } from "../_middleware/cache";
import { rateLimit as rateLimitMiddleware } from "../_middleware/rateLimit";
// Límite de peticiones
import { MemoryRateLimiter } from "../_ratelimit/memoryStore";
// Servicios y validadores
import {
	CENTROS,
	ImagesClient,
	YEAR_MAX,
	YEAR_MIN,
} from "../_services/imagesClient";
import { NasaClient } from "../_services/nasaClient";
import { EndpointValidator } from "../_validators/endpointValidator";

// Instancias compartidas del worker
const cacheService = new CacheService();
const rateLimiter = new MemoryRateLimiter();
const nasaClient = new NasaClient();
const imagesClient = new ImagesClient();
const endpointValidator = new EndpointValidator();

const app = new Hono();

// Capas transversales: límite por IP y caché de borde
app.use("/api/nasa", rateLimitMiddleware(rateLimiter));
app.use("/api/nasa", cacheMiddleware({ cache: cacheService, plan: cachePlan }));

/**
 * GET /api/nasa - Proxy hacia la API Planetary de NASA
 */
app.get("/api/nasa", async (c) => {
	// 1. Parámetros y credenciales del entorno
	const endpoint = c.req.query("endpoint") || "apod";
	const count = c.req.query("count") || null;
	const apiKey = c.env.NASA_API_KEY;

	// 2. Validación de endpoint permitido
	const validation = endpointValidator.validate(endpoint);
	if (!validation.isValid) {
		return c.json({ error: validation.error }, 400);
	}

	// 3. Galería: librería de imágenes de NASA (sin API key, paginada)
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

		try {
			const result = await imagesClient.search({
				q,
				page,
				center,
				yearStart,
				yearEnd,
			});
			return c.json(result);
		} catch (err) {
			return c.json({ error: err.message }, err.status || 502);
		}
	}

	// 4. Petición a NASA
	try {
		const { data, status } = await nasaClient.fetchEndpoint(
			endpoint,
			count,
			apiKey,
		);
		const esApodDelDia = endpoint === "apod" && !count;

		// 4b. Sin foto del día no se inventa otra: el frontend usa su respaldo
		if (esApodDelDia && status >= 500) {
			return c.json(
				{
					error: "La imagen del día no está disponible en este momento.",
				},
				503,
			);
		}

		return c.json(data, status);
	} catch (err) {
		return c.json({ error: err.message }, err.status || 502);
	}
});

// Exporta el manejador para Cloudflare Pages Functions
export const onRequest = handle(app);
