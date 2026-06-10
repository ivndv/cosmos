// React
import { useEffect, useState } from "react";

// Hook de carrusel automático con intervalo de 5 segundos
const useCarrusel = (images) => {
	// 1. Inicializa el índice de la imagen actual
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		// 2. Configura el intervalo para cambiar de imagen automáticamente
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);

		// 3. Limpia el intervalo al desmontar el componente
		return () => clearInterval(interval);
	}, [images]);

	// 4. Retorna el índice actual y la función para actualizarlo manualmente
	return { currentIndex, setCurrentIndex };
};

export default useCarrusel;
