// React
import { useCallback, useEffect, useState } from "react";
// Iconos
import {
	IoChevronBack,
	IoChevronForward,
	IoClose,
	IoDownload,
	IoShareSocial,
} from "react-icons/io5";
// Utilidades
import { compartirImagen } from "@/utils/share";

// Visor a pantalla completa de la galería.
// Recibe la lista completa y el índice actual para permitir navegar.
function ModalImagen({ items = [], index = null, onClose, onChange }) {
	const [aviso, setAviso] = useState("");

	const abierto = index !== null && Boolean(items[index]);
	const image = abierto ? items[index] : null;

	const anterior = useCallback(() => {
		if (index > 0) onChange?.(index - 1);
	}, [index, onChange]);

	const siguiente = useCallback(() => {
		if (index < items.length - 1) onChange?.(index + 1);
	}, [index, items.length, onChange]);

	// Atajos de teclado: Esc para cerrar, flechas para navegar
	useEffect(() => {
		if (!abierto) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") anterior();
			if (e.key === "ArrowRight") siguiente();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [abierto, onClose, anterior, siguiente]);

	// Aviso temporal al compartir
	useEffect(() => {
		if (!aviso) return;
		const timer = setTimeout(() => setAviso(""), 2500);
		return () => clearTimeout(timer);
	}, [aviso]);

	if (!abierto) return null;

	const compartir = async () => {
		const resultado = await compartirImagen(image);
		if (resultado === "copied") setAviso("Enlace copiado");
		if (resultado === "shared") setAviso("Compartido");
		if (resultado === "error") setAviso("No se pudo compartir");
	};

	return (
		<div
			className="fixed inset-0 z-[1000] flex flex-col bg-black/92 backdrop-blur-sm animate-fade-in"
			onClick={onClose}
			role="presentation"
		>
			{/* Barra superior */}
			<div className="flex items-center justify-between px-4 py-3">
				<span className="text-xs font-medium text-white/50">
					{index + 1} / {items.length}
				</span>
				<button
					type="button"
					onClick={onClose}
					aria-label="Cerrar"
					className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-lg text-white transition-colors duration-200 hover:bg-white/20"
				>
					<IoClose />
				</button>
			</div>

			{/* Imagen */}
			<div
				className="relative flex flex-1 items-center justify-center px-4"
				onClick={(e) => e.stopPropagation()}
			>
				{index > 0 && (
					<button
						type="button"
						onClick={anterior}
						aria-label="Imagen anterior"
						className="absolute left-2 z-10 hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-xl text-white transition-colors duration-200 hover:bg-white/20 md:flex"
					>
						<IoChevronBack />
					</button>
				)}

				<img
					src={image.hdurl || image.url}
					alt={image.title}
					className="max-h-[70vh] w-auto max-w-full rounded-md object-contain"
				/>

				{index < items.length - 1 && (
					<button
						type="button"
						onClick={siguiente}
						aria-label="Imagen siguiente"
						className="absolute right-2 z-10 hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-xl text-white transition-colors duration-200 hover:bg-white/20 md:flex"
					>
						<IoChevronForward />
					</button>
				)}
			</div>

			{/* Info y acciones */}
			<div
				className="mx-auto flex w-full max-w-[900px] flex-col gap-3 px-5 pb-6 pt-4"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-start justify-between gap-4">
					<h2 className="m-0 text-[1.05rem] font-bold leading-[1.35] text-white md:text-[1.25rem]">
						{image.title}
					</h2>
					<div className="flex shrink-0 gap-2">
						<a
							href={image.hdurl || image.url}
							target="_blank"
							rel="noopener noreferrer"
							title="Descargar"
							aria-label="Descargar (abre la imagen en alta resolución)"
							className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white no-underline transition-colors duration-200 hover:bg-white/20"
						>
							<IoDownload size={16} />
						</a>
						<button
							type="button"
							onClick={compartir}
							title="Compartir"
							aria-label="Compartir"
							className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
						>
							<IoShareSocial size={16} />
						</button>
					</div>
				</div>

				<p className="m-0 line-clamp-3 text-[13px] leading-[1.6] text-white/60">
					{image.explanation}
				</p>

				{aviso && (
					<span className="text-xs font-medium text-accent">{aviso}</span>
				)}
			</div>
		</div>
	);
}

export default ModalImagen;
