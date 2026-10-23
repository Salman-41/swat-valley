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

Tests use Brave at `/opt/brave.com/brave/brave` in this authoring environment. Set `SWAT_BROWSER` to a Chromium-compatible executable elsewhere. Playwright starts a foreground static QA server on port 4391 from the built `dist/`; no manually started preview is required.

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

### Expanded collection

- `/archive/`: documentary photographs with combined search, subject and place filters, URL state and a filtered image inspector.
- `/objects/`: comparison of two source-verified public-domain museum images; `/objects/dipankara/` and `/objects/marine-deity/` retain catalogue uncertainty and individual credits.
- `/research/`: searchable bibliography with topic filters and source-register links.

Museum originals are in `assets/objects/`; API snapshots and checksum manifest are in `docs/objects/`. Generate derivatives with `node scripts/process-objects.mjs`, then validate with `node scripts/verify-objects.mjs`. Do not approve a museum image solely because it appears on an institutional website: the importer requires the item's public-domain flag. Research-only links do not grant media reuse permission.

See `docs/EXPANSION-COLLECTION-PASS.md` for this increment's scope, evidence and remaining work.
