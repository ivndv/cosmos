// Reintenta una petición fetch una vez si falla, esperando 2s
async function fetchWithRetry(url, retries = 1, delay = 2000) {
	for (let attempt = 0; attempt <= retries; attempt++) {
		const response = await fetch(url);
		if (response.ok) return response;
		if (attempt < retries) {
			console.log(`[NASA] Reintentando ${url} (intento ${attempt + 1}/${retries})`);
			await new Promise((r) => setTimeout(r, delay));
		}
	}
	throw new Error(`error al obtener respuesta de la API`);
}

// Slice de datos obtenidos desde la API de NASA
export const createNASASlice = (set) => ({
	dailyImage: null,
	dailyLoading: false,
	dailyError: null,
	// Obtiene la imagen astronómica del día desde la API de NASA
	fetchDailyImage: async () => {
		// 1. Marca como cargando
		set({ dailyLoading: true, dailyError: null });
		try {
			// 2. Consulta el proxy de NASA (con retry)
			const response = await fetchWithRetry("/api/nasa?endpoint=apod");
			// 3. Almacena la imagen en el store
			const data = await response.json();
			set({ dailyImage: data, dailyLoading: false });
		} catch (error) {
			console.log("[NASA] Error al obtener imagen del día:", error.message);
			set({ dailyError: "No se pudo cargar la imagen del día. Intenta de nuevo más tarde.", dailyLoading: false });
		}
	},
	imagesGaleria: [],
	galeriaLoading: false,
	galeriaError: null,
	// Obtiene un lote de imágenes para la galería
	fetchGalleryImages: async () => {
		// 1. Marca como cargando
		set({ galeriaLoading: true, galeriaError: null });
		try {
			// 2. Consulta el proxy de NASA con count=15 (con retry)
			const response = await fetchWithRetry("/api/nasa?endpoint=apod&count=15");
			// 3. Almacena las imágenes en el store
			const data = await response.json();
			set({ imagesGaleria: data, galeriaLoading: false });
		} catch (error) {
			console.log("[NASA] Error al obtener galería:", error.message);
			set({ galeriaError: "No se pudo cargar la galería. Intenta de nuevo más tarde.", galeriaLoading: false });
		}
	},
});
