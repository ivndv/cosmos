// React
import { useEffect, useState } from "react";
// Iconos
import { IoIosImages } from "react-icons/io";
import { IoNewspaper, IoPlanet } from "react-icons/io5";
// Datos
import { noticias } from "@/data/noticias";
import { sistemaSolar } from "@/data/sistemaSolar";
// Hooks
import { useGalleryImages } from "@/hooks/useNasa";

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
		<span className="text-[1.1rem] font-bold text-text-primary leading-[1.2]">
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
	// 1. Datos de la galería (compartidos vía TanStack Query) y módulos locales
	const gallery = useGalleryImages({ page: 1 });
	const totalImages = gallery.data?.totalHits ?? 0;
	const counts = {
		images: totalImages,
		news: noticias?.length || 0,
		planets: sistemaSolar?.planetas?.length || 0,
	};

	// 2. Genera los items como chips compactos (icono + número + etiqueta)
	const items = stats.map(({ icon: Icon, label, key }) => (
		<div
			key={key}
			className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-5 py-2 backdrop-blur-md transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.12]"
		>
			<Icon className="shrink-0 text-accent" size={16} aria-hidden="true" />
			<Contador target={counts[key]} />
			<span className="font-grotesk text-[12px] text-white/75">{label}</span>
		</div>
	));

	// 3. Renderiza con o sin fondo glass según la prop
	if (glass) {
		return (
			<div className="flex w-full flex-wrap items-center justify-center gap-2">
				{items}
			</div>
		);
	}

	return (
		<section className="w-full flex justify-center items-center py-20 px-5 bg-bg-primary">
			<div className="flex flex-wrap items-center justify-center gap-2 max-w-[900px] w-full">
				{items}
			</div>
		</section>
	);
}

export default BarraEstadisticas;
