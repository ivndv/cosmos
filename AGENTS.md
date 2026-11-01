# Cosmos

Explora el universo con imágenes astronómicas, noticias y sistema solar. Vite 8 + React 19 + Tailwind 4 + TanStack Query + Hono + Cloudflare Pages.

## Antes de tocar código

- Lee `docs/DOCUMENTACION.md` — arquitectura, API de NASA, R2 y reglas.
- `README.md` para el panorama general.
- Verifica índice: `codegraph status /home/ivan/software-dev/cosmos`.

## Arquitectura

- **SPA** React + Vite servida por Cloudflare Pages (`dist/`).
- **BFF** en Pages Functions: `functions/api/[[route]].js` habla con NASA, valida, limita y cachea.

```
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

## Caché y límites

- **TanStack Query**: 1 h de `staleTime`, 6 h de `gcTime`, dedupe por `queryKey`.
- **Cache API**: APOD hasta medianoche (clave `apod:YYYY-MM-DD`), galería 1 h.
- **Memoria del isolate**: respaldo y segunda lectura.
- **Rate limit**: 30 req/min por IP, en memoria del isolate.
- **Navegador**: la API no manda `Cache-Control` a propósito; TanStack cubre la sesión.

## Endpoints

| Ruta | Qué hace |
|---|---|
| `GET /api/nasa?endpoint=apod` | Imagen del día |
| `GET /api/nasa?endpoint=images&page=1&q=...` | Galería paginada |

Si el APOD del día falla, el BFF responde **503** y el frontend usa `agujero-negro.png` como respaldo.

## Comandos útiles (bun)

### Desarrollo y Build

- `bun run dev` — Servidor de desarrollo Vite SPA.
- `bun run dev:full` — Build + Pages local (`wrangler pages dev dist/ --port 4321`).
- `bun run build` — Compilación de producción (`dist/`).
- `bunx wrangler pages functions build` — Valida que el BFF compile.
- `bun run preview` — Previsualización del build estático.

### Linter y Formato (Biome)

- `bun run check` — Diagnóstico y corrección con Biome.
- `bun run lint` — Linter con Biome.
- `bun run format` — Formateo con Biome.

### Testing (Vitest & Playwright)

- `bun run test:unit` — 3 pruebas unitarias (App y Footer) con Vitest.
- `bun run test:unit:watch` — Vitest en modo watch.
- `bun run test:smoke` — Smoke tests sobre `dist/` en Pages local.
- `bun run test:e2e` — Suite End-to-End en Chromium.

## Convenciones

- Español en código, rutas, componentes y comentarios.

## Entornos

- Local: `.env.example` → `.dev.vars` (`NASA_API_KEY`, `VITE_USE_MOCKS`).
- Producción: `wrangler.jsonc` + variables de Cloudflare Pages.

## Qué NO hacer

- **No commit/push sin pedirlo explícitamente**.
- No modificar endpoints fuera de la whitelist de NASA sin actualizar validadores y CSP.
- No mover lógica de caché o rate limit al route: vive en `_middleware` y sus stores.
