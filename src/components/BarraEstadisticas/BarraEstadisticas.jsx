// React
import { useEffect, useState } from "react";
// Iconos
import { IoIosImages } from "react-icons/io";
import { IoNewspaper, IoPlanet } from "react-icons/io5";
// Datos
import { noticias } from "../../data/noticias";
import { sistemaSolar } from "../../data/sistemaSolar";
// Store
import { useCosmosStore } from "../../store/cosmosStore";

// Animación de conteo progresivo hasta el valor objetivo
function Contador({ target }) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (target === 0) return;
		// 1. Define la duración y el inicio de la animación
		const duration = 2000;
		const start = performance.now();

		// 2. Anima el contador con requestAnimationFrame
		let rafId;
		const animate = (now) => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			setCount(Math.floor(progress * target));
			if (progress < 1) {
				rafId = requestAnimationFrame(animate);
			}
		};

		rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}, [target]);

	return (
		<span className="text-[1.8rem] font-bold text-text-primary leading-[1.2]">
			{count.toLocaleString()}
		</span>
	);
}

// Configuración de las estadísticas a mostrar
const stats = [
	{ icon: IoIosImages, label: "Imágenes NASA", key: "images" },
	{ icon: IoNewspaper, label: "Noticias", key: "news" },
	{ icon: IoPlanet, label: "Planetas", key: "planets" },
];

// Renderiza la barra de estadísticas con contadores animados
function BarraEstadisticas({ glass }) {
	// 1. Obtiene los datos del store y los módulos de datos
	const imagesGaleria = useCosmosStore((s) => s.imagesGaleria);
	const counts = {
		images: imagesGaleria?.length || 0,
		news: noticias?.length || 0,
		planets: sistemaSolar?.planetas?.length || 0,
	};

	// 2. Genera los items con sus iconos y contadores
	const items = stats.map(({ icon: Icon, label, key }) => (
		<div
			key={key}
			className="flex items-center gap-4 px-5 py-5 w-full justify-center relative
				before:content-[''] before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:w-4/5 before:h-px before:bg-[rgba(255,255,255,0.1)]
				first:before:hidden
				md:px-10 md:py-5 md:flex-1
				md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:w-px md:before:h-[60px] md:before:translate-x-0"
		>
			<div className="w-12 h-12 flex items-center justify-center rounded-md bg-[rgba(124,106,247,0.12)] text-accent text-[1.5rem] shrink-0">
				<Icon />
			</div>
			<div className="flex flex-col">
				<Contador target={counts[key]} />
				<span className="text-sm text-text-secondary whitespace-nowrap">
					{label}
				</span>
			</div>
		</div>
	));

	// 3. Renderiza con o sin fondo glass según la prop
	if (glass) {
		return (
			<div className="flex flex-col items-stretch md:flex-row h-full">
				{items}
			</div>
		);
	}

	return (
		<section className="w-full flex justify-center items-center py-20 px-5 bg-bg-primary">
			<div className="flex flex-col items-stretch gap-5 max-w-[900px] w-full md:flex-row md:gap-0">
				{items}
			</div>
		</section>
	);
}

export default BarraEstadisticas;
