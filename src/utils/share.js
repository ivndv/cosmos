/**
 * Comparte una imagen usando la API nativa si está disponible
 * o copia el enlace al portapapeles como alternativa.
 * @param {{ title?: string, explanation?: string, url?: string, hdurl?: string }} image
 * @returns {Promise<"shared"|"copied"|"cancelled"|"error">}
 */
export async function compartirImagen(image) {
	const url = image?.hdurl || image?.url;
	if (!url) return "error";

	const datos = {
		title: image?.title ?? "Cosmos",
		text: image?.explanation?.slice(0, 120),
		url,
	};

	if (typeof navigator !== "undefined" && navigator.share) {
		try {
			await navigator.share(datos);
			return "shared";
		} catch {
			return "cancelled";
		}
	}

	try {
		await navigator.clipboard.writeText(url);
		return "copied";
	} catch {
		return "error";
	}
}
