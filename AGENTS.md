# AGENTS.md — Cosmos

## 1. Visión general

Explora el universo con imágenes astronómicas, noticias y sistema solar.

## 2. Antes de tocar código

- Lee `docs/DOCUMENTACION.md` — arquitectura, API de NASA, R2 y reglas.
- Lee `README.md` para el panorama general.

**CodeGraph** (índice de símbolos del repo): usa `codegraph_explore` (`query`, `maxFiles`, `projectPath`) antes de un grep masivo o de leer varios archivos; devuelve fuente verbatim, rutas de llamada e impacto.

- `codegraph sync /home/ivan/software-dev/cosmos` tras editar, pull o cambiar de rama (incremental, uso normal).
- `codegraph index /home/ivan/software-dev/cosmos` solo al crear el índice, tras `codegraph upgrade` o si `status` avisa `built by vX` (rebuild completo).
- `codegraph status /home/ivan/software-dev/cosmos` para comprobar el estado.

## 3. Stack tecnológico

| Capa                 | Tecnología                         |
| :------------------- | :--------------------------------- |
| **Frontend**         | React 19 + Vite 8                  |
| **Estilos**          | Tailwind CSS 4                     |
| **Datos en cliente** | TanStack Query                     |
| **BFF**              | Hono en Cloudflare Pages Functions |
| **Hosting**          | Cloudflare Pages                   |
| **Runtime & gestor** | Bun                                |
| **Linter/Formatter** | Biome                              |
| **Testing**          | Vitest + Playwright                |

## 4. Estructura del código

```plaintext
functions/
├── api/[[route]].js      → validación y orquestación
├── _middleware/          → rateLimit y cache
├── _cache/               → borde + memoria, claves y TTL
│   ├── index.js          → fachada (EdgeStore + MemoryStore)
│   ├── edgeStore.js      → caches.default
│   ├── memoryStore.js    → Map del isolate
│   └── keys.js           → claves y TTL por endpoint
├── _ratelimit/           → contador por IP y ventana
├── _services/            → nasaClient, imagesClient
└── _validators/          → whitelist de endpoints
```

## 5. Arquitectura y flujo de datos

### 5.1 SPA y BFF

- La SPA React + Vite se sirve desde Cloudflare Pages usando `dist/`.
- El BFF (`functions/api/[[route]].js`) concentra la comunicación con NASA, la validación de parámetros, el rate limit y la caché.

### 5.2 Caché y límites

- **TanStack Query:** 1 h de `staleTime`, 6 h de `gcTime`, dedupe por `queryKey`.
- **Cache API:** APOD hasta medianoche (clave `apod:YYYY-MM-DD`), galería 1 h.
- **Memoria del isolate:** respaldo y segunda lectura.
- **Rate limit:** 30 req/min por IP, en memoria del isolate.
- **Navegador:** la API no manda `Cache-Control` a propósito; TanStack cubre la sesión.

### 5.3 Endpoints

| Ruta                                         | Qué hace         |
| :------------------------------------------- | :--------------- |
| `GET /api/nasa?endpoint=apod`                | Imagen del día   |
| `GET /api/nasa?endpoint=images&page=1&q=...` | Galería paginada |

Si el APOD del día falla, el BFF responde **503** y el frontend usa `agujero-negro.png` como respaldo.

## 6. Variables de entorno

- **Local:** `.env.example` → `.dev.vars` (`NASA_API_KEY`, `VITE_USE_MOCKS`).
- **Producción:** `wrangler.jsonc` + variables de Cloudflare Pages.

## 7. Comandos

Todos los comandos se ejecutan con **Bun**.

### 7.1 Desarrollo y build

```bash
# Servidor de desarrollo Vite SPA
bun run dev

# Build + Pages local (wrangler pages dev dist/ --port 4321)
bun run dev:full

# Compilación de producción (dist/)
bun run build

# Valida que el BFF compile
bunx wrangler pages functions build

# Previsualización del build estático
bun run preview
```

### 7.2 Linter y formato (Biome)

```bash
# Diagnóstico y corrección con Biome
bun run check

# Linter con Biome
bun run lint

# Formateo con Biome
bun run format
```

### 7.3 Testing (Vitest y Playwright)

```bash
# 3 pruebas unitarias (App y Footer) con Vitest
bun run test:unit

# Vitest en modo watch
bun run test:unit:watch

# Smoke tests sobre dist/ en Pages local
bun run test:smoke

# Suite End-to-End en Chromium
bun run test:e2e
```

## 8. Convenciones y reglas críticas

### 8.1 Idioma y estilo

- Español en código, rutas, componentes y comentarios.

### 8.2 Qué NO hacer

- No modificar endpoints fuera de la whitelist de NASA sin actualizar validadores y CSP.
- No mover lógica de caché o rate limit al route: vive en `_middleware` y sus stores.

## 9. Flujo de Git y despliegue

- **PROHIBIDO hacer commits o push sin la aprobación explícita del usuario.**
- **Flujo de ramas:** desarrollo en `develop`; merge a `main` solo tras aprobación.
- **Mensajes de commit:** _Conventional Commits_ en minúsculas y español (`feat: ...`, `fix: ...`, `chore: ...`).
- **Despliegue:** Cloudflare Pages sirve `dist/` y las Pages Functions; la configuración vive en `wrangler.jsonc`.
