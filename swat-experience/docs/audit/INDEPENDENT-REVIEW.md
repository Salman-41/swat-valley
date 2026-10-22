# SWAT — Critical creative and technical review

Review date: 22 October 2026. This is an Awwwards-style estimate, not an official jury result or an endorsement. The same working agent implemented and reviewed the site; the rubric is deliberately critical, but this is not a separate human panel. Scores carry roughly ±0.5 points of subjective uncertainty.

## Verdict and weighted scores

**Estimated post-fix quality: 7.28/10, rounded to 7.3. Not yet an 8+ submission.**

| Category | Weight | Before this audit | After fixes | Weighted result |
| --- | ---: | ---: | ---: | ---: |
| Design | 40% | 7.0 | 7.3 | 2.92 |
| Usability | 30% | 7.4 | 7.8 | 2.34 |
| Creativity | 20% | 6.2 | 6.5 | 1.30 |
| Content | 10% | 7.2 | 7.2 | 0.72 |
| **Overall** | **100%** | **6.98** | **7.28** | **7.28** |

Design has a coherent identity: river green, warm paper, spare rules, large serif typography and actual Swat photographs. The opening feels authored. The score stops at 7.3 because internal reading pages still share too much compositional grammar, some image crops are opportunistic, and the cultural visual vocabulary is largely typographic rather than rooted in documented objects or makers.

Usability is the strongest area. Real URLs, native document navigation, keyboard-operable controls, motion preferences, local assets and a map fallback all matter. It is not a fully certified accessible product: physical mobile devices, Safari/Firefox and assistive-technology sessions remain outside this run.

Creativity is the main constraint. The three map lenses are a relevant organising idea, but mostly change prose. The map camera, aperture reveals and enlarged photographs are well implemented conventions. There is not yet a discovery that could only be delivered by this particular interaction model.

Content is careful and traceable, but it is a researched introduction rather than an original documentary. It lacks commissioned photography, oral histories, named maker interviews, original field recordings and expert-reviewed object interpretation. Source discipline cannot substitute for those forms of depth.

## Reference comparison and evidence limits

