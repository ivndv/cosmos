// Store

// Hooks
import useInView from "../../hooks/useInView";
import { useCosmosStore } from "../../store/cosmosStore";

// Renderiza la imagen astronómica del día con skeleton loading
function ContenidoDestacado() {
	// 1. Obtiene la imagen del día del store
	const dailyImage = useCosmosStore((s) => s.dailyImage);
	const isLoading = !dailyImage?.url;
	const [ref, inView] = useInView({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="w-full flex flex-col items-center justify-center px-5 py-16 md:py-28"
		>
			<div
				className={`max-w-[1200px] w-full min-h-[580px] mx-auto grid grid-cols-1 gap-8 items-center bg-bg-surface rounded-xl p-6 md:grid-cols-2 md:gap-15 md:p-10 md:min-h-[450px] ${inView ? "animate-stagger-1" : "opacity-0"}`}
			>
				{isLoading ? (
					<>
						{/* Skeleton de la imagen */}
						<div className="w-full aspect-[16/9] rounded-lg bg-gradient-to-r from-[#2a2a4a] via-[#3a3a5a] to-[#2a2a4a] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
						{/* Skeleton del texto */}
						<div className="flex flex-col gap-3">
							<div
								className="h-8 rounded-sm bg-gradient-to-r from-[#2a2a4a] via-[#3a3a5a] to-[#2a2a4a] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
								style={{ width: "80%" }}
							/>
							<div className="h-5 rounded-sm bg-gradient-to-r from-[#2a2a4a] via-[#3a3a5a] to-[#2a2a4a] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] w-3/5" />
							<div className="h-5 rounded-sm bg-gradient-to-r from-[#2a2a4a] via-[#3a3a5a] to-[#2a2a4a] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] w-[45%]" />
						</div>
					</>
				) : (
					<>
						{/* Imagen astronómica del día */}
						<div className="rounded-lg overflow-hidden">
							<img
								src={dailyImage.url}
								alt={dailyImage.title}
								className="w-full block aspect-video object-cover"
							/>
						</div>
						{/* Información de la imagen */}
						<div className="flex flex-col gap-4">
							<h2 className="text-[1.5rem] md:text-2xl text-bg-secondary m-0">
								Imagen Astronómica del Día
							</h2>
							<h3 className="text-[1.1rem] text-accent m-0">
								{dailyImage.title}
							</h3>
							<p className="text-text-on-surface leading-[1.6] m-0 line-clamp-4">
								{dailyImage.explanation}
							</p>
							{/* Enlace a la imagen en alta resolución en NASA */}
							<a
								href={dailyImage.hdurl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block px-6 py-3 border border-accent text-accent no-underline rounded-md transition-all duration-300 cursor-pointer self-start mt-2 hover:bg-accent hover:text-text-primary"
							>
								Ver en NASA
							</a>
						</div>
					</>
				)}
			</div>
		</section>
	);
}

export default ContenidoDestacado;
