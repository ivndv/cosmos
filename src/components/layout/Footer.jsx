import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const TECNOLOGIAS = ["React", "Tailwind", "Hono", "Cloudflare"];

const Footer = () => {
	return (
		<footer className="border-t border-[rgba(255,255,255,0.08)] transition-colors duration-300 w-full bg-bg-primary text-text-secondary flex flex-col items-center pt-10 md:pt-12 pb-6 md:pb-8">
			<div className="max-w-[1200px] w-full px-4 sm:px-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-10 w-full text-center">
					{/* Columna 1: Identidad y redes */}
					<div className="flex flex-col gap-3 items-center text-center max-w-xs md:items-start md:text-left">
						<div className="flex items-center gap-2 text-text-primary text-[1.4rem] font-bold justify-center md:justify-start">
							<Icon
								icon="lucide:rocket"
								className="text-[1.6rem] text-accent"
							/>
							Cosmos
						</div>
						<p className="m-0 text-sm leading-[1.6] text-text-secondary">
							Explora el universo a través de imágenes, noticias y datos del
							sistema solar en tiempo real.
						</p>
						<div className="mt-2 flex justify-center gap-2.5 md:justify-start">
							<a
								href="https://github.com/ivndv"
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-muted hover:text-accent transition-colors flex items-center justify-center bg-[rgba(255,255,255,0.06)] w-9 h-9 rounded-md"
								aria-label="GitHub"
							>
								<Icon icon="ri:github-fill" className="text-[22px]" />
							</a>
							<a
								href="https://www.linkedin.com/in/ivan-cruz-1906mx"
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-muted hover:text-accent transition-colors flex items-center justify-center bg-[rgba(255,255,255,0.06)] w-9 h-9 rounded-md"
								aria-label="LinkedIn"
							>
								<Icon icon="ri:linkedin-fill" className="text-[22px]" />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-muted hover:text-accent transition-colors flex items-center justify-center bg-[rgba(255,255,255,0.06)] w-9 h-9 rounded-md"
								aria-label="Instagram"
							>
								<Icon icon="ri:instagram-line" className="text-[22px]" />
							</a>
						</div>
					</div>

					{/* Columna 2: Navegación */}
					<div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left">
						<h3 className="font-bold text-text-primary uppercase tracking-wider text-sm text-center">
							Explorar
						</h3>
						<ul className="flex flex-col gap-2 text-sm text-text-muted p-0 m-0 list-none items-center text-center md:items-start md:text-left">
							<li>
								<Link
									to="/"
									className="text-text-secondary no-underline hover:text-accent transition-colors"
								>
									Inicio
								</Link>
							</li>
							<li>
								<Link
									to="/galería-espacial"
									className="text-text-secondary no-underline hover:text-accent transition-colors"
								>
									Galería Espacial
								</Link>
							</li>
							<li>
								<Link
									to="/noticias"
									className="text-text-secondary no-underline hover:text-accent transition-colors"
								>
									Noticias
								</Link>
							</li>
							<li>
								<Link
									to="/sistema-solar"
									className="text-text-secondary no-underline hover:text-accent transition-colors"
								>
									Sistema Solar
								</Link>
							</li>
						</ul>
					</div>

					{/* Columna 3: Datos */}
					<div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left">
						<h3 className="font-bold text-text-primary uppercase tracking-wider text-sm text-center">
							Datos
						</h3>
						<ul className="flex flex-col gap-2 text-sm text-text-muted p-0 m-0 list-none items-center text-center md:items-start md:text-left">
							<li>
								<a
									href="https://api.nasa.gov"
									target="_blank"
									rel="noopener noreferrer"
									className="text-text-secondary no-underline hover:text-accent transition-colors"
								>
									NASA API
								</a>
							</li>
							<li>
								<a
									href="https://apod.nasa.gov"
									target="_blank"
									rel="noopener noreferrer"
									className="text-text-secondary no-underline hover:text-accent transition-colors"
								>
									APOD
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Tecnologías utilizadas */}
				<div className="flex w-full flex-wrap items-center justify-center gap-2 border-t border-[rgba(255,255,255,0.08)] pt-6">
					{TECNOLOGIAS.map((tech) => (
						<span
							key={tech}
							className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-text-muted"
						>
							{tech}
						</span>
					))}
				</div>

				{/* Barra inferior */}
				<div className="pt-6 text-center">
					<address className="not-italic">
						<p className="m-0 text-xs text-text-muted">
							© {new Date().getFullYear()} Cosmos — Ivan Cruz
						</p>
					</address>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
