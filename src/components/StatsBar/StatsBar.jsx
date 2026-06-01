import { useEffect, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { IoNewspaper, IoPlanet } from "react-icons/io5";
import { useCosmosStore } from "../../store/cosmosStore";

function Counter({ target }) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (target === 0) return;
		const duration = 2000;
		const start = performance.now();

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

const stats = [
	{ icon: IoIosImages, label: "Imágenes NASA", key: "images" },
	{ icon: IoNewspaper, label: "Noticias", key: "news" },
	{ icon: IoPlanet, label: "Planetas", key: "planets" },
];

function StatsBar({ glass }) {
	const imagesGaleria = useCosmosStore((s) => s.imagesGaleria);
	const noticias = useCosmosStore((s) => s.noticias);
	const sistemaSolar = useCosmosStore((s) => s.sistemaSolar);
	const counts = {
		images: imagesGaleria?.length || 0,
		news: noticias?.length || 0,
		planets: sistemaSolar?.planetas?.length || 0,
	};

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
				<Counter target={counts[key]} />
				<span className="text-sm text-text-secondary whitespace-nowrap">
					{label}
				</span>
			</div>
		</div>
	));

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

export default StatsBar;
