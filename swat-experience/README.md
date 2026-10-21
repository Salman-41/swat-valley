# SWAT — A valley, in many currents

A dependency-free HTML/CSS/JavaScript browser prototype about Swat Valley, Pakistan.

## Run

From this folder:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. No package install or build is required. All photography and fonts are local, so the experience does not depend on third-party assets at runtime.

- `dist/`: deployable site
- `docs/RESEARCH-AND-DIRECTION.md`: references, three directions, chosen identity and editorial decisions
- `docs/REVIEW.md`: review, revisions and verification
- `screenshots/`: desktop and mobile browser captures
- `dist/#/sources`: visitor-facing source and license register

The schematic atlas is not a measured geographic map. No audio, testimony, historical statistic or visitor review is fabricated. The 8+/10 brief is a creative target, not an awarded score.

`qa.cjs` records the interaction and responsive checks performed in the authoring environment. It uses the preinstalled Playwright package and Brave; adjust those two environment-specific paths to run it elsewhere.
