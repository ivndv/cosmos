// Iconos
import { IoBookmark, IoHeart } from "react-icons/io5";

// Renderiza una tarjeta de imagen con acciones de like y guardar
function TarjetaImagen({
	image,
	onSelect,
	liked,
	saved,
	onLike,
	onSave,
	showActions = true,
	animationDelay = "0s",
}) {
	return (
		<div
			className="relative shrink-0 w-[260px] h-[200px] rounded-lg overflow-hidden cursor-pointer border border-[#e0e0e0] group animate-fade-in-up"
			onClick={() => onSelect?.(image)}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === "Enter" && onSelect?.(image)}
			style={{ animationDelay }}
		>
			{/* Imagen de la tarjeta */}
			<img
				src={image.url}
				alt={image.title}
				className="w-full h-full object-cover transition-transform duration-[350ms] group-hover:scale-105"
			/>
			{/* Superposición con título al hacer hover */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				<p className="text-text-primary text-sm font-semibold leading-[1.3]">
					{image.title}
				</p>
			</div>
			{/* Botones de acción */}
			{showActions && (
				<div className="absolute top-2 right-2 flex gap-1.5">
					<button
						type="button"
						className="bg-black/55 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-text-primary text-base transition-colors duration-200 hover:bg-black/85"
						onClick={(e) => {
							e.stopPropagation();
							onLike?.(image);
						}}
						aria-label="Me gusta"
					>
						<IoHeart color={liked ? "#ff4d6d" : "white"} />
					</button>
					<button
						type="button"
						className="bg-black/55 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-text-primary text-base transition-colors duration-200 hover:bg-black/85"
						onClick={(e) => {
							e.stopPropagation();
							onSave?.(image);
						}}
						aria-label="Guardar"
					>
						<IoBookmark color={saved ? "#5b8dee" : "white"} />
					</button>
				</div>
			)}
		</div>
	);
}

export default TarjetaImagen;
