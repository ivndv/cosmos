import { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
					<h1 className="text-2xl font-bold">Algo salió mal</h1>
					<p className="text-text-on-surface max-w-md">
						Ocurrió un error inesperado. Recarga la página o intenta más tarde.
					</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="px-6 py-3 bg-bg-secondary text-text-primary rounded-md cursor-pointer font-semibold hover:bg-bg-hover transition-colors"
					>
						Recargar página
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
