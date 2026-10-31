import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TarjetaImagen from "@/Pages/Galeria/TarjetaImagen";
import { mockApodImage } from "./helpers";

describe("TarjetaImagen (Unit Tests)", () => {
	it("renderiza la imagen con su texto alternativo", () => {
		render(<TarjetaImagen image={mockApodImage} onSelect={vi.fn()} />);

		const img = screen.getByRole("img", { name: mockApodImage.title });
		expect(img).toHaveAttribute("src", mockApodImage.url);
	});

	it("llama a onSelect al hacer clic en la imagen", () => {
		const onSelectMock = vi.fn();
		render(<TarjetaImagen image={mockApodImage} onSelect={onSelectMock} />);

		fireEvent.click(
			screen.getByRole("button", { name: new RegExp(mockApodImage.title) }),
		);

		expect(onSelectMock).toHaveBeenCalledWith(mockApodImage);
	});

	it("expone un nombre accesible con el título de la imagen", () => {
		render(<TarjetaImagen image={mockApodImage} onSelect={vi.fn()} />);

		expect(
			screen.getByRole("button", { name: `Ver ${mockApodImage.title}` }),
		).toBeInTheDocument();
	});
});
