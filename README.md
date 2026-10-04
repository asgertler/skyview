# Skyview WX

A small, UI/UX-focused local weather app. Skyview WX asks the browser for your
location and shows current conditions (temperature, feels-like, high/low) for
where you are, in °F.

Built with React 19, TypeScript, Vite 8 and Sass.

## Getting started

Requires Node 22.12+ (Vite 8 and Vitest 5).

```sh
npm install
npm run dev
```

The app is served under `/skyview-wx`, so open <http://localhost:5173/skyview-wx>.
Your browser will prompt for location access; if it is denied, the app shows a
message instead of weather.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint (zero warnings allowed) |
| `npm test` | Run the Vitest suite once (`npm run test:watch` to watch) |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages |

## How it works

1. `App.tsx` requests the browser's geolocation.
2. `fetchWeather` (`src/utilities/weatherUtils.ts`) sends the coordinates to a
   Cloudflare Worker that proxies OpenWeather, so the API key never ships in
   the client bundle.
3. The result (or a user-facing error) is stored in React context and rendered.

The version shown in the header is read from `package.json` at build time.
