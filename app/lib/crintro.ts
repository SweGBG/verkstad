/**
 * CRiNTRO Loader (image edition): the intro is the loading screen.
 *
 * IronDäck's hero is a large photo (Z-Image Turbo, 2560 px). While the logo intro plays, the
 * loader waits for the real hero <img> (marked data-crintro) to finish downloading AND decoding,
 * plus the display font, so when the curtain lifts the photo and the headline are there at full
 * sharpness, never half-loaded. The images further down (tires, hotel) are warmed afterwards
 * at low priority so the scroll section is ready too.
 */
type Listener = () => void;

const S = {
  started: false,
  /** 0..1 for what the intro waits for: hero photo(s) + fonts */
  crit: 0,
  /** 0..1 for everything (including images below the fold) */
  all: 0,
  listeners: new Set<Listener>(),
};
export type CrintroState = typeof S;
const emit = () => S.listeners.forEach((f) => f());

export function crintro() {
  if (typeof window !== "undefined" && !S.started) {
    S.started = true;
    start();
  }
  return S;
}

export function onCrintro(fn: Listener) {
  S.listeners.add(fn);
  return () => {
    S.listeners.delete(fn);
  };
}

/** Resolves when an <img> has its bytes and is decoded (or failed: a broken image must not hold the intro). */
function settle(img: HTMLImageElement) {
  const decoded = () => (img.decode ? img.decode().catch(() => {}) : Promise.resolve());
  if (img.complete) return decoded();
  return new Promise<void>((res) => {
    img.addEventListener("load", () => decoded().then(res), { once: true });
    img.addEventListener("error", () => res(), { once: true });
  });
}

async function start() {
  if (location.search.includes("crintro")) (window as unknown as { __crintro: CrintroState }).__crintro = S; // ?crintro to inspect
  const crit = Array.from(document.querySelectorAll<HTMLImageElement>("img[data-crintro]"));
  const later = Array.from(document.querySelectorAll<HTMLImageElement>("main img:not([data-crintro])"));
  const jobs: Promise<unknown>[] = crit.map(settle);
  if (document.fonts?.ready) jobs.push(document.fonts.ready);
  if (!jobs.length) {
    S.crit = S.all = 1;
    return emit();
  }
  let done = 0;
  await Promise.all(
    jobs.map((p) =>
      p.then(() => {
        done++;
        S.crit = done / jobs.length;
        S.all = S.crit * 0.7;
        emit();
      }),
    ),
  );
  // warm the rest once the hero is safe: lazy images below the fold start downloading now
  let warm = 0;
  if (!later.length) S.all = 1;
  later.forEach((img) => {
    img.loading = "eager";
    settle(img).then(() => {
      warm++;
      S.all = 0.7 + 0.3 * (warm / later.length);
      emit();
    });
  });
  emit();
}
