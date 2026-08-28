/**
 * Validador de endpoints y parámetros de consulta
 * Protege contra path traversal y accesos a rutas no permitidas.
 */
export class EndpointValidator {
	/**
	 * @param {string[]} allowedEndpoints - Endpoints en la lista blanca
	 */
	constructor(allowedEndpoints = ["apod"]) {
		this.allowedEndpoints = new Set(allowedEndpoints);
	}

	/**
	 * Valida si un endpoint está permitido
	 * @param {string} endpoint
	 * @returns {{ isValid: boolean, error?: string }}
	 */
	validate(endpoint) {
		if (!this.allowedEndpoints.has(endpoint)) {
			return {
				isValid: false,
				error: `endpoint not allowed: ${endpoint}`,
			};
		}
		return { isValid: true };
	}
}
