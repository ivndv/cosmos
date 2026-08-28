import { expect, test } from "@playwright/test";

test.describe("Smoke Tests (Producción / Dist)", () => {
	test("la página de inicio carga exitosamente con HTTP 200 y layout principal", async ({
		page,
	}) => {
		// 1. Navega a la raíz de la aplicación
		const response = await page.goto("/");

		// 2. Comprueba código de respuesta HTTP 200
		expect(response?.status()).toBe(200);

		// 3. Comprueba el título del documento
		await expect(page).toHaveTitle(/Cosmos/i);

		// 4. Comprueba que el Header de navegación y el Footer estén visibles
		await expect(page.locator("header nav")).toBeVisible();
		await expect(page.getByRole("contentinfo")).toBeVisible();

		// 5. Comprueba que NO se haya disparado la pantalla de LimiteErrores
		await expect(page.getByText("Algo salió mal")).not.toBeVisible();
	});

	test("las rutas principales responden correctamente y renderizan su contenido", async ({
		page,
	}) => {
		// 1. Navega a la galería espacial
		await page.goto("/galería-espacial");
		await expect(page.locator("header nav")).toBeVisible();
		await expect(page.getByText("Algo salió mal")).not.toBeVisible();

		// 2. Navega a la sección de noticias
		await page.goto("/noticias");
		await expect(page.locator("header nav")).toBeVisible();
		await expect(page.getByText("Algo salió mal")).not.toBeVisible();

		// 3. Navega al sistema solar
		await page.goto("/sistema-solar");
		await expect(page.locator("header nav")).toBeVisible();
		await expect(page.getByText("Algo salió mal")).not.toBeVisible();
	});

	test("la ruta inexistente renderiza la página 404 NoEncontrado de forma controlada", async ({
		page,
	}) => {
		// 1. Navega a una ruta aleatoria inexistente
		await page.goto("/ruta-inexistente-cosmos-404");

		// 2. Comprueba que se renderice el mensaje de página no encontrada
		await expect(
			page.getByRole("heading", { name: /404|no encontrad/i }),
		).toBeVisible();
		await expect(page.getByText("Algo salió mal")).not.toBeVisible();
	});

	test("el proxy de API /api/nasa responde con formato JSON válido", async ({
		request,
	}) => {
		// 1. Consulta directamente el endpoint del proxy Hono
		const response = await request.get("/api/nasa?endpoint=apod");

		// 2. Comprueba que el proxy responda con un código HTTP controlado
		expect([200, 400, 403, 429, 502]).toContain(response.status());

		// 3. Comprueba que retorne encabezado Content-Type de JSON
		const contentType = response.headers()["content-type"] || "";
		expect(contentType).toContain("application/json");
	});
});
