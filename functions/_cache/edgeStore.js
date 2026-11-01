// Origen sintético para indexar respuestas en la Cache API
const CACHE_ORIGIN = "https://cache.cosmos.internal/api/nasa";

/**
 * Almacén de caché en el borde usando la Cache API de Cloudflare.
 * Es por colo: cada centro de datos mantiene su propia copia.
 */
export class EdgeStore {
	/**
	 * URL sintética única por clave
	 * @param {string} key
	 * @returns {string}
	 */
	url(key) {
		return `${CACHE_ORIGIN}?${key}`;
	}

	/**
	 * @returns {Cache|null}
	 */
	getCache() {
		try {
			return typeof caches !== "undefined" && caches.default
				? caches.default
				: null;
		} catch {
			return null;
		}
	}

	/**
	 * @param {string} key
	 * @returns {Promise<{ data: any, status: number } | null>}
	 */
	async get(key) {
		const cache = this.getCache();
		if (!cache) return null;

		try {
			const match = await cache.match(this.url(key));
			if (!match) return null;
			return { data: await match.json(), status: match.status };
		} catch (err) {
			console.warn("[EdgeStore] Error al leer:", err.message);
			return null;
		}
	}

	/**
	 * @param {string} key
	 * @param {any} data
	 * @param {number} status
	 * @param {import('hono').Context} [c]
	 * @param {number} ttlSeconds
	 */
	async set(key, data, status, c, ttlSeconds) {
		const cache = this.getCache();
		if (!cache) return;

		try {
			const respuesta = new Response(JSON.stringify(data), {
				status,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": `public, max-age=${ttlSeconds}, s-maxage=${ttlSeconds}`,
				},
			});

			const escribir = cache.put(this.url(key), respuesta);

			if (c?.executionCtx?.waitUntil) {
				c.executionCtx.waitUntil(escribir);
			} else {
				await escribir;
			}
		} catch (err) {
			console.warn("[EdgeStore] Error al escribir:", err.message);
		}
	}
}
