// Fuente Outfit
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/700.css";
// React
import { createRoot } from "react-dom/client";
// React Router
import { BrowserRouter } from "react-router-dom";
// Estilos globales
import "./index.css";
// Componentes
import { IrArriba, LimiteErrores } from "./components";
// Rutas
import AppRoutes from "./routes";

// Renderiza la aplicación en el DOM con BrowserRouter
createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		{/* Desplazamiento al inicio al navegar */}
		<IrArriba />
		{/* Captura de errores de la interfaz */}
		<LimiteErrores>
			<AppRoutes />
		</LimiteErrores>
	</BrowserRouter>,
);
