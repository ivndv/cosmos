import { Icon } from "@iconify/react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const links = [
	{ to: "/", icon: "lucide:home", label: "Inicio" },
	{ to: "/galería-espacial", icon: "lucide:image", label: "Galería" },
	{ to: "/noticias", icon: "lucide:newspaper", label: "Noticias" },
	{ to: "/sistema-solar", icon: "lucide:orbit", label: "Sistema Solar" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<>
			<div
				className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
				onClick={toggleSidebar}
			/>
			<div
				className={`fixed top-0 left-0 w-[250px] h-full bg-bg-primary shadow-sidebar transition-transform duration-300 z-20 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
			>
				<button
					type="button"
					onClick={toggleSidebar}
					className="bg-none border-none cursor-pointer text-2xl p-2.5 text-text-primary"
					aria-label="Cerrar menú"
				>
					<AiOutlineClose />
				</button>

				<ul className="list-none p-5 flex flex-col gap-5">
					{links.map(({ to, icon, label }) => (
						<li key={to}>
							<Link
								to={to}
								onClick={toggleSidebar}
								aria-label={label}
								className="no-underline text-text-primary text-sm flex items-center gap-2 opacity-85 transition-colors duration-200 hover:text-accent hover:opacity-100"
							>
								<Icon icon={icon} width="18" />
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Sidebar;
