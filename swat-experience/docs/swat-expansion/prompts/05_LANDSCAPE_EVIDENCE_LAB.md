# Model: GPT-6.1 Sol for GIS/data pipeline; Astra Pro for scientific QA

Make Fieldnotes scientifically inspectable and useful, not decoration. Work in existing codebase with typed source registry, data derivation scripts, provenance and cited narrative.

Implement (where data and licenses permit): (1) SRTM terrain/elevation profiles and slope commentary; (2) Landsat or Sentinel dated imagery before/after comparator with correct geospatial alignment, same season/processing disclosures, map scale and dates; (3) river change story based on NHESS 2025 Swat River study and Swiss synthesis report, only with properly licensed figures or new original diagrams; (4) climate charts from NASA POWER or suitably licensed datasets clearly labeling grid resolution/model limitations; (5) optional GBIF species occurrence study limited to genuinely relevant georeferenced records with CC0/CC BY licenses and DOI citation.

Avoid unsupported 'real time' flood safety warnings, false precision, unsupported environmental conclusions, external unlicensed basemap screenshots, empty charts, or fabricated indicators. For each chart/map show source, temporal range, processing method, uncertainty, unit, geographic scope, last-verified date and download/original link.

Expose legitimate controls: compare slider for two real images, layer toggles, timeframe selection, map legends, filter reset, zoom/pan, export accessible data table or JSON/CSV for derived data where licensed. Persist selected state in URLs, guard missing data, and make non-WebGL readable alternatives.

Automated tests for API parsing, geospatial units, timeseries alignment, responsive charts, keyboard map/list, broken imagery and source links. Deliver reproducible processing pipeline not just static mockup.
