# Coffee Ratio Calculator

A focused SvelteKit app for dialing in pour-over coffee. Enter either beans or water, pick roast level and cup quality, and get a tailored ratio plus temperature/grind guidance. The app remembers your last settings in local storage so you can keep tweaking between brews.

## Features

- **Two modes**: calculate water from beans or beans from water.
- **Roast-aware ratios**: light, medium, and dark recommendations.
- **Quality toggle**: high-clarity vs. lower-ratio, fuller body.
- **Brew guidance**: suggested temperature and grind size per recipe.
- **Kitchen-friendly hints**: approximate heaping tablespoon conversions.

## Tech Stack

- SvelteKit + Svelte 5
- Tailwind CSS (with typography + forms plugins)
- Netlify adapter for deployment

## Getting Started

Install dependencies:

```sh
pnpm install
```

Run the dev server:

```sh
pnpm run dev
```

Preview the production build:

```sh
pnpm run build
pnpm run preview
```

## Scripts

- `pnpm run dev` — start the dev server
- `pnpm run build` — build for production
- `pnpm run preview` — preview the production build
- `pnpm run lint` — run ESLint + Prettier
- `pnpm run check` — run Svelte type checks
- `pnpm run test:ci` — run lint + check + build

## Deployment

This project uses `@sveltejs/adapter-netlify`. Build and deploy to Netlify as a standard SvelteKit app.

## Project Structure

- `src/routes/+page.svelte` — main calculator page and logic
- `src/lib/components` — UI components for inputs, selectors, and result display

## License

MIT
