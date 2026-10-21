# SWAT — A valley, in many currents

Research and design record · 21 October 2026

## What was studied

The research used live page content, Awwwards entries, actual composition stills, and makers’ descriptions of interactions. Reference images in this folder are research material only, not website assets. The connected browser was unavailable. A later headless pass successfully rendered Getty’s accessible edition and read navigation instructions from Siena and page content from Immersive Garden. The latter two visual captures were incomplete, so their composition analysis relies on the saved award stills. Full motion/performance audits of the references were not performed.

| Reference | Evidence examined | Useful finding | Decision for SWAT |
|---|---|---|---|
| [Siena Film Foundation](https://www.awwwards.com/sites/siena-film-foundation), SOTD March 18, 2025 and March SOTM listing | Actual page content, Awwwards composition screenshot; documented film-strip, procedural slider and dynamic menu elements | Content can define the navigation metaphor. Large type can coexist with photographic specificity and small editorial labels. | Use a river as a content structure; do not borrow the film-strip shell, rounded frames or typeface. |
| [Immersive Garden](https://immersive-g.com/), January 2025 SOTM listing | Live content, actual award still and project descriptions | Concentrated imagery and a restrained interface can establish a world before explaining it. | Establish Swat through real photography, then offer clear entry points. No loading theatre or fictional nature. |
| [Inkfish](https://www.awwwards.com/sites/inkfish), [May SOTM case study listing](https://www.awwwards.com/blog/?tag=sites-of-the-month) | Actual composition screenshot and award page HTML | A compact typographic index can make work navigable without tiled cards. The photograph remains dominant. | Use an index and a river sequence; avoid identical destination cards. |
| [Travelshift, by Immersive Garden](https://immersive-g.com/projects/travelshift/) | Actual destination-interface still; maker’s explanation of long-press destination reveals | A destination can become an interaction, not merely a thumbnail. The image fills the frame while controls remain sparse. | Make geographical position change the story; expose buttons and a keyboard slider instead of an undiscoverable long press. |
| [Sculpting Harmony, Getty](https://gehry.getty.edu/) and its [accessible edition](https://gehry.getty.edu/accessibility) | Live chapter structure, archival captions, accessibility presentation, page source and [Getty’s project account](https://www.getty.edu/news/getty-spotlights-the-frank-o-gehry-papers/) | Cultural spectacle needs an underlying evidence structure: named materials, credits, chapters and a readable path. | Build a distinctly quieter heritage chapter with expandable layers, and maintain readable text outside the interaction. |

The strongest synthesis is not maximal animation. It is a clear subject-specific organising idea, photographic authority, contrast in scale, and enough navigational clarity that a visitor can choose their own depth.

## Three directions evaluated

Scores are internal design judgments, not external reviews. Each criterion is out of ten.

| Direction | Originality | Art | Swat relevance | Narrative | Usability | Interaction | Distance from generic AI layouts |
|---|---:|---:|---:|---:|---:|---:|---:|
| Night in the mountains: full-screen dark cinema, minimal text, slow photographic transitions | 6 | 8 | 7 | 6 | 6 | 6 | 5 |
| Excavated field journal: terracotta, fragments, marginalia, archival layers | 8 | 8 | 8 | 9 | 8 | 7 | 8 |
| A valley in many currents: paper editorial + dark river atlas + stone heritage chapter | 9 | 8 | 9 | 9 | 9 | 9 | 8 |

Chosen: **A valley, in many currents.** It accommodates the present and the past without treating culture as decoration or nature as an empty stage. The field-journal idea informs the heritage page, but does not dominate the identity.

## Swat findings and editorial consequences

- **The river is a useful organising structure.** Kalam’s confluence connects the upper valleys with Bahrain, Madyan, Mingora and Barikot downstream. Mahodand sits in the upper catchment; Malam Jabba is an eastern side-valley destination, not a river stop. [River overview](https://en.wikipedia.org/wiki/Swat_River), [valley overview](https://en.wikipedia.org/wiki/Swat_Valley).
- **Landscape is varied.** Alpine lakes and meadows, forested slopes, cultivated land, settlements and urban centres belong to the same region. Avoid suggesting all of Swat is wilderness.
- **Archaeology is layered.** [Bazira–Barikot’s UNESCO Tentative List record](https://whc.unesco.org/en/tentativelists/7034/) describes hill, plain, urban and sacred spaces. It is on the Tentative List, not an inscribed World Heritage Site. The prototype preserves that distinction.
- **Language is a living practice.** [Zubair Torwali’s Smithsonian Folklife account](https://folklife.si.edu/magazine/stream-of-voices-torwali-language-music-poetry-pakistan) connects language, poetry, music, education and community cultural work. [Gawri references](https://en.wikipedia.org/wiki/Gawri_language) locate Gawri around Kalam, Ushu and Utror, and beyond Swat. The atlas describes broad associations without claiming exclusive language territories.
- **Craft needs named knowledge.** The [provincial archaeology directorate’s Swat Museum account](https://kparchaeology.gkp.pk/swat-museum/) identifies local embroidery, carved wood and jewellery. A future commissioned edition should include named makers and informed permissions; the prototype does not invent artisan interviews.
- **Environmental history belongs in the main narrative.** [2025 NHESS research](https://nhess.copernicus.org/articles/25/1071/2025/index.html) connects land-cover change, debris flows and flood impacts. The [Swiss-supported 2022 flood assessment](https://www.eda.admin.ch/content/dam/countries/countries-content/pakistan/en/synthesis-report-floods-report_en.pdf) adds river-corridor and sediment context. The environmental illustration is conceptual, not a flood model or measured map.

## Brand and visual language

**Name:** SWAT. **Editorial line:** A valley, in many currents.

The Latin wordmark is deliberately large and open. سوات appears as the place name, not as a claim that the site is translated. Language names appear as content; cultural review remains desirable before a commissioned public release.

**Type:** Italiana for titles and the wordmark; DM Sans for body, navigation and evidence labels. Both are locally hosted. OFL files are distributed with the fonts. Oversized display type contrasts with restrained labels, but body copy remains conventional and readable.

**Palette:** paper `#EEEAE1`, river `#173A34`, ink `#263B30`, meadow `#D6DFB8`, stone `#DDD7C9`. No glow or decorative gradient. The heritage page moves to stone; the atlas uses dark green to separate navigation from reading.

**Composition:** a photographic opening, an offset editorial argument, an atlas invitation, asymmetric cultural stories, then environmental responsibility. The river atlas is a dedicated interface rather than another homepage section. The heritage page has a split stone-and-photograph opening and a layered reading structure.

**Imagery:** real Wikimedia photographs with verified file-level authors and licenses. Local optimised copies; contextual captions and a credits route. CSS cropping and brightness adjustment are disclosed. No AI photographs, fictional terrain, invented portraits or substituted destination images.

**Motion:** short page entry and hover transitions communicate navigation and selection. Reduced-motion preferences disable them. No scroll hijacking, forced audio or decorative infinite animation.

## Signature interaction: same place, different current

The river atlas combines a north-to-south sequence with three lenses: Landscape, Language and Memory. A visitor can hold the place constant and change the lens, or keep a lens while moving downstream. The changing relationship is the interaction’s content.

Map nodes support click, Enter and Space. A native range control provides arrow-key and touch navigation; upstream/downstream buttons offer a visible alternative. Changes are announced through a polite live region. The illustration is explicitly schematic and is not a navigation map. Mobile places the controls and reading panel before the schematic so content is immediately usable.

## Scope implemented

Homepage; river atlas; heritage chapter; living culture chapter; environmental chapter; sources/credits; seven place routes (Mahodand, Kalam, Bahrain, Madyan, Mingora, Barikot, Malam Jabba). This is a connected static browser prototype with hash routes, not a booking service.

## Rendered reference follow-up

Getty’s accessible edition uses an orange ground, enormous compressed black title, an archival line drawing, and a clear horizontal chapter index. Siena’s page instructions describe drag, scroll and two menu paths; this reinforces the need for discoverable controls. These findings support contrasting scales and subject-specific navigation without importing a reference’s visual shell.
