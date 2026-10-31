/**
 * Convierte un título en slug URL-friendly
 * @param {string} title
 * @returns {string}
 */
export function generarSlug(title) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9áéíóúüñ\s]+/g, "")
		.replace(/\s+/g, "-");
}
