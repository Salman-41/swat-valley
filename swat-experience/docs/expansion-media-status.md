# Media ingestion phase — implementation record

Added `/archive/` using the existing eleven source-attributed photographs, with place/subject labels, creator/date/license records, original source and adaptation links, live search, URL state, pagination, empty state and the shared native photo inspector. All images remain readable without JavaScript. Added archive navigation to the global index/footer and corrected an existing footer typo.

The archive fails its build if a displayed photo lacks creator, alternative text, accepted BY-SA license or expected source/license URL. This validates metadata completeness, not the truth of an external rights assertion. Existing rights evidence remains in the prior research documents and NEW-PHOTO-CREDITS.json.

32 research seeds remain unapproved discoveries. No new downloads or independent external license verifications occurred in this implementation increment. The requested 35–60 new-photo batch is not complete. Craft process, portraits, consented voices, music, museum object originals and more geographically varied photographs remain acquisition gaps.

Tests: `tests/archive.spec.ts` covers search, filters, pagination, URL restoration, empty states, photo dialog and six responsive widths with automated axe checks. See test execution results before treating these as passed.

Current build: 15 routes; Astro check 26 files with no diagnostics. Content validator passed 569 local links/assets, eleven image families and 33 tiles. Browser binaries available locally: Chromium only; no Firefox or WebKit installation found. Physical-device and manual screen-reader checks were not performed.

The first baseline run had 16 passes and two invalidated checks: a route request during a concurrent build and a trace-file collision from overlapping test processes. The affected widths and archive tests are rerun serially against the finished build. Capture code now explicitly decodes visible lazy images before full-page screenshots.

Final serial rerun: four tests passed (archive functionality, archive responsive/axe, existing 768px and 1024px matrices). Combined with the sixteen unaffected baseline passes, all twenty test cases have passing evidence. Desktop archive screenshot visually inspected after image decoding; six archive captures saved in `screenshots/expansion/`. No new production media was acquired in this increment.

## 23 October 2026 — first new approved acquisition

Added Islampur by Tabindaalkansjaffery, attributed CC BY-SA 4.0 on its Commons file page. Download completed, original visually inspected, SHA-256 recorded and twelve local responsive derivatives generated. Date is explicitly source metadata; locality is the photographer's identification, with no invented coordinates. The dark hillside image is used as an archive record, not as evidence of weaving or other cultural practices. Detailed evidence: `expansion-islampur-evidence.json`. Total collection: twelve photos. Barikot seed page could not be fetched through the research tool and was not approved on that basis.

Added `scripts/verify-ingested-media.mjs` to check required provenance, original-file integrity and derivative existence. This complements metadata checks; it is not independent legal certification. The 35–60-photo target remains incomplete.

Verification for this acquisition: build/typecheck passed (27 files, 15 routes), content validation passed (572 local links/assets, twelve photo families), checksum/derivative verifier passed, and both archive browser tests passed (28 seconds). Six responsive archive screenshots refreshed; automated accessibility assertions passed. Firefox/WebKit and physical-device/manual assistive-technology testing were not performed.

## 23 October — geographic conflict and archive corrections

Quarantined `commons_kalam_river`: the Commons title identifies Kalam, but its listed camera coordinates (34.912233, 73.656039) conflict with that locality. This is a metadata conflict, not proof of the true photographed location. No download/publication approved. Evidence revision 1237166831 is linked from the research registry. Updated seed preparation to preserve documented quarantine decisions as well as approvals.

A direct attempt to fetch the Barikot file page failed DNS resolution; no new rights claim or approval was inferred. The collection remains twelve images.

Fixed the shared photo inspector to cycle only through visible photographs at opening, respecting archive filters/pagination. Single-result views disable previous/next. Malformed fractional, negative and non-finite page parameters now fall back to page one. Added an interaction regression test for filtered inspector cycling, single-result controls and fractional-page recovery.

Verification: production build and typecheck passed; checksum/derivative verification and 15-route content validation passed; four targeted browser tests passed in 26.6 seconds. These include archive responsive captures/axe, search and URL state, filtered photo navigation, and existing place-page zoom/pan/navigation. Six archive screenshots refreshed. No new assets approved in this increment.
