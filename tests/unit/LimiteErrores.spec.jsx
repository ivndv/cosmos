import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LimiteErrores from "../../src/components/LimiteErrores/LimiteErrores";

// Componente helper que simula un fallo durante el renderizado
function ComponenteQueFalla({ shouldThrow = false }) {
	if (shouldThrow) {
		throw new Error("Error simulado en componente hijo");
	}
	return <div>Contenido renderizado correctamente</div>;
}

describe("LimiteErrores (Unit Tests)", () => {
	let originalReload;

	beforeEach(() => {
		// 1. Silencia console.error de React durante el error boundary
		vi.spyOn(console, "error").mockImplementation(() => {});

		// 2. Mockea window.location.reload para evitar recargar el test runner
		originalReload = window.location.reload;
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { ...window.location, reload: vi.fn() },
		});
	});

	afterEach(() => {
		// Restablece consola y window.location original
		vi.restoreAllMocks();
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { ...window.location, reload: originalReload },
		});
	});

	it("renderiza los componentes hijos cuando no hay error", () => {
		// 1. Renderiza el boundary con un hijo funcional normal
		render(
			<LimiteErrores>
				<ComponenteQueFalla shouldThrow={false} />
			</LimiteErrores>,
		);

		// 2. Comprueba que se muestren los hijos y no el fallback de error
		expect(
			screen.getByText("Contenido renderizado correctamente"),
		).toBeInTheDocument();
		expect(screen.queryByText("Algo salió mal")).not.toBeInTheDocument();
	});

	it("captura el error del hijo y muestra la interfaz de fallback", () => {
		// 1. Renderiza el boundary con un hijo que lanza una excepción
		render(
			<LimiteErrores>
				<ComponenteQueFalla shouldThrow={true} />
			</LimiteErrores>,
		);

		// 2. Comprueba encabezado, descripción y botón de fallback
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Algo salió mal",
		);
		expect(
			screen.getByText(
				"Ocurrió un error inesperado. Recarga la página o intenta más tarde.",
			),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Recargar página" }),
		).toBeInTheDocument();
	});

	it("recarga la página al hacer clic en el botón de recargar", () => {
		// 1. Renderiza la interfaz de fallback provocando un error
		render(
			<LimiteErrores>
				<ComponenteQueFalla shouldThrow={true} />
			</LimiteErrores>,
		);

		// 2. Hace clic en el botón de recarga
		const reloadBtn = screen.getByRole("button", { name: "Recargar página" });
		fireEvent.click(reloadBtn);

		// 3. Comprueba que se invoque window.location.reload
		expect(window.location.reload).toHaveBeenCalled();
	});
});
