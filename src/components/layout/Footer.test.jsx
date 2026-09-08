import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
	it("renders Footer component", () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>,
		);

		expect(screen.getByText(/explora el universo/i)).toBeInTheDocument();
		expect(screen.getByText(/Ivan Cruz/i)).toBeInTheDocument();
	});

	it("displays NASA API credit", () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>,
		);

		expect(screen.getByText("NASA API")).toBeInTheDocument();
	});
});
