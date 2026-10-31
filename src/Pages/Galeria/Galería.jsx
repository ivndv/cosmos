// React

// Iconos
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";
// React Router
import { useSearchParams } from "react-router-dom";
import EncabezadoSeccion from "@/components/ui/EncabezadoSeccion";
// Componentes
import Paginacion from "@/components/ui/Paginacion";
// Hooks
import { MAX_PAGINAS, PAGE_SIZE, useGalleryImages } from "@/hooks/useNasa";
import ModalImagen from "./ModalImagen";
import TarjetaImagen from "./TarjetaImagen";

// Claves estables para los esqueletos de carga
const ESQUELETOS = [1, 2, 3, 4, 5, 6, 7, 8];

// Atajos de búsqueda (el catálogo de NASA está indexado en inglés)
const CHIPS = [
	{ label: "Todos los temas", q: "" },
	{ label: "Nebulosas", q: "nebula" },
	{ label: "Marte", q: "mars" },
	{ label: "Webb", q: "webb" },
	{ label: "Hubble", q: "hubble" },
	{ label: "Tierra", q: "earth" },
];

const CENTROS = [
	"JPL",
	"GSFC",
	"KSC",
	"MSFC",
	"JSC",
	"ARC",
	"GRC",
	"LRC",
	"SSC",
	"HQ",
];

const ANIOS = [2026, 2020, 2015, 2010, 2000, 1990];

// Clases compartidas por los selects (mismo estilo que Noticias)
const SELECT_CLASES =
	"w-full py-2.5 pr-9 pl-4 border border-bg-secondary rounded-sm text-sm font-inherit bg-bg-surface text-bg-secondary cursor-pointer outline-none appearance-none transition-[border-color,box-shadow] duration-200 focus:border-bg-primary focus:shadow-[0_0_0_3px_rgba(26,26,46,0.15)] [&>option]:bg-bg-surface [&>option]:text-bg-secondary [&>option]:px-3.5 [&>option]:py-1.5 [&>option:checked]:bg-bg-surface-alt";

// Esqueleto de tarjeta mientras carga
function TarjetaEsqueleto() {
	return (
		<div className="overflow-hidden rounded-lg bg-[#f4f4f8]">
			<div className="aspect-[4/3] bg-gradient-to-r from-[#eeeeF4] via-[#f7f7fb] to-[#eeeeF4] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
		</div>
	);
}

