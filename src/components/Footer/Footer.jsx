import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="border-t border-[rgba(255,255,255,0.08)] transition-colors duration-300 w-full bg-bg-primary text-text-secondary flex flex-col items-center pt-12 md:pt-16 pb-8 md:pb-12">
			<div className="max-w-[1200px] w-full px-4 sm:px-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 w-full text-center">
					{/* Columna 1: Identidad y redes */}
					<div className="flex flex-col gap-4 items-center text-center max-w-xs">
						<div className="flex items-center gap-2 text-text-primary text-[1.4rem] font-bold justify-center">
							<Icon
								icon="lucide:rocket"
								className="text-[1.6rem] text-accent"
							/>
							Cosmos
						</div>
						<p className="text-text-secondary text-sm leading-[1.6] text-center max-w-xs">
							Explora el universo a través de imágenes, noticias y datos del
							sistema solar en tiempo real.
						</p>
						<div className="flex gap-4 mt-2 justify-center">
							<a
								href="https://github.com/ivndv"
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-muted hover:text-accent transition-all hover:scale-110 flex items-center justify-center bg-[rgba(255,255,255,0.06)] w-10 h-10 rounded-sm"
								aria-label="GitHub"
							>
								<Icon icon="ri:github-fill" className="text-lg" />
							</a>
							<a
								href="https://www.linkedin.com/in/ivan-cruz-1906mx"
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-muted hover:text-accent transition-all hover:scale-110 flex items-center justify-center bg-[rgba(255,255,255,0.06)] w-10 h-10 rounded-sm"
								aria-label="LinkedIn"
							>
								<Icon icon="ri:linkedin-fill" className="text-lg" />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-text-muted hover:text-accent transition-all hover:scale-110 flex items-center justify-center bg-[rgba(255,255,255,0.06)] w-10 h-10 rounded-sm"
								aria-label="Instagram"
							>
								<Icon icon="ri:instagram-line" className="text-lg" />
							</a>
						</div>
					</div>

					{/* Columna 2: Navegación */}
					<div className="flex flex-col gap-4 items-center text-center">
						<h3 className="font-bold text-text-primary uppercase tracking-wider text-sm text-center">
							Explorar
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-text-muted p-0 m-0 list-none items-center text-center">
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
					<div className="flex flex-col gap-4 items-center text-center">
						<h3 className="font-bold text-text-primary uppercase tracking-wider text-sm text-center">
							Datos
						</h3>
						<ul className="flex flex-col gap-3 text-sm text-text-muted p-0 m-0 list-none items-center text-center">
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

				{/* Barra inferior */}
				<hr className="border-none border-t border-[rgba(255,255,255,0.08)] m-0" />
				<div className="pt-8 flex flex-col items-center gap-6 w-full text-center">
					<address className="not-italic">
						<p className="text-xs text-text-muted m-0">
							© {new Date().getFullYear()} Cosmos — Ivan Cruz
						</p>
					</address>
					<p className="text-xs text-text-muted m-0">
						Datos provistos por la API de la NASA 🚀
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
