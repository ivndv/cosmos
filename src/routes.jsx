import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App.jsx";

const Inicio = lazy(() => import("./Pages/Inicio/Inicio.jsx"));
const Galería = lazy(() => import("./Pages/Galeria/Galería.jsx"));
const Noticias = lazy(() => import("./Pages/Noticias/Noticias.jsx"));
const Noticia = lazy(() => import("./Pages/Noticias/Noticia.jsx"));
const SistemaSolar = lazy(() => import("./Pages/SistemaSolar/SistemaSolar.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound.jsx"));

function SpinnerFallback() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-bg-primary">
			<div className="border-[8px] border-[#f3f3f3] border-t-[8px] border-t-[#3498db] rounded-full w-[50px] h-[50px] animate-spin" />
		</div>
	);
}

function AppRoutes() {
	return (
		<Suspense fallback={<SpinnerFallback />}>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Inicio />} />
					<Route path="/galería-espacial" element={<Galería />} />
					<Route path="/noticias" element={<Noticias />} />
					<Route path="/noticias/:slug" element={<Noticia />} />
					<Route path="/sistema-solar" element={<SistemaSolar />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;
