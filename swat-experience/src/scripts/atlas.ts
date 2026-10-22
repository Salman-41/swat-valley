import gsap from "gsap";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import type {
  Map as MapInstance,
  Marker,
  StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Place, Lens } from "../data/places";
import { photos } from "../data/photos";
const root = document.querySelector<HTMLElement>("#atlas")!;
const places: Place[] = JSON.parse(root.dataset.places ?? "[]");
let map: MapInstance | undefined;
let markers: Marker[] = [];
let loading = false;
const select = document.querySelector<HTMLSelectElement>("#place-select")!;
const query = new URLSearchParams(location.search);
let index = Math.max(
  0,
  places.findIndex((p) => p.id === query.get("place")),
);
let lens: Lens = ["landscape", "language", "memory"].includes(
  query.get("lens") ?? "",
)
  ? (query.get("lens") as Lens)
  : "landscape";
const status = document.querySelector<HTMLElement>("#map-status")!;
const retry = document.querySelector<HTMLButtonElement>("#retry-map")!;
const reduced = () =>
  document.documentElement.dataset.motion === "reduced" ||
  matchMedia("(prefers-reduced-motion: reduce)").matches;
let following = false;
let previousPlace = "";
const followButton =
  document.querySelector<HTMLButtonElement>("#follow-place")!;
