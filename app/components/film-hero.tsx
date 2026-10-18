"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { crintro, nearestFrame, onCrintro, wantFrame, PHONE_QUERY } from "../lib/crintro";
import { FORETAG } from "../lib/data";
import OpenStatus from "./open-status";
import { IconArrow, IconPin, IconStar } from "./icons";
import styles from "./film-hero.module.css";

/*
 * The film IS the hero: a sticky stage where the scroll scrubs a self-made AI film (MiniMax H3).
 * One locked camera low on the workshop floor: the lights come on, winter arrives (snow, frost),
 * the frost melts off the studs, and the film lands on the new winter tire in front of the lift.
 * The CRiNTRO Loader (app/lib/crintro.ts) loads the film while the intro plays: desktop gets the
 * mp4 as a local blob, phones get a streamed image sequence. If neither loads, real photos
 * crossfade with a slow push-in.
 */
const POSTER = "/video/irondack-poster.webp";
const PHOTOS = ["/images/hero-2.webp", "/images/tire-winter.webp", "/images/mount.webp", "/images/hero-2.webp"];

const CHAPTERS = [
  { n: "01", name: "Ljuset", h: "Lyften är varm.", p: "Verkstaden är tänd innan du hunnit parkera. Bokad tid eller drop-in, du rullar vidare inom 30 minuter." },
  { n: "02", name: "Vintern", h: "Under +7 °C. Dags att byta.", p: "Sommardäckets gummi hårdnar i kylan och greppet försvinner. Vinterdäckets mjuka gummi och lameller biter även när vägen är blank." },
  { n: "03", name: "Greppet", h: "Dubbar som biter.", p: "Vi mäter mönsterdjup, dubbar och lufttryck på varje hjul och säger ärligt till om däcken klarar en säsong till." },
  { n: "04", name: "Klart", h: "Klart på 30 minuter.", p: "Däckbyte, balansering och klimatsäkrat däckhotell. Du får ett sms när bilen är redo." },
];

/** Scroll ranges (0–1) for the intro and the four chapters: [in, full, hold, out] */
type R = [number, number, number, number];
const INTRO: R = [-1, 0, 0.05, 0.12];
const CH: R[] = [
  [0.1, 0.14, 0.2, 0.25],
  [0.29, 0.33, 0.45, 0.5],
  [0.54, 0.58, 0.7, 0.75],
  [0.84, 0.9, 2, 2],
];
const SPAN: [number, number][] = [[0, 0.27], [0.27, 0.52], [0.52, 0.8], [0.8, 1]];

/** Outdoor temperature HUD: +12 °C at the top, down to −6 °C as winter sets in */
const T_FROM = 12, T_TO = -6, T_WINTER = 7;

type Mode = "video" | "frames" | "photos";
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const vis = (p: number, [a, b, c, d]: R) => (p < a || p > d ? 0 : p < b ? (p - a) / (b - a) : p > c ? 1 - (p - c) / (d - c) : 1);
const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

