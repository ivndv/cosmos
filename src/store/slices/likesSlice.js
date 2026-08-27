// Slice de likes y saves para imágenes de la galería
export const createLikesSlice = (set) => ({
	likedImages: [],
	savedImages: [],
	// Alterna el estado de like de una imagen
	toggleLike: (image) => {
		set((state) => {
			// 1. Verifica si la imagen ya tiene like
			const likedImages = state.likedImages.some(
				(liked) => liked.date === image.date,
			)
				? // 2. Si ya tiene like, lo quita
					state.likedImages.filter((liked) => liked.date !== image.date)
				: // 3. Si no tiene like, lo agrega
					[...state.likedImages, image];
			return { likedImages };
		});
	},
	// Alterna el estado de guardado de una imagen
	toggleSave: (image) => {
		set((state) => {
			// 1. Verifica si la imagen ya está guardada
			const savedImages = state.savedImages.some(
				(saved) => saved.date === image.date,
			)
				? // 2. Si ya está guardada, la quita
					state.savedImages.filter((saved) => saved.date !== image.date)
				: // 3. Si no está guardada, la agrega
					[...state.savedImages, image];
			return { savedImages };
		});
	},
});
