# Editorial and feature inventory — targets, not invented content

## Editorial scope
- 12–20 verified locations (only where source/copy/photo sufficient). Seed candidate places: Kalam, Bahrain, Madyan, Mingora, Saidu Sharif, Barikot, Malam Jabba, Mahodand, Ushu, Utror, Miandam, Islampur, Butkara. Check place locality and administrative labels.
- 6–10 heritage sites and 10–20 licensed public-domain/Commons artifact photographs. Each item has source, provenance, date, place, description and license.
- 10–18 sourced documentary pieces. No made-up local interviewees; quote only with permission and journalistic sourcing.
- 3 documented language profiles (Pashto, Torwali, Gawri). Short, attributable, community-checked lexicon/excerpts. Audio only when licensed or contributed with consent.
- 4–6 environmental studies (terrain, watersheds, Landsat before/after, riverbed/flood context, seasons from coarse reanalysis, conditional biodiversity records).
- 80–150 *curated and individually rights-cleared* photos if suitable; aesthetic quality is more important than hitting a count.

## Features to implement, not just mock up
- Faceted search across places, topics, media, objects, languages and sources. Keyboard search, empty states, URL-persisted filters.
- MapLibre explorer with accurate place markers, routes only when using verified geometry, accessible list equivalent and map attribution.
- Place pages with meaningful facts, photo stories, nearby/related links and related archives.
- Searchable historical timeline and artifact collection with individual object records and deep zoom.
- Real image evidence comparator: exactly aligned location/time whenever claiming before/after; visible dates, source, coordinate, imagery method.
- Documented river journey via verified route geometry, GPS/elevation profile, section/story sync, non-WebGL alternative.
- Language explorer with native scripts verified by contributors, transliterations only when sourced, captions/transcripts. No synthesized speaker clones.
- Contributor stories: editorial-reviewed, consented and attributed; administrative moderation for user submissions if backend configured; never pretend uploads work without persistence.
- Archive with strong source disclosures and credit view per media; gallery with keyboard/lightbox and meaningful metadata.
- Fieldnotes articles with interactive evidence where enough data exists, confidence/limitations and methodology.

## Architecture path
Do not force a rewrite. Inspect existing code first. Prefer content schemas with types, validated fields, generated routes, and media/source relationship tables. Astro content collections or React/Router + MDX are options depending on current app. If existing content framework works, extend it. Choose server/CMS only when authenticated submissions or genuine editorial management requires it.

## Quality gates
- Source provenance and license exists for **100% of displayed media**. Each cultural quote/audio signed-off or explicitly sourced.
- No 404 internal routes; no broken media; no inert buttons; every filter/search and interaction works.
- Unique compositional storytelling across river/history/culture/fieldnotes; no mass duplicated page structure with only changed headings.
- Chrome, Firefox, WebKit automation; real iOS Safari + Android Chrome and screen-reader manual testing remain a separate human validation gate.
- Reduced-motion, captions/transcripts, focus, keyboard and non-WebGL content access.
- LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 on real-user 75th percentile when enough field data exists; synthetic Lighthouse is not the same as field measurement.
- Performance budget: photograph lazy loading with responsive srcset, compressed WebP/AVIF, single hero preload, route code splitting, minimal map/3D JS on non-map routes.
