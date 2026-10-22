# SWAT — A valley, in many currents

An Astro + TypeScript digital portrait of Swat Valley, with custom editorial layouts, verified photography, a locally served geographical atlas, and a GSAP/ScrollTrigger/Lenis motion system.

## Run

Node 22.22+ (Astro 7.4.1), npm:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The static production output is `dist/`. All runtime fonts, photography and map tiles are local. Configure a static host to serve `404.html` for missing paths and directory indexes for trailing-slash routes. No server database or secret is required.

## Verify

```sh
npm run check
npm run validate # after build: internal routes, anchors, images, map provenance
npm test
```

Tests use Brave at `/opt/brave.com/brave/brave` in this authoring environment. Set `SWAT_BROWSER` to a Chromium-compatible executable on another machine. The test preview uses port 4387; start it with `npm run preview -- --port 4387` if the Astro version launches its preview daemon and exits. Tests reuse that dedicated preview.

## Structure

- `src/pages/`: homepage, atlas, heritage, culture, environment, sources, seven place notes and 404
- `src/data/`: typed place, photograph and source records
- `src/scripts/motion.ts`: shared clock, scene motion, responsive cleanup and preference control
- `public/images/`: optimized, licensed derivatives
- `assets/originals/`: source images, excluded from production
- `public/data/`: licensed geographic tiles and extraction provenance
- `docs/production/`: architecture, motion specification, review and measurements
- `screenshots/production/`, `screenshots/motion/`: responsive and animated-state captures

`npm run images` regenerates responsive assets with Sharp. `scripts/fetch-tiles.py` documents the bounded OpenFreeMap download; it requires Python requests and network access. Credits, dates and licenses are available at `/sources/`.

The earlier static prototype is preserved in `SWAT-prototype.zip`; its research documentation and older screenshots remain as design history. The current experience uses real HTML routes, not hash routing. Prototype bookmarks redirect to their equivalent pages.
