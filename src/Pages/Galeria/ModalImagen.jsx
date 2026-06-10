// React
import { useEffect } from "react";
// Iconos
import { IoClose } from "react-icons/io5";

// Modal para visualizar una imagen en tamaño completo con su descripción
function ModalImagen({ image, onClose }) {
	// Cierra el modal al presionar Escape
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);

	if (!image) return null;

	return (
		<div
			className="fixed inset-0 bg-black/85 z-[1000] flex items-center justify-center p-5 animate-fade-in"
			onClick={onClose}
			role="presentation"
		>
			<div
				className="bg-bg-surface rounded-lg overflow-hidden max-w-[860px] w-full max-h-[90vh] flex flex-col animate-slide-up"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Imagen con botón de cierre */}
				<div className="relative">
					<button
						type="button"
						className="absolute top-3 right-3 bg-black/60 border-none rounded-full w-9 h-9 text-text-primary text-[1.2rem] flex items-center justify-center cursor-pointer z-[1001] hover:bg-black/90"
						onClick={onClose}
						aria-label="Cerrar"
					>
						<IoClose />
					</button>
					<img
						src={image.url}
						alt={image.title}
						className="w-full max-h-[70vh] object-contain bg-black"
					/>
				</div>
				{/* Información de la imagen */}
				<div className="p-6 overflow-y-auto">
					<h2 className="text-[1.25rem] font-bold text-bg-secondary mb-3">
						{image.title}
					</h2>
					<p className="text-sm text-text-on-surface leading-[1.7]">
						{image.explanation}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ModalImagen;
