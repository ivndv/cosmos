// Componentes
import EncabezadoSeccion from "@/components/ui/EncabezadoSeccion";
// Config
import { ASSETS_BASE } from "@/config/assets";
// Hooks
import { useDailyImage } from "@/hooks/useNasa";

// Imagen de respaldo mientras NASA responde o si falla
const IMAGEN_RESPALDO = `${ASSETS_BASE}/agujero-negro.png`;

// Renderiza la imagen astronómica del día con skeleton loading.
// Inspirado en la sección "Image Of The Day" de nasa.gov: texto arriba,
// imagen a ancho completo debajo.
function ContenidoDestacado() {
	// 1. Imagen del día compartida con el hero vía TanStack Query
	const { data: dailyImage, isLoading } = useDailyImage();

	// 2. Si NASA publica un video, se usa su miniatura; si no hay datos, el respaldo
	const imageSrc =
		dailyImage?.media_type === "image"
			? dailyImage.url
			: dailyImage?.thumbnail_url || IMAGEN_RESPALDO;

	return (
		<section className="w-full px-5 py-16 md:py-28">
			<div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
				{/* Encabezado y datos de la imagen */}
				<div className="flex flex-col gap-4 animate-reveal">
					<EncabezadoSeccion eyebrow="Hoy" titulo="La Imagen del Día" />

					{isLoading ? (
						<>
							{/* Skeleton del texto */}
							<div className="h-7 w-3/5 rounded-sm bg-gradient-to-r from-[#2a2a4a] via-[#3a3a5a] to-[#2a2a4a] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
							<div className="h-4 w-full max-w-[820px] rounded-sm bg-[#e6e6ee]" />
							<div className="h-4 w-4/5 max-w-[680px] rounded-sm bg-[#e6e6ee]" />
						</>
					) : dailyImage ? (
						<>
							<h3 className="m-0 text-[1.25rem] font-bold text-bg-secondary md:text-[1.5rem]">
								{dailyImage.title}
							</h3>
							<p className="m-0 max-w-[820px] text-[0.95rem] leading-[1.7] text-text-on-surface md:text-base">
								{dailyImage.explanation}
							</p>
							<a
								href={dailyImage.hdurl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent no-underline transition-colors duration-200 hover:text-accent-hover"
							>
								Ver en NASA
								<span aria-hidden="true">→</span>
							</a>
						</>
					) : (
						<p className="m-0 max-w-[820px] text-[0.95rem] leading-[1.7] text-text-on-surface md:text-base">
							Imagen de archivo
						</p>
					)}
				</div>

				{/* Imagen a ancho completo */}
				{isLoading ? (
					<div className="aspect-video w-full rounded-lg bg-gradient-to-r from-[#2a2a4a] via-[#3a3a5a] to-[#2a2a4a] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
				) : (
					imageSrc && (
						<img
							src={imageSrc}
							alt={dailyImage?.title || "Imagen astronómica del día"}
							loading="lazy"
							className="aspect-video w-full rounded-lg object-cover shadow-img"
						/>
					)
				)}
			</div>
		</section>
	);
}

export default ContenidoDestacado;
