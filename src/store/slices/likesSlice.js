export const createLikesSlice = (set) => ({
	likedImages: [],
	savedImages: [],
	toggleLike: (image) => {
		set((state) => {
			const likedImages = state.likedImages.some(
				(liked) => liked.date === image.date,
			)
				? state.likedImages.filter((liked) => liked.date !== image.date)
				: [...state.likedImages, image];
			return { likedImages };
		});
	},
	toggleSave: (image) => {
		set((state) => {
			const savedImages = state.savedImages.some(
				(saved) => saved.date === image.date,
			)
				? state.savedImages.filter((saved) => saved.date !== image.date)
				: [...state.savedImages, image];
			return { savedImages };
		});
	},
});
