import { useLocation, useNavigate } from "react-router-dom";
import Boton from "../../components/Boton/Boton";
import { noticias } from "../../data/noticias";

const Noticia = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = location.state || {};
	const noticia = noticias.find((n) => n.id === id);

	if (!noticia) {
		return (
			<div className="px-5 pt-[100px] pb-16 max-w-[820px] mx-auto flex flex-col gap-7">
				<p>Noticia no encontrada.</p>
			<Boton
					className="px-6 py-3 text-base bg-bg-secondary text-text-primary border border-bg-secondary hover:bg-bg-hover"
					onClick={() => navigate("/noticias")}
				>
					← Volver a Noticias
			</Boton>
			</div>
		);
	}

	return (
		<div className="px-5 pt-[100px] pb-16 max-w-[820px] mx-auto flex flex-col gap-7">
			<img
				src={noticia.url}
				alt={noticia.title}
				className="w-full max-h-[420px] object-cover rounded-lg shadow-img"
			/>

			<div className="flex items-center gap-4 text-sm text-[#888] flex-wrap">
				<span className="bg-bg-secondary text-text-primary px-2.5 py-1 rounded-md text-xs font-semibold">
					{noticia.categoria}
				</span>
				<span>Por {noticia.author}</span>
				<span>
					{new Date(noticia.date).toLocaleDateString("es-MX", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</span>
				<span>👁 {noticia.views.toLocaleString()} vistas</span>
			</div>

			<h1 className="text-2xl md:text-[1.4rem] font-extrabold text-bg-secondary leading-[1.3] m-0">
				{noticia.title}
			</h1>

			<p className="text-[1.1rem] text-text-on-surface leading-[1.7] border-l-4 border-l-bg-secondary pl-4 m-0">
				{noticia.explanation}
			</p>

			<hr className="border-none border-t border-[#eee] m-0" />

			<p className="text-base text-[#333] leading-[1.8] m-0">
				{noticia.content}
			</p>

			<div className="flex flex-wrap gap-2">
				{noticia.keywords.map((kw) => (
					<span
						key={kw}
						className="bg-bg-surface-alt text-text-on-surface rounded-md px-3 py-1 text-sm"
					>
						#{kw}
					</span>
				))}
			</div>

			<hr className="border-none border-t border-[#eee] m-0" />

			<Boton
				className="px-6 py-3 text-base bg-bg-secondary text-text-primary border border-bg-secondary hover:bg-bg-hover"
				onClick={() => navigate("/noticias")}
			>
				← Volver a Noticias
			</Boton>
		</div>
	);
};

export default Noticia;
