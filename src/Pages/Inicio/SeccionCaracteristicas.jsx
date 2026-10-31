// Store

// Componentes
import EncabezadoSeccion from "@/components/ui/EncabezadoSeccion";
// Datos
import { ASSETS_BASE } from "@/config/assets";
import { noticias } from "@/data/noticias";
import { sistemaSolar } from "@/data/sistemaSolar";
// Hooks
import { useGalleryImages } from "@/hooks/useNasa";
import TarjetaCaracteristica from "./TarjetaCaracteristica";

// Renderiza las tarjetas de características principales de la landing
function SeccionCaracteristicas() {
	// 1. Obtiene los datos para las tarjetas
	const gallery = useGalleryImages({ page: 1 });
	const primeraImagen = gallery.data?.images?.[0]?.url;
	const planetas = sistemaSolar?.planetas || [];

	// 2. Define las características con sus imágenes y enlaces
	const features = [
		{
			titulo: "Galería Espacial",
			descripcion:
				"Descubre la belleza del universo a través de una colección curada de imágenes impresionantes, desde nebulosas brillantes hasta galaxias lejanas.",
			image: primeraImagen || `${ASSETS_BASE}/agujero-negro.png`,
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

	return (
		<section id="caracteristicas" className="w-full px-5 py-16 md:py-24">
			<div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
				<EncabezadoSeccion
					eyebrow="Descubre"
					titulo="Explora el Cosmos"
					descripcion="Cuatro formas de acercarte al universo: imágenes reales, noticias de exploración y los cuerpos de nuestro sistema solar."
				/>

				<div className="flex w-full flex-col gap-8 animate-reveal">
					{features.map((feature, i) => (
						<TarjetaCaracteristica
							key={feature.titulo}
							{...feature}
							horizontal
							imageRight={i % 2 === 1}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default SeccionCaracteristicas;
