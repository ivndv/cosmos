import { useEffect, useMemo, useState } from "react";
import { IoBookmark, IoClose, IoHeart } from "react-icons/io5";
import { useCosmosStore } from "../../store/cosmosStore";
import Spinner from "./Spinner";
import Titulo from "./Titulo";

const Galeria = () => {
	const imagesGaleria = useCosmosStore((s) => s.imagesGaleria);
	const likedImages = useCosmosStore((s) => s.likedImages);
	const savedImages = useCosmosStore((s) => s.savedImages);
	const toggleLike = useCosmosStore((s) => s.toggleLike);
	const toggleSave = useCosmosStore((s) => s.toggleSave);
	const fetchGalleryImages = useCosmosStore((s) => s.fetchGalleryImages);
	const galeriaLoading = useCosmosStore((s) => s.galeriaLoading);
	const galeriaError = useCosmosStore((s) => s.galeriaError);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		fetchGalleryImages();
	}, [fetchGalleryImages]);

	const itemsWithLikes = useMemo(
		() =>
			imagesGaleria.map((item) => ({
				...item,
				likes: Math.floor(Math.random() * 901) + 100,
			})),
		[imagesGaleria],
	);
	const topFiveItems = useMemo(
		() => [...itemsWithLikes].sort((a, b) => b.likes - a.likes).slice(0, 5),
		[itemsWithLikes],
	);

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") setSelectedImage(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const savedItemsWithLikes = itemsWithLikes.filter((img) =>
		savedImages.some((s) => s.date === img.date),
	);

	return (
		<div className="px-5 pt-[100px] pb-15 max-w-[1200px] mx-auto flex flex-col gap-15">
			{selectedImage && (
				<div
					className="fixed inset-0 bg-black/85 z-[1000] flex items-center justify-center p-5 animate-fade-in"
					onClick={() => setSelectedImage(null)}
					role="presentation"
				>
					<div
						className="bg-bg-surface rounded-lg overflow-hidden max-w-[860px] w-full max-h-[90vh] flex flex-col animate-slide-up"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="relative">
							<button
								type="button"
							className="absolute top-3 right-3 bg-black/60 border-none rounded-full w-9 h-9 text-text-primary text-[1.2rem] flex items-center justify-center cursor-pointer z-[1001] hover:bg-black/90"
							onClick={() => setSelectedImage(null)}
							aria-label="Cerrar"
							>
								<IoClose />
							</button>
							<img
								src={selectedImage.url}
								alt={selectedImage.title}
								className="w-full max-h-[70vh] object-contain bg-black"
							/>
						</div>
						<div className="p-6 overflow-y-auto">
							<h2 className="text-[1.25rem] font-bold text-bg-secondary mb-3">
								{selectedImage.title}
							</h2>
							<p className="text-sm text-text-on-surface leading-[1.7]">
								{selectedImage.explanation}
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="flex flex-col items-center text-center gap-3 animate-stagger-1">
				<Titulo titulo="Galería Espacial" />
				<p className="text-base text-text-on-surface max-w-[640px] leading-[1.6]">
					Explora una colección impresionante de imágenes del espacio. Desde
					nebulosas hasta planetas, cada imagen cuenta una historia del
					universo.
				</p>
			</div>

			{galeriaLoading ? (
				<Spinner />
			) : galeriaError ? (
				<p className="text-center text-red-500 font-semibold py-10">
					Error al cargar la galería: {galeriaError}
				</p>
			) : (
				<>
					<section aria-label="Galería Principal" className="flex flex-col gap-4 animate-stagger-2">
						<h3 className="text-[1.3rem] font-bold text-[#282c34] border-l-4 border-l-bg-secondary pl-3">
							Galería Principal
						</h3>
						<div className="flex flex-row gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-thumb]:rounded-sm">
							{itemsWithLikes.map((image, idx) => (
								<div
									key={image.date}
									className="relative shrink-0 w-[260px] h-[200px] rounded-lg overflow-hidden cursor-pointer border border-[#e0e0e0] group animate-fade-in-up"
									onClick={() => setSelectedImage(image)}
									style={{ animationDelay: `${idx * 0.05}s` }}
								>
									<img
										src={image.url}
										alt={image.title}
										className="w-full h-full object-cover transition-transform duration-[350ms] group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										<p className="text-text-primary text-sm font-semibold leading-[1.3]">
											{image.title}
										</p>
									</div>
									<div className="absolute top-2 right-2 flex gap-1.5">
										<button
											type="button"
											className="bg-black/55 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-text-primary text-base transition-colors duration-200 hover:bg-black/85"
											onClick={(e) => {
												e.stopPropagation();
												toggleLike(image);
											}}
											aria-label="Me gusta"
										>
											<IoHeart
												color={
													likedImages.some((l) => l.date === image.date)
														? "#ff4d6d"
														: "white"
												}
											/>
										</button>
										<button
											type="button"
											className="bg-black/55 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-text-primary text-base transition-colors duration-200 hover:bg-black/85"
											onClick={(e) => {
												e.stopPropagation();
												toggleSave(image);
											}}
											aria-label="Guardar"
										>
											<IoBookmark
												color={
													savedImages.some((s) => s.date === image.date)
														? "#5b8dee"
														: "white"
												}
											/>
										</button>
									</div>
								</div>
							))}
						</div>
					</section>

					<section aria-label="Con más likes" className="flex flex-col gap-4 animate-stagger-3">
						<h3 className="text-[1.3rem] font-bold text-[#282c34] border-l-4 border-l-bg-secondary pl-3">
							Con más likes
						</h3>
						<div className="flex flex-row gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-thumb]:rounded-sm">
							{topFiveItems.map((image, idx) => (
								<div
									key={image.date}
									className="relative shrink-0 w-[260px] h-[200px] rounded-lg overflow-hidden cursor-pointer border border-[#e0e0e0] group animate-fade-in-up"
									onClick={() => setSelectedImage(image)}
									style={{ animationDelay: `${idx * 0.05}s` }}
								>
									<img
										src={image.url}
										alt={image.title}
										className="w-full h-full object-cover transition-transform duration-[350ms] group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										<p className="text-text-primary text-sm font-semibold leading-[1.3]">
											{image.title}
										</p>
									</div>
								</div>
							))}
						</div>
					</section>

					<section aria-label="Guardadas" className="flex flex-col gap-4 animate-stagger-4">
						<h3 className="text-[1.3rem] font-bold text-[#282c34] border-l-4 border-l-bg-secondary pl-3">
							Guardadas
						</h3>
						{savedItemsWithLikes.length === 0 ? (
							<p className="text-text-muted text-sm italic">
								Aún no has guardado ninguna imagen.
							</p>
						) : (
							<div className="flex flex-row gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-thumb]:rounded-sm">
								{savedItemsWithLikes.map((image, idx) => (
								<div
									key={image.date}
									className="relative shrink-0 w-[260px] h-[200px] rounded-lg overflow-hidden cursor-pointer border border-[#e0e0e0] group animate-fade-in-up"
									onClick={() => setSelectedImage(image)}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => e.key === "Enter" && setSelectedImage(image)}
									style={{ animationDelay: `${idx * 0.05}s` }}
								>
										<img
											src={image.url}
											alt={image.title}
											className="w-full h-full object-cover transition-transform duration-[350ms] group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
											<p className="text-text-primary text-sm font-semibold leading-[1.3]">
												{image.title}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</section>
				</>
			)}
		</div>
	);
};

export default Galeria;
