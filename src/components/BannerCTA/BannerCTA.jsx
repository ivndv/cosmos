// React Router
import { Link } from "react-router-dom";
// Hooks
import useInView from "../../hooks/useInView";
// Componentes
import Boton from "../Boton/Boton";

// Renderiza la sección de llamada a la acción para explorar la galería
function BannerCTA() {
	const [ref, inView] = useInView({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className={`w-full min-h-[350px] py-10 px-5 bg-bg-primary flex flex-col items-center justify-center gap-8 text-center md:min-h-[400px] md:py-16 ${inView ? "animate-stagger-1" : "opacity-0"}`}
		>
			{/* Título principal de la sección */}
			<h2 className="text-[7vw] md:text-[2.5rem] text-text-primary">
				¿Listo para Explorar el Cosmos?
			</h2>
			{/* Descripción del llamado a la acción */}
			<p className="text-[4vw] px-2.5 text-text-secondary max-w-[600px] leading-[1.6] md:text-[1.1rem] md:px-0">
				Únete a nosotros en este viaje interestelar. Descubre imágenes
				impresionantes, noticias actualizadas y datos fascinantes del sistema
				solar.
			</p>
			{/* Enlace a la galería espacial */}
			<Link to="/galería-espacial" className="no-underline">
				<Boton className="w-[140px] h-[30px] text-sm bg-bg-secondary text-text-primary border border-bg-secondary hover:bg-bg-hover">
					Explorar Galería
				</Boton>
			</Link>
		</section>
	);
}

export default BannerCTA;
