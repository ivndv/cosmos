/**
 * IP real del cliente según las cabeceras de Cloudflare.
 * @param {import('hono').Context} c
 * @returns {string}
 */
export function getClientIP(c) {
	return (
		c.req.header("cf-connecting-ip") ||
		c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
		"unknown"
	);
}
