# Collection expansion — 23 October 2026

## Scope and implementation
This increment extends Prompt 01 media ingestion and navigation. It does not mark the geographic or comprehensive heritage phases complete. Four routes added: `/objects/`, `/objects/dipankara/`, `/objects/marine-deity/`, `/research/`. Existing architecture and all prior routes retained.

Two public-domain Met photographs were successfully acquired, originals visually inspected and API responses preserved. The first Dipankara transfer was truncated; Sharp rejected it. A successful retry replaced it before publication. Six derivatives per image are generated without cropping or retouching. `docs/objects/manifest.json` records item URLs, original download URLs, SHA-256 hashes and verification date. `scripts/verify-objects.mjs` checks rights flag, URL agreement, checksums and complete decoding of originals and derivatives.

The collection view offers an actual catalogue comparison table, expressly not a physical-scale comparison. Each object has a separate editorial record with source, accession, material, approximate date, institutional credit, image rights and limits. The shared zoom/pan inspector works with museum images. The Marine Deity's uncertain Swat attribution remains explicit. No findspot, named excavated stupa, maker or photograph capture date was invented.

Research index provides search, topic filters, URL restoration, empty state, contextual disclosure and source-register links. Records reuse the existing cited bibliography; this pass does not imply every external research URL was newly checked. Archive adds a place facet combined with query/subject/pagination. New destinations connect through the global index, archive, heritage chapter and sources page.

## Authoritative records
- https://www.metmuseum.org/art/collection/search/49809
- https://www.metmuseum.org/art/collection/search/38789
- Item API snapshots: `docs/objects/met-49809.json`, `met-38789.json`.

## Remaining scope
Collection contains twelve documentary place photographs and two museum images, not 35–60 new photographs or 10–20 objects. Further place coverage, archaeology chronology, scientific comparisons and consented cultural material remain later work. Firefox/WebKit, physical devices and manual screen readers are not certified by Chromium results. Existing atlas bundle warning remains.

## Validation evidence
Build/typecheck passed: 32 checked files, 19 static routes. Content validator passed 774 local links/assets. Museum verifier passed both originals and twelve derivative files. Launch attempts for Firefox and WebKit returned missing-executable errors; exact messages are in `docs/objects/browser-availability.json`. No claims of cross-engine or physical-device completion are made.

New-page visual inspection: mobile Dipankara record and research index, desktop collection overview. Full objects remain visible without crop. Four new routes passed automated loaded-image, overflow and axe checks; 24 new-route screenshots recorded at 320/390/768/1024/1440/1920 in `screenshots/expansion/collection/`. The collection comparison is a semantic table with horizontal scrolling on narrow screens, not a fake interactive slider.

Final browser outcome: full Chromium run had 23 passes and one test-locator failure (it selected the disclosure in a hidden filtered record). Corrected locator targets the visible record; isolated serial rerun passed in 4.9 seconds. All 24 cases now have passing evidence against the unchanged completed build. This is explicitly a full run plus corrected targeted rerun, not a claim that the initial full command exited successfully. Existing motion, keyboard, touch, no-JavaScript, atlas failure/retry and all six prior route widths passed. New collection tests cover source uncertainty, zoom, research query/topic restoration, disclosure, empty state and archive place filtering.
