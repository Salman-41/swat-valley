const menu = document.querySelector<HTMLDialogElement>("#site-index");
const trigger = document.querySelector<HTMLButtonElement>("[data-menu-open]");
function closeMenu() {
  menu?.close();
  trigger?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("dialog-open");
  trigger?.focus();
}
trigger?.addEventListener("click", () => {
  menu?.showModal();
  trigger.setAttribute("aria-expanded", "true");
  document.body.classList.add("dialog-open");
});
document
  .querySelector("[data-menu-close]")
  ?.addEventListener("click", closeMenu);
menu?.addEventListener("cancel", () => {
  trigger?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("dialog-open");
});
menu?.addEventListener("click", (event) => {
  if (event.target === menu) closeMenu();
});
const dialog = document.querySelector<HTMLDialogElement>("#photo-dialog");
const image = document.querySelector<HTMLImageElement>("#detail-image");
const caption = document.querySelector("#detail-caption");
const source = document.querySelector<HTMLAnchorElement>("#detail-source");
let photoTrigger: HTMLElement | null = null;
function closePhoto() {
  dialog?.close();
  document.body.classList.remove("dialog-open");
  image?.removeAttribute("src");
  photoTrigger?.focus();
}
const photographs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-open-photo]'));
const zoom = document.querySelector<HTMLInputElement>('#photo-zoom');
const viewport = document.querySelector<HTMLElement>('.photo-viewport');
let currentPhoto = 0;
let activePhotographs = photographs;
function setZoom(value:number) {
 if(!image||!viewport||!zoom)return;
 zoom.value=String(value);
 const output=document.querySelector('#photo-scale');if(output)output.textContent=`${value}%`;
 image.style.width=`${value}%`;
 image.style.maxHeight=value===100?'65svh':'none';
 image.style.maxWidth='none';
 if(value===100)viewport.scrollTo({left:0,top:0});
}
function showPhoto(index:number) {
 const button=activePhotographs[index];if(!button||!dialog||!image||!caption||!source)return;
 currentPhoto=index;
 dialog.classList.add('is-loading');dialog.classList.remove('has-error');
 image.alt=button.closest('figure')?.querySelector('img')?.alt??'Photograph detail';
 image.src=button.dataset.openPhoto??'';
 caption.textContent=button.dataset.photoCaption??'';
 source.href=button.dataset.photoSource??'/sources/';setZoom(100);
 document.querySelectorAll<HTMLButtonElement>('[data-photo-previous],[data-photo-next]').forEach(control=>control.disabled=activePhotographs.length<2);
}
photographs.forEach((button)=>button.addEventListener('click',()=>{activePhotographs=photographs.filter(item=>!item.closest('[hidden]'));photoTrigger=button;showPhoto(activePhotographs.indexOf(button));dialog?.showModal();document.body.classList.add('dialog-open');}));
zoom?.addEventListener('input',()=>setZoom(Number(zoom.value)));
document.querySelector('[data-photo-previous]')?.addEventListener('click',()=>showPhoto((currentPhoto+activePhotographs.length-1)%activePhotographs.length));
document.querySelector('[data-photo-next]')?.addEventListener('click',()=>showPhoto((currentPhoto+1)%activePhotographs.length));
image?.addEventListener("load", () => dialog?.classList.remove("is-loading"));
image?.addEventListener("error", () => {
  dialog?.classList.remove("is-loading");
  dialog?.classList.add("has-error");
  if (caption)
    caption.textContent =
      "This photograph could not be loaded. Close and try again, or open the credited original.";
});
document
  .querySelector("[data-photo-close]")
  ?.addEventListener("click", closePhoto);
dialog?.addEventListener("cancel", () => {
  document.body.classList.remove("dialog-open");
});
document.querySelectorAll<HTMLImageElement>("figure.photo img").forEach((img) =>
  img.addEventListener("error", () => {
    const figure = img.closest("figure");
    figure?.classList.add("image-failed");
    if (figure && !figure.querySelector(".image-error")) {
      const message = document.createElement("p");
      message.className = "image-error";
      message.textContent =
        "Photograph unavailable. See the image credits for the original.";
      figure.append(message);
    }
  }),
);
// Preserve prototype bookmarks while serving real document routes.
if (location.pathname === "/" && location.hash.startsWith("#/")) {
  const old = location.hash.slice(2);
  const aliases: Record<string, string> = {
    voices: "culture",
    changing: "environment",
  };
  const parts = old.split("/");
  if (parts[0] === "place") location.replace(`/places/${parts[1] ?? ""}/`);
  else if (old) location.replace(`/${aliases[old] ?? old}/`);
}
