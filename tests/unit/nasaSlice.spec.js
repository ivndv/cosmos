import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { create } from "zustand";
import { useCosmosStore } from "../../src/store/cosmosStore";
import { createNASASlice } from "../../src/store/slices/nasaSlice";
import {
	mockApodGallery,
	mockApodImage,
	mockFetch,
	mockFetchSequence,
} from "./helpers";

describe("nasaSlice (Unit Tests)", () => {
	let useTestStore;

	beforeEach(() => {
		// 1. Instancia el slice de forma aislada
		useTestStore = create((...a) => ({
			...createNASASlice(...a),
		}));

		// 2. Limpia el store global de Cosmos
		useCosmosStore.setState({
			dailyImage: null,
			dailyLoading: false,
			dailyError: null,
			imagesGaleria: [],
			galeriaLoading: false,
			galeriaError: null,
		});

		// 3. Restablece todos los mocks activos
		vi.restoreAllMocks();
	});

	afterEach(() => {
		// Restablece temporizadores reales
		vi.useRealTimers();
	});

	describe("Estado inicial", () => {
		it("inicializa todas las propiedades de APOD y galería con valores por defecto", () => {
			const state = useTestStore.getState();

			// Verifica valores por defecto (null, false, arrays vacíos)
			expect(state.dailyImage).toBeNull();
			expect(state.dailyLoading).toBe(false);
			expect(state.dailyError).toBeNull();
			expect(state.imagesGaleria).toEqual([]);
			expect(state.galeriaLoading).toBe(false);
			expect(state.galeriaError).toBeNull();
		});
	});

	describe("fetchDailyImage", () => {
		it("obtiene exitosamente la imagen del día y actualiza el store", async () => {
			// 1. Mockea fetch con respuesta exitosa
			const fetchMock = mockFetch(mockApodImage);
			vi.stubGlobal("fetch", fetchMock);

			// 2. Dispara la llamada asíncrona
			const promise = useTestStore.getState().fetchDailyImage();

			// 3. Verifica bandera de carga activa mientras resuelve
			expect(useTestStore.getState().dailyLoading).toBe(true);
			expect(useTestStore.getState().dailyError).toBeNull();

			// 4. Espera a que termine la petición
			await promise;

			// 5. Comprueba endpoint consultado y datos almacenados
			const state = useTestStore.getState();
			expect(fetchMock).toHaveBeenCalledWith("/api/nasa?endpoint=apod");
			expect(state.dailyLoading).toBe(false);
			expect(state.dailyImage).toEqual(mockApodImage);
			expect(state.dailyError).toBeNull();
		});

		it("reintenta la petición si el primer intento falla y tiene éxito en el reintento", async () => {
			// 1. Habilita temporizadores simulados para evitar esperar 2s reales
			vi.useFakeTimers();

			// 2. Simula fallo HTTP 500 inicial y éxito en el segundo intento
			const fetchMock = mockFetchSequence([
				{ ok: false, status: 500 },
				{ ok: true, status: 200, data: mockApodImage },
			]);
			vi.stubGlobal("fetch", fetchMock);

			// 3. Inicia la petición
			const promise = useTestStore.getState().fetchDailyImage();

			// 4. Avanza el delay de reintento de 2000ms
			await vi.advanceTimersByTimeAsync(2000);
			await promise;

			// 5. Comprueba que se haya llamado dos veces y guardado los datos
			const state = useTestStore.getState();
			expect(fetchMock).toHaveBeenCalledTimes(2);
			expect(state.dailyLoading).toBe(false);
			expect(state.dailyImage).toEqual(mockApodImage);
			expect(state.dailyError).toBeNull();
		});

		it("captura errores y asigna el mensaje amigable si fallan todos los reintentos", async () => {
			// 1. Configura temporizadores simulados
			vi.useFakeTimers();

			// 2. Simula fallo persistente en ambos intentos
			const fetchMock = mockFetchSequence([
				{ ok: false, status: 502 },
				{ ok: false, status: 502 },
			]);
			vi.stubGlobal("fetch", fetchMock);

			// 3. Dispara la petición y avanza el tiempo
			const promise = useTestStore.getState().fetchDailyImage();
			await vi.advanceTimersByTimeAsync(2000);
			await promise;

			// 4. Comprueba mensaje de error amigable y reseteo de loading
			const state = useTestStore.getState();
			expect(fetchMock).toHaveBeenCalledTimes(2);
			expect(state.dailyLoading).toBe(false);
			expect(state.dailyImage).toBeNull();
			expect(state.dailyError).toBe(
				"No se pudo cargar la imagen del día. Intenta de nuevo más tarde.",
			);
		});

		it("maneja excepciones de red (network failures / aborts)", async () => {
			// 1. Configura temporizadores simulados
			vi.useFakeTimers();

			// 2. Simula rechazo directo de fetch (sin conexión)
			const fetchMock = vi.fn().mockRejectedValue(new Error("Failed to fetch"));
			vi.stubGlobal("fetch", fetchMock);

			// 3. Ejecuta la petición y resuelve reintentos
			const promise = useTestStore.getState().fetchDailyImage();
			await vi.advanceTimersByTimeAsync(2000);
			await promise;

			// 4. Comprueba manejo seguro sin lanzar excepción no capturada
			const state = useTestStore.getState();
			expect(state.dailyLoading).toBe(false);
			expect(state.dailyImage).toBeNull();
			expect(state.dailyError).toBe(
				"No se pudo cargar la imagen del día. Intenta de nuevo más tarde.",
			);
		});
	});

	describe("fetchGalleryImages", () => {
		it("obtiene exitosamente un lote de 15 imágenes para la galería", async () => {
			// 1. Mockea respuesta con lote de galería
			const fetchMock = mockFetch(mockApodGallery);
			vi.stubGlobal("fetch", fetchMock);

			// 2. Inicia carga de la galería
			const promise = useTestStore.getState().fetchGalleryImages();
			expect(useTestStore.getState().galeriaLoading).toBe(true);

			// 3. Espera resolución
			await promise;

			// 4. Comprueba endpoint con count=15 y almacenamiento del array
			const state = useTestStore.getState();
			expect(fetchMock).toHaveBeenCalledWith(
				"/api/nasa?endpoint=apod&count=15",
			);
			expect(state.galeriaLoading).toBe(false);
			expect(state.imagesGaleria).toEqual(mockApodGallery);
			expect(state.galeriaError).toBeNull();
		});

		it("asigna galeriaError cuando falla la llamada a la galería", async () => {
			// 1. Configura temporizadores simulados y simula timeout
			vi.useFakeTimers();
			const fetchMock = vi.fn().mockRejectedValue(new Error("Timeout"));
			vi.stubGlobal("fetch", fetchMock);

			// 2. Dispara y avanza tiempo
			const promise = useTestStore.getState().fetchGalleryImages();
			await vi.advanceTimersByTimeAsync(2000);
			await promise;

			// 3. Comprueba estado de error en galería
			const state = useTestStore.getState();
			expect(state.galeriaLoading).toBe(false);
			expect(state.imagesGaleria).toEqual([]);
			expect(state.galeriaError).toBe(
				"No se pudo cargar la galería. Intenta de nuevo más tarde.",
			);
		});
	});

	describe("Integración con useCosmosStore", () => {
		it("permite ejecutar fetchDailyImage desde el store global compuesto", async () => {
			// 1. Mockea fetch
			const fetchMock = mockFetch(mockApodImage);
			vi.stubGlobal("fetch", fetchMock);

			// 2. Ejecuta en el store global real
			await useCosmosStore.getState().fetchDailyImage();

			// 3. Comprueba actualización en el store global
			expect(useCosmosStore.getState().dailyImage).toEqual(mockApodImage);
		});
	});
});
