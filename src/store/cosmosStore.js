import { create } from "zustand";
import { persist } from "zustand/middleware";
import { noticias as noticiasData } from "../data/noticias";
import { sistemaSolar as sistemaSolarData } from "../data/sistemaSolar";
import { createLikesSlice } from "./slices/likesSlice";
import { createNASASlice } from "./slices/nasaSlice";

export const useCosmosStore = create(
	persist(
		(...a) => ({
			...createLikesSlice(...a),
			...createNASASlice(...a),
			noticias: noticiasData,
			sistemaSolar: sistemaSolarData,
		}),
		{
			name: "cosmos-store",
			partialize: (state) => ({
				likedImages: state.likedImages,
				savedImages: state.savedImages,
			}),
		},
	),
);
