# SWAT — Motion as a current

## Research and decisions

Reviewed on 22 October 2026:

- [Trionn’s developer case study](https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/): coordinated render clocks, separate scene responsibilities and responsive cleanup. SWAT adopts the architecture principle, not its effects or WebGL presentation.
- [Siena Film Foundation](https://www.siena.film/films/outsider-freud): editorial hierarchy and film-specific content remain readable independently of presentation. The Awwwards case-study URL timed out; it was not treated as inspected evidence.
- [Lenis upstream implementation guidance](https://github.com/darkroomengineering/lenis/blob/main/README.md): GSAP ticker integration and native scroll coordinates.
- [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) and [Flip](https://gsap.com/docs/v3/Plugins/Flip/): accessible text splitting and geometric state transitions.

The shared language is **gather / current / layer**. Gathering introduces the valley; current connects geographical choices; layers reveal evidence. A decorative Three.js scene would add no geographical or historical information, so MapLibre remains the only WebGL surface.

## Scenes

| Subject | Movement | Purpose / fallback |
| --- | --- | --- |
| Home | Four-letter gathering, secondary title and invitation | Short arrival, never a loading gate; skipped on restored scroll positions |
| Atlas invitation | A widening aperture and lateral sequence of place names | Moves from a framed view to a connected valley |
| Atlas | Opt-in camera between real coordinates; photograph wipe; shared FLIP lens indicator | Selection stays explicit. Camera travel does not claim to follow an exact river course |
| Heritage | Vertical image aperture, opening evidence layers | A photographic record and interpretive text; no fabricated reconstruction |
| Culture | Whole-panel lateral exchange and FLIP selection indicator | Keeps text intact; joined scripts are never character-split |
| Places | Restrained hero crop shift on fine-pointer devices; native image detail | One scene per place, not parallax on every photograph |
| Environment | Drawing the conceptual slope line | Introduces the connected cross-section, explicitly labelled as non-geographical |
| Reading | Thin progress line | Orientation through long-form material |

## Clock and lifecycle

`src/scripts/motion.ts` owns GSAP, ScrollTrigger, SplitText, Flip and Lenis. `lenis.raf(seconds * 1000)` runs exclusively from `gsap.ticker`; Lenis scroll events call `ScrollTrigger.update`. There is no second Lenis RAF. Touch uses native scrolling. The MapLibre renderer retains its own event-driven render lifecycle; it is not forced into a decorative continuous loop.

GSAP context reversion, SplitText reversion, observer disconnection, ticker removal and Lenis destruction occur when preferences change and on pagehide. BFCache restoration restarts the system. Dialogs suspend Lenis while open. Content changes refresh measurements. Browser navigation stays ordinary HTML navigation; anchors retain native hash and focus behavior.

## Controls and alternatives

- Footer **Motion: on / reduced** persists a user preference in localStorage when available.
- `prefers-reduced-motion` always takes precedence. Preference changes are handled live.
- Coarse-pointer devices do not instantiate Lenis or run hero crop shifts.
- **Follow selected place** opts into map camera motion; **Show whole valley** exits that mode.
- Select, previous/next buttons and keyboard-focusable map markers all select the same place.
- Without JavaScript, every chapter and place link remains usable; culture panels remain fully expanded and the atlas displays its labelled coordinate plot.
- No audio is invented or autoplayed. No visual state is necessary to access the written content.

## Performance and verification

See `motion-performance.json` for actual measured local-browser observations and `REVIEW.md` for the test outcome. Measurements are lab samples, not field INP or promises of physical-device frame rate. Screenshots in `screenshots/motion/` capture intermediate and settled states; responsive captures live in `screenshots/production/`.

Image derivatives are local AVIF/WebP/JPEG. Source JPEGs live outside `public/` and do not ship. The map uses a bounded local 33-tile extract (1,856,547 bytes), loaded only on the atlas. Its drawing buffer is not preserved, avoiding an unnecessary GPU cost. GSAP effects use transforms and small, bounded clip regions; no scroll pinning or snap system is applied.

A slow-frame sampling window can switch to an economy mode that removes optional scrub effects. This is a rendering fallback, not a promise of a fixed frame rate; reading, navigation and selection remain available. The photo inspector uses native overflow panning at 100–250% zoom, with previous/next buttons and source-specific captions. The mobile atlas provides an explicit selected-story link instead of automatically displacing the reader's scroll position.
