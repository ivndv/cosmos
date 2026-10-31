import { ASSETS_BASE } from "../config/assets";

/**
 * Datos del Sistema Solar.
 * Cada cuerpo tiene un `id` estable; las lunas referencian a su planeta
 * mediante `padre`, que siempre apunta a un `id` existente.
 */
export const sistemaSolar = {
	estrellas: [
		{
			id: 1,
			slug: "sol",
			title: "Sol",
			tipo: "Enana Amarilla",
			masa: "1.989 × 10^30 kg",
			diametro: "1,391,000 km",
			distanciaDeLaTierra: "149.6 millones km",
			explanation: "El Sol es la estrella en el centro del Sistema Solar.",
			url: `${ASSETS_BASE}/sol.jpg`,
		},
	],
	planetas: [
		{
			id: 2,
			slug: "mercurio",
			title: "Mercurio",
			explanation:
				"Mercurio es el planeta más pequeño del Sistema Solar y el más cercano al Sol.",
			diametro: "4,880 km",
			distanciaDelSol: "57.91 millones km",
			periodoOrbital: "88 días",
			hayVida: false,
			url: `${ASSETS_BASE}/mercurio.jpg`,
		},
		{
			id: 3,
			slug: "venus",
			title: "Venus",
			explanation:
				"Venus es el segundo planeta desde el Sol y tiene una atmósfera densa.",
			diametro: "12,104 km",
			distanciaDelSol: "108.2 millones km",
			periodoOrbital: "225 días",
			hayVida: false,
			url: `${ASSETS_BASE}/venus.jpg`,
		},
		{
			id: 4,
			slug: "tierra",
			title: "Tierra",
			explanation:
				"La Tierra es el tercer planeta desde el Sol y el único que se conoce que soporta vida.",
			diametro: "12,742 km",
			distanciaDelSol: "149.6 millones km",
			periodoOrbital: "365.25 días",
			hayVida: true,
			url: `${ASSETS_BASE}/tierra.jpg`,
		},
		{
			id: 5,
			slug: "marte",
			title: "Marte",
			explanation:
				"Marte es el cuarto planeta desde el Sol y es conocido como el Planeta Rojo.",
			diametro: "6,779 km",
			distanciaDelSol: "227.9 millones km",
			periodoOrbital: "687 días",
			hayVida: false,
			url: `${ASSETS_BASE}/marte.jpg`,
		},
		{
			id: 6,
			slug: "jupiter",
			title: "Júpiter",
			explanation:
				"Júpiter es el planeta más grande del Sistema Solar y es un gigante gaseoso.",
			diametro: "139,820 km",
			distanciaDelSol: "778.5 millones km",
			periodoOrbital: "11.86 años",
			hayVida: false,
			url: `${ASSETS_BASE}/jupiter.jpg`,
		},
		{
			id: 7,
			slug: "saturno",
			title: "Saturno",
			explanation:
				"Saturno es conocido por sus impresionantes anillos y es un gigante gaseoso.",
			diametro: "116,460 km",
			distanciaDelSol: "1.434 mil millones km",
			periodoOrbital: "29.46 años",
			hayVida: false,
			url: `${ASSETS_BASE}/saturno.jpg`,
		},
		{
			id: 8,
			slug: "urano",
			title: "Urano",
			explanation:
				"Urano es un gigante helado y es conocido por su color azul y su inclinación axial.",
			diametro: "50,724 km",
			distanciaDelSol: "2.871 mil millones km",
			periodoOrbital: "84 años",
			hayVida: false,
			url: `${ASSETS_BASE}/urano.jpg`,
		},
		{
			id: 9,
			slug: "neptuno",
			title: "Neptuno",
			explanation:
				"Neptuno es el planeta más alejado del Sol y es conocido por sus fuertes vientos.",
			diametro: "49,244 km",
			distanciaDelSol: "4.495 mil millones km",
			periodoOrbital: "164.8 años",
			hayVida: false,
			url: `${ASSETS_BASE}/neptuno.jpg`,
		},
	],
	lunas: [
		{
			id: 10,
			slug: "luna",
			title: "Luna",
			padre: 4,
			diametro: "3,474.8 km",
			distanciaAlPlaneta: "384,400 km",
			explanation: "La Luna es el único satélite natural de la Tierra.",
			url: `${ASSETS_BASE}/luna.jpg`,
		},
		{
			id: 11,
			slug: "fobos",
			title: "Fobos",
			padre: 5,
			diametro: "22.4 km",
			distanciaAlPlaneta: "9,376 km",
			explanation:
				"Fobos es el más grande y cercano de los dos satélites naturales de Marte.",
			url: `${ASSETS_BASE}/fobos.jpg`,
		},
		{
			id: 12,
			slug: "deimos",
			title: "Deimos",
			padre: 5,
			diametro: "12.4 km",
			distanciaAlPlaneta: "23,463 km",
			explanation: "Deimos es el más pequeño de los satélites de Marte.",
			url: `${ASSETS_BASE}/deimos.jpg`,
		},
		{
			id: 13,
			slug: "europa",
			title: "Europa",
			padre: 6,
			diametro: "3,121.6 km",
			distanciaAlPlaneta: "671,034 km",
			explanation:
				"Europa es una de las lunas de Júpiter y puede tener un océano bajo su superficie.",
			url: `${ASSETS_BASE}/europa.jpg`,
		},
		{
			id: 14,
			slug: "titan",
			title: "Titán",
			padre: 7,
			diametro: "5,151.8 km",
			distanciaAlPlaneta: "1,221,870 km",
			explanation:
				"Titán es la luna más grande de Saturno y tiene una atmósfera densa.",
			url: `${ASSETS_BASE}/titan.jpg`,
		},
	],
	asteroides: [
		{
			id: 15,
			slug: "ceres",
			title: "Ceres",
			tipo: "C (carbonáceo)",
			diametro: "940 km",
			distanciaDelSol: "413.7 millones km",
			explanation:
				"Ceres es el asteroide más grande del cinturón de asteroides y se clasifica como un planeta enano.",
			url: `${ASSETS_BASE}/ceres.jpg`,
		},
		{
			id: 16,
			slug: "palas",
			title: "Palas",
			tipo: "B (carbonáceo)",
			diametro: "512 km",
			distanciaDelSol: "413.7 millones km",
			explanation:
				"Palas es el segundo asteroide más grande del cinturón de asteroides.",
			url: `${ASSETS_BASE}/palas.jpg`,
		},
	],
	cometas: [
		{
			id: 17,
			slug: "cometa-halley",
			title: "Cometa Halley",
			periodoOrbital: "76 años",
			diametroNucleo: "~11 km",
			ultimaAparicion: "1986",
			explanation:
				"El cometa Halley es un cometa de período corto que es visible desde la Tierra aproximadamente cada 76 años.",
			url: `${ASSETS_BASE}/cometa-halley.jpg`,
		},
		{
			id: 18,
			slug: "cometa-hale-bopp",
			title: "Cometa Hale-Bopp",
			periodoOrbital: "2,520 años",
			diametroNucleo: "~60 km",
			ultimaAparicion: "1997",
			explanation:
				"El cometa Hale-Bopp fue uno de los cometas más brillantes del siglo XX, visible a simple vista durante varios meses.",
			url: `${ASSETS_BASE}/cometa-hale-bopp.jpg`,
		},
	],
};
