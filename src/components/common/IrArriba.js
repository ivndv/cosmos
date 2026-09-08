// React
import { useEffect } from "react";
// React Router
import { useLocation } from "react-router-dom";

// Desplaza la ventana al inicio al cambiar de ruta
const IrArriba = () => {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: need pathname to re-run on route changes
	useEffect(() => {
		// 1. Desplaza al tope de la página al navegar
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default IrArriba;
