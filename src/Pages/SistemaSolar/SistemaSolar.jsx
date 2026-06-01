import { useEffect, useState } from "react";
import { useCosmosStore } from "../../store/cosmosStore";
import Descripcion from "../Galeria/Descripcion";
import Titulo from "../Galeria/Titulo";
import Carousel from "./Carousel";
import Navbar from "./Navbar";

const SistemaSolar = () => {
	const sistemaSolar = useCosmosStore((s) => s.sistemaSolar);
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

	useEffect(() => {
		if (sistemaSolar && Object.keys(sistemaSolar).length > 0) {
			setCategoriaSeleccionada(Object.keys(sistemaSolar)[0]);
		}
	}, [sistemaSolar]);

	return (
		<div className="text-center pt-[90px] px-4 pb-10 max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-6 lg:pt-[100px] lg:px-5 lg:pb-15">
			{!categoriaSeleccionada ? (
				<p className="animate-fade-in">No hay categorías disponibles.</p>
			) : (
				<>
					<div className="w-full flex justify-center animate-stagger-1">
						<Titulo titulo="Sistema solar" />
					</div>

					<div className="w-full flex justify-center animate-stagger-2">
						<Descripcion descripcion="Explora el Sistema Solar a través de diversas categorías, donde puedes ver información sobre planetas, lunas y más. Navega fácilmente entre los elementos utilizando la barra de navegación y el carrusel interactivo." />
					</div>

					<div className="w-full flex justify-center animate-stagger-3">
						<Navbar
							categorias={Object.keys(sistemaSolar)}
							categoriaSeleccionada={categoriaSeleccionada}
							setCategoriaSeleccionada={setCategoriaSeleccionada}
						/>
					</div>

					<div className="w-full flex flex-col items-center gap-6">
						<Carousel
							categoriaSeleccionada={categoriaSeleccionada}
							datos={sistemaSolar[categoriaSeleccionada]}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default SistemaSolar;
