/**
 * Contador de peticiones por IP con ventana deslizante fija.
 * Vive en memoria del isolate: se reinicia cuando Cloudflare recicla el worker.
 */
export class MemoryRateLimiter {
	/**
	 * @param {number} windowMs - Ventana en ms (default 60s)
	 * @param {number} maxRequests - Máximo de peticiones por ventana (default 30)
	 */
	constructor(windowMs = 60_000, maxRequests = 30) {
		this.windowMs = windowMs;
		this.maxRequests = maxRequests;
		this.records = new Map();
	}

	/**
	 * @param {string} ip
	 * @returns {boolean}
	 */
	isAllowed(ip) {
		const ahora = Date.now();
		const registro = this.records.get(ip);

		if (!registro || ahora - registro.windowStart > this.windowMs) {
			this.records.set(ip, { windowStart: ahora, count: 1 });
			return true;
		}

		if (registro.count >= this.maxRequests) return false;

		registro.count++;
		return true;
	}

	clear() {
		this.records.clear();
	}
}