export default function FilmHero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const photos = useRef<(HTMLImageElement | null)[]>([]);
  const intro = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const segs = useRef<(HTMLButtonElement | null)[]>([]);
  const temp = useRef<HTMLSpanElement>(null);
  const gauge = useRef<HTMLDivElement>(null);
  const hud = useRef<HTMLDivElement>(null);
  const frost = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [active, setActive] = useState(-1);

  // Media mode comes from the CRiNTRO Loader: phone → image sequence, desktop → video, otherwise photos.
  useEffect(() => {
    const store = crintro();
    const sync = () => {
      setMode(store.mode === "frames" ? "frames" : store.mode === "video" ? "video" : store.mode === "failed" ? "photos" : null);
      setVideoSrc(store.videoUrl);
    };
    sync();
    return onCrintro(sync);
  }, []);

  useEffect(() => {
    if (!mode) return;
    const el = root.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones skip the per-frame blur on the text layers: blur is the most expensive thing to animate there.
    const lite = window.matchMedia(PHONE_QUERY).matches;
    let target = 0, cur = 0, raf = 0, lastSeek = 0, lastActive = -2, lastTemp = 99, last = performance.now();
    let lastImg: CanvasImageSource | null = null;
    // Only touch the DOM when a value really changed (saves style recalculation every frame).
    const put = (node: HTMLElement, prop: string, val: string) => {
      const box = node as HTMLElement & { _c?: Record<string, string> };
      box._c ??= {};
      if (box._c[prop] !== val) {
        box._c[prop] = val;
        node.style.setProperty(prop, val);
      }
    };
    const cv = canvas.current;
    const ctx = cv?.getContext("2d") ?? null;

    const fit = () => {
      if (!cv) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
      lastImg = null;
    };
    fit();
    window.addEventListener("resize", fit);

    const drawFrame = (p: number, count: number) => {
      if (!ctx || !cv || !count) return;
      const want = Math.round(p * (count - 1));
      wantFrame(want);
      const img = nearestFrame(want);
      if (!img || img === lastImg) return;
      lastImg = img;
      const s = Math.max(cv.width / img.width, cv.height / img.height);
      const w = img.width * s, h = img.height * s;
      ctx.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      // glide toward the scroll position at the same speed on 60 and 120 Hz screens
      cur += (target - cur) * (reduce ? 1 : 1 - Math.pow(0.9, dt * 60));
      if (Math.abs(target - cur) < 0.00005) cur = target;
      const p = clamp(cur);

      // the film slowly settles: starts slightly zoomed, ends at rest
      if (media.current) put(media.current, "transform", `scale(${(1.05 - 0.05 * p).toFixed(4)})`);

      // winter arrives with the scroll: +12 °C → −6 °C over the first two chapters
      const deg = Math.round(T_FROM + (T_TO - T_FROM) * ease(clamp((p - 0.06) / 0.5)));
      if (deg !== lastTemp) {
        lastTemp = deg;
        if (temp.current) temp.current.textContent = deg > 0 ? `+${deg}` : deg < 0 ? `−${-deg}` : "0";
        if (gauge.current) gauge.current.style.setProperty("--g", ((T_FROM - deg) / (T_FROM - T_TO)).toFixed(3));
        hud.current?.classList.toggle(styles.winter, deg <= T_WINTER);
      }
      // the HUD takes over once the intro has faded (they share the bottom-left corner)
      if (hud.current) put(hud.current, "opacity", clamp((p - 0.05) / 0.07).toFixed(3));
      // a cold blue breath over the floor while it's freezing (chapter 2–3)
      if (frost.current) put(frost.current, "opacity", (vis(p, [0.24, 0.36, 0.56, 0.7]) * 0.9).toFixed(3));

      if (intro.current) {
        const o = +vis(p, INTRO).toFixed(3);
        put(intro.current, "opacity", String(o));
        put(intro.current, "transform", `translate3d(0, ${((1 - o) * -40).toFixed(1)}px, 0) scale(${(0.94 + o * 0.06).toFixed(3)})`);
        if (!lite) put(intro.current, "filter", o < 1 ? `blur(${((1 - o) * 10).toFixed(1)}px)` : "none");
        put(intro.current, "visibility", o > 0.01 ? "visible" : "hidden");
      }
      layers.current.forEach((l, i) => {
        if (!l) return;
        const o = +vis(p, CH[i]).toFixed(3);
        put(l, "opacity", String(o));
        put(l, "transform", `translate3d(0, ${((1 - o) * 30).toFixed(1)}px, 0)`);
        if (!lite) put(l, "filter", o < 1 ? `blur(${((1 - o) * 6).toFixed(1)}px)` : "none");
        put(l, "visibility", o > 0.01 ? "visible" : "hidden");
      });
      segs.current.forEach((s, i) => {
        if (!s) return;
        const [a, b] = SPAN[i];
        put(s, "--f", clamp((p - a) / (b - a)).toFixed(3));
      });
      const act = p < 0.08 ? -1 : SPAN.findIndex(([a, b]) => p >= a && p < b + (b === 1 ? 0.01 : 0));
      if (act !== lastActive) { lastActive = act; setActive(act); }

      if (mode === "video" && video.current) {
        const v = video.current;
        if (v.duration) {
          const want = p * (v.duration - 0.05);
          if (Math.abs(v.currentTime - want) > 1 / 30 && now - lastSeek > 16) {
            v.currentTime = want;
            lastSeek = now;
          }
        }
      } else if (mode === "frames") {
        drawFrame(p, crintro().count);
      } else {
        // photo fallback: crossfade between chapter photos with a slow push-in
        photos.current.forEach((img, i) => {
          if (!img) return;
          const [a, b] = SPAN[i];
          const fadeIn = i === 0 ? 1 : clamp((p - (a - 0.04)) / 0.08);
          const local = clamp((p - a) / (b - a));
          img.style.opacity = String(fadeIn);
          img.style.transform = `scale(${1.02 + local * 0.12})`;
        });
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      target = clamp(-r.top / (r.height - window.innerHeight));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", fit);
    };
  }, [mode, videoSrc]);

  const jump = (i: number) => {
    const el = root.current;
    if (!el) return;
    const p = CH[i][1] + 0.02;
    window.scrollTo({ top: el.offsetTop + p * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  return (
    <section className={styles.film} id="top" ref={root} aria-label={`${FORETAG.namn} — däckverkstad`}>
      <div className={styles.stage}>
        <div className={styles.media} ref={media}>
          {mode === "video" && (
            <video ref={video} className={styles.fill} src={videoSrc ?? undefined} poster={POSTER} muted playsInline preload="auto" />
          )}
          <canvas ref={canvas} className={`${styles.fill} ${styles.canvas}`} hidden={mode !== "frames"} />
          {(mode === "photos" || mode === null) && (
            <div className={styles.fill}>
              {/* only the first photo until we know the film can't load: phones shouldn't download all four */}
              {PHOTOS.slice(0, mode === "photos" ? PHOTOS.length : 1).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} ref={(n) => { photos.current[i] = n; }} className={styles.photo} src={mode === null ? POSTER : src} alt="" style={{ opacity: i === 0 ? 1 : 0 }} fetchPriority={i === 0 ? "high" : "low"} />
              ))}
            </div>
          )}
        </div>
        <div className={styles.frost} ref={frost} aria-hidden />
        <div className={styles.glow} aria-hidden />
        <div className={styles.shade} aria-hidden />

        <div className={styles.intro} ref={intro} data-crintro-hold>
          <span className={`eyebrow ${styles.eyebrow}`}>Däckverkstad · {FORETAG.ort}</span>
          <h1 className={`h-display ${styles.title}`}>
            <span className={styles.t1}>Säkra däck.</span>
            <span className={`ember-grad ${styles.t2}`}>Varje säsong.</span>
          </h1>
          <p className={`lead ${styles.lead}`}>
            Däckbyte på 30 minuter, klimatsäkrat däckhotell och service du kan lita på. Boka online — vi har lyften varm.
          </p>
          <div className={styles.ctas}>
            <Link href="#boka" className="btn btn-primary">Boka däckbyte <IconArrow /></Link>
            <Link href="#tjanster" className="btn btn-ghost">Se tjänster & priser</Link>
          </div>
          <div className={styles.meta}>
            <OpenStatus />
            <div><IconPin size={16} /> Hisingsbacka, {FORETAG.ort}</div>
            <div><span style={{ color: "var(--amber)", display: "inline-flex" }}><IconStar /></span> 4,9 på Google</div>
          </div>
          <span className={styles.scroll} aria-hidden><i />Scrolla</span>
        </div>

        {CHAPTERS.map((c, i) => (
          <div key={c.n} className={`${styles.chapter} ${i === 3 ? styles.final : ""}`} ref={(n) => { layers.current[i] = n; }}>
            <span className={styles.num} aria-hidden>{c.n}</span>
            <span className={`eyebrow ${styles.eyebrow}`}>{c.n} — {c.name}</span>
            <h2 className={`h-display ${styles.h2}`}>{c.h}</h2>
            <p className={styles.text}>{c.p}</p>
            {i === 3 && (
              <div className={styles.ctas}>
                <Link href="#boka" className="btn btn-primary">Boka däckbyte <IconArrow /></Link>
                <Link href="#tjanster" className="btn btn-ghost">Se priser</Link>
              </div>
            )}
          </div>
        ))}

        <div className={styles.hud} ref={hud} aria-label="Utetemperatur">
          <span className={styles.hudLbl}>
            <span className={styles.lblWarm}>Utetemperatur</span>
            <span className={styles.lblCold}>Vinterdäcksväder</span>
          </span>
          <span className={styles.hudVal}><span ref={temp}>+{T_FROM}</span>°C</span>
          <div className={styles.gauge} ref={gauge}><i /></div>
        </div>

        <nav className={styles.nav} aria-label="Kapitel">
          {CHAPTERS.map((c, i) => (
            <button key={c.n} className={active === i ? styles.on : ""} onClick={() => jump(i)} ref={(n) => { segs.current[i] = n; }}>
              <span className={styles.seg}><i /></span>
              <span className={styles.lbl}><b>{c.n}</b> {c.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
