const tabs = document.querySelector<HTMLElement>("[data-story-tabs]");
const buttons = Array.from(
  tabs?.querySelectorAll<HTMLButtonElement>("button") ?? [],
);
const panels = Array.from(
  document.querySelectorAll<HTMLElement>(".language-panel"),
);
function activate(id: string, focus = false) {
  buttons.forEach((button) => {
    const selected = button.dataset.panel === id;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected && focus) button.focus();
  });
  panels.forEach((panel) => (panel.hidden = panel.id !== id));
  document.dispatchEvent(new CustomEvent("swat:language-change"));
}
if (tabs) {
  tabs.hidden = false;
  tabs.setAttribute("role", "tablist");
  buttons.forEach((button, index) => {
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", button.dataset.panel!);
    button.addEventListener("click", () => {
      activate(button.dataset.panel!);
      history.replaceState(null, "", `#${button.dataset.panel}`);
    });
    button.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
      else if (event.key === "ArrowLeft")
        next = (index + buttons.length - 1) % buttons.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = buttons.length - 1;
      else return;
      event.preventDefault();
      const target = buttons[next];
      if (target) {
        activate(target.dataset.panel!, true);
        history.replaceState(null, "", `#${target.dataset.panel}`);
      }
    });
  });
  panels.forEach((panel) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", `tab-${panel.id}`);
    panel.tabIndex = 0;
  });
  activate(
    panels.some((p) => p.id === location.hash.slice(1))
      ? location.hash.slice(1)
      : "torwali",
  );
  window.addEventListener("hashchange", () => {
    if (panels.some((p) => p.id === location.hash.slice(1)))
      activate(location.hash.slice(1));
  });
}
