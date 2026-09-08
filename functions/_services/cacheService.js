/**
 * Gestión de caché para respuestas de la API
 * Usa Cloudflare Cache API (caches.default) en producción con fallback a memoria local en tests.
 */
export class CacheService {
	/**
	 * @param {number} ttlSeconds - Tiempo de vida de la caché en segundos (default: 24 horas = 86400s)
	 */
	constructor(ttlSeconds = 86_400) {
		this.ttlSeconds = ttlSeconds;
		this.ttlMs = ttlSeconds * 1000;
		this.memoryStore = new Map();
	}

	/**
	 * Determina si una petición debe almacenarse en caché
	 * La foto del día (apod sin count) se cachea 24h; la galería con count aleatorio no se cachea.
	 * @param {string} endpoint
	 * @param {string|null} count
	 * @returns {boolean}
	 */
	shouldCache(endpoint, count = null) {
		return endpoint === "apod" && !count;
	}

	/**
	 * Instancia de Cache API si está disponible en el entorno
	 * @private
	 * @returns {Cache|null}
	 */
	getCacheApi() {
		try {
			return typeof caches !== "undefined" && caches.default
				? caches.default
				: null;
		} catch {
			return null;
		}
	}

	/**
	 * Clave normalizada a partir del endpoint y parámetros
	 * @param {string} endpoint
	 * @param {string|null} count
	 * @returns {string}
	 */
	generateKey(endpoint, count = null) {
		return count ? `${endpoint}&count=${count}` : endpoint;
	}

	/**
	 * URL sintética para indexar en la Cache API de Cloudflare
	 * @private
	 * @param {string} key
	 * @returns {string}
	 */
	getCacheUrl(key) {
		return `https://cache.cosmos.internal/api/nasa?${key}`;
	}

	/**
	 * Lee una respuesta de la caché
	 * @param {string} key
	 * @returns {Promise<{ data: any, status: number } | null>}
	 */
	async get(key) {
		const cacheApi = this.getCacheApi();

		// 1. Consulta en Cache API de Cloudflare
		if (cacheApi) {
			try {
				const match = await cacheApi.match(this.getCacheUrl(key));
				if (match) {
					const data = await match.json();
					return { data, status: match.status };
				}
			} catch (err) {
				console.warn("[CacheService] Aviso al leer de Cache API:", err.message);
			}
		}

		// 2. Fallback a memoria local
		const cached = this.memoryStore.get(key);
		if (!cached) return null;

		const isExpired = Date.now() - cached.timestamp >= this.ttlMs;
		if (isExpired) {
			this.memoryStore.delete(key);
			return null;
		}

		return { data: cached.data, status: cached.status };
	}

	/**
	 * Guarda una respuesta en caché
	 * @param {string} key
	 * @param {any} data
	 * @param {number} status
	 * @param {import('hono').Context} [c]
	 */
	async set(key, data, status = 200, c = null) {
		this.memoryStore.set(key, {
			data,
			status,
			timestamp: Date.now(),
		});

		const cacheApi = this.getCacheApi();
		if (cacheApi) {
			try {
				const responseToCache = new Response(JSON.stringify(data), {
					status,
					headers: {
						"Content-Type": "application/json",
						"Cache-Control": `public, max-age=${this.ttlSeconds}, s-maxage=${this.ttlSeconds}`,
					},
				});

				const putPromise = cacheApi.put(this.getCacheUrl(key), responseToCache);

				if (c?.executionCtx?.waitUntil) {
					c.executionCtx.waitUntil(putPromise);
				} else {
					await putPromise;
				}
			} catch (err) {
				console.warn(
					"[CacheService] Aviso al escribir en Cache API:",
					err.message,
				);
			}
		}
	}

	/**
	 * Limpia la memoria local
	 */
	clear() {
		this.memoryStore.clear();
	}
}
