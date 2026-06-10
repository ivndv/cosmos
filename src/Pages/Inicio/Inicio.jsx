import BannerCTA from "../../components/BannerCTA/BannerCTA";
import ContenidoDestacado from "../../components/ContenidoDestacado/ContenidoDestacado";
import SeccionCaracteristicas from "./SeccionCaracteristicas";
import SeccionHero from "./SeccionHero";

function Inicio() {
	return (
		<div className="w-full min-h-screen flex flex-col flex-1">
			<SeccionHero />
			<SeccionCaracteristicas />
			<ContenidoDestacado />
			<BannerCTA />
		</div>
	);
}

export default Inicio;
