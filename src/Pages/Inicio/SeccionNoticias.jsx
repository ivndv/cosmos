// React Router
import { Link } from "react-router-dom";
// Componentes
import EncabezadoSeccion from "@/components/ui/EncabezadoSeccion";
// Datos
import { noticias } from "@/data/noticias";
// Utilidades
import { generarSlug } from "@/utils/slug";

// Renderiza las últimas noticias destacadas en la portada
function SeccionNoticias() {
	const destacadas = noticias.slice(0, 3);

	return (
		<section className="w-full px-5 py-16 md:py-24">
			<div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
				<EncabezadoSeccion
					eyebrow="Actualidad"
					titulo="Últimas Noticias"
					descripcion="Descubrimientos, misiones y avances de la exploración espacial."
				/>

				<div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-reveal">
					{destacadas.map((noticia) => (
						<Link
							key={noticia.id}
							to={`/noticias/${generarSlug(noticia.title)}`}
							state={{ id: noticia.id }}
							className="group flex h-full flex-col overflow-hidden rounded-lg border border-black/[0.06] bg-bg-surface no-underline shadow-sm transition-colors duration-200 hover:border-accent/40"
						>
							<div className="aspect-[16/9] overflow-hidden">
								<img
									src={noticia.url}
									alt={noticia.title}
									loading="lazy"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="flex flex-1 flex-col gap-2 p-5">
								<span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
									{noticia.categoria}
								</span>
								<h3 className="m-0 text-[1.05rem] font-bold leading-[1.35] text-bg-secondary line-clamp-2">
									{noticia.title}
								</h3>
								<p className="m-0 text-[13.5px] leading-[1.6] text-text-on-surface line-clamp-2">
									{noticia.explanation}
								</p>
							</div>
						</Link>
					))}
				</div>

				<Link
					to="/noticias"
					className="self-start text-sm font-semibold text-accent no-underline transition-colors duration-200 hover:text-accent-hover"
				>
					Ver todas las noticias →
				</Link>
			</div>
		</section>
	);
}

export default SeccionNoticias;
