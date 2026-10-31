import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ModalImagen from "@/Pages/Galeria/ModalImagen";
import { mockApodGallery, mockApodImage } from "./helpers";

const items = [mockApodImage, ...mockApodGallery.slice(0, 2)];

describe("ModalImagen (Unit Tests)", () => {
	it("no renderiza nada cuando index es null", () => {
		const { container } = render(
			<ModalImagen items={items} index={null} onClose={vi.fn()} />,
		);

		expect(container).toBeEmptyDOMElement();
	});

	it("renderiza el título y la descripción de la imagen activa", () => {
		render(<ModalImagen items={items} index={0} onClose={vi.fn()} />);

		expect(
			screen.getByRole("heading", { name: mockApodImage.title }),
		).toBeInTheDocument();
		expect(screen.getByText(mockApodImage.explanation)).toBeInTheDocument();
	});

	it("llama a onClose al hacer clic en el botón de cerrar", () => {
		const onCloseMock = vi.fn();
		render(<ModalImagen items={items} index={0} onClose={onCloseMock} />);

		fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));

		expect(onCloseMock).toHaveBeenCalled();
	});

	it("llama a onClose al presionar Escape", () => {
		const onCloseMock = vi.fn();
		render(<ModalImagen items={items} index={0} onClose={onCloseMock} />);

		fireEvent.keyDown(window, { key: "Escape" });

		expect(onCloseMock).toHaveBeenCalled();
	});

	it("navega a la imagen siguiente con la flecha derecha", () => {
		const onChangeMock = vi.fn();
		render(
			<ModalImagen
				items={items}
				index={0}
				onClose={vi.fn()}
				onChange={onChangeMock}
			/>,
		);

		fireEvent.keyDown(window, { key: "ArrowRight" });

		expect(onChangeMock).toHaveBeenCalledWith(1);
	});

	it("no navega hacia atrás desde la primera imagen", () => {
		const onChangeMock = vi.fn();
		render(
			<ModalImagen
				items={items}
				index={0}
				onClose={vi.fn()}
				onChange={onChangeMock}
			/>,
		);

		fireEvent.keyDown(window, { key: "ArrowLeft" });

		expect(onChangeMock).not.toHaveBeenCalled();
	});
});
