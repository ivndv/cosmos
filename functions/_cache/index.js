import { EdgeStore } from "./edgeStore";
import { MemoryStore } from "./memoryStore";

/**
 * Fachada de caché: intenta primero el borde y luego la memoria del isolate.
 */
export class CacheService {
	/**
	 * @param {{ edge?: EdgeStore, memory?: MemoryStore }} [stores]
	 */
	constructor({ edge = new EdgeStore(), memory = new MemoryStore() } = {}) {
		this.edge = edge;
		this.memory = memory;
	}

	/**
	 * @param {string} key
	 * @returns {Promise<{ data: any, status: number } | null>}
	 */
	async get(key) {
		const desdeBorde = await this.edge.get(key);
		if (desdeBorde) return desdeBorde;
		return this.memory.get(key);
	}

	/**
	 * @param {string} key
	 * @param {any} data
	 * @param {number} status
	 * @param {import('hono').Context} [c]
	 * @param {number} ttlSeconds
	 */
	async set(key, data, status, c, ttlSeconds) {
		this.memory.set(key, data, status, ttlSeconds);
		await this.edge.set(key, data, status, c, ttlSeconds);
	}

	clear() {
		this.memory.clear();
	}
}
