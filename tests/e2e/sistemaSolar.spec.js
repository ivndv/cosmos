import { expect, test } from "@playwright/test";

test.describe("Sistema Solar E2E", () => {
	test("permite explorar cuerpos celestes cambiando entre categorías y navegando el carrusel", async ({
		page,
	}) => {
		// 1. Navega a la vista del Sistema Solar
		await page.goto("/sistema-solar");
		await expect(
			page.getByRole("heading", { name: "Sistema solar" }),
		).toBeVisible();

		// 2. Cambia a la categoría 'planetas' mediante el navbar
		const botonPlanetas = page.getByRole("button", {
			name: "planetas",
			exact: true,
		});
		await expect(botonPlanetas).toBeVisible();
		await botonPlanetas.click();

		// 3. Comprueba que el carrusel muestre el primer planeta (Mercurio)
		await expect(
			page.getByRole("heading", { name: "Mercurio", level: 3 }),
		).toBeVisible();

		// 4. Navega al siguiente cuerpo celeste (Venus) mediante el botón 'Siguiente'
		const botonSiguiente = page.getByRole("button", { name: "Siguiente" });
		await botonSiguiente.click();
		await expect(
			page.getByRole("heading", { name: "Venus", level: 3 }),
		).toBeVisible();

		// 5. Navega al siguiente cuerpo celeste (Tierra)
		await botonSiguiente.click();
		await expect(
			page.getByRole("heading", { name: "Tierra", level: 3 }),
		).toBeVisible();

		// 6. Retrocede al planeta anterior (Venus) mediante el botón 'Anterior'
		const botonAnterior = page.getByRole("button", { name: "Anterior" });
		await botonAnterior.click();
		await expect(
			page.getByRole("heading", { name: "Venus", level: 3 }),
		).toBeVisible();

		// 7. Cambia a la categoría 'lunas' y verifica actualización
		await page.getByRole("button", { name: "lunas", exact: true }).click();
		await expect(
			page.getByRole("heading", { name: "Luna", level: 3 }),
		).toBeVisible();
	});
});
