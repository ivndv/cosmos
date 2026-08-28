import { expect, test } from "@playwright/test";

const mockApodItems = [
	{
		date: "2026-08-28",
		title: "Galaxia Andrómeda en Alta Resolución",
		explanation:
			"Una vista detallada de la galaxia vecina capturada por telescopio espacial.",
		url: "https://apod.nasa.gov/apod/image/2608/andromeda.jpg",
		media_type: "image",
	},
	{
		date: "2026-08-27",
		title: "Nebulosa Carina",
		explanation: "Pilares gigantes de gas y polvo en formación estelar.",
		url: "https://apod.nasa.gov/apod/image/2608/carina.jpg",
		media_type: "image",
	},
];

test.describe("Galería Espacial E2E", () => {
	test.beforeEach(async ({ page }) => {
		// 1. Intercepta la llamada a la API de NASA con datos fixture controlados
		await page.route("**/api/nasa*", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify(mockApodItems),
			});
		});
	});

	test("carga las tarjetas de imágenes en la galería y permite abrir/cerrar el modal", async ({
		page,
	}) => {
		// 1. Navega a la galería espacial
		await page.goto("/galería-espacial");
		await expect(
			page.getByRole("heading", { name: "Galería Espacial" }),
		).toBeVisible();

		// 2. Comprueba que las tarjetas de imagen estén visibles
		const primeraTarjeta = page
			.locator('div[role="button"]')
			.filter({ hasText: mockApodItems[0].title })
			.first();
		await expect(primeraTarjeta).toBeVisible();

		// 3. Hace clic en la tarjeta para abrir el modal explicativo
		await primeraTarjeta.click();

		// 4. Comprueba que el modal muestre la descripción completa y botón cerrar
		await expect(
			page.getByRole("heading", { name: mockApodItems[0].title, level: 2 }),
		).toBeVisible();
		await expect(page.getByText(mockApodItems[0].explanation)).toBeVisible();

		// 5. Cierra el modal con el botón de cerrar
		await page.getByRole("button", { name: "Cerrar" }).click();
		await expect(
			page.getByRole("button", { name: "Cerrar" }),
		).not.toBeVisible();
	});

	test("cierra el modal al presionar la tecla Escape", async ({ page }) => {
		// 1. Navega y abre el modal
		await page.goto("/galería-espacial");
		const primeraTarjeta = page
			.locator('div[role="button"]')
			.filter({ hasText: mockApodItems[0].title })
			.first();
		await primeraTarjeta.click();
		await expect(page.getByRole("button", { name: "Cerrar" })).toBeVisible();

		// 2. Presiona Escape
		await page.keyboard.press("Escape");

		// 3. Comprueba que el modal se haya cerrado
		await expect(
			page.getByRole("button", { name: "Cerrar" }),
		).not.toBeVisible();
	});

	test("permite dar like y guardar una imagen actualizando la sección de Guardadas", async ({
		page,
	}) => {
		// 1. Navega a la galería
		await page.goto("/galería-espacial");

		// 2. Hace clic en el botón de Me gusta
		const botonLike = page.locator('button[aria-label="Me gusta"]').first();
		await expect(botonLike).toBeVisible();
		await botonLike.click();

		// 3. Hace clic en el botón de Guardar
		const botonGuardar = page.locator('button[aria-label="Guardar"]').first();
		await expect(botonGuardar).toBeVisible();
		await botonGuardar.click();

		// 4. Comprueba que la sección 'Guardadas' ahora contenga la tarjeta guardada
		const seccionGuardadas = page.getByRole("region", { name: "Guardadas" });
		await expect(
			seccionGuardadas
				.locator('div[role="button"]')
				.filter({ hasText: mockApodItems[0].title }),
		).toBeVisible();
	});
});
