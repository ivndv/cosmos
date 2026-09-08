/**
 * Cliente HTTP para la API Planetary de NASA
 * Maneja timeouts con AbortController, sanitización de credenciales y errores de red.
 */
export class NasaClient {
	/**
	 * @param {string} baseUrl - URL base de NASA Planetary
	 * @param {number} timeoutMs - Timeout máximo en ms (default: 60s)
	 */
	constructor(baseUrl = "https://api.nasa.gov/planetary", timeoutMs = 60_000) {
		this.baseUrl = baseUrl;
		this.timeoutMs = timeoutMs;
	}

	/**
	 * Oculta la clave de API en las URLs para los logs
	 * @param {string} url
	 * @param {string} apiKey
	 * @returns {string}
	 */
	sanitizeUrl(url, apiKey) {
		return apiKey ? url.replace(apiKey, "***") : url;
	}

	/**
	 * Realiza la petición a la API de NASA
	 * @param {string} endpoint - Endpoint de NASA (ej. 'apod')
	 * @param {string|null} count - Cantidad opcional de imágenes
	 * @param {string} apiKey - API Key de NASA
	 * @returns {Promise<{ data: any, status: number }>}
	 */
	async fetchEndpoint(endpoint, count, apiKey) {
		const query = count
			? `?count=${count}&api_key=${apiKey}`
			: `?api_key=${apiKey}`;
		const url = `${this.baseUrl}/${endpoint}${query}`;

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

		let response;
		try {
			response = await fetch(url, { signal: controller.signal });
		} catch (err) {
			console.error(
				"[NASA] Error de red:",
				err.message,
				"URL:",
				this.sanitizeUrl(url, apiKey),
			);
			const msg =
				err.name === "AbortError"
					? "La API de NASA tardó demasiado en responder. Intenta de nuevo."
					: "No se pudo conectar con la API de NASA";
			const error = new Error(msg);
			error.status = 502;
			throw error;
		} finally {
			clearTimeout(timeout);
		}

		let data;
		try {
			data = await response.json();
		} catch (err) {
			console.error(
				"[NASA] Error al parsear respuesta:",
				err.message,
				"Status:",
				response.status,
				"URL:",
				this.sanitizeUrl(url, apiKey),
			);
			const error = new Error("Respuesta inválida de la API de NASA");
			error.status = 502;
			throw error;
		}

		const status = response.ok ? 200 : response.status;
		return { data, status };
	}
}
