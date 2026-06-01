import { useEffect, useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import Button from "../../components/Button/Button";
import StatsBar from "../../components/StatsBar/StatsBar";
import { useCosmosStore } from "../../store/cosmosStore";

const gradientBg =
	"linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 50%, #0d0d1a 100%)";

function HeroSection() {
	const dailyImage = useCosmosStore((s) => s.dailyImage);
	const dailyError = useCosmosStore((s) => s.dailyError);
	const fetchDailyImage = useCosmosStore((s) => s.fetchDailyImage);
	const [tooltipVisible, setTooltipVisible] = useState(false);

	useEffect(() => {
		fetchDailyImage();
	}, [fetchDailyImage]);

	const toggleTooltip = () => setTooltipVisible((prev) => !prev);

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
			{dailyImage?.url && (
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${dailyImage.url})` }}
					aria-hidden="true"
				/>
			)}

			<div
				className="absolute inset-0 z-1"
				style={{
					backgroundColor: dailyImage?.url
						? "rgba(0, 0, 0, 0.589)"
						: "rgba(0, 0, 0, 0.3)",
				}}
				aria-hidden="true"
			/>

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
						<div
							className="absolute bg-black/80 rounded-sm bottom-[28px] left-0 w-[90vw] h-auto text-[2.5vw] z-3 pointer-events-none transition-opacity duration-200 md:bottom-[30px] md:w-[50vw] md:text-[13px]"
							style={{ opacity: tooltipVisible ? 1 : 0 }}
						>
							<p className="m-2">{dailyImage.explanation}</p>
						</div>
					</>
				) : dailyError ? (
					<p className="text-[3vw] md:text-[15px] text-red-400">
						{dailyError}
					</p>
				) : (
					<p className="text-[3vw] md:text-[15px]">
						Cargando imagen del día...
					</p>
				)}
			</div>

		<div className="flex flex-col items-center gap-10 z-2 w-full h-auto px-[1vw] pt-[20vh] pb-[10vh] md:px-0 md:pt-0 md:pb-0">
				<h1 className="text-[8vw] md:text-[3rem] z-2 animate-hero-1">
					Explora el Universo
				</h1>
				<p className="text-[4vw] px-0 z-2 md:text-[1.2rem] md:px-[50px] animate-hero-2">
					Explora el universo desde aquí: imágenes astronómicas diarias, las
					últimas noticias y un viaje por cada planeta.
				</p>
				<div className="w-full max-w-[1200px] h-[380px] bg-[rgba(13,13,26,0.5)] backdrop-blur-[10px] rounded-lg border border-[rgba(255,255,255,0.08)] z-2 shrink-0 md:h-[150px] animate-hero-3">
					<StatsBar glass />
				</div>
				<div className="flex justify-center z-2 shrink-0 animate-hero-4">
					<Button
						className="w-[110px] h-[30px] text-sm bg-bg-secondary text-text-primary border border-bg-secondary hover:bg-bg-hover"
						onClick={scrollToCaracteristicas}
					>
						Explorar
					</Button>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