const Galeria = () => {
	// La URL es la fuente de verdad: ?q=mars&center=JPL&year=2020&page=2
	const [searchParams, setSearchParams] = useSearchParams();
	// Se sanea lo que venga en la URL antes de usarlo
	const busquedaUrl = (searchParams.get("q") ?? "").slice(0, 100);

	const centroParam = searchParams.get("center") ?? "";
	const centro = CENTROS.includes(centroParam) ? centroParam : "";

	const anioParam = searchParams.get("year") ?? "";
	const anioDesde = ANIOS.includes(Number(anioParam)) ? anioParam : "";

	const pageParam = Number.parseInt(searchParams.get("page") ?? "1", 10);
	const page = Math.min(
		Math.max(1, Number.isNaN(pageParam) ? 1 : pageParam),
		MAX_PAGINAS,
	);

	const [busqueda, setBusqueda] = useState(busquedaUrl);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const gridRef = useRef(null);

	// Actualiza la URL omitiendo valores por defecto (estable entre renders)
	const actualizar = useCallback(
		(cambios) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					for (const [clave, valor] of Object.entries(cambios)) {
						const vacio =
							valor === "" || valor === null || valor === 0 || valor === 1;
						if (vacio) next.delete(clave);
						else next.set(clave, String(valor));
					}
					return next;
				},
				{ replace: true },
			);
		},
		[setSearchParams],
	);

	// Debounce del texto → URL
	useEffect(() => {
		const timer = setTimeout(() => {
			const limpio = busqueda.trim();
			if (limpio !== busquedaUrl) actualizar({ q: limpio, page: 1 });
		}, 400);
		return () => clearTimeout(timer);
	}, [busqueda, busquedaUrl, actualizar]);

	// Sincroniza el input si la URL cambia (atrás/adelante)
	useEffect(() => {
		setBusqueda(busquedaUrl);
	}, [busquedaUrl]);

	// Normaliza la URL si traía valores inválidos o fuera de rango
	useEffect(() => {
		const limpio = new URLSearchParams();
		if (busquedaUrl) limpio.set("q", busquedaUrl);
		if (centro) limpio.set("center", centro);
		if (anioDesde) limpio.set("year", anioDesde);
		if (page > 1) limpio.set("page", String(page));

		if (limpio.toString() !== searchParams.toString()) {
			setSearchParams(limpio, { replace: true });
		}
	}, [busquedaUrl, centro, anioDesde, page, searchParams, setSearchParams]);

	const gallery = useGalleryImages({
		page,
		q: busquedaUrl,
		center: centro,
		yearStart: anioDesde ? Number(anioDesde) : 0,
	});

	const imagenes = gallery.data?.images ?? [];
	const totalHits = gallery.data?.totalHits ?? 0;
	const totalPages = Math.min(
		Math.max(1, Math.ceil(totalHits / PAGE_SIZE)),
		MAX_PAGINAS,
	);
	const limitado = Boolean(gallery.data?.limitado);
	const cargando = gallery.isLoading;
	const actualizando = gallery.isFetching && !gallery.isLoading;
	const hayFiltros = Boolean(busquedaUrl || centro || anioDesde);

	const aplicarChip = (valor) => {
		setBusqueda(valor);
		actualizar({ q: valor, page: 1 });
	};

	const limpiarFiltros = () => {
		setBusqueda("");
		setSearchParams({}, { replace: true });
	};

	const cambiarPagina = (nueva) => {
		if (nueva < 1 || nueva > totalPages || nueva === page) return;
		actualizar({ page: nueva });
		setSelectedIndex(null);
		gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 pt-[100px] pb-20">
			<ModalImagen
				items={imagenes}
				index={selectedIndex}
				onClose={() => setSelectedIndex(null)}
				onChange={setSelectedIndex}
			/>

			<EncabezadoSeccion
				eyebrow="Multimedia"
				titulo="Galería Espacial"
				descripcion="Imágenes reales del universo capturadas por la NASA. Filtra por tema, centro de investigación o año."
			/>

			{/* Filtros */}
			<div className="flex flex-col gap-3 animate-reveal">
				<div className="flex flex-wrap items-center gap-3">
					{/* Buscador */}
					<div className="relative flex flex-[2_1_260px] items-center">
						<Icon
							icon="lucide:search"
							width="16"
							className="pointer-events-none absolute left-3 text-text-muted"
						/>
						<input
							type="search"
							value={busqueda}
							onChange={(e) => setBusqueda(e.target.value)}
							placeholder="Buscar: nebulosa, Marte, Webb..."
							aria-label="Buscar imágenes"
							className="w-full rounded-sm border border-bg-secondary bg-bg-surface px-9 py-2.5 text-sm text-bg-secondary outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted focus:border-bg-primary focus:shadow-[0_0_0_3px_rgba(26,26,46,0.15)] [&::-webkit-search-cancel-button]:hidden"
						/>
						{busqueda && (
							<button
								type="button"
								onClick={() => setBusqueda("")}
								aria-label="Limpiar búsqueda"
								className="absolute right-2 flex cursor-pointer items-center border-none bg-none p-1 text-bg-secondary hover:text-bg-primary"
							>
								<Icon icon="lucide:x" width="16" />
							</button>
						)}
					</div>

					{/* Centro */}
					<div className="relative flex max-w-[240px] flex-[1_1_180px] items-center">
						<select
							value={centro}
							onChange={(e) => actualizar({ center: e.target.value, page: 1 })}
							aria-label="Centro de NASA"
							className={SELECT_CLASES}
						>
							<option value="">Todos los centros</option>
							{CENTROS.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
						<Icon
							icon="lucide:chevron-down"
							width="16"
							className="pointer-events-none absolute right-3 text-[#000]"
						/>
					</div>

					{/* Año */}
					<div className="relative flex max-w-[240px] flex-[1_1_180px] items-center">
						<select
							value={anioDesde}
							onChange={(e) => actualizar({ year: e.target.value, page: 1 })}
							aria-label="Año desde"
							className={SELECT_CLASES}
						>
							<option value="">Cualquier año</option>
							{ANIOS.map((a) => (
								<option key={a} value={a}>
									Desde {a}
								</option>
							))}
						</select>
						<Icon
							icon="lucide:chevron-down"
							width="16"
							className="pointer-events-none absolute right-3 text-[#000]"
						/>
					</div>

					{hayFiltros && (
						<button
							type="button"
							onClick={limpiarFiltros}
							aria-label="Limpiar filtros"
							className="flex cursor-pointer items-center border-none bg-none p-1 text-bg-secondary transition-colors duration-200 hover:text-bg-primary"
						>
							<Icon icon="lucide:x-circle" width="18" />
						</button>
					)}

					{!cargando && (
						<span className="text-[12px] text-text-muted">
							{totalHits.toLocaleString("es-MX")} imágenes
						</span>
					)}
				</div>

				{limitado && (
					<p className="m-0 text-[12px] text-text-muted">
						NASA limita la búsqueda a 10 000 resultados. Refina los filtros (por
						año o centro) para llegar a más imágenes.
					</p>
				)}

				{/* Chips de temas */}
				<div className="flex flex-wrap gap-1.5">
					{CHIPS.map((chip) => (
						<button
							key={chip.label}
							type="button"
							onClick={() => aplicarChip(chip.q)}
							aria-pressed={busquedaUrl === chip.q}
							className={`cursor-pointer rounded-md border-none px-2.5 py-1 text-xs transition-[background,color] duration-200 hover:bg-bg-secondary hover:text-text-primary ${
								busquedaUrl === chip.q
									? "bg-bg-secondary text-text-primary"
									: "bg-bg-surface-alt text-text-on-surface"
							}`}
						>
							{chip.label}
						</button>
					))}
				</div>
			</div>

			{/* Contenido */}
			<div ref={gridRef} className="scroll-mt-24">
				{cargando ? (
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
						{ESQUELETOS.map((id) => (
							<TarjetaEsqueleto key={id} />
						))}
					</div>
				) : gallery.isError ? (
					<p className="py-10 text-center font-semibold text-red-500">
						No se pudo cargar la galería.
					</p>
				) : imagenes.length === 0 ? (
					<p className="py-10 text-center text-sm text-text-muted">
						No se encontraron imágenes con esos filtros.
					</p>
				) : (
					<div
						className={`grid grid-cols-2 gap-3 transition-opacity duration-200 sm:grid-cols-3 lg:grid-cols-4 ${
							actualizando ? "opacity-50" : "opacity-100"
						}`}
					>
						{imagenes.map((image, i) => (
							<TarjetaImagen
								key={image.date}
								image={image}
								onSelect={() => setSelectedIndex(i)}
							/>
						))}
					</div>
				)}
			</div>

			{!cargando && !gallery.isError && (
				<Paginacion
					page={page}
					totalPages={totalPages}
					onChange={cambiarPagina}
				/>
			)}
		</div>
	);
};

export default Galeria;
