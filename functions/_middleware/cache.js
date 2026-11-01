/**
 * Middleware de caché: responde desde la caché si existe y guarda la respuesta
 * cuando el handler termina con 200.
 * @param {{ cache: import('../_cache').CacheService, plan: (c: import('hono').Context) => ({ key: string, ttl: number } | null) }} opciones
 */
export const cache =
	({ cache, plan }) =>
	async (c, next) => {
		const entrada = plan(c);

		if (entrada) {
			const guardado = await cache.get(entrada.key);
			if (guardado) return c.json(guardado.data, guardado.status);
		}

		await next();

		if (entrada && c.res.status === 200) {
			const datos = await c.res.clone().json();
			await cache.set(entrada.key, datos, 200, c, entrada.ttl);
		}
	};
