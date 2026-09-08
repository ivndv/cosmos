import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const links = [
	{ to: "/", icon: "lucide:home", label: "Inicio" },
	{ to: "/galería-espacial", icon: "lucide:image", label: "Galería" },
	{ to: "/noticias", icon: "lucide:newspaper", label: "Noticias" },
	{ to: "/sistema-solar", icon: "lucide:orbit", label: "Sistema Solar" },
];

function Navbar() {
	return (
		<nav className="flex gap-4 z-1">
			{links.map(({ to, icon, label }) => (
				<Link
					key={to}
					to={to}
					aria-label={label}
					className="no-underline text-text-primary text-sm flex items-center gap-1.5 opacity-85 transition-colors duration-200 hover:text-accent hover:opacity-100"
				>
					<Icon icon={icon} width="16" />
					{label}
				</Link>
			))}
		</nav>
	);
}

export default Navbar;
