import { useEffect, useState } from "react"; // Importa los hooks necesarios de React

const useCarrusel = (images) => {
	// Define el custom hook que recibe un array de imágenes
	const [currentIndex, setCurrentIndex] = useState(0); // Inicializa el índice actual en 0

	useEffect(() => {
		// Hook que se ejecuta cuando cambia la longitud de 'images'
		const interval = setInterval(() => {
			// Configura un intervalo para cambiar la imagen
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Aumenta el índice y lo reinicia si alcanza el final
		}, 5000); // Cambia cada 5 segundos

		return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
	}, [images]);

	return { currentIndex, setCurrentIndex }; // Retorna el índice actual y la función para actualizarlo
};

export default useCarrusel; // Exporta el hook para que pueda ser utilizado en otros componentes
