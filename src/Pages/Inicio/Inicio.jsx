import CTABanner from "../../components/CTABanner/CTABanner";
import FeaturedContent from "../../components/FeaturedContent/FeaturedContent";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";

function Inicio() {
	return (
		<div className="w-full min-h-screen flex flex-col flex-1">
			<HeroSection />
			<FeaturesSection />
			<FeaturedContent />
			<CTABanner />
		</div>
	);
}

export default Inicio;
