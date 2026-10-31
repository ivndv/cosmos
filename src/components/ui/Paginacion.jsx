/**
 * Construye la lista de páginas visibles con elipsis.
 * Ej: 1 … 7 8 9 … 96
 * @param {number} page - Página actual
 * @param {number} totalPages - Total de páginas
 * @returns {(number|"…")[]}
 */
function construirPaginas(page, totalPages) {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => ({
			tipo: "pagina",
			valor: i + 1,
			clave: `p-${i + 1}`,
		}));
	}

	const candidatas = new Set([1, totalPages, page - 1, page, page + 1]);
	const ordenadas = [...candidatas]
		.filter((n) => n >= 1 && n <= totalPages)
		.sort((a, b) => a - b);

	const salida = [];
	let anterior = 0;
	for (const n of ordenadas) {
		if (anterior && n - anterior > 1) {
			salida.push({ tipo: "gap", clave: `gap-${anterior}` });
		}
		salida.push({ tipo: "pagina", valor: n, clave: `p-${n}` });
		anterior = n;
	}
	return salida;
}

// Paginación numérica con ventana deslizante
function Paginacion({ page, totalPages, onChange }) {
	if (!totalPages || totalPages <= 1) return null;

	const paginas = construirPaginas(page, totalPages);

	const botonBase =
		"flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md border px-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40";

	return (
		<nav
			aria-label="Paginación de la galería"
			className="flex flex-col items-center gap-3"
		>
			<div className="flex flex-wrap items-center justify-center gap-2">
				{/* Anterior */}
				<button
					type="button"
					onClick={() => onChange(page - 1)}
					disabled={page <= 1}
					aria-label="Página anterior"
					className={`${botonBase} border-[#e0e0e0] bg-bg-surface text-text-on-surface hover:border-accent hover:text-accent`}
				>
					«
				</button>

				{paginas.map((item) =>
					item.tipo === "gap" ? (
						<span
							key={item.clave}
							className="px-1 text-sm text-text-muted"
							aria-hidden="true"
						>
							…
						</span>
					) : (
						<button
							key={item.clave}
							type="button"
							onClick={() => onChange(item.valor)}
							aria-current={item.valor === page ? "page" : undefined}
							aria-label={`Página ${item.valor}`}
							className={`${botonBase} ${
								item.valor === page
									? "border-accent bg-accent text-text-primary"
									: "border-[#e0e0e0] bg-bg-surface text-text-on-surface hover:border-accent hover:text-accent"
							}`}
						>
							{item.valor}
						</button>
					),
				)}

				{/* Siguiente */}
				<button
					type="button"
					onClick={() => onChange(page + 1)}
					disabled={page >= totalPages}
					aria-label="Página siguiente"
					className={`${botonBase} border-[#e0e0e0] bg-bg-surface text-text-on-surface hover:border-accent hover:text-accent`}
				>
					»
				</button>
			</div>

			<p className="m-0 text-xs text-text-muted">
				Página {page} de {totalPages.toLocaleString("es-MX")}
			</p>
		</nav>
	);
}

export default Paginacion;
