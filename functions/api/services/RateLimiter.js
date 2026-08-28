/**
 * Control de límite de peticiones por IP en memoria
 */
export class RateLimiter {
	/**
	 * @param {number} windowMs - Ventana de tiempo en ms (default: 60s)
	 * @param {number} maxRequests - Máximo de peticiones por ventana (default: 30)
	 */
	constructor(windowMs = 60_000, maxRequests = 30) {
		this.windowMs = windowMs;
		this.maxRequests = maxRequests;
		this.records = new Map();
	}

	/**
	 * Obtiene la IP real del cliente desde las cabeceras de Cloudflare
	 * @param {import('hono').Context} c
	 * @returns {string}
	 */
	getClientIP(c) {
		return (
			c.req.header("cf-connecting-ip") ||
			c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
			"unknown"
		);
	}

	/**
	 * Comprueba si la IP puede realizar una nueva petición
	 * @param {string} ip
	 * @returns {boolean}
	 */
	isAllowed(ip) {
		const now = Date.now();
		const record = this.records.get(ip);

		if (!record || now - record.windowStart > this.windowMs) {
			this.records.set(ip, { windowStart: now, count: 1 });
			return true;
		}

		if (record.count >= this.maxRequests) {
			return false;
		}

		record.count++;
		return true;
	}
}
