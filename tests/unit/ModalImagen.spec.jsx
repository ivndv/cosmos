import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ModalImagen from "../../src/Pages/Galeria/ModalImagen";
import { mockApodImage } from "./helpers";

describe("ModalImagen (Unit Tests)", () => {
	it("no renderiza nada si la prop image es null o undefined", () => {
		// 1. Renderiza el modal sin datos de imagen
		const { container } = render(
			<ModalImagen image={null} onClose={vi.fn()} />,
		);

		// 2. Comprueba que el DOM resultante esté vacío (null guard)
		expect(container).toBeEmptyDOMElement();
	});

	it("renderiza la información completa de la imagen cuando se proporciona", () => {
		// 1. Renderiza el modal con imagen válida
		render(<ModalImagen image={mockApodImage} onClose={vi.fn()} />);

		// 2. Comprueba renderizado de título, texto explicativo e imagen
		expect(
			screen.getByRole("heading", { name: mockApodImage.title }),
		).toBeInTheDocument();
		expect(screen.getByText(mockApodImage.explanation)).toBeInTheDocument();

		const img = screen.getByRole("img", { name: mockApodImage.title });
		expect(img).toHaveAttribute("src", mockApodImage.url);
	});

	it("llama a onClose al hacer clic en el botón de cerrar", () => {
		// 1. Renderiza con mock de cierre
		const onCloseMock = vi.fn();
		render(<ModalImagen image={mockApodImage} onClose={onCloseMock} />);

		// 2. Hace clic en el botón con aria-label "Cerrar"
		const closeButton = screen.getByRole("button", { name: "Cerrar" });
		fireEvent.click(closeButton);

		// 3. Comprueba ejecución del callback
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});

	it("llama a onClose al presionar la tecla Escape", () => {
		// 1. Renderiza el modal
		const onCloseMock = vi.fn();
		render(<ModalImagen image={mockApodImage} onClose={onCloseMock} />);

		// 2. Dispara evento global de teclado con Escape
		fireEvent.keyDown(window, { key: "Escape" });

		// 3. Comprueba ejecución del callback
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});

	it("llama a onClose al hacer clic en el fondo oscuro (backdrop)", () => {
		// 1. Renderiza el modal
		const onCloseMock = vi.fn();
		render(<ModalImagen image={mockApodImage} onClose={onCloseMock} />);

		// 2. Hace clic en el contenedor backdrop
		const backdrop = screen.getByRole("presentation");
		fireEvent.click(backdrop);

		// 3. Comprueba que se cierre el modal
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});

	it("no llama a onClose cuando se hace clic dentro del contenedor del modal", () => {
		// 1. Renderiza el modal
		const onCloseMock = vi.fn();
		render(<ModalImagen image={mockApodImage} onClose={onCloseMock} />);

		// 2. Hace clic en el contenido interior (h2 del título)
		const titleHeading = screen.getByRole("heading", {
			name: mockApodImage.title,
		});
		fireEvent.click(titleHeading);

		// 3. Comprueba que stopPropagation impida cerrar el modal
		expect(onCloseMock).not.toHaveBeenCalled();
	});
});
