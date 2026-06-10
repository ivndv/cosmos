// React
import { useEffect, useRef, useState } from "react";

// Hook de IntersectionObserver para detectar visibilidad de elementos (one-shot)
function useInView({ threshold = 0.1 } = {}) {
	const ref = useRef(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		// 1. Obtiene la referencia al elemento del DOM
		const el = ref.current;
		if (!el) return;

		// 2. Crea el observer que detecta cuando el elemento entra en el viewport
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// 3. Marca como visible y deja de observar (one-shot)
					setInView(true);
					observer.unobserve(el);
				}
			},
			{ threshold },
		);

		// 4. Comienza a observar el elemento
		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold]);

	return [ref, inView];
}

export default useInView;
