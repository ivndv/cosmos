import { useEffect, useMemo, useState } from "react";
import { useCosmosStore } from "../../store/cosmosStore";
import ModalImagen from "./ModalImagen";
import Spinner from "./Spinner";
import TarjetaImagen from "./TarjetaImagen";
import Titulo from "./Titulo";

const SCROLLBAR_CLASSES =
	"[&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-thumb]:rounded-sm";

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

	const likedSet = useMemo(
		() => new Set(likedImages.map((img) => img.date)),
		[likedImages],
	);
	const savedSet = useMemo(
		() => new Set(savedImages.map((img) => img.date)),
		[savedImages],
	);

	const savedItemsWithLikes = itemsWithLikes.filter((img) =>
		savedSet.has(img.date),
	);

	return (
		<div className="px-5 pt-[100px] pb-15 max-w-[1200px] mx-auto flex flex-col gap-15">
			<ModalImagen
				image={selectedImage}
				onClose={() => setSelectedImage(null)}
			/>

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
					<ImageGallerySection
						title="Galería Principal"
						items={itemsWithLikes}
						onSelect={setSelectedImage}
						likedSet={likedSet}
						savedSet={savedSet}
						onLike={toggleLike}
						onSave={toggleSave}
						showActions
					/>

					<ImageGallerySection
						title="Con más likes"
						items={topFiveItems}
						onSelect={setSelectedImage}
					/>

					<ImageGallerySection
						title="Guardadas"
						items={savedItemsWithLikes}
						onSelect={setSelectedImage}
					/>
				</>
			)}
		</div>
	);
};

function ImageGallerySection({
	title,
	items,
	onSelect,
	likedSet,
	savedSet,
	onLike,
	onSave,
	showActions,
}) {
	return (
		<section aria-label={title} className="flex flex-col gap-4">
			<h3 className="text-[1.3rem] font-bold text-[#282c34] border-l-4 border-l-bg-secondary pl-3">
				{title}
			</h3>
			{items.length === 0 ? (
				<p className="text-text-muted text-sm italic">
					Aún no has guardado ninguna imagen.
				</p>
			) : (
				<div
					className={`flex flex-row gap-4 overflow-x-auto pb-3 ${SCROLLBAR_CLASSES}`}
				>
					{items.map((image, idx) => (
						<TarjetaImagen
							key={image.date}
							image={image}
							onSelect={onSelect}
							liked={likedSet?.has(image.date)}
							saved={savedSet?.has(image.date)}
							onLike={onLike}
							onSave={onSave}
							showActions={showActions}
							animationDelay={`${idx * 0.05}s`}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default Galeria;
