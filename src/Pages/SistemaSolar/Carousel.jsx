import { useEffect, useState } from "react";

const Carousel = ({ categoriaSeleccionada, datos }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		setCurrentIndex(0);
	}, []);

	if (!datos || datos.length === 0) return null;

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? datos.length - 1 : prevIndex - 1,
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === datos.length - 1 ? 0 : prevIndex + 1,
		);
	};

	const currentItem = datos[currentIndex];

	return (
		<div className="flex flex-col items-center gap-5 w-full max-w-[900px] mx-auto">
			<h2 className="text-[1.8rem] text-bg-secondary m-0 capitalize">
				{categoriaSeleccionada}
			</h2>

			<div className="flex items-center gap-2 w-full md:gap-4">
				<button
					type="button"
					onClick={handlePrev}
					aria-label="Anterior"
					className="bg-bg-secondary border-none rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-text-primary text-base shadow-btn transition-all duration-200 shrink-0 hover:bg-bg-hover hover:scale-110 md:w-11 md:h-11 md:text-[1.2rem]"
				>
					◀
				</button>

				<div className="flex-1 bg-bg-surface border border-[#e8e8e8] rounded-lg overflow-hidden shadow-glass flex flex-col">
					{currentItem ? (
						<>
							<div className="w-full h-[260px] bg-black flex items-center justify-center md:h-[400px]">
								<img
									key={currentItem.title}
									src={currentItem.url}
									alt={currentItem.title}
									className="w-full h-full object-contain animate-fade-in-slow"
								/>
							</div>
							<div className="p-6 flex flex-col gap-3 text-left">
								<h3 className="text-[1.4rem] text-bg-secondary m-0">
									{currentItem.title}
								</h3>
								<p className="text-sm text-text-on-surface leading-[1.6] m-0">
									{currentItem.explanation}
								</p>
							</div>
						</>
					) : (
						<div className="p-6 flex flex-col gap-3 text-left">
							<p>No hay datos disponibles.</p>
						</div>
					)}
				</div>

				<button
					type="button"
					onClick={handleNext}
					aria-label="Siguiente"
					className="bg-bg-secondary border-none rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-text-primary text-base shadow-btn transition-all duration-200 shrink-0 hover:bg-bg-hover hover:scale-110 md:w-11 md:h-11 md:text-[1.2rem]"
				>
					▶
				</button>
			</div>

			<div className="flex justify-center gap-2 mt-2.5 flex-wrap">
				{datos.map((item, index) => (
					<button
						key={item.titulo || index}
						type="button"
						className={`h-2.5 w-2.5 border-none rounded-full cursor-pointer p-0 transition-[background,transform] duration-300 ${
							index === currentIndex
								? "bg-bg-secondary"
								: "bg-[#d0d0d0] hover:bg-[#a0a0a0]"
						} hover:scale-120`}
						onClick={() => setCurrentIndex(index)}
						aria-label={`Ir a imagen ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Carousel;
