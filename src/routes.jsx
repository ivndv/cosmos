// React
import { lazy, Suspense } from "react";
// React Router
import { Route, Routes } from "react-router-dom";
// Layout
import App from "./App.jsx";

// Lazy loading de páginas
const Inicio = lazy(() => import("./Pages/Inicio/Inicio.jsx"));
const Galería = lazy(() => import("./Pages/Galeria/Galería.jsx"));
const Noticias = lazy(() => import("./Pages/Noticias/Noticias.jsx"));
const Noticia = lazy(() => import("./Pages/Noticias/Noticia.jsx"));
const SistemaSolar = lazy(
	() => import("./Pages/SistemaSolar/SistemaSolar.jsx"),
);
const NoEncontrado = lazy(
	() => import("./Pages/NoEncontrado/NoEncontrado.jsx"),
);

// Spinner mostrado mientras carga una página lazy
function SpinnerFallback() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-bg-primary">
			<div className="border-[8px] border-[#f3f3f3] border-t-[8px] border-t-[#3498db] rounded-full w-[50px] h-[50px] animate-spin" />
		</div>
	);
}

// Define las rutas de la aplicación con lazy loading
function AppRoutes() {
	return (
		<Suspense fallback={<SpinnerFallback />}>
			<Routes>
				<Route path="/" element={<App />}>
					{/* Página de inicio */}
					<Route index element={<Inicio />} />
					{/* Galería espacial */}
					<Route path="/galería-espacial" element={<Galería />} />
					{/* Lista de noticias */}
					<Route path="/noticias" element={<Noticias />} />
					{/* Detalle de noticia */}
					<Route path="/noticias/:slug" element={<Noticia />} />
					{/* Sistema solar interactivo */}
					<Route path="/sistema-solar" element={<SistemaSolar />} />
					{/* Ruta 404 */}
					<Route path="*" element={<NoEncontrado />} />
				</Route>
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;
