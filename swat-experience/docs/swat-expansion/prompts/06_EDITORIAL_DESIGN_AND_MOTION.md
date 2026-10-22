# Model: GPT-6 Luna for art direction; GPT-6.1 Sol for final code and GSAP/Lenis

Critique the actual expanded SWAT website as a creative development studio. The earlier design suffered from repeated editorial structures; create distinct visual languages inside one coherent identity.

Research Awwwards / immersive destination / museum / documentary references, then design actual page compositions for: cinematic geographic homepage, atlas exploration, hero photoessay, archaeology/object-room, language/audio room, environmental evidence lab. Avoid numbered chapters, generic gradients, identical cards, repetitive scroll reveals, fake labels, empty parallax.

Keep real, fully cleared photography and existing working UI; do not substitute AI imagery. Use restrained image cropping with license credits and diverse scales (cinema/full-bleed, staggered contact sheets, split editorial, artifact magnification, maps, archival sidebars). Preserve type hierarchy and fast document structure.

Implement scroll and navigation interaction systems using GSAP + ScrollTrigger + Lenis; **one RAF integration**, shared cleanup, context reversion on route changes, update trigger positions after image loads, preserve history and hash links. Do not stack Lenis autoRaf on top of GSAP ticker without intentional integration. Use independent behaviors: atlas camera sync, reveal from real photographs, timeline navigation, transcript selection, artifact zoom, climate scrub—not one generalized reveal function. Use CSS/Framer-free lightweight transitions where faster.

Respect keyboard, reduced motion, native scroll fallbacks, coarse pointers, iOS Safari and touch. Motion must not hide facts or block navigation; disable decorative motion when device resources are limited. Record desktop/mobile interaction videos/screenshots if tools allow and test route transitions for memory leaks, scroll restoration and GSAP stale triggers.

Actively redesign weak sections rather than generating another style-guide-only report. Deliver diffs, screenshots, measured performance and remaining issues.
