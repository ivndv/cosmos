// TanStack Query
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Imágenes de ejemplo para desarrollo (VITE_USE_MOCKS=true en .env)
// Solo aplica en modo desarrollo: el build de producción usa siempre NASA.
const USE_MOCKS =
	import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === "true";

// Cantidad de imágenes por página (debe coincidir con el backend)
export const PAGE_SIZE = 24;

// NASA corta la búsqueda a 10 000 resultados (page × page_size ≤ 10 000)
export const MAX_RESULTADOS = 10_000;
export const MAX_PAGINAS = Math.floor(MAX_RESULTADOS / PAGE_SIZE);

// Pide un endpoint del proxy propio
async function fetchNasa(path) {
	const response = await fetch(`/api/nasa?${path}`);
	if (!response.ok) {
		throw new Error("No se pudo obtener la respuesta de la API de NASA");
	}
	return response.json();
}

/**
 * Imagen astronómica del día (APOD)
 */
export function useDailyImage() {
	return useQuery({
		queryKey: ["nasa", "daily"],
		queryFn: async () => {
			if (USE_MOCKS) {
				const { mockDailyImage } = await import("@/data/mockGaleria");
				return mockDailyImage;
			}
			return fetchNasa("endpoint=apod");
		},
		// Un solo reintento: si NASA falla, el hero usa su imagen de respaldo
		retry: 1,
	});
}

/**
 * Página de la galería de la librería de imágenes de NASA.
 * @param {{ page?: number, q?: string, center?: string, yearStart?: number }} options
 */
export function useGalleryImages({
	page = 1,
	q = "",
	center = "",
	yearStart = 0,
} = {}) {
	return useQuery({
		queryKey: ["nasa", "images", q, center, yearStart, page],
		queryFn: async () => {
			if (USE_MOCKS) {
				const { mockGaleria } = await import("@/data/mockGaleria");
				const start = (page - 1) * PAGE_SIZE;
				return {
					images: mockGaleria.slice(start, start + PAGE_SIZE),
					totalHits: mockGaleria.length,
					page,
					pageSize: PAGE_SIZE,
				};
			}

			const params = new URLSearchParams({
				endpoint: "images",
				page: String(page),
			});
			if (q) params.set("q", q);
			if (center) params.set("center", center);
			if (yearStart) params.set("yearStart", String(yearStart));
			return fetchNasa(params.toString());
		},
		// Mantiene la página anterior visible mientras carga la siguiente
		placeholderData: keepPreviousData,
	});
}
