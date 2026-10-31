// Config
import { camposVisibles, ESQUEMA } from "@/config/sistemaSolar";

// Detalle del cuerpo seleccionado: breadcrumb, imagen, descripción y datos
function DetalleCuerpo({ item, categoria, padre, onIrAPadre }) {
	if (!item) {
		return (
			<div className="flex min-h-[320px] items-center justify-center rounded-lg border border-[#e8e8e8] bg-bg-surface">
				<p className="text-sm text-text-muted">No hay datos disponibles.</p>
			</div>
		);
	}

	const datos = camposVisibles(categoria, item);
	const etiquetaCategoria = ESQUEMA[categoria]?.etiqueta ?? categoria;

	return (
		<article className="flex flex-col overflow-hidden rounded-lg border border-[#e8e8e8] bg-bg-surface shadow-glass">
			{/* Imagen */}
			<div className="flex h-[240px] w-full items-center justify-center bg-black md:h-[360px]">
				<img
					key={item.id}
					src={item.url}
					alt={item.title}
					className="h-full w-full object-contain animate-fade-in-slow"
				/>
			</div>

			{/* Información */}
			<div className="flex flex-col gap-4 p-6">
				<div className="flex flex-col gap-1">
					{/* Breadcrumb cuando el cuerpo tiene padre */}
					{padre ? (
						<nav
							aria-label="Ubicación en el sistema solar"
							className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
						>
							<button
								type="button"
								onClick={() => onIrAPadre?.(padre.id)}
								className="cursor-pointer border-none bg-transparent p-0 text-accent transition-colors duration-200 hover:underline"
							>
								{padre.title}
							</button>
							<span aria-hidden="true" className="text-text-muted">
								›
							</span>
							<span className="text-text-muted">{item.title}</span>
						</nav>
					) : (
						<span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
							{etiquetaCategoria}
						</span>
					)}

					<h2 className="m-0 text-[1.6rem] leading-tight text-bg-secondary">
						{item.title}
					</h2>
				</div>

				<p className="m-0 text-sm leading-[1.7] text-text-on-surface">
					{item.explanation}
				</p>

				{datos.length > 0 && (
					<dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[#eeeeF4] pt-4 sm:grid-cols-2">
						{datos.map(({ etiqueta, valor }) => (
							<div key={etiqueta} className="flex flex-col gap-0.5">
								<dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
									{etiqueta}
								</dt>
								<dd className="m-0 text-sm font-semibold text-bg-secondary">
									{valor}
								</dd>
							</div>
						))}
					</dl>
				)}
			</div>
		</article>
	);
}

export default DetalleCuerpo;
