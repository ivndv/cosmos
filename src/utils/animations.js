/**
 * Retraso escalonado para animaciones de entrada.
 * @param {number} index - Posición del elemento en la secuencia (0, 1, 2...)
 * @param {number} step - Milisegundos entre cada elemento
 * @returns {{ animationDelay: string }}
 */
export function revealDelay(index = 0, step = 80) {
	return { animationDelay: `${index * step}ms` };
}
