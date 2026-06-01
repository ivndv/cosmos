import "@fontsource/outfit/400.css";
import "@fontsource/outfit/700.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop/ScrolltoTop";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AppRoutes from "./routes";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ScrollToTop />
		<ErrorBoundary>
			<AppRoutes />
		</ErrorBoundary>
	</BrowserRouter>,
);