function focusPlace() {
  const place = places[index]!;
  map?.easeTo({
    center: place.coordinates,
    zoom: 10,
    duration: reduced() ? 0 : 900,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
}
followButton.addEventListener("click", () => {
  following = !following;
  followButton.setAttribute("aria-pressed", String(following));
  followButton.textContent = following
    ? "Following selected place"
    : "Follow selected place";
  if (following) focusPlace();
});
function update(push = false) {
  const place = places[index]!;
  const placeChanged = previousPlace !== place.id;
  select.value = place.id;
  document
    .querySelectorAll<HTMLButtonElement>("[data-lens]")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.lens === lens)),
    );
  const text = (id: string, value: string) => {
    document.querySelector(`#${id}`)!.textContent = value;
  };
  text("atlas-region", place.region);
  text("atlas-name", place.name);
  text("map-story-name", place.name);
  text("atlas-text", place.lenses[lens]);
  text(
    "atlas-coordinates",
    `${place.coordinates[1].toFixed(5)}° N / ${place.coordinates[0].toFixed(5)}° E`,
  );
  const photo = photos.find((p) => p.id === place.image)!;
  const image = document.querySelector<HTMLImageElement>("#atlas-image")!;
  if (placeChanged) {
    const old = image.cloneNode() as HTMLImageElement;
    old.className = "photo-previous";
    old.alt = "";
    old.setAttribute("aria-hidden", "true");
    image.parentElement
      ?.querySelectorAll(".photo-previous")
      .forEach((el) => el.remove());
    if (previousPlace && !reduced()) image.parentElement?.append(old);
    image.src = `/images/${photo.id}-960.webp`;
    image.alt = photo.alt;
    const reveal = () => {
      if (!old.isConnected) return;
      if (reduced()) {
        old.remove();
        return;
      }
      gsap.fromTo(
        old,
        { clipPath: "inset(0 0 0 0)" },
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => old.remove(),
        },
      );
    };
    image
      .decode()
      .then(reveal)
      .catch(() => old.remove());
  }
  const credit = document.querySelector<HTMLAnchorElement>("#atlas-credit")!;
  credit.href = `/sources/#photo-${photo.id}`;
  const link = document.querySelector<HTMLAnchorElement>("#atlas-link")!;
  link.href = `/places/${place.id}/`;
  link.textContent = `Read the ${place.name} place note ↗`;
  text(
    "place-progress",
    `${index === 0 ? "Upstream" : place.id === "malam-jabba" ? "Side valley" : "Along the valley"} / ${place.name}`,
  );
  markers.forEach((marker, i) => {
    marker.getElement().classList.toggle("selected", i === index);
    marker.getElement().setAttribute("aria-pressed", String(i === index));
  });
  if (push && following && placeChanged) focusPlace();
  if (push)
    document.dispatchEvent(
      new CustomEvent("swat:place-change", { detail: { placeChanged } }),
    );
  previousPlace = place.id;
  if (push) {
    const url = new URL(location.href);
    url.searchParams.set("place", place.id);
    url.searchParams.set("lens", lens);
    history.pushState(null, "", url);
  }
}
select.addEventListener("change", () => {
  index = places.findIndex((p) => p.id === select.value);
  update(true);
});
document.querySelectorAll<HTMLButtonElement>("[data-lens]").forEach((button) =>
  button.addEventListener("click", () => {
    lens = button.dataset.lens as Lens;
    update(true);
  }),
);
document.querySelector("#previous-place")!.addEventListener("click", () => {
  index = (index + places.length - 1) % places.length;
  update(true);
});
document.querySelector("#next-place")!.addEventListener("click", () => {
  index = (index + 1) % places.length;
  update(true);
});
window.addEventListener("popstate", () => {
  const params = new URLSearchParams(location.search);
  index = Math.max(
    0,
    places.findIndex((p) => p.id === params.get("place")),
  );
  lens = ["landscape", "language", "memory"].includes(params.get("lens") ?? "")
    ? (params.get("lens") as Lens)
    : "landscape";
  update();
});
update();
const bounds: [[number, number], [number, number]] = [
  [72.08, 34.6],
  [72.84, 35.82],
];
function fail() {
  loading = false;
  root.classList.remove("map-ready");
  status.textContent =
    "Map unavailable. Accurate place coordinates are shown below.";
  retry.hidden = false;
  document.querySelector<HTMLButtonElement>("#reset-map")!.hidden = true;
  map?.remove();
  map = undefined;
  markers = [];
}
async function initialize() {
  if (loading || map) return;
  loading = true;
  retry.hidden = true;
  status.textContent = "Loading geographic map…";
  try {
    const lib = await import("maplibre-gl");
    lib.setWorkerUrl(workerUrl);
    const style: StyleSpecification = {
      version: 8,
      sources: {
        swat: {
          type: "vector",
          tiles: [`${location.origin}/data/tiles/{z}/{x}/{y}.pbf`],
          minzoom: 7,
          maxzoom: 10,
          bounds: [71.8, 34.4, 73.1, 36],
        },
      },
      layers: [
        {
          id: "background",
          type: "background",
          paint: { "background-color": "#23463e" },
        },
        {
          id: "landcover",
          type: "fill",
          source: "swat",
          "source-layer": "landcover",
          paint: { "fill-color": "#335a48", "fill-opacity": 0.65 },
        },
        {
          id: "landuse",
          type: "fill",
          source: "swat",
          "source-layer": "landuse",
          paint: { "fill-color": "#5d6e51", "fill-opacity": 0.4 },
        },
        {
          id: "water",
          type: "fill",
          source: "swat",
          "source-layer": "water",
          paint: { "fill-color": "#aac5b1" },
        },
        {
          id: "waterway",
          type: "line",
          source: "swat",
          "source-layer": "waterway",
          paint: {
            "line-color": "#b2cdb6",
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              0.7,
              10,
              2.4,
            ],
          },
        },
        {
          id: "roads",
          type: "line",
          source: "swat",
          "source-layer": "transportation",
          filter: ["in", "class", "primary", "secondary", "trunk", "motorway"],
          paint: {
            "line-color": "#b0af81",
            "line-width": 0.7,
            "line-opacity": 0.6,
          },
        },
      ],
    };
    map = new lib.Map({
      container: "map",
      style,
      bounds,
      fitBoundsOptions: { padding: 65 },
      minZoom: 7,
      maxZoom: 11,
      maxBounds: [
        [71.8, 34.4],
        [73.1, 36],
      ],
      attributionControl: false,
      dragRotate: false,
      touchPitch: false,
      renderWorldCopies: false,
      canvasContextAttributes: { preserveDrawingBuffer: false },
    });
    map.addControl(
      new lib.NavigationControl({ showCompass: false }),
      "top-left",
    );
    map.addControl(new lib.ScaleControl({ unit: "metric" }), "bottom-left");
    const timeout = setTimeout(() => {
      if (loading) fail();
    }, 15000);
    map.on("error", () => {
      if (loading) {
        clearTimeout(timeout);
        fail();
      } else {
        status.textContent =
          "Some geographic detail could not load. Place markers remain available.";
      }
    });
    map.once("idle", () => {
      if (!map) return;
      clearTimeout(timeout);
      loading = false;
      root.classList.add("map-ready");
      status.textContent = "Geographic data · Select a place marker";
      document.querySelector<HTMLButtonElement>("#reset-map")!.hidden = false;
    });
    places.forEach((place, i) => {
      const button = document.createElement("button");
      button.className = "map-marker";
      button.type = "button";
      button.textContent = place.name;
      button.setAttribute("aria-label", `Explore ${place.name}`);
      button.addEventListener("click", () => {
        index = i;
        update(true);
      });
      markers.push(
        new lib.Marker({ element: button, anchor: "left" })
          .setLngLat(place.coordinates)
          .addTo(map!),
      );
    });
    update();
  } catch {
    fail();
  }
}
document.querySelector("#reset-map")!.addEventListener("click", () => {
  following = false;
  followButton.setAttribute("aria-pressed", "false");
  followButton.textContent = "Follow selected place";
  map?.fitBounds(bounds, { padding: 65, duration: reduced() ? 0 : 600 });
});
retry.addEventListener("click", () => void initialize());
const observer = new IntersectionObserver(
  (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      void initialize();
      observer.disconnect();
    }
  },
  { rootMargin: "200px" },
);
observer.observe(root);

document.addEventListener("swat:motion", (event) => {
  if (!(event as CustomEvent).detail.enabled) {
    map?.stop();
    document.querySelectorAll(".photo-previous").forEach((el) => el.remove());
  }
});
window.addEventListener("pagehide", () => map?.stop());
