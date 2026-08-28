import { ASSETS_BASE } from "../config/assets";

export const sistemaSolar = {
	estrellas: [
		{
			title: "Sol",
			tipo: "Enana Amarilla",
			masa: "1.989 × 10^30 kg",
			diametro: "1,391,000 km",
			explanation: "El Sol es la estrella en el centro del Sistema Solar.",
			distanciaDeLaTierra: "149.6 millones km",
			url: `${ASSETS_BASE}/sol.jpg`,
		},
	],
	planetas: [
		{
			title: "Mercurio",
			explanation:
				"Mercurio es el planeta más pequeño del Sistema Solar y el más cercano al Sol.",
			diametro: "4,880 km",
			distanciaDelSol: "57.91 millones km",
			hayVida: false,
			url: `${ASSETS_BASE}/mercurio.jpg`,
		},
		{
			title: "Venus",
			explanation:
				"Venus es el segundo planeta desde el Sol y tiene una atmósfera densa.",
			diametro: "12,104 km",
			distanciaDelSol: "108.2 millones km",
			hayVida: false,
			url: `${ASSETS_BASE}/venus.jpg`,
		},
		{
			title: "Tierra",
			explanation:
				"La Tierra es el tercer planeta desde el Sol y el único que se conoce que soporta vida.",
			diametro: "12,742 km",
			distanciaDelSol: "149.6 millones km",
			hayVida: true,
			url: `${ASSETS_BASE}/tierra.jpg`,
		},
		{
			title: "Marte",
			explanation:
				"Marte es el cuarto planeta desde el Sol y es conocido como el Planeta Rojo.",
			diametro: "6,779 km",
			distanciaDelSol: "227.9 millones km",
			hayVida: false,
			url: `${ASSETS_BASE}/marte.jpg`,
		},
		{
			title: "Júpiter",
			explanation:
				"Júpiter es el planeta más grande del Sistema Solar y es un gigante gaseoso.",
			diametro: "139,820 km",
			distanciaDelSol: "778.5 millones km",
			hayVida: false,
			url: `${ASSETS_BASE}/jupiter.jpg`,
		},
		{
			title: "Saturno",
			explanation:
				"Saturno es conocido por sus impresionantes anillos y es un gigante gaseoso.",
			diametro: "116,460 km",
			distanciaDelSol: "1.434 mil millones km",
			hayVida: false,
			url: `${ASSETS_BASE}/saturno.jpg`,
		},
		{
			title: "Urano",
			explanation:
				"Urano es un gigante helado y es conocido por su color azul y su inclinación axial.",
			diametro: "50,724 km",
			distanciaDelSol: "2.871 mil millones km",
			hayVida: false,
			url: `${ASSETS_BASE}/urano.jpg`,
		},
		{
			title: "Neptuno",
			explanation:
				"Neptuno es el planeta más alejado del Sol y es conocido por sus fuertes vientos.",
			diametro: "49,244 km",
			distanciaDelSol: "4.495 mil millones km",
			hayVida: false,
			url: `${ASSETS_BASE}/neptuno.jpg`,
		},
	],
	lunas: [
		{
			title: "Luna",
			planeta: "Tierra",
			diametro: "3,474.8 km",
			explanation: "La Luna es el único satélite natural de la Tierra.",
			url: `${ASSETS_BASE}/luna.jpg`,
		},
		{
			title: "Fobos",
			planeta: "Marte",
			diametro: "22.4 km",
			explanation:
				"Fobos es el más grande y cercano de los dos satélites naturales de Marte.",
			url: `${ASSETS_BASE}/fobos.jpg`,
		},
		{
			title: "Deimos",
			planeta: "Marte",
			diametro: "12.4 km",
			explanation: "Deimos es el más pequeño de los satélites de Marte.",
			url: `${ASSETS_BASE}/deimos.jpg`,
		},
		{
			title: "Europa",
			planeta: "Júpiter",
			diametro: "3,121.6 km",
			explanation:
				"Europa es una de las lunas de Júpiter y puede tener un océano bajo su superficie.",
			url: `${ASSETS_BASE}/europa.jpg`,
		},
		{
			title: "Titán",
			planeta: "Saturno",
			diametro: "5,151.8 km",
			explanation:
				"Titán es la luna más grande de Saturno y tiene una atmósfera densa.",
			url: `${ASSETS_BASE}/titan.jpg`,
		},
	],
	asteroides: [
		{
			title: "Ceres",
			explanation:
				"Ceres es el asteroide más grande del cinturón de asteroides y se clasifica como un planeta enano.",
			diametro: "940 km",
			distanciaDelSol: "413.7 millones km",
			url: `${ASSETS_BASE}/ceres.jpg`,
		},
		{
			title: "Palas",
			explanation:
				"Palas es el segundo asteroide más grande del cinturón de asteroides.",
			diametro: "512 km",
			distanciaDelSol: "413.7 millones km",
			url: `${ASSETS_BASE}/palas.jpg`,
		},
	],
	cometas: [
		{
			title: "Cometa Halley",
			explanation:
				"El cometa Halley es un cometa de período corto que es visible desde la Tierra aproximadamente cada 76 años.",
			periodoOrbital: "76 años",
			url: `${ASSETS_BASE}/cometa-halley.jpg`,
		},
		{
			title: "Cometa Hale-Bopp",
			explanation:
				"El cometa Hale-Bopp fue uno de los cometas más brillantes del siglo XX, visible a simple vista durante varios meses.",
			periodoOrbital: "2,520 años",
			url: `${ASSETS_BASE}/cometa-hale-bopp.jpg`,
		},
	],
};
