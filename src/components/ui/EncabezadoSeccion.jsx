// Encabezado de sección: eyebrow + título + descripción, alineado a la izquierda
function EncabezadoSeccion({ eyebrow, titulo, descripcion }) {
	return (
		<div className="flex flex-col gap-4 animate-reveal">
			{eyebrow && (
				<span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
					{eyebrow}
				</span>
			)}
			<h2 className="m-0 text-[2rem] leading-[1.15] text-bg-secondary md:text-[2.6rem]">
				{titulo}
			</h2>
			{descripcion && (
				<p className="m-0 max-w-[820px] text-[0.95rem] leading-[1.7] text-text-on-surface md:text-base">
					{descripcion}
				</p>
			)}
		</div>
	);
}

export default EncabezadoSeccion;
