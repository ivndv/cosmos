// Tarjeta de imagen minimalista: solo la imagen, clic para abrir el modal
function TarjetaImagen({ image, onSelect }) {
	return (
		<button
			type="button"
			onClick={() => onSelect?.(image)}
			aria-label={`Ver ${image.title}`}
			className="group relative block w-full cursor-pointer overflow-hidden rounded-lg border-none bg-[#f4f4f8] p-0"
		>
			<div className="aspect-[4/3] overflow-hidden">
				<img
					src={image.url}
					alt={image.title}
					loading="lazy"
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
				/>
			</div>
			<div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
		</button>
	);
}

export default TarjetaImagen;
