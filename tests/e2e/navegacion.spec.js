import { expect, test } from "@playwright/test";

test.describe("Flujos de Navegación E2E", () => {
	test("navega correctamente entre todas las secciones principales mediante el Header", async ({
		page,
	}) => {
		// 1. Navega a la página de inicio
		await page.goto("/");
		const nav = page.locator("header nav");
		await expect(nav).toBeVisible();
		await expect(page).toHaveTitle(/Cosmos/i);

		// 2. Navega a la Galería Espacial
		await nav.getByRole("link", { name: "Galería" }).click();
		await expect(page).toHaveURL(/.*galer(%C3%AD|í)a-espacial/i);
		await expect(page.getByText("Algo salió mal")).not.toBeVisible();

		// 3. Navega a Noticias
		await nav.getByRole("link", { name: "Noticias" }).click();
		await expect(page).toHaveURL(/.*noticias/);
		await expect(
			page.getByRole("heading", { name: "Últimas Noticias" }),
		).toBeVisible();

		// 4. Navega al Sistema Solar
		await nav.getByRole("link", { name: "Sistema Solar" }).click();
		await expect(page).toHaveURL(/.*sistema-solar/);
		await expect(page.getByText("Algo salió mal")).not.toBeVisible();

		// 5. Regresa al Inicio haciendo clic en el logo
		await page
			.locator("header")
			.getByRole("link", { name: /cosmos/i })
			.first()
			.click();
		await expect(page).toHaveURL("/");
	});

	test("navega al detalle de una noticia por slug y regresa al listado", async ({
		page,
	}) => {
		// 1. Entra a la sección de noticias
		await page.goto("/noticias");

		// 2. Selecciona la primera noticia y hace clic en 'Ver más'
		const primerBotonVerMas = page
			.getByRole("button", { name: "Ver más" })
			.first();
		await expect(primerBotonVerMas).toBeVisible();
		await primerBotonVerMas.click();

		// 3. Verifica que la URL contenga el slug y se muestre el artículo completo
		await expect(page).toHaveURL(/\/noticias\/.+/);
		await expect(
			page.getByRole("button", { name: "← Volver a Noticias" }).first(),
		).toBeVisible();
		await expect(page.getByText("Algo salió mal")).not.toBeVisible();

		// 4. Hace clic en volver a Noticias
		await page
			.getByRole("button", { name: "← Volver a Noticias" })
			.first()
			.click();
		await expect(page).toHaveURL(/.*noticias/);
	});

	test("muestra la página 404 NoEncontrado y permite regresar al inicio", async ({
		page,
	}) => {
		// 1. Navega a una ruta que no existe
		await page.goto("/pagina-extraterrestre-no-existe");

		// 2. Comprueba mensaje de 404
		await expect(
			page.getByRole("heading", { name: /404|no encontrad/i }),
		).toBeVisible();

		// 3. Hace clic en el botón para volver al Inicio si está disponible
		const botonInicio = page
			.getByRole("link", { name: /inicio|volver/i })
			.first();
		if (await botonInicio.isVisible()) {
			await botonInicio.click();
			await expect(page).toHaveURL("/");
		}
	});
});
