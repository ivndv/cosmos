export const createNASASlice = (set) => ({
	dailyImage: null,
	dailyLoading: false,
	dailyError: null,
	fetchDailyImage: async () => {
		set({ dailyLoading: true, dailyError: null });
		try {
			const response = await fetch("/api/nasa?endpoint=apod");
			if (!response.ok) {
				throw new Error(
					`error al obtener respuesta de la API ${response.status}`,
				);
			}
			const data = await response.json();
			set({ dailyImage: data, dailyLoading: false });
		} catch (error) {
			console.log("Error al obtener los datos:", error);
			set({ dailyError: error.message, dailyLoading: false });
		}
	},
	imagesGaleria: [],
	galeriaLoading: false,
	galeriaError: null,
	fetchGalleryImages: async () => {
		set({ galeriaLoading: true, galeriaError: null });
		try {
			const response = await fetch("/api/nasa?endpoint=apod&count=15");
			if (!response.ok) {
				throw new Error(
					`error al obtener respuesta de la API, codigo: ${response.status}`,
				);
			}
			const data = await response.json();
			set({ imagesGaleria: data, galeriaLoading: false });
		} catch (error) {
			console.log("error al obtener los datos:", error);
			set({ galeriaError: error.message, galeriaLoading: false });
		}
	},
});
