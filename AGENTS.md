# Cosmos

Explora el universo con imágenes astronómicas, noticias y sistema solar. Vite + React 19 + Tailwind 4 + Zustand + Hono + Cloudflare Pages + Cloudflare R2.

## Antes de tocar código

- Lee `docs/DOCUMENTACION.md` (próximamente) — arquitectura, store, API NASA, R2 y reglas. Mientras tanto `README.md` para overview.
- Verifica índice: `codegraph status /home/ivan/software-dev/cosmos`.

## Comandos útiles (bun)

### Desarrollo y Build
- `bun run dev` — Servidor de desarrollo Vite SPA.
- `bun run dev:full` — Build de producción + servidor local de Cloudflare Pages (`wrangler pages dev dist/ --port 4321`).
- `bun run build` — Compilación de producción con Vite (`dist/`).
- `bun run preview` — Previsualización local del build estático.

### Linter y Formato (Biome)
- `bun run check` — Diagnóstico y corrección automática de formato/linter con Biome.
- `bun run lint` — Ejecutar linter con Biome.
- `bun run format` — Formatear archivos con Biome.

### Testing (Vitest & Playwright)
- `bun run test:unit` — Ejecutar 40 pruebas unitarias con Vitest (Zustand stores, custom hooks, componentes y helpers).
- `bun run test:unit:watch` — Pruebas unitarias en modo interactivo/watch.
- `bun run test:smoke` — Smoke tests rápidos sobre `dist/` en Cloudflare Pages local (Playwright).
- `bun run test:e2e` — Suite completa de pruebas End-to-End en Chromium (Playwright).

## Convenciones

- Español en código, rutas, componentes y comentarios.

## Entornos

- Local `.env.example` -> `.dev.vars`, prod `wrangler.jsonc` + Cloudflare Pages.

## Qué NO hacer

- **No commit/push sin pedirlo explícitamente**.
- No modificar endpoints fuera de la whitelist de NASA sin actualizar validadores y CSP.
