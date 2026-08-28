import { beforeEach, describe, expect, it } from "vitest";
import { create } from "zustand";
import { useCosmosStore } from "../../src/store/cosmosStore";
import { createLikesSlice } from "../../src/store/slices/likesSlice";
import { mockApodGallery, mockApodImage } from "./helpers";

describe("likesSlice (Unit Tests)", () => {
	let useTestStore;

	beforeEach(() => {
		// 1. Instancia un store aislado para cada prueba del slice
		useTestStore = create((...a) => ({
			...createLikesSlice(...a),
		}));

		// 2. Limpia el store global para evitar contaminación entre suites
		useCosmosStore.setState({
			likedImages: [],
			savedImages: [],
		});
	});

	describe("Estado inicial", () => {
		it("inicializa likedImages y savedImages como arrays vacíos", () => {
			// 1. Obtiene el estado inicial
			const state = useTestStore.getState();

			// 2. Comprueba que las colecciones inicien vacías
			expect(state.likedImages).toEqual([]);
			expect(state.savedImages).toEqual([]);
		});
	});

	describe("toggleLike", () => {
		it("agrega una imagen a likedImages si no estaba presente", () => {
			// 1. Ejecuta toggleLike con una nueva imagen
			useTestStore.getState().toggleLike(mockApodImage);

			// 2. Comprueba que se haya añadido al array
			const state = useTestStore.getState();
			expect(state.likedImages).toHaveLength(1);
			expect(state.likedImages[0]).toEqual(mockApodImage);
		});

		it("remueve la imagen de likedImages si ya estaba presente (toggle off)", () => {
			// 1. Agrega la imagen por primera vez
			useTestStore.getState().toggleLike(mockApodImage);
			expect(useTestStore.getState().likedImages).toHaveLength(1);

			// 2. Vuelve a ejecutar toggleLike sobre la misma imagen
			useTestStore.getState().toggleLike(mockApodImage);

			// 3. Comprueba que la lista quede vacía
			expect(useTestStore.getState().likedImages).toHaveLength(0);
		});

		it("permite dar like a múltiples imágenes distintas", () => {
			const [img1, img2, img3] = mockApodGallery;

			// 1. Registra tres imágenes diferentes
			useTestStore.getState().toggleLike(img1);
			useTestStore.getState().toggleLike(img2);
			useTestStore.getState().toggleLike(img3);

			// 2. Comprueba la longitud y orden por fecha
			const state = useTestStore.getState();
			expect(state.likedImages).toHaveLength(3);
			expect(state.likedImages.map((img) => img.date)).toEqual([
				img1.date,
				img2.date,
				img3.date,
			]);
		});

		it("remueve únicamente la imagen indicada manteniendo las demás", () => {
			const [img1, img2] = mockApodGallery;

			// 1. Agrega dos imágenes
			useTestStore.getState().toggleLike(img1);
			useTestStore.getState().toggleLike(img2);

			// 2. Remueve solo la primera imagen
			useTestStore.getState().toggleLike(img1);

			// 3. Comprueba que solo permanezca la segunda imagen
			const state = useTestStore.getState();
			expect(state.likedImages).toHaveLength(1);
			expect(state.likedImages[0].date).toBe(img2.date);
		});
	});

	describe("toggleSave", () => {
		it("agrega una imagen a savedImages si no estaba guardada", () => {
			// 1. Guarda una imagen
			useTestStore.getState().toggleSave(mockApodImage);

			// 2. Comprueba inserción en savedImages
			const state = useTestStore.getState();
			expect(state.savedImages).toHaveLength(1);
			expect(state.savedImages[0]).toEqual(mockApodImage);
		});

		it("remueve la imagen de savedImages si ya estaba guardada", () => {
			// 1. Guarda la imagen
			useTestStore.getState().toggleSave(mockApodImage);
			expect(useTestStore.getState().savedImages).toHaveLength(1);

			// 2. Quita la imagen guardada
			useTestStore.getState().toggleSave(mockApodImage);

			// 3. Comprueba que el array quede vacío
			expect(useTestStore.getState().savedImages).toHaveLength(0);
		});

		it("mantiene independencia total entre likedImages y savedImages", () => {
			// 1. Da like a la imagen
			useTestStore.getState().toggleLike(mockApodImage);
			expect(useTestStore.getState().likedImages).toHaveLength(1);
			expect(useTestStore.getState().savedImages).toHaveLength(0);

			// 2. Guarda la imagen
			useTestStore.getState().toggleSave(mockApodImage);

			// 3. Comprueba que ambas listas operen de forma independiente
			expect(useTestStore.getState().likedImages).toHaveLength(1);
			expect(useTestStore.getState().savedImages).toHaveLength(1);
		});
	});

	describe("Integración con useCosmosStore", () => {
		it("actualiza correctamente el estado global compuesto", () => {
			// 1. Ejecuta acciones sobre el store global real
			useCosmosStore.getState().toggleLike(mockApodImage);
			useCosmosStore.getState().toggleSave(mockApodImage);

			// 2. Comprueba persistencia en ambos arrays globales
			expect(useCosmosStore.getState().likedImages).toHaveLength(1);
			expect(useCosmosStore.getState().savedImages).toHaveLength(1);
		});
	});
});
