import { vi } from "vitest";

/**
 * Crea una respuesta mock para globalThis.fetch
 * @param {any} data Datos devueltos en formato JSON
 * @param {boolean} ok Si la respuesta tiene status exitoso
 * @param {number} status Código HTTP
 */
export function mockFetch(data, ok = true, status = 200) {
	return vi.fn().mockResolvedValue({
		ok,
		status,
		json: async () => data,
	});
}

/**
 * Crea una secuencia de respuestas para probar reintentos en fetchWithRetry
 * @param {Array<{ data?: any, ok?: boolean, status?: number, error?: Error }>} sequence
 */
export function mockFetchSequence(sequence) {
	const fn = vi.fn();
	for (const item of sequence) {
		if (item.error) {
			fn.mockRejectedValueOnce(item.error);
		} else {
			fn.mockResolvedValueOnce({
				ok: item.ok ?? true,
				status: item.status ?? 200,
				json: async () => item.data ?? {},
			});
		}
	}
	return fn;
}

/**
 * Fixture de imagen individual de NASA APOD
 */
export const mockApodImage = {
	date: "2026-08-28",
	title: "Galaxia Andrómeda en Alta Resolución",
	explanation:
		"Una vista detallada de la galaxia vecina capturada por telescopio espacial.",
	url: "https://apod.nasa.gov/apod/image/2608/andromeda.jpg",
	hdurl: "https://apod.nasa.gov/apod/image/2608/andromeda_hd.jpg",
	media_type: "image",
};

/**
 * Fixture de lote de imágenes para la galería
 */
export const mockApodGallery = [
	mockApodImage,
	{
		date: "2026-08-27",
		title: "Nebulosa Carina",
		explanation: "Pilares gigantes de gas y polvo en formación estelar.",
		url: "https://apod.nasa.gov/apod/image/2608/carina.jpg",
		hdurl: "https://apod.nasa.gov/apod/image/2608/carina_hd.jpg",
		media_type: "image",
	},
	{
		date: "2026-08-26",
		title: "Pilares de la Creación",
		explanation:
			"Vista infrarroja de estrellas naciendo en la Nebulosa del Águila.",
		url: "https://apod.nasa.gov/apod/image/2608/pillars.jpg",
		hdurl: "https://apod.nasa.gov/apod/image/2608/pillars_hd.jpg",
		media_type: "image",
	},
];
