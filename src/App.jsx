// React Router
import { Outlet } from "react-router-dom";
// Componentes
import { Header, Footer } from "./components";

// Layout principal con header, contenido y footer
function App() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Encabezado de navegación */}
			<Header />
			{/* Contenido de la página actual */}
			<main className="flex-1">
				<Outlet />
			</main>
			{/* Pie de página */}
			<Footer />
		</div>
	);
}

export default App;
