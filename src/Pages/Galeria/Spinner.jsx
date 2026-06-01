function Spinner() {
	return (
		<section className="col-start-2 row-start-2 flex flex-col justify-center items-center">
			<div className="border-[8px] border-[#f3f3f3] border-t-[8px] border-t-[#3498db] rounded-full w-[50px] h-[50px] animate-spin" />
			<p className="mt-2">Cargando imágenes...</p>
		</section>
	);
}

export default Spinner;
