// TTL de la galería de imágenes (1 hora)
const IMAGES_TTL = 3600;

/**
 * Segundos hasta la próxima medianoche UTC.
 * Evita servir la APOD de ayer durante todo el día.
 * @returns {number}
 */
export function ttlHastaMedianocheUtc() {
	const ahora = new Date();
	const manana = Date.UTC(
		ahora.getUTCFullYear(),
		ahora.getUTCMonth(),
		ahora.getUTCDate() + 1,
	);
	return Math.max(60, Math.floor((manana - ahora.getTime()) / 1000));
}

/**
 * Construye la clave y el TTL de una petición, o null si no es cacheable.
 * @param {import('hono').Context} c
 * @returns {{ key: string, ttl: number } | null}
 */
export function cachePlan(c) {
	const endpoint = c.req.query("endpoint") || "apod";
	const count = c.req.query("count") || null;

	// Galería: una clave por combinación de filtros y página
	if (endpoint === "images") {
		const partes = ["images"];
		const page = c.req.query("page");
		const q = c.req.query("q");
		const center = c.req.query("center");
		const yearStart = c.req.query("yearStart");
		const yearEnd = c.req.query("yearEnd");

		if (page) partes.push(`page=${page}`);
		if (q) partes.push(`q=${encodeURIComponent(q)}`);
		if (center) partes.push(`center=${encodeURIComponent(center)}`);
		if (yearStart) partes.push(`from=${yearStart}`);
		if (yearEnd) partes.push(`to=${yearEnd}`);

		return { key: partes.join("&"), ttl: IMAGES_TTL };
	}

	// APOD del día: clave por fecha, TTL hasta medianoche
	if (endpoint === "apod" && !count) {
		const fecha = new Date().toISOString().slice(0, 10);
		return { key: `apod:${fecha}`, ttl: ttlHastaMedianocheUtc() };
	}

	return null;
}
