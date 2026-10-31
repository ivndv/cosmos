// React Router
import { Link } from "react-router-dom";
// Componentes
import EncabezadoSeccion from "@/components/ui/EncabezadoSeccion";
// Datos
import { sistemaSolar } from "@/data/sistemaSolar";

// Renderiza una fila horizontal con los planetas del sistema solar
function SeccionSistemaSolar() {
	const planetas = sistemaSolar?.planetas ?? [];

	return (
		<section className="w-full px-5 py-16 md:py-24">
			<div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
				<EncabezadoSeccion
					eyebrow="Vecindario cósmico"
					titulo="Explora el Sistema Solar"
					descripcion="Datos, distancias y características de cada planeta y cuerpo de nuestro vecindario cósmico."
				/>

				<div className="flex w-full gap-4 overflow-x-auto pb-3 animate-reveal">
					{planetas.map((planeta) => (
						<div
							key={planeta.title}
							className="flex w-[190px] shrink-0 flex-col items-center gap-3 rounded-lg border border-black/[0.06] bg-bg-surface p-4 text-center shadow-sm transition-colors duration-200 hover:border-accent/40"
						>
							<img
								src={planeta.url}
								alt={planeta.title}
								loading="lazy"
								className="h-24 w-24 rounded-full object-cover"
							/>
							<h3 className="m-0 text-[1rem] font-bold text-bg-secondary">
								{planeta.title}
							</h3>
							<p className="m-0 text-[12.5px] leading-[1.5] text-text-on-surface line-clamp-2">
								{planeta.explanation}
							</p>
						</div>
					))}
				</div>

				<Link
					to="/sistema-solar"
					className="self-start text-sm font-semibold text-accent no-underline transition-colors duration-200 hover:text-accent-hover"
				>
					Ver el sistema solar →
				</Link>
			</div>
		</section>
	);
}

export default SeccionSistemaSolar;
