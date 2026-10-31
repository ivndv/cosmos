import BannerCTA from "./BannerCTA";
import ContenidoDestacado from "./ContenidoDestacado";
import SeccionCaracteristicas from "./SeccionCaracteristicas";
import SeccionHero from "./SeccionHero";
import SeccionNoticias from "./SeccionNoticias";
import SeccionSistemaSolar from "./SeccionSistemaSolar";

function Inicio() {
	return (
		<div className="w-full min-h-screen flex flex-col flex-1">
			<SeccionHero />
			<SeccionCaracteristicas />
			<ContenidoDestacado />
			<SeccionNoticias />
			<SeccionSistemaSolar />
			<BannerCTA />
		</div>
	);
}

export default Inicio;
