# Production architecture

Astro renders 14 static routes, including a custom 404. TypeScript describes the place/source/photo relationships and the interaction modules. Real document navigation preserves deep links, browser history, open-in-new-tab, indexing and a usable no-JavaScript baseline.

## Why this architecture

The bulk of SWAT is editorial material and photography. It does not need a hydrated React tree or an application server. Astro emits content as HTML, and custom CSS owns the approved paper, river-green, Italiana and DM Sans visual language. Page-specific scripts provide the map and culture controls; the shared motion controller coordinates only the effects that are present on a document.

GSAP/ScrollTrigger and Lenis handle animation and scrolling. SplitText is restricted to selected English headings; FLIP moves the shared lens indicator. MapLibre is dynamically imported on the atlas. There is no Three.js scene because geographic exploration already supplies the justified WebGL surface.

## Pages and journeys

- `/`: editorial homepage and entry to the atlas, heritage, culture and environment.
- `/atlas/`: accurate local vector-map data, coordinate fallback, seven locations, three lenses, opt-in camera, URL state and history.
- `/heritage/`: photographic split composition, Butkara, expandable Barikot evidence and museum context.
- `/culture/`: full language narratives, accessible tabs, museum/craft context and community sources.
- `/environment/`: conceptual cross-section controls, dated flood, forest and lake research.
- `/places/{mahodand,kalam,bahrain,madyan,mingora,barikot,malam-jabba}/`: full source-linked place notes, coordinates, captioned photography and onward journeys.
- `/sources/`: image authors, dates, original links and licenses; research and coordinate register.
- `/404.html`: recovery paths. The host must use it for missing URLs.

## Assets and boundaries

Photography is authored as AVIF/WebP/JPEG derivatives at four widths where the source permits. Original source JPEGs stay in `assets/originals`, outside the published directory. Fonts and their OFL files are local. Map provenance records the source snapshot, bounds, zooms, bytes and license. The current map is a deliberately bounded valley atlas, not a worldwide mapping service.

`src/data/places.ts` is the single source for place pages, map locations and narrative lenses. `sources.ts` and `photos.ts` keep provenance reviewable. Routes fail at build time for an unknown photo/place. Browser map failure retains the coordinate plot and reading links.

## Deployment

Run `npm ci`, `npm run build`, `npm run validate`. Serve `dist` with directory indexes, a 404 fallback and compressed text assets. Configure long-lived immutable caching for hashed `_astro` resources; use a bounded cache lifetime for unversioned photo/tile URLs. No public origin was supplied, so canonical URLs are emitted only when `site` is configured in Astro. No deployment or publishing was performed.
