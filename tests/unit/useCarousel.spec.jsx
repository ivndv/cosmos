import { renderHook } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useCarrusel from "../../src/hooks/useCarousel";
import { mockApodGallery } from "./helpers";

describe("useCarrusel (Unit Tests)", () => {
	beforeEach(() => {
		// Habilita temporizadores simulados para controlar el setInterval de 5s
		vi.useFakeTimers();
	});

	afterEach(() => {
		// Restablece temporizadores reales al terminar cada test
		vi.useRealTimers();
	});

	it("inicializa currentIndex en 0", () => {
		// 1. Renderiza el hook con el fixture de imágenes
		const { result } = renderHook(() => useCarrusel(mockApodGallery));

		// 2. Comprueba que inicie en la primera posición
		expect(result.current.currentIndex).toBe(0);
	});

	it("avanza automáticamente el índice cada 5000ms", () => {
		// 1. Renderiza el hook
		const { result } = renderHook(() => useCarrusel(mockApodGallery));
		expect(result.current.currentIndex).toBe(0);

		// 2. Avanza 5 segundos y comprueba transición al índice 1
		act(() => {
			vi.advanceTimersByTime(5000);
		});
		expect(result.current.currentIndex).toBe(1);

		// 3. Avanza otros 5 segundos y comprueba transición al índice 2
		act(() => {
			vi.advanceTimersByTime(5000);
		});
		expect(result.current.currentIndex).toBe(2);
	});

	it("hace ciclo circular (wrap-around) al llegar al final del array", () => {
		// 1. Renderiza el hook con 3 imágenes (índices 0, 1, 2)
		const { result } = renderHook(() => useCarrusel(mockApodGallery));

		// 2. Avanza 15 segundos (3 ciclos completos de 5s)
		act(() => {
			vi.advanceTimersByTime(5000 * 3);
		});

		// 3. Comprueba que haya retornado al inicio (índice 0)
		expect(result.current.currentIndex).toBe(0);
	});

	it("permite actualizar el índice manualmente mediante setCurrentIndex", () => {
		// 1. Renderiza el hook
		const { result } = renderHook(() => useCarrusel(mockApodGallery));

		// 2. Ejecuta actualización manual
		act(() => {
			result.current.setCurrentIndex(2);
		});

		// 3. Comprueba el nuevo índice asignado
		expect(result.current.currentIndex).toBe(2);
	});

	it("limpia el temporizador al desmontar el hook", () => {
		// 1. Espía la función nativa clearInterval
		const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");

		// 2. Monta y desmonta el hook
		const { unmount } = renderHook(() => useCarrusel(mockApodGallery));
		unmount();

		// 3. Comprueba que se haya limpiado el intervalo
		expect(clearIntervalSpy).toHaveBeenCalled();
	});
});
