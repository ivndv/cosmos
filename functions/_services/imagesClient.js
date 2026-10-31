/**
 * Cliente para la NASA Image and Video Library (images-api.nasa.gov).
 * No requiere API key y devuelve solo imágenes, normalizadas al formato
 * que consume la galería: { date, url, hdurl, title, explanation }.
 */

const DEFAULT_BASE_URL = "https://images-api.nasa.gov";

// Cantidad de imágenes por página
export const PAGE_SIZE = 24;

// Centros de NASA aceptados como filtro
export const CENTROS = [
	"JPL",
	"GSFC",
	"KSC",
	"MSFC",
	"JSC",
	"ARC",
	"GRC",
	"LRC",
	"SSC",
	"HQ",
];

// Rango de años aceptado como filtro
export const YEAR_MIN = 1920;
export const YEAR_MAX = new Date().getFullYear();

// NASA corta la búsqueda a 10 000 resultados (page × page_size ≤ 10 000)
export const MAX_RESULTADOS = 10_000;
export const MAX_PAGINAS = Math.floor(MAX_RESULTADOS / PAGE_SIZE);

/**
 * Elige la variante de imagen disponible entre los links del item
 * @param {object} item
 * @param {string} prefer - Sufijo preferido (ej: '~small', '~orig')
 * @returns {string|null}
 */
function pickAsset(item, prefer) {
	const links = Array.isArray(item?.links) ? item.links : [];
	const bySize = (size) =>
		links.find(
			(link) => link?.href?.includes(size) && link?.render === "image",
		);
	const candidates = [
		bySize(prefer),
		bySize("~small"),
		bySize("~thumb"),
		links[0],
	];
	return candidates.find((link) => Boolean(link?.href))?.href ?? null;
}

export class ImagesClient {
	/**
	 * @param {string} baseUrl - URL base de la librería de imágenes de NASA
	 * @param {number} timeoutMs - Timeout máximo en ms (default: 30s)
	 */
	constructor(baseUrl = DEFAULT_BASE_URL, timeoutMs = 30_000) {
		this.baseUrl = baseUrl;
		this.timeoutMs = timeoutMs;
	}

	/**
	 * Busca imágenes en la librería de NASA
	 * @param {{ q?: string, page?: number, center?: string|null, yearStart?: number|null, yearEnd?: number|null }} options
	 * @returns {Promise<{ images: object[], totalHits: number, page: number, pageSize: number }>}
	 */
	async search({
		q = "",
		page = 1,
		center = null,
		yearStart = null,
		yearEnd = null,
	} = {}) {
		// Se acota la página para no superar el tope de NASA
		const paginaSegura = Math.min(Math.max(1, page), MAX_PAGINAS);

		const params = new URLSearchParams({
			media_type: "image",
			page: String(paginaSegura),
			page_size: String(PAGE_SIZE),
		});
		if (q) params.set("q", q);
		if (center) params.set("center", center);
		if (yearStart) params.set("year_start", String(yearStart));
		if (yearEnd) params.set("year_end", String(yearEnd));

		const url = `${this.baseUrl}/search?${params.toString()}`;
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

		let response;
		try {
			response = await fetch(url, { signal: controller.signal });
		} catch (err) {
			console.error("[NASA Images] Error de red:", err.message);
			const error = new Error(
				err.name === "AbortError"
					? "La API de imágenes de NASA tardó demasiado en responder. Intenta de nuevo."
					: "No se pudo conectar con la API de imágenes de NASA",
			);
			error.status = 502;
			throw error;
		} finally {
			clearTimeout(timeout);
		}

		if (!response.ok) {
			const error = new Error(
				"Respuesta inválida de la API de imágenes de NASA",
			);
			error.status = response.status;
			throw error;
		}

		let payload;
		try {
			payload = await response.json();
		} catch (err) {
			console.error("[NASA Images] Error al parsear respuesta:", err.message);
			const error = new Error(
				"Respuesta inválida de la API de imágenes de NASA",
			);
			error.status = 502;
			throw error;
		}

		const collection = payload?.collection ?? {};
		const items = Array.isArray(collection.items) ? collection.items : [];
		const totalHits = Number(collection.metadata?.total_hits) || 0;

		const images = items
			.map((item) => {
				const data = item?.data?.[0] ?? {};
				const url = pickAsset(item, "~small");
				if (!url) return null;
				return {
					// Clave estable: la usan likes/saves como identificador
					date: data.nasa_id ?? item.href ?? url,
					nasa_id: data.nasa_id ?? null,
					title: data.title ?? "Sin título",
					explanation: data.description ?? "",
					url,
					hdurl: pickAsset(item, "~orig") ?? url,
					center: data.center ?? null,
					date_created: data.date_created ?? null,
				};
			})
			.filter(Boolean);

		return {
			images,
			totalHits,
			page: paginaSegura,
			pageSize: PAGE_SIZE,
			// Verdadero cuando NASA no deja paginar más allá del tope
			limitado: totalHits > MAX_RESULTADOS,
			maxPaginas: MAX_PAGINAS,
		};
	}
}
