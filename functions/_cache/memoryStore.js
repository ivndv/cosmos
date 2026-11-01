/**
 * Almacén de caché en memoria del isolate.
 * Sirve como respaldo cuando la Cache API no está disponible (tests) y como segunda lectura.
 */
export class MemoryStore {
	constructor() {
		this.store = new Map();
	}

	/**
	 * @param {string} key
	 * @returns {{ data: any, status: number } | null}
	 */
	get(key) {
		const entrada = this.store.get(key);
		if (!entrada) return null;

		if (Date.now() >= entrada.expiresAt) {
			this.store.delete(key);
			return null;
		}

		return { data: entrada.data, status: entrada.status };
	}

	/**
	 * @param {string} key
	 * @param {any} data
	 * @param {number} status
	 * @param {number} ttlSeconds
	 */
	set(key, data, status, ttlSeconds) {
		this.store.set(key, {
			data,
			status,
			expiresAt: Date.now() + ttlSeconds * 1000,
		});
	}

	clear() {
		this.store.clear();
	}
}
