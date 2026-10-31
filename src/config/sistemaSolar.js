/**
 * Esquema de las fichas del Sistema Solar.
 * Define, para cada categoría, qué campos se muestran, en qué orden y con qué
 * etiqueta. DetalleCuerpo no adivina: recorre esta lista.
 */
export const ESQUEMA = {
	estrellas: {
		etiqueta: "Estrella",
		campos: [
			{ clave: "tipo", etiqueta: "Tipo" },
			{ clave: "masa", etiqueta: "Masa" },
			{ clave: "diametro", etiqueta: "Diámetro" },
			{
				clave: "distanciaDeLaTierra",
				etiqueta: "Distancia a la Tierra",
			},
		],
	},
	planetas: {
		etiqueta: "Planeta",
		campos: [
			{ clave: "diametro", etiqueta: "Diámetro" },
			{ clave: "distanciaDelSol", etiqueta: "Distancia al Sol" },
			{ clave: "periodoOrbital", etiqueta: "Periodo orbital" },
			{ clave: "hayVida", etiqueta: "¿Vida?", tipo: "booleano" },
		],
	},
	lunas: {
		etiqueta: "Luna",
		campos: [
			{ clave: "diametro", etiqueta: "Diámetro" },
			{ clave: "distanciaAlPlaneta", etiqueta: "Distancia al planeta" },
		],
	},
	asteroides: {
		etiqueta: "Asteroide",
		campos: [
			{ clave: "tipo", etiqueta: "Tipo" },
			{ clave: "diametro", etiqueta: "Diámetro" },
			{ clave: "distanciaDelSol", etiqueta: "Distancia al Sol" },
		],
	},
	cometas: {
		etiqueta: "Cometa",
		campos: [
			{ clave: "periodoOrbital", etiqueta: "Periodo orbital" },
			{ clave: "diametroNucleo", etiqueta: "Diámetro del núcleo" },
			{ clave: "ultimaAparicion", etiqueta: "Última aparición" },
		],
	},
};

/**
 * Devuelve los campos con valor para un cuerpo concreto
 * @param {string} categoria
 * @param {object} cuerpo
 */
export function camposVisibles(categoria, cuerpo) {
	const esquema = ESQUEMA[categoria];
	if (!esquema || !cuerpo) return [];

	return esquema.campos
		.filter(
			({ clave }) => cuerpo[clave] !== undefined && cuerpo[clave] !== null,
		)
		.map((campo) => ({
			etiqueta: campo.etiqueta,
			valor:
				campo.tipo === "booleano"
					? cuerpo[campo.clave]
						? "Sí"
						: "No"
					: String(cuerpo[campo.clave]),
		}));
}