- **[Siena Film Foundation](https://www.siena.film/)**: its filmstrip-like spatial progression, ticket-derived navigation, imagery and typography share one cinema vocabulary. Live entry, content and scroll states were captured. Its [Awwwards listing collection](https://www.awwwards.com/websites/%23FAEDCD/) identifies the March 2025 Site of the Month; the dedicated award page timed out in this environment. SWAT is easier to enter and read, but its interactions are less inseparable from its subject. The observed Siena onboarding overlay also illustrates that elaborate experiences can introduce friction; an award is not proof of universal usability.
- **[Closer to Johannes Vermeer](https://www.rijksmuseum.nl/en/johannes-vermeer)**: inspected the live collection opening after rejecting optional cookies. The [museum's description](https://www.rijksmuseum.nl/en/stories/themes/vermeer/story/closer-to-johannes-vermeer) documents guided discovery, close viewing and comparison. Its interaction reveals meaningful visual evidence. SWAT's new inspector is an improvement, but its 1600px photographs are not an equivalent deep-zoom archival collection. The entire exhibition was not traversed during this audit.
- **[Bear 71 VR](https://bear71vr.nfb.ca/)**: entered the live documentary opening; the [NFB's account](https://blog.nfb.ca/blog/2017/02/09/bear-71-vr-google-nfb-partner-expand-world-virtual-reality-storytelling/) explains how recorded wildlife imagery and surveillance support its story. The important benchmark is the relationship between evidence and interaction, not its age or use of VR. SWAT currently presents subjects; it rarely allows the visitor to investigate an unfolding story. A complete 20-minute viewing was not performed.
- **[Visit Faroe Islands](https://visitfaroeislands.com/en)**: live destination opening and editorial navigation inspected. Landscape media, responsible visiting and practical paths coexist. It is a destination usability comparator here, not an asserted Awwwards winner. SWAT is more restrained, but has substantially less original place-specific media. The captured frame includes its cookie notice; no claim of exhaustive interaction testing is made.

Reference captures and observed DOM excerpts are in `screenshots/audit/` and `reference-observations.json` / `reference-followup.json`. Reference imagery is research evidence, not incorporated into SWAT.

## Page-by-page visual critique

| Route | What works | Weakness / disposition |
| --- | --- | --- |
| `/` | Strong giant wordmark against genuine Mahodand imagery; asymmetrical heritage/culture pairing; restrained palette. | The second half loses the opening's specificity. The language-name block feels like a designed placeholder for missing cultural media. The oversized footer is effective once, tiring across every route. Retained as a deliberate brand anchor, not scored as original interaction. |
| `/atlas/` | Accurate coordinates, local OSM data and three consistent lenses. Malam Jabba is correctly off the main river corridor. | Large mobile map separates the reader from the changing prose. Added an explicit selected-place/story jump. Marker labels can still compete at some zoom levels. The map shows landcover and waterways, not a measured terrain model; no 3D terrain claim is made. |
| `/heritage/` | Stone/photo split and restrained image aperture suit the material. Tentative-list status is accurately qualified. | Accordions largely disclose ordinary text; archaeological objects, chronology and spatial evidence need richer editorial treatment. Photo inspection now adds real magnification and native panning, but no unsupported reconstruction. |
| `/culture/` | Named language communities and sources; keyboard tab behavior; no invented audio. | Weakest major chapter: predominantly English typography and a museum exterior where makers, materials and speakers should be visible. Citation contrast failed at 4.4:1 on the stone panel and was corrected. Needs local editorial collaboration before an award submission. |
| `/environment/` | Dated scientific evidence, explicit distinction between concept diagram and measured geography. | The cross-section is legible but basic; changing text and emphasis is not deep environmental analysis. Needs licensed before/after records or a carefully reviewed catchment story. Current scenery is not falsely presented as flood footage. |
| `/places/mahodand/` | Immediate sense of place; link between lake imagery and a dated microplastic study. | Previously repeated the full-width photo-band formula. Replaced with a meadow/flower observation pairing and closer crop control. The image itself is uneven in focus; no artificial sharpening or generated replacement was used. |
| `/places/kalam/` | Strong snow/mountain picture; confluence and Gawri geography connect to other chapters. | Opening does not show the actual confluence, and the text must do that work. A sourced confluence photograph would be a better narrative fit. Long reading column remains conventional. |
| `/places/bahrain/` | Real settlement and river photographs; documented Torwali initiatives. | Changed the second photograph into an image/text river-edge study to reduce template repetition. Still lacks a person-led narrative or licensed sound. |
| `/places/madyan/` | Quiet split composition and a real town view. Plant-knowledge source gives it a distinct subject. | Removed the borrowed Bahrain river image from this page. The place needs original plant/fieldwork imagery; the current view cannot illustrate the research in detail. |
| `/places/mingora/` | Museum/archaeology relationship is useful; more urban than the upper-valley pages. | Opening photograph is of nearby Saidu Sharif, not Mingora itself. Added an immediate explicit location caption. This is still a weak visual introduction to Mingora; commission a genuine street or market sequence. |
| `/places/barikot/` | Genuine excavated walls and careful separation of UNESCO tentative status from inscription. | Removed the repeated Butkara image and moved that connection into the heritage reading path. A labelled, expert-checked site plan would be much stronger than another landscape image. |
| `/places/malam-jabba/` | Atmospheric real photograph and a dated forest-regeneration source. | Removed the redundant second use of the same photograph. One photograph is not a deep place portrait; the ecological narrative needs further documented visual material. |
| `/sources/` | Substantial source and license register, dated photography, coordinate provenance. | Long and utilitarian; titles inherited from source filenames are not elegant. Keep it readable and searchable before spending effort on animation. Broken research links were repaired or removed; access limits are recorded below. |
| `/404.html` | Clear recovery links and consistent identity. | Appropriately simple. No need for an animated dead end. |

The page audit used all 84 full-page route/viewport captures plus desktop place-page contact sheets and selected full-resolution crops. Capturing a page is not equivalent to exhaustive human eye inspection of every pixel; representative top, middle and interaction states were manually examined.

## Implemented during this review

1. Added 100–250% photo inspection, native scroll/pan, previous/next photographs, zoom reset, correct per-image attribution and focus return. Controls work without dragging and respect reduced motion.
2. Added a mobile map-to-selected-story link that updates with the selected location.
3. Darkened the muted text token to repair the two culture-panel contrast failures; enlarged small credits, references and atlas captions.
4. Created distinct observation/image pairings for Mahodand and Bahrain, with intentional crop positioning.
5. Removed repetitive or neighbouring-place secondary images from Madyan, Barikot and Malam Jabba; adjusted text to avoid references to removed images.
6. Added an explicit Saidu Sharif caption to the Mingora opening.
7. Replaced an unavailable tourism guide URL with its official PTDC publication. Replaced the unavailable KITE revised-file link with the verified World Bank February 2019 edition and corrected the corresponding prose dates. Removed the unused, broken Swiss report entry rather than leaving a false working citation.
8. Made browser QA repeatable with a foreground static server; Astro preview's daemon lifecycle had caused test startup failures.

Earlier motion-pass fixes are recorded separately in `docs/production/MOTION-SYSTEM.md`: SplitText layout cleanup, contained narrow-screen movement, reduced-motion state, native touch scrolling, adaptive removal of optional scrub effects and removal of the expensive dialog-backdrop blur.

## Accuracy and licensing review

The image register contains eleven real photographs, with author, original Commons URL, capture date or explicit unknown date, license URL and adaptation statement. The new-photo credit manifest and earlier research notes preserve provenance. No generated photography was introduced. Originals remain outside production assets; responsive derivatives retain the linked CC BY-SA terms. These records are traceable, but this is not a legal certification.

The atlas distributes 33 tiles from a documented OpenFreeMap snapshot with OSM/OpenMapTiles attribution and ODbL provenance. Place coordinates retain individual source links and their intended meaning. Camera movement is between location coordinates and does not purport to be a surveyed river route. The fallback explicitly says it is a coordinate plot.

UNESCO's [Bazira–Barikot record](https://whc.unesco.org/en/tentativelists/7034/) supports the May 2026 tentative-list statement. The KITE replacement PDF was downloaded and its cover/date and Kalam sections 4.4.2/4.5.1 inspected. Sampling dates remain distinct from publication dates; forest and lake studies are not described as live measurements. Language markers are not boundaries. No current opening hours, safety guarantees or synthetic testimony is provided.

The source-link audit found three genuine HTTP 404s, a Smithsonian 403 and Commons DNS failures in this environment. The 404s were addressed; a 403 or DNS failure was not mislabelled as proof that the source is absent. The official PTDC PDF appeared in the web index, while the direct Python request encountered a TLS problem. This access limitation is retained in the evidence rather than concealed. A local scholar/community editor should review the complete narrative before public submission.

## Submission decision and next priorities

**Hold an award submission.** The website is a strong functioning research edition and a credible foundation for an exhibition, but it lacks the original editorial material and distinctive investigative interaction expected of an 8+ result.

1. Commission a compact, coherent photographic series: confluence, working town, a maker's process, museum objects with permissions and forest regeneration. Replace the weakest mismatches before adding new effects.
2. Co-author one cultural story with a named local contributor. Use permissioned first-person text and, if available, recorded speech with transcript and translation review.
3. Develop one deeper evidence interaction: an expert-labelled Barikot plan or dated flood-corridor comparison. It must reveal information that the present text switching cannot.
4. Test on actual mid-range Android and iOS devices and in Safari/Firefox; include screen-reader sessions. The current Chromium/software-GPU lab is useful but incomplete.
5. Add a public origin, production cache/compression policy and field performance monitoring when a host is chosen. Verify international source reachability from that deployment.

Do not spend the next iteration on a custom cursor, more parallax, ambient audio without provenance or decorative WebGL. None addresses the principal gap.

## Final technical evidence

The production build passed: 24 files checked with zero errors, warnings or hints from Astro's typecheck; 14 static routes generated. Vite still warns about the large MapLibre chunk. Content validation checked 490 local links/assets, 11 responsive photograph families and 33 map tiles.

The main browser suite passed 16 tests, including the 14-route matrix at 320, 390, 768, 1024, 1440 and 1920 px (84 captures), image decoding, horizontal overflow, browser errors, navigation, atlas state/history, keyboard dialogs, map failure/retry, no-JavaScript behavior, reduced motion and photo zoom/navigation. Two additional focused tests passed after the overlay repair, bringing the verified total to 18 tests across the main and focused runs. These check Lenis/ScrollTrigger agreement, modal scroll locking/focus containment and a touch journey from map selection to place story to photo inspection. That touch test exposed a real place-heading overlay intercepting photo-button taps; the overlay now passes pointer events through while its navigation link stays interactive.

Automated axe scans report zero detected violations on all 14 routes and the open photo inspector. This is not accessibility certification: image contrast and other incomplete automated checks require human judgement. Screen-reader use remains untested. The fresh final capture set contains 28 page images (390 and 1440 px) and an inspector image; eight motion captures show representative entry, intermediate and settled states.

### Measured performance

Source: `../production/motion-performance.json`. Chromium/Brave on this Linux environment, software GPU, local static server; these are one lab run, not field Core Web Vitals or physical-device results.

| Measurement | Observed |
|---|---:|
| Median animation-frame interval | 16.8 ms |
| 95th-percentile frame interval | 50 ms |
| Frames exceeding 33 ms | 57 / 116 |
| CLS | 0.000196 |
| Local LCP | 308 ms |
| Largest sampled Event Timing duration | 72 ms |
| Long task | 136 ms |
| JavaScript heap sample | 5,401,118 bytes |
| Transfer observed during measured homepage journey | 841,534 bytes |

The median interval is near a 60 Hz frame budget, but the tail is visibly weaker: **this is not sustained 60 fps**. Heap excludes GPU and total process memory. Event Timing is not field INP. Local LCP is not a mobile-network loading benchmark. Earlier, slower runs activated the adaptive economy mode; the final run remained in full mode. Hardware and test contention affect those results.

Bundle evidence is recorded in `bundle-sizes.json`. The atlas-only MapLibre main module is approximately 1.09 MB minified / 291 KB gzip, plus a 518 KB / 147 KB gzip worker; map CSS is approximately 71 KB / 10 KB gzip. It is loaded only on the atlas, but remains a meaningful cost. Production compression/cache behavior is not measured because no production host is configured.

Testing used Chromium with mouse, keyboard and touch emulation. Safari, Firefox, real Android/iOS, screen readers and public-network field monitoring remain explicit gaps. Do not describe the website as fully cross-browser certified or submission-ready based on this pass.
