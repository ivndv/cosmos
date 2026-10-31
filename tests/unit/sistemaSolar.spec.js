import { describe, expect, it } from "vitest";
import { sistemaSolar } from "@/data/sistemaSolar";

// Campos obligatorios por categoría
const REQUERIDOS = {
	estrellas: ["tipo", "masa", "diametro", "distanciaDeLaTierra"],
	planetas: ["diametro", "distanciaDelSol", "periodoOrbital", "hayVida"],
	lunas: ["padre", "diametro", "distanciaAlPlaneta"],
	asteroides: ["tipo", "diametro", "distanciaDelSol"],
	cometas: ["periodoOrbital", "diametroNucleo", "ultimaAparicion"],
};

const todosLosCuerpos = Object.values(sistemaSolar).flat();

describe("datos del sistema solar", () => {
	it("todos los cuerpos tienen id numérico, slug, título, descripción e imagen", () => {
		for (const cuerpo of todosLosCuerpos) {
			expect(typeof cuerpo.id, `${cuerpo.title} sin id numérico`).toBe(
				"number",
			);
			expect(cuerpo.slug, `${cuerpo.id} sin slug`).toBeTruthy();
			expect(cuerpo.title, `${cuerpo.id} sin título`).toBeTruthy();
			expect(cuerpo.explanation, `${cuerpo.id} sin descripción`).toBeTruthy();
			expect(cuerpo.url, `${cuerpo.id} sin imagen`).toContain("http");
		}
	});

	it("los ids y los slugs son únicos", () => {
		const ids = todosLosCuerpos.map((c) => c.id);
		const slugs = todosLosCuerpos.map((c) => c.slug);

		expect(new Set(ids).size).toBe(ids.length);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it("cada categoría tiene todos sus campos obligatorios", () => {
		for (const [categoria, campos] of Object.entries(REQUERIDOS)) {
			for (const cuerpo of sistemaSolar[categoria] ?? []) {
				for (const campo of campos) {
					expect(
						cuerpo[campo],
						`${cuerpo.title} (${categoria}) sin "${campo}"`,
					).toBeDefined();
				}
			}
		}
	});

	it("el padre de cada luna existe y es un planeta", () => {
		const planetas = new Set(sistemaSolar.planetas.map((p) => p.id));

		for (const luna of sistemaSolar.lunas) {
			expect(
				planetas.has(luna.padre),
				`${luna.title} apunta a un padre inexistente (${luna.padre})`,
			).toBe(true);
		}
	});
});
