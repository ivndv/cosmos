# Cosmos

Explora el universo con imágenes astronómicas, noticias y sistema solar. Vite + React 19 + Tailwind 4 + Zustand + Hono + Cloudflare Pages.

## Antes de tocar código

Lee `docs/DOCUMENTACION.md` (próximamente) — arquitectura, store, API NASA y reglas. Mientras tanto `README.md` para overview.
Verifica índice: `codegraph status /home/ivan/software-dev/cosmos`.

## Comandos útiles (bun)

- `bun run dev` — Vite dev
- `bun run dev:full` — `vite build && wrangler pages dev dist/ --port 4321`
- `bun run build` / `preview`
- `bun run check` / `lint` / `format` (Biome)
- `bun run test` / `test:watch` (Vitest)

## Convenciones

- Español en código/comentarios.

## Entornos

- Local `.env.example` -> `.dev.vars`, prod `wrangler.jsonc` + Cloudflare.

## Que NO hacer

- No commit/push sin pedirlo explicitamente
