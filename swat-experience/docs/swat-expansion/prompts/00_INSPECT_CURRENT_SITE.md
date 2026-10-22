# Model: GPT-6.1 Sol / optionally Astra Pro for assessment

You are inheriting an existing live SWAT Valley creative website. Do NOT redesign, scaffold anew, delete pages, or replace working content with placeholders.

Read the repository, inspect package.json, routing, content directories, build config, assets, animations, current deployment setup, and test tooling. Review docs/swat-expansion/README_START_HERE.md, EDITORIAL_COVERAGE_PLAN.md, RESEARCH_SOURCES_AND_LICENSES.md, and SOURCE_REGISTRY_SEED.json.

Run existing build and tests, open the actual local site in a browser, record route/screenshots and inspect all real interactions. Record a feature inventory with current working/not-working status. Find missing source metadata, fragile imagery, duplicate editorial layouts, incomplete archive, fake or unfinished form controls, and inaccessible interaction states.

Create `docs/EXPANSION_BASELINE.md` with verified evidence: stack and versions, existing routes, current components, used media with attribution, current tests and gaps. Create a durable incremental implementation plan + acceptance gates. Choose extension points rather than rewrites. Document exact commands tested and limitations.

Implement one immediate low-risk improvement only if supported by the audit, e.g. source registry schema/test. Do not claim newly implemented features without code and browser validation.
