import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración de Playwright para Smoke Tests rápidos de Cosmos
 * Verifica la disponibilidad del servidor, estado HTTP 200, ausencia de ErrorBoundary
 * y funcionalidad básica de los endpoints de producción.
 */
export default defineConfig({
	// Directorio raíz de las pruebas de tipo Smoke
	testDir: "./tests/smoke",

	// Tiempo máximo por test (45 segundos)
	timeout: 45_000,

	// Tiempo de espera para aserciones
	expect: { timeout: 10_000 },

	// Ejecución secuencial controlada
	fullyParallel: false,
	workers: 1,
	retries: 0,

	// Reporter para visualización limpia en terminal
	reporter: [["list"]],

	// Opciones compartidas de navegación y depuración
	use: {
		baseURL: "http://localhost:4321",
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},

	// Proyecto exclusivo para pruebas de humo
	projects: [
		{
			name: "smoke",
			testMatch: /smoke\.spec\.js/,
			use: { ...devices["Desktop Chrome"] },
		},
	],

	// Servidor web local de Cloudflare Pages sobre la carpeta dist/ compilada
	webServer: {
		command: "bunx wrangler pages dev dist/ --port 4321 --ip localhost",
		url: "http://localhost:4321",
		timeout: 60_000,
		// Siempre arranca una instancia limpia para aislar los smoke tests
		reuseExistingServer: false,
	},
});
