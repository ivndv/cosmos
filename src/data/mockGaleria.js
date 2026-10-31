import { ASSETS_BASE } from "../config/assets";

/**
 * Imágenes de ejemplo servidas desde R2 para desarrollo local.
 * Usan el mismo contrato que el endpoint `images` para no tocar componentes.
 * Activar con VITE_USE_MOCKS=true en .env
 */

// Entradas con descripción propia
const DESTACADAS = [
	{
		id: "agujero-negro",
		file: "agujero-negro.png",
		title: "Agujero negro",
		description:
			"Región del espacio donde la gravedad es tan intensa que ni la luz puede escapar.",
	},
	{
		id: "pulsar",
		file: "pulsar.png",
		title: "Púlsar",
		description:
			"Estrella de neutrones que gira rápidamente y emite haces de radiación.",
	},
	{
		id: "marte",
		file: "marte.jpg",
		title: "Marte",
		description:
			"El planeta rojo, cuarto del sistema solar y objetivo de las próximas misiones tripuladas.",
	},
	{
		id: "jupiter",
		file: "jupiter.jpg",
		title: "Júpiter",
		description:
			"El gigante gaseoso más grande del sistema solar, con su gran mancha roja.",
	},
	{
		id: "saturno",
		file: "saturno.jpg",
		title: "Saturno",
		description:
			"El planeta de los anillos, compuestos principalmente de hielo y roca.",
	},
	{
		id: "europa",
		file: "europa.jpg",
		title: "Europa",
		description:
			"Luna de Júpiter con un océano de agua líquida bajo su corteza helada.",
	},
	{
		id: "luna",
		file: "luna.jpg",
		title: "La Luna",
		description:
			"El único satélite natural de la Tierra y el primer destino de la exploración humana.",
	},
	{
		id: "sol",
		file: "sol.jpg",
		title: "El Sol",
		description:
			"Estrella central del sistema solar; su energía hace posible la vida en la Tierra.",
	},
	{
		id: "tierra",
		file: "tierra.jpg",
		title: "La Tierra",
		description:
			"Nuestro hogar: el único planeta conocido con vida, visto desde el espacio.",
	},
	{
		id: "cometa-halley",
		file: "cometa-halley.jpg",
		title: "Cometa Halley",
		description:
			"El cometa periódico más famoso, visible desde la Tierra cada 76 años.",
	},
	{
		id: "exoplanetas",
		file: "exoplanetas.jpg",
		title: "Exoplanetas",
		description:
			"Planetas que orbitan estrellas fuera del sistema solar, algunos en zona habitable.",
	},
	{
		id: "telescopio-espacial",
		file: "telescopio-espacial.png",
		title: "Telescopio espacial",
		description:
			"Observatorios en órbita que capturan imágenes imposibles desde la superficie.",
	},
];

// Resto de archivos del bucket (título derivado del nombre)
const ADICIONALES = [
	"mercurio.jpg",
	"venus.jpg",
	"urano.jpg",
	"neptuno.jpg",
	"ceres.jpg",
	"palas.jpg",
	"fobos.jpg",
	"deimos.jpg",
	"titan.jpg",
	"europa.png",
	"astrobiología.png",
	"busqueda-vida-extraterrestre.jpg",
	"cometa-hale-bopp.jpg",
	"hale-bopp.jpg",
	"lluvias-de-meteoros.png",
	"olas-gravitacionales.png",
	"exploración-en-marte.png",
	"innovaciones-en-satélites.png",
	"La-misión-artemis-I.png",
];

// Deriva un título legible a partir del nombre del archivo
function tituloDesdeArchivo(file) {
	const base = file.replace(/\.[^.]+$/, "").replace(/-/g, " ");
	return base.charAt(0).toUpperCase() + base.slice(1);
}

const ADICIONALES_NORMALIZADAS = ADICIONALES.map((file) => ({
	// El id incluye la extensión para no colisionar con las destacadas
	id: file
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, ""),
	file,
	title: tituloDesdeArchivo(file),
	description: `Imagen astronómica de ${tituloDesdeArchivo(file).toLowerCase()} del archivo de la NASA.`,
}));

const MOCK_ITEMS = [...DESTACADAS, ...ADICIONALES_NORMALIZADAS];

export const mockGaleria = MOCK_ITEMS.map(
	({ id, file, title, description }) => ({
		// Clave estable: la usan likes/saves como identificador
		date: id,
		nasa_id: id,
		title,
		explanation: description,
		url: `${ASSETS_BASE}/${encodeURI(file)}`,
		hdurl: `${ASSETS_BASE}/${encodeURI(file)}`,
		media_type: "image",
		center: "NASA",
		date_created: null,
	}),
);

// Imagen usada como "imagen del día" cuando los mocks están activos.
// Rota aleatoriamente en cada carga para variar el hero en desarrollo.
export const mockDailyImage =
	mockGaleria[Math.floor(Math.random() * mockGaleria.length)];
