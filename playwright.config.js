import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	timeout: 45_000,
	expect: { timeout: 10_000 },
	fullyParallel: false,
	workers: 1,
	retries: 0,
	reporter: [["list"]],
	use: {
		baseURL: "http://localhost:4321",
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
		command: "bunx wrangler pages dev dist/ --port 4321 --ip localhost",
		url: "http://localhost:4321",
		timeout: 60_000,
		reuseExistingServer: !process.env.CI,
	},
});
