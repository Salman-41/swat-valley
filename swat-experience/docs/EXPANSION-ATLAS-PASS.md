# Geographic expansion — atlas search increment

23 October 2026. Prompt 02 begun without replacing MapLibre, the local OSM tile extract, the coordinate fallback, existing story lenses or place URLs.

Implemented a named search input and place-type filter over the existing seven source-backed places. Matching records drive map marker visibility, coordinate-plot labels, the selection control and the linked place list. Previous/next navigation cycles within matching results. A live result count and explicit empty state accompany disabled selection/camera controls. Selected place, lens, query and type are retained in the URL and restored on browser history navigation.

No new geographic claims, surveyed routes, elevation profiles, DEM data or place profiles were invented. Search uses existing names, editorial region labels and place kinds. Coordinates and attribution remain unchanged. Filter categories are editorial organisation, not administrative boundaries.

New acceptance tests in `tests/atlas-search.spec.ts` cover marker/list/selection agreement, deep links, reload/history, empty/reset behavior, filtered stepping and screenshots at six viewport widths with tile requests blocked. Existing atlas tests remain the regression gate for lens/history, touch access and map failure/retry.

Remaining phase scope: 12–20 sufficiently researched place profiles, independently verified river geometry, optional terrain supported by real elevation data, and richer geographic layers. These are not claimed complete by this search increment.
