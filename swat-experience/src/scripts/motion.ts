import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "../styles/motion.css";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
const preference = matchMedia("(prefers-reduced-motion: reduce)");
const touch = matchMedia("(pointer: coarse)");
const button = document.querySelector<HTMLButtonElement>(
  "[data-motion-toggle]",
);
let userPaused = false;
try {
  userPaused = localStorage.getItem("swat-motion") === "paused";
} catch {
  /* Storage can be unavailable in private contexts. */
}
let lenis: Lenis | undefined;
let context: gsap.Context | undefined;
let splits: SplitText[] = [];
let cleanup: (() => void)[] = [];
let generation = 0;
const enabled = () => !preference.matches && !userPaused;
const tick = (seconds: number) => lenis?.raf(seconds * 1000);
const refresh = () => {
  lenis?.resize();
  ScrollTrigger.refresh();
};

function stop() {
  generation++;
  cleanup.forEach((dispose) => dispose());
  cleanup = [];
  context?.revert();
  context = undefined;
  splits.forEach((split) => split.revert());
  splits = [];
  gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = undefined;
  document.documentElement.classList.remove("motion-active");
}

async function start() {
  stop();
  document.documentElement.dataset.motionReady = "false";
  document.documentElement.dataset.intro = "settled";
  const active = enabled();
  document.documentElement.dataset.motion = active ? "full" : "reduced";
  if (button) {
    button.hidden = false;
    button.textContent = active ? "Motion: on" : "Motion: reduced";
    button.setAttribute("aria-pressed", String(!active));
    button.setAttribute(
      "aria-label",
      active
        ? "Reduce motion"
        : "Motion reduced; enable when system preference allows",
    );
  }
  document.dispatchEvent(
    new CustomEvent("swat:motion", { detail: { enabled: active } }),
  );
  if (!active) {document.documentElement.dataset.motionReady = "true";return;}
  const ticket = generation;
  await document.fonts.ready;
  if (ticket !== generation) return;
  document.documentElement.classList.add("motion-active");
  if (!touch.matches) {
    lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
      prevent: (node) => !!node.closest("dialog, #map, [data-lenis-prevent]"),
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  }
  const dialogLock = new MutationObserver(() => {
    if (document.querySelector("dialog[open]")) lenis?.stop();
    else lenis?.start();
  });
  document.querySelectorAll("dialog").forEach((dialog) =>
    dialogLock.observe(dialog, {
      attributes: true,
      attributeFilter: ["open"],
    }),
  );
  cleanup.push(() => dialogLock.disconnect());
  // Anchor and keyboard scrolling remain browser-owned. Resync at their actual native position.
  const anchor = (event: MouseEvent) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    if (link)
      requestAnimationFrame(() => {
        lenis?.scrollTo(scrollY, { immediate: true });
        refresh();
      });
  };
  document.addEventListener("click", anchor);
  cleanup.push(() => document.removeEventListener("click", anchor));
  context = gsap.context(() => {
    const hero = document.querySelector(".home-hero");
    const isFresh = scrollY < 80 && !location.hash;
    if (hero && isFresh) {
      document.documentElement.dataset.intro = "running";
      const split = SplitText.create(hero.querySelector("h1")!, {
        type: "chars",
        aria: "auto",
      });
      splits.push(split);
      gsap
        .timeline({ defaults: { ease: "power3.out" }, onComplete:()=>{document.documentElement.dataset.intro="settled";} })
        .from(split.chars, {
          yPercent: 38,
          rotation: (i) => (i - 1.5) * 2,
          opacity: 0,
          duration: 1.15,
          stagger: 0.075,
          clearProps: "transform,opacity",
        })
        .from(
          ".hero-bottom h2",
          {
            y: 22,
            opacity: 0,
            duration: 0.65,
            clearProps: "transform,opacity",
          },
          0.35,
        )
        .from(
          ".hero-bottom .round-link",
          {
            x: -18,
            opacity: 0,
            duration: 0.55,
            clearProps: "transform,opacity",
          },
          0.6,
        );
      if (!touch.matches)
        gsap.to(hero.querySelector("h1"), {
          y: -45,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
    }
    const invitation = document.querySelector(".atlas-invitation");
    if (invitation) {
      gsap.from(".river-index a", {
        x: (i) => 18 + i * 5,
        duration: 0.75,
        stagger: 0.065,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: invitation, start: "top 75%", once: true },
      });
      if (!touch.matches)
        gsap.fromTo(
          invitation,
          { clipPath: "inset(0 4% 0 4%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: invitation,
              start: "top 90%",
              end: "top 35%",
              scrub: 0.4,
            },
          },
        );
    }
    // One editorial line treatment per document, never character-split joined scripts.
    const heading = document.querySelector<HTMLElement>(
      ".home-intro h2, .heritage-hero h1, .section-culture .page-heading h1, .environment-hero h1, .place-story-heading",
    );
    if (heading && !heading.closest('[lang]:not([lang="en"])')) {
      const split = SplitText.create(heading, {
        type: "lines",
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          return gsap.from(self.lines, {
            x: -12,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: heading, start: "top 86%", once: true },
          });
        },
      });
      splits.push(split);
    }
    // A single image aperture in the heritage chapter echoes the opening of an excavation record.
    const heritage = document.querySelector(".heritage-hero > .photo picture");
    if (heritage && isFresh)
      gsap.fromTo(
        heritage,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.inOut",
          clearProps: "clipPath",
        },
      );
    const place = document.querySelector(".place-hero:not(.hero-split)");
    if (place && !touch.matches)
      gsap.fromTo(
        place.querySelector("img"),
        { objectPosition: "50% 44%" },
        {
          objectPosition: "50% 56%",
          ease: "none",
          scrollTrigger: {
            trigger: place,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    const water = document.querySelector<SVGPathElement>(".diagram-land");
    if (water) {
      const length = water.getTotalLength();
      gsap.fromTo(
        water,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.inOut",
          clearProps: "strokeDasharray,strokeDashoffset",
          scrollTrigger: {
            trigger: ".catchment",
            start: "top 80%",
            once: true,
          },
        },
      );
    }
    const progress = document.querySelector(".reading-current");
    if (progress)
      gsap.fromTo(
        progress,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
  });
  const onPlace = (event: Event) => {
    if (!enabled()) return;
    const changed = (event as CustomEvent).detail?.placeChanged;
    const targets = changed ? "#atlas-name, #atlas-text" : "#atlas-text";
    context?.add(() => {
      gsap.fromTo(
        targets,
        { x: changed ? 16 : 7 },
        {
          x: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
          clearProps: "transform",
        },
      );
    });
  };
  const onLanguage = () => {
    context?.add(() => {
      const panel = document.querySelector(".language-panel:not([hidden])");
      if (panel)
        gsap.fromTo(
          panel,
          { x: 20 },
          { x: 0, duration: 0.5, ease: "power3.out", clearProps: "transform" },
        );
      refresh();
    });
  };
  document.addEventListener("swat:place-change", onPlace);
  document.addEventListener("swat:language-change", onLanguage);
  cleanup.push(() => {
    document.removeEventListener("swat:place-change", onPlace);
    document.removeEventListener("swat:language-change", onLanguage);
  });
  // FLIP retains the same physical lens indicator as a reader changes perspective.
  document
    .querySelectorAll<HTMLElement>(".lens-tabs, .language-tabs")
    .forEach((group) => {
      const indicator = document.createElement("span");
      indicator.className = "current-indicator";
      indicator.setAttribute("aria-hidden", "true");
      const selected = () =>
        group.querySelector<HTMLElement>(
          '[aria-pressed="true"], [aria-selected="true"]',
        );
      selected()?.append(indicator);
      const observer = new MutationObserver(() => {
        const target = selected();
        if (!target || indicator.parentElement === target) return;
        const state = Flip.getState(indicator);
        target.append(indicator);
        context?.add(() => {
          Flip.from(state, {
            duration: 0.45,
            ease: "power3.inOut",
            absolute: true,
          });
        });
      });
      observer.observe(group, {
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-pressed", "aria-selected"],
      });
      cleanup.push(() => {
        observer.disconnect();
        indicator.remove();
      });
    });
  document
    .querySelectorAll<HTMLDetailsElement>(".layer-list details")
    .forEach((details) => {
      const reveal = () => {
        if (details.open)
          context?.add(() => {
            gsap.fromTo(
              details.querySelector("div"),
              { x: 18, clipPath: "inset(0 0 100% 0)" },
              {
                x: 0,
                clipPath: "inset(0 0 0% 0)",
                duration: 0.55,
                ease: "power3.out",
                clearProps: "transform,clipPath",
                onComplete: refresh,
              },
            );
          });
        refresh();
      };
      details.addEventListener("toggle", reveal);
      cleanup.push(() => details.removeEventListener("toggle", reveal));
    });
  document.querySelectorAll<HTMLDialogElement>("dialog").forEach((dialog) => {
    const observer = new MutationObserver(() => {
      if (dialog.open)
        context?.add(() => {
          gsap.fromTo(
            dialog,
            { y: 14, opacity: 0.65 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
          );
        });
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    cleanup.push(() => observer.disconnect());
  });
  // Drop optional scroll treatments when sustained rendering cannot keep pace.
  // This uses the same GSAP clock, and does not force another animation loop.
  let lastScroll = 0;
  let slowFrames = 0;
  let sampledFrames = 0;
  const observeScroll = () => {
    lastScroll = performance.now();
  };
  const quality = (_time: number, delta: number) => {
    if (document.hidden || performance.now() - lastScroll > 150 || delta > 200)
      return;
    sampledFrames++;
    if (delta > 32) slowFrames++;
    if (sampledFrames < 45) return;
    if (slowFrames > 28) {
      document.documentElement.dataset.motionQuality = "economy";
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.scrub &&
          trigger.trigger !== document.querySelector("main")
        ) {
          trigger.animation?.progress(1);
          trigger.kill();
        }
      });
      lenis?.destroy();
      lenis = undefined;
      gsap.ticker.remove(tick);
      gsap.ticker.remove(quality);
    }
    sampledFrames = 0;
    slowFrames = 0;
  };
  document.documentElement.dataset.motionQuality = "full";
  window.addEventListener("scroll", observeScroll, { passive: true });
  gsap.ticker.add(quality);
  cleanup.push(() => {
    window.removeEventListener("scroll", observeScroll);
    gsap.ticker.remove(quality);
  });
  refresh();
  document.documentElement.dataset.motionReady = "true";
}
button?.addEventListener("click", () => {
  userPaused = !userPaused;
  try {
    localStorage.setItem("swat-motion", userPaused ? "paused" : "full");
  } catch {}
  void start();
});
preference.addEventListener("change", () => void start());
touch.addEventListener("change", () => void start());
window.addEventListener("pagehide", stop);
window.addEventListener("pageshow", (event) => {
  if (event.persisted) void start();
});
void start();
