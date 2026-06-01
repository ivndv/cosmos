import { Link } from "react-router-dom";

function FeatureCard({ titulo, descripcion, image, to }) {
	return (
		<div className="relative w-full h-[300px] md:h-auto md:min-h-[220px] rounded-md overflow-hidden cursor-pointer group">
			<div
				className="absolute inset-0 bg-cover bg-center transition-transform duration-[400ms] group-hover:scale-105"
				style={{ backgroundImage: `url(${image})` }}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20" />
			<div className="relative z-1 flex flex-col justify-end h-full p-6 text-white">
				<h3 className="text-[1.6rem] md:text-[1.3rem] font-bold mb-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
					{titulo}
				</h3>
				<p className="text-sm leading-[1.5] [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] opacity-90 mb-0 md:text-sm">
					{descripcion}
				</p>
				<Link
					to={to}
					className="mt-4 self-start inline-flex items-center justify-center px-4 py-2 text-sm font-semibold bg-transparent text-accent border border-accent rounded-md no-underline cursor-pointer transition-all duration-300 hover:bg-accent hover:text-text-primary"
				>
					Mostrar más
				</Link>
			</div>
		</div>
	);
}

export default FeatureCard;
