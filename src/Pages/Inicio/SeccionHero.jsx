// React
import { useState } from "react";
// Iconos
import { IoIosInformationCircle } from "react-icons/io";
// Componentes
import Boton from "@/components/ui/Boton";
// Config
import { ASSETS_BASE } from "@/config/assets";
// Hooks
import { useDailyImage } from "@/hooks/useNasa";
// Utilidades
import { revealDelay } from "@/utils/animations";
import BarraEstadisticas from "./BarraEstadisticas";

// Gradiente de fondo predeterminado
const gradientBg =
	"linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 50%, #0d0d1a 100%)";

// Renderiza la sección hero con la imagen astronómica del día de fondo
function SeccionHero() {
	// 1. Imagen del día (TanStack Query deduplica la petición)
	const { data: dailyImage, error: dailyError } = useDailyImage();
	const [tooltipVisible, setTooltipVisible] = useState(false);

	const toggleTooltip = () => setTooltipVisible((prev) => !prev);

	// Imagen de fondo: APOD solo cuando es imagen; si es video, su miniatura.
	const fallbackHero = `${ASSETS_BASE}/agujero-negro.png`;
	const heroSrc =
		dailyImage?.media_type === "image"
			? dailyImage.url
			: dailyImage?.thumbnail_url || fallbackHero;

	// 3. Desplazamiento suave a la sección de características
	const scrollToCaracteristicas = () => {
		document.getElementById("caracteristicas")?.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<section
			className="w-full min-h-[100dvh] flex flex-col justify-center gap-6 items-center px-5 pt-16 pb-16 text-white text-center relative overflow-hidden"
			style={{ backgroundImage: gradientBg }}
		>
			{/* Imagen de fondo APOD */}
			{heroSrc && (
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${heroSrc})` }}
					aria-hidden="true"
				/>
			)}

			{/* Capa de oscurecimiento sobre la imagen */}
			<div
				className="absolute inset-0 z-1"
				style={{
					backgroundColor: heroSrc
						? "rgba(0, 0, 0, 0.589)"
						: "rgba(0, 0, 0, 0.3)",
				}}
				aria-hidden="true"
			/>

			{/* Tooltip con información de la imagen */}
			<div
				className="flex justify-center items-center gap-1 absolute bottom-2.5 left-1 z-2 cursor-pointer md:bottom-5 md:left-2.5"
				onClick={toggleTooltip}
				onMouseEnter={() => setTooltipVisible(true)}
				onMouseLeave={() => setTooltipVisible(false)}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => e.key === "Enter" && toggleTooltip()}
			>
				{dailyImage?.title ? (
					<>
						<IoIosInformationCircle
							size={24}
							className="transition-colors duration-200"
							style={{ color: tooltipVisible ? "black" : "white" }}
						/>
						<p className="text-[3vw] md:text-[15px]">{dailyImage.title}</p>
						{/* Tooltip flotante con la descripción */}
						<div
							className="absolute bg-black/80 rounded-sm bottom-[28px] left-0 w-[90vw] h-auto text-[2.5vw] z-3 pointer-events-none transition-opacity duration-200 md:bottom-[30px] md:w-[50vw] md:text-[13px]"
							style={{ opacity: tooltipVisible ? 1 : 0 }}
						>
							<p className="m-2">{dailyImage.explanation}</p>
						</div>
					</>
				) : dailyError ? (
					<p className="text-[3vw] md:text-[15px]">Imagen de archivo</p>
				) : (
					<p className="text-[3vw] md:text-[15px]">
						Cargando imagen del día...
					</p>
				)}
			</div>

			{/* Contenido principal del hero */}
			<div className="flex flex-col items-center gap-8 z-2 w-full max-w-[1200px] mx-auto px-[1vw] md:px-0">
				<h1
					className="text-[8.1vw] md:text-[3.2rem] z-2 animate-reveal"
					style={revealDelay(0, 80)}
				>
					Explora el Universo
				</h1>
				<p
					className="text-[3.7vw] px-0 z-2 md:text-[1.2rem] max-w-[620px] mx-auto animate-reveal font-grotesk"
					style={revealDelay(1, 80)}
				>
					Imágenes del universo capturadas por la NASA, noticias de exploración
					espacial y una guía completa de los planetas y cuerpos de nuestro
					sistema solar.
				</p>
				{/* Barra de estadísticas como tarjetas */}
				<div
					className="w-full max-w-[900px] z-2 animate-reveal"
					style={revealDelay(2, 80)}
				>
					<BarraEstadisticas glass />
				</div>
				{/* Botón para explorar */}
				<div
					className="flex justify-center z-2 shrink-0 animate-reveal"
					style={revealDelay(3, 80)}
				>
					<Boton
						className="px-8 py-2.5 text-[14px] bg-accent/10 text-text-primary border border-accent/60 hover:bg-accent hover:text-bg-primary"
						onClick={scrollToCaracteristicas}
					>
						Explorar
					</Boton>
				</div>
			</div>
		</section>
	);
}

export default SeccionHero;
