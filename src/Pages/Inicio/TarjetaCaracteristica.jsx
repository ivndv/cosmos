// React Router
import { Link } from "react-router-dom";

// Renderiza una tarjeta con imagen, título, descripción y enlace.
// horizontal: la imagen va a la izquierda en desktop (para la tarjeta ancha).
function TarjetaCaracteristica({
	titulo,
	descripcion,
	image,
	to,
	horizontal = false,
	imageRight = false,
}) {
	return (
		<Link
			to={to}
			className={`group flex h-full overflow-hidden rounded-lg no-underline bg-bg-surface border border-black/[0.06] shadow-sm transition-colors duration-200 hover:border-accent/40 ${
				horizontal
					? imageRight
						? "flex-col md:flex-row-reverse"
						: "flex-col md:flex-row"
					: "flex-col"
			}`}
		>
			{/* Imagen */}
			<div
				className={
					horizontal
						? "relative w-full overflow-hidden aspect-[16/9] md:aspect-auto md:w-1/2 md:min-h-[220px]"
						: "relative w-full overflow-hidden aspect-[16/9]"
				}
			>
				{image ? (
					<img
						src={image}
						alt={titulo}
						loading="lazy"
						className="h-full w-full object-cover"
					/>
				) : (
					<div className="h-full w-full bg-gradient-to-br from-[#1a1a3e] to-[#0d0d1a]" />
				)}
			</div>

			{/* Contenido */}
			<div
				className={`flex flex-col gap-2 p-6 ${
					horizontal ? "md:w-1/2 md:justify-center md:p-8" : ""
				}`}
			>
				<h2 className="m-0 text-[1.4rem] font-bold text-bg-secondary md:text-[1.55rem]">
					{titulo}
				</h2>
				<p className="m-0 text-[14.5px] leading-[1.6] text-text-on-surface line-clamp-2">
					{descripcion}
				</p>
				<span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
					Ver más
					<span aria-hidden="true" className="">
						→
					</span>
				</span>
			</div>
		</Link>
	);
}

export default TarjetaCaracteristica;
