import useCarrusel from "../../hooks/useCarousel";

const Carrusel = ({ images }) => {
	const { currentIndex, setCurrentIndex } = useCarrusel(images);

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full flex flex-col px-0 lg:px-[100px]">
				{images.length > 0 && (
					<div key={currentIndex}>
						<div className="w-full h-auto flex flex-col justify-center items-center gap-3">
							<div className="w-full h-[280px] overflow-hidden rounded-lg">
								<img
									src={images[currentIndex].url}
									alt={images[currentIndex].title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="w-full flex justify-center items-center">
								<h3 className="text-base text-[#282c34] text-center font-semibold">
									{images[currentIndex].title}
								</h3>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="text-center">
				{images.map((image, index) => (
					<button
						key={image.url}
						className={`h-[10px] w-[10px] mx-[5px] rounded-full inline-block border-none cursor-pointer p-0 transition-colors duration-300 ${
							index === currentIndex ? "bg-accent" : "bg-[#bbb]"
						}`}
						onClick={() => setCurrentIndex(index)}
						aria-label={`Ir a imagen ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Carrusel;
