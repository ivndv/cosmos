import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/test/setup.js",
		include: [
			"src/**/*.{test,spec}.{js,jsx}",
			"tests/unit/**/*.{test,spec}.{js,jsx}",
		],
		exclude: ["tests/e2e/**", "tests/smoke/**", "node_modules/**"],
	},
});
