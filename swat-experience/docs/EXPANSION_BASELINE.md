# Expansion baseline — 22 October 2026

## Actual repository
Astro 7.4.1 static generation; TypeScript 6.0.3; GSAP 3.15.0 with ScrollTrigger, SplitText and Flip; Lenis 1.3.27; MapLibre 6.15.0; Sharp 0.35.5 and Playwright 1.64.1. Extend these rather than rewrite. No CMS or submission backend exists.

14 routes: home, atlas, heritage, culture, environment, sources, seven places (Mahodand, Kalam, Bahrain, Madyan, Mingora, Barikot, Malam Jabba), and 404. `src/pages/places/[id].astro` generates places from `src/data/places.ts`. Shared Photo, References and ArrowLink components, Base layout, custom CSS and four interaction scripts provide extension points.

Existing materials: eleven attributed photo families in photos.ts, responsive derivative manifest, local originals, source registry in sources.ts, 33 licensed map tiles, research/audit documents and screenshot evidence. Existing source links and dates are not automatically verified anew by this baseline.

## Existing evidence and remaining gaps
The preceding review recorded 18 passing Chromium tests, 84 responsive captures, 14 route accessibility scans and a photo dialog scan. Map selection/history/fallback, culture tabs, environmental diagram, photo inspection, navigation, reduced motion and Lenis synchronization were exercised. See `audit/INDEPENDENT-REVIEW.md`. These are prior-run evidence, not newly executed expansion tests.

No global faceted search, searchable media archive, object room, historical evidence timeline, licensed oral archive, measured river geometry or satellite comparator currently exists. Culture lacks consented local contributor material. Several place layouts repeat. Sources are traceable but not relationally linked at individual-claim granularity.

Performance remains imperfect: prior lab p95 frame interval 50 ms and atlas MapLibre bundle warning. Local LCP is not field performance. Chromium is hardcoded by default in Playwright; Firefox/WebKit require separate supported launch configurations and installed binaries. Real devices and manual screen readers remain untested.

## Immediate implementation
Imported the supplied package into `docs/swat-expansion/`. Added `scripts/prepare-source-registry.mjs` to validate unique IDs and HTTPS source URLs and stage discoveries separately from production material. Three supplied seeds assert approval despite unverified downloads. Original input remains intact; staged records preserve that assertion separately and are all blocked from publication pending item-level evidence. Seed dates are inherited assertions, not this project's verification dates.

## Sequential acceptance gates
1. Prompt 00: rebuild, rerun existing browser suite, inspect fresh captures; record failures before expansion.
2. Prompt 01: individually verify rights and geography, retain original metadata/checksums, build searchable media archive with URL filters, keyboard controls and empty states. Never bulk approve category pages.
3. Prompt 02: extend typed place records only with sufficient sources; accessible map/list parity and verified geometry.
4. Prompt 03: museum object import with public-domain verification and explicit provenance uncertainty; searchable timeline.
5. Prompt 04: documented language profiles and consent/licensing before any cultural recordings.
6. Prompt 05: dated scientific datasets, methods and limitations; no decorative before/after claims.
7. Prompt 06: distinct editorial compositions and purposeful motion; preserve reduced-motion paths.
8. Prompt 07: browser-engine matrix where available, route/media/link checks, accessibility scans, screenshots and separate human-device gates.

Each phase must add implementation, evidence, capture paths and remaining gaps before the next begins. Current expansion status: package imported and discovery ingestion scaffold implemented; media publication and later phases are not complete.
