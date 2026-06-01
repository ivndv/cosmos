import { IoRocket } from "react-icons/io5";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-6 p-8 text-center">
			<IoRocket className="text-5xl text-accent -rotate-45" />
			<h1 className="text-6xl text-text-primary leading-none">404</h1>
			<p className="text-[1.25rem] text-text-secondary max-w-[400px]">
				La página que buscas no existe o fue desplazada a otro rincón del
				universo.
			</p>
			<Link
				to="/"
				className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-text-primary rounded-md no-underline font-bold text-base transition-colors duration-200 hover:bg-accent-hover"
			>
				Volver al inicio
			</Link>
		</div>
	);
}

export default NotFound;
