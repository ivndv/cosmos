// Store
import { useCosmosStore } from "../../store/cosmosStore";
// Datos
import { noticias } from "../../data/noticias";
import { sistemaSolar } from "../../data/sistemaSolar";
// Componentes
import TarjetaCaracteristica from "./TarjetaCaracteristica";
// Hooks
import useInView from "../../hooks/useInView";

// Renderiza las tarjetas de características principales de la landing
function SeccionCaracteristicas() {
	// 1. Obtiene los datos para las tarjetas
	const imagesGaleria = useCosmosStore((s) => s.imagesGaleria);
	const planetas = sistemaSolar?.planetas || [];

	// 2. Define las características con sus imágenes y enlaces
	const features = [
		{
			titulo: "Galería Espacial",
			descripcion:
				"Descubre la belleza del universo a través de una colección curada de imágenes impresionantes, desde nebulosas brillantes hasta galaxias lejanas.",
			image: imagesGaleria?.[0]?.url,
			to: "/galería-espacial",
		},
		{
			titulo: "Noticias",
			descripcion:
				"Mantente al día con los últimos descubrimientos espaciales, avances científicos y misiones de exploración.",
			image: noticias?.[0]?.url,
			to: "/noticias",
		},
		{
			titulo: "Sistema Solar",
			descripcion:
				"Explora los últimos descubrimientos y avances en nuestro vecindario cósmico. Aprende sobre los planetas, lunas y otros cuerpos celestes.",
			image: planetas?.[0]?.url,
			to: "/sistema-solar",
		},
	];

	const [ref, inView] = useInView({ threshold: 0.15 });

	return (
		<section
			id="caracteristicas"
			ref={ref}
			className="w-full flex flex-col items-center justify-center px-5 py-16 md:py-28"
		>
			<div className={`grid grid-cols-1 gap-5 w-full max-w-[1200px] mx-auto md:grid-cols-2 ${inView ? "animate-stagger-1" : "opacity-0"}`}>
				{/* Primeras dos tarjetas */}
				{features.slice(0, 2).map((feature, idx) => (
					<div key={feature.titulo} className={`${inView ? "animate-fade-in-up" : ""}`} style={{ animationDelay: `${idx * 0.1}s` }}>
						<TarjetaCaracteristica {...feature} />
					</div>
				))}
				{/* Tercera tarjeta ocupa todo el ancho */}
				<div className={`col-span-full w-full mt-0 md:mt-5 ${inView ? "animate-fade-in-up" : ""}`} style={{ animationDelay: "0.2s" }}>
					<TarjetaCaracteristica {...features[2]} />
				</div>
			</div>
		</section>
	);
}

export default SeccionCaracteristicas;
