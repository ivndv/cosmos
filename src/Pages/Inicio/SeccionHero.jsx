// React
import { useEffect, useState } from "react";
// Iconos
import { IoIosInformationCircle } from "react-icons/io";
import BarraEstadisticas from "../../components/BarraEstadisticas/BarraEstadisticas";
// Componentes
import Boton from "../../components/Boton/Boton";
// Store
import { useCosmosStore } from "../../store/cosmosStore";

// Gradiente de fondo predeterminado
const gradientBg =
	"linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 50%, #0d0d1a 100%)";

// Renderiza la sección hero con la imagen astronómica del día de fondo
function SeccionHero() {
	// 1. Obtiene la imagen del día y el estado de carga
	const dailyImage = useCosmosStore((s) => s.dailyImage);
	const dailyError = useCosmosStore((s) => s.dailyError);
	const fetchDailyImage = useCosmosStore((s) => s.fetchDailyImage);
	const [tooltipVisible, setTooltipVisible] = useState(false);

	// 2. Carga la imagen del día al montar el componente
	useEffect(() => {
		fetchDailyImage();
	}, [fetchDailyImage]);

	const toggleTooltip = () => setTooltipVisible((prev) => !prev);

	// 3. Desplazamiento suave a la sección de características
	const scrollToCaracteristicas = () => {
		document.getElementById("caracteristicas")?.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<section
			className="w-full min-h-screen flex flex-col justify-start gap-5 items-center px-5 pb-16 text-white text-center relative overflow-hidden md:h-screen md:justify-center"
			style={{ backgroundImage: gradientBg }}
		>
			{/* Imagen de fondo APOD */}
			{dailyImage?.url && (
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${dailyImage.url})` }}
					aria-hidden="true"
				/>
			)}

			{/* Capa de oscurecimiento sobre la imagen */}
			<div
				className="absolute inset-0 z-1"
				style={{
					backgroundColor: dailyImage?.url
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
					<p className="text-[3vw] md:text-[15px] text-red-400">{dailyError}</p>
				) : (
					<p className="text-[3vw] md:text-[15px]">
						Cargando imagen del día...
					</p>
				)}
			</div>

			{/* Contenido principal del hero */}
			<div className="flex flex-col items-center gap-10 z-2 w-full h-auto px-[1vw] pt-[20vh] pb-[10vh] md:px-0 md:pt-0 md:pb-0">
				<h1 className="text-[8vw] md:text-[3rem] z-2 animate-hero-1">
					Explora el Universo
				</h1>
				<p className="text-[4vw] px-0 z-2 md:text-[1.2rem] md:px-[50px] animate-hero-2">
					Explora el universo desde aquí: imágenes astronómicas diarias, las
					últimas noticias y un viaje por cada planeta.
				</p>
				{/* Barra de estadísticas con efecto glass */}
				<div className="w-full max-w-[1200px] h-[380px] bg-[rgba(13,13,26,0.5)] backdrop-blur-[10px] rounded-lg border border-[rgba(255,255,255,0.08)] z-2 shrink-0 md:h-[150px] animate-hero-3">
					<BarraEstadisticas glass />
				</div>
				{/* Botón para explorar */}
				<div className="flex justify-center z-2 shrink-0 animate-hero-4">
					<Boton
						className="w-[110px] h-[30px] text-sm bg-bg-secondary text-text-primary border border-bg-secondary hover:bg-bg-hover"
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
