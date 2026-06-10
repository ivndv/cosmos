// Zustand
import { create } from "zustand";
// Persistencia en localStorage
import { persist } from "zustand/middleware";
// Slices
import { createLikesSlice } from "./slices/likesSlice";
import { createNASASlice } from "./slices/nasaSlice";

// Crea el store global de la aplicación con persistencia en localStorage
export const useCosmosStore = create(
	persist(
		// Combina los slices de likes y NASA
		(...a) => ({
			...createLikesSlice(...a),
			...createNASASlice(...a),
		}),
		{
			name: "cosmos-store",
			// Solo persiste likes y saves en localStorage
			partialize: (state) => ({
				likedImages: state.likedImages,
				savedImages: state.savedImages,
			}),
		},
	),
);
