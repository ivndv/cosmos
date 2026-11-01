import { getClientIP } from "../_ratelimit";

/**
 * Middleware de límite de peticiones por IP.
 * @param {import('../_ratelimit/memoryStore').MemoryRateLimiter} limiter
 */
export const rateLimit = (limiter) => async (c, next) => {
	const ip = getClientIP(c);

	if (!limiter.isAllowed(ip)) {
		return c.json(
			{ error: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
			429,
		);
	}

	await next();
};
