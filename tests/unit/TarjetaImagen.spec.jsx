import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TarjetaImagen from "../../src/Pages/Galeria/TarjetaImagen";
import { mockApodImage } from "./helpers";

describe("TarjetaImagen (Unit Tests)", () => {
	it("renderiza la imagen y el título correctamente", () => {
		// 1. Renderiza la tarjeta
		render(
			<TarjetaImagen
				image={mockApodImage}
				liked={false}
				saved={false}
				onSelect={vi.fn()}
				onLike={vi.fn()}
				onSave={vi.fn()}
			/>,
		);

		// 2. Comprueba atributos de imagen y texto de título
		const img = screen.getByRole("img", { name: mockApodImage.title });
		expect(img).toHaveAttribute("src", mockApodImage.url);
		expect(screen.getByText(mockApodImage.title)).toBeInTheDocument();
	});

	it("llama a onSelect al hacer clic en la tarjeta", () => {
		// 1. Renderiza con mock de selección
		const onSelectMock = vi.fn();
		render(
			<TarjetaImagen
				image={mockApodImage}
				liked={false}
				saved={false}
				onSelect={onSelectMock}
				onLike={vi.fn()}
				onSave={vi.fn()}
			/>,
		);

		// 2. Hace clic en el contenedor accesible de la tarjeta
		const card = screen.getByRole("button", {
			name: new RegExp(mockApodImage.title),
		});
		fireEvent.click(card);

		// 3. Comprueba que se pase el objeto de la imagen
		expect(onSelectMock).toHaveBeenCalledWith(mockApodImage);
	});

	it("llama a onSelect al presionar la tecla Enter en la tarjeta", () => {
		// 1. Renderiza la tarjeta
		const onSelectMock = vi.fn();
		render(
			<TarjetaImagen
				image={mockApodImage}
				liked={false}
				saved={false}
				onSelect={onSelectMock}
				onLike={vi.fn()}
				onSave={vi.fn()}
			/>,
		);

		// 2. Presiona Enter sobre la tarjeta
		const card = screen.getByRole("button", {
			name: new RegExp(mockApodImage.title),
		});
		fireEvent.keyDown(card, { key: "Enter" });

		// 3. Comprueba selección accesible por teclado
		expect(onSelectMock).toHaveBeenCalledWith(mockApodImage);
	});

	it("dispara onLike al hacer clic en el botón de Me gusta sin activar onSelect", () => {
		// 1. Prepara mocks para like y selección
		const onLikeMock = vi.fn();
		const onSelectMock = vi.fn();

		render(
			<TarjetaImagen
				image={mockApodImage}
				liked={false}
				saved={false}
				onSelect={onSelectMock}
				onLike={onLikeMock}
				onSave={vi.fn()}
			/>,
		);

		// 2. Hace clic exclusivamente en el botón de like
		const likeButton = screen.getByRole("button", { name: "Me gusta" });
		fireEvent.click(likeButton);

		// 3. Comprueba que se active onLike y que stopPropagation prevenga onSelect
		expect(onLikeMock).toHaveBeenCalledWith(mockApodImage);
		expect(onSelectMock).not.toHaveBeenCalled();
	});

	it("dispara onSave al hacer clic en el botón de Guardar sin activar onSelect", () => {
		// 1. Prepara mocks para save y selección
		const onSaveMock = vi.fn();
		const onSelectMock = vi.fn();

		render(
			<TarjetaImagen
				image={mockApodImage}
				liked={false}
				saved={false}
				onSelect={onSelectMock}
				onLike={vi.fn()}
				onSave={onSaveMock}
			/>,
		);

		// 2. Hace clic en el botón de guardar
		const saveButton = screen.getByRole("button", { name: "Guardar" });
		fireEvent.click(saveButton);

		// 3. Comprueba ejecución de onSave sin propagación
		expect(onSaveMock).toHaveBeenCalledWith(mockApodImage);
		expect(onSelectMock).not.toHaveBeenCalled();
	});

	it("oculta los botones de Me gusta y Guardar cuando showActions es false", () => {
		// 1. Renderiza con showActions desactivado
		render(
			<TarjetaImagen
				image={mockApodImage}
				liked={false}
				saved={false}
				showActions={false}
				onSelect={vi.fn()}
				onLike={vi.fn()}
				onSave={vi.fn()}
			/>,
		);

		// 2. Comprueba ausencia de ambos botones en el DOM
		expect(
			screen.queryByRole("button", { name: "Me gusta" }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: "Guardar" }),
		).not.toBeInTheDocument();
	});
});
