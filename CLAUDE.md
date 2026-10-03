# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc` typecheck, then `vite build` (type errors fail the build)
- `npm run lint` — ESLint with `--max-warnings 0`, so any warning fails
- `npm test` — Vitest, single run; `npm run test:watch` for watch mode
- Single test: `npx vitest run src/utilities/weatherUtils.test.ts -t "<test name>"`
- `npm run deploy` — builds and publishes `dist` to GitHub Pages via `gh-pages` (`base` is `/skyview` in `vite.config.ts`)

## Architecture

Skyview is a small client-only React 18 + TypeScript + Vite SPA that shows current weather for the user's location. Styling is Sass (`.sass` indented syntax), with `prefers-color-scheme` light/dark variants in `App.sass`.

Data flow, which spans several files:
1. `App.tsx` requests browser geolocation in a `useEffect`.
2. `utilities/weatherUtils.ts` `fetchWeather` calls a Cloudflare Worker proxy (`openweather-proxy.aaron-gertler.workers.dev`) that holds the OpenWeather API key. The key must never be put in the client. The function returns `{ city, weather }` and throws on a non-OK response or unexpected payload. The OpenWeather response is metric, and `cToF` converts it to °F client-side.
3. `App.tsx` writes the result, or a user-facing error, into state held in `context/AppContext.tsx`. The context object itself lives in `context/appContextValue.ts`, separate so the react-refresh lint rule passes.

State conventions: `weather` is `null` until loaded, `error` is set on geolocation or fetch failure, and `loading` starts `true`. Every failure path must call `setIsLoading(false)`, or the full-screen spinner never goes away. The effect uses a `cancelled` flag so stale results from StrictMode re-runs are ignored.

The icon is chosen from OpenWeather's `weather[0].main` value in `App.tsx`. Unmapped values (Haze, Fog, etc.) fall back to `WiNa`.

The app version shown in the UI comes from `package.json` via `define` in `vite.config.ts` (exposed as `import.meta.env.VITE_APP_VERSION`). There is no `.env` file; it is gitignored.

SVGs are imported as React components with `?react` (vite-plugin-svgr).

## Workflow

- Commit messages use conventional prefixes (`feat:`, `fix:`, `chore:`, `test:`), and work happens on feature branches merged by PR.
- Dependency upgrades are done one tool per commit, checking that `tsc`, lint, tests and build pass on each commit.
- `npm audit` still reports findings that need major bumps (Vite 8 for esbuild), so a clean audit is not expected until that upgrade.
