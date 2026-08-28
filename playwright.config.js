import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración de Playwright para la suite de pruebas End-to-End (E2E) de Cosmos
 * Ejecuta los tests interactivos sobre la build de producción servida localmente con Cloudflare Pages.
 */
export default defineConfig({
	// Directorio raíz donde residen los archivos de pruebas E2E
	testDir: "./tests/e2e",

	// Tiempo máximo por test individual (45 segundos para tolerar latencia de red)
	timeout: 45_000,

	// Tiempo de espera para aserciones de expect
	expect: { timeout: 10_000 },

	// Ejecución secuencial para evitar condiciones de carrera en el servidor local de Pages
	fullyParallel: false,
	workers: 1,

	// Sin reintentos en local para depuración rápida de fallos
	retries: 0,

	// Formato de reporte en terminal
	reporter: [["list"]],

	// Opciones compartidas para todos los navegadores y tests
	use: {
		// URL base del servidor local de Cloudflare Pages
		baseURL: "http://localhost:4321",

		// Guarda trazas de ejecución solo si la prueba falla (para depuración en CI)
		trace: "retain-on-failure",

		// Captura de pantalla automática al detectar un fallo
		screenshot: "only-on-failure",
	},

	// Proyectos de navegadores a ejecutar
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],

	// Servidor web integrado: compila y levanta Cloudflare Pages localmente con Wrangler
	webServer: {
		command: "bunx wrangler pages dev dist/ --port 4321 --ip localhost",
		url: "http://localhost:4321",
		timeout: 60_000,
		// Reutiliza el servidor si ya está corriendo en desarrollo local, pero no en CI
		reuseExistingServer: !process.env.CI,
	},
});
