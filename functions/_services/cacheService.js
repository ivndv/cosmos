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
	 * Determina si una petición debe almacenarse en caché.
	 * APOD sin count (la foto del día) y la galería paginada de images.
	 * @param {string} endpoint
	 * @param {string|null} count
	 * @returns {boolean}
	 */
	shouldCache(endpoint, count = null) {
		if (endpoint === "images") return true;
		return endpoint === "apod" && !count;
	}

	/**
	 * TTL específico por endpoint: 1 h para la galería, 24 h para APOD
	 * @param {string} endpoint
	 * @returns {number} segundos
	 */
	ttlFor(endpoint) {
		return endpoint === "images" ? 3600 : this.ttlSeconds;
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
	 * Clave normalizada a partir del endpoint y sus parámetros
	 * @param {string} endpoint
	 * @param {{ count?: string|null, page?: number|string|null, q?: string|null, center?: string|null, yearStart?: number|null, yearEnd?: number|null }} params
	 * @returns {string}
	 */
	generateKey(endpoint, params = {}) {
		const {
			count = null,
			page = null,
			q = null,
			center = null,
			yearStart = null,
			yearEnd = null,
		} = params;
		const parts = [endpoint];
		if (count) parts.push(`count=${count}`);
		if (page) parts.push(`page=${page}`);
		if (q) parts.push(`q=${encodeURIComponent(q)}`);
		if (center) parts.push(`center=${encodeURIComponent(center)}`);
		if (yearStart) parts.push(`from=${yearStart}`);
		if (yearEnd) parts.push(`to=${yearEnd}`);
		return parts.join("&");
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

		const isExpired = Date.now() >= cached.expiresAt;
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
	async set(key, data, status = 200, c = null, ttlSeconds = this.ttlSeconds) {
		this.memoryStore.set(key, {
			data,
			status,
			timestamp: Date.now(),
			expiresAt: Date.now() + ttlSeconds * 1000,
		});

		const cacheApi = this.getCacheApi();
		if (cacheApi) {
			try {
				const responseToCache = new Response(JSON.stringify(data), {
					status,
					headers: {
						"Content-Type": "application/json",
						"Cache-Control": `public, max-age=${ttlSeconds}, s-maxage=${ttlSeconds}`,
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
