# Critical review and revisions

## Observed weaknesses and changes made

- The initial homepage used a shallow-focus flower photograph. It conveyed intimacy but did not establish the relationship between water, forest and mountain. Replaced it with Murtaza Mahmud’s sharp, licensed Mahodand summer view. Retained the flower image for the Mahodand place context.
- The sources heading overflowed on a 390 px viewport. Added a dedicated responsive title size and verified the route again.
- The first full-page capture reached a below-fold image before its lazy load completed. The screenshot harness now decodes all page images before capture; final checks show no broken images.
- Programmatic focus on the main region produced a distracting browser outline. Removed that outline only from main; interactive keyboard focus remains visible. Added an explicit focus treatment to map nodes.
- The opening photograph required stronger text contrast. Darkened the image using CSS and recorded this treatment in the credits.
- The ends of the river sequence now have disabled navigation states.
- Added a direct provincial Swat Museum source for craft material.

## Final visual judgment

The strongest work is the large photographic opening, contrasting dark atlas, and heritage page’s stone-and-photograph composition. The river/lens interaction gives the navigation a reason to exist. The homepage varies editorial scale, spacing and density rather than repeating destination cards.

The weaker area is editorial depth: place notes are concise and some routes do not yet have a licensed photograph of their own. The prototype avoids substituting unrelated imagery. The culture chapter would benefit from commissioned interviews, recordings, craft documentation and review by local language speakers. Those are substantive production needs, not placeholders filled with invented material.

The map is an editorial schematic rather than surveyed terrain. Its linework must not be presented as accurate contours. The environmental diagram is explicitly conceptual.

The 8+/10 brief remains a target, not an external rating or a claim of award readiness. A public edition should deepen original reporting and invite local cultural review.

## Verification

Headless Brave via the existing Playwright installation, 1440×1000 and 390×844 viewports:

- Nine representative routes checked at both widths: home, atlas, heritage, culture, environment, sources, and three place variants.
- No horizontal overflow, broken images or runtime JavaScript errors in the final pass.
- Verified the language lens at Bahrain, downstream movement to Madyan, history-layer expansion, menu opening and Escape dismissal.
- Browser-rendered, full-page screenshots captured for home, atlas and heritage at both widths.
- Local assets total approximately 3 MB. No framework, external font request, analytics, autoplay media or API is required at runtime.
- Reduced-motion handling, semantic links/buttons, image alternatives and keyboard-operable map controls are present. This is not a complete assistive-technology or cross-browser audit.

See qa-results.txt for captured results and ../screenshots/ for images.

## Publication status

The local prototype is complete. A private Sites registration exists, but source synchronization was rejected by automatic approval review because explicit authorization for uploading to that destination was not established. No deployment is claimed. Publishing is pending user approval.
