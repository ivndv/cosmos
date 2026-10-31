// Fuente Outfit
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/700.css";
// Fuente Space Grotesk (textos secundarios sobre imagen)
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
// TanStack Query
import { QueryClientProvider } from "@tanstack/react-query";
// React
import { createRoot } from "react-dom/client";
// React Router
import { BrowserRouter } from "react-router-dom";
// Estilos globales
import "./index.css";
// Componentes
import IrArriba from "@/components/common/IrArriba";
import LimiteErrores from "@/components/common/LimiteErrores";
// Cliente de consultas
import { queryClient } from "@/lib/queryClient";
// Rutas
import AppRoutes from "./routes";

// Renderiza la aplicación en el DOM con BrowserRouter
createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			{/* Desplazamiento al inicio al navegar */}
			<IrArriba />
			{/* Captura de errores de la interfaz */}
			<LimiteErrores>
				<AppRoutes />
			</LimiteErrores>
		</BrowserRouter>
	</QueryClientProvider>,
);
