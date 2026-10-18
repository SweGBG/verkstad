"use client";
import { useEffect, useRef, useState } from "react";
import { crintro } from "../lib/crintro";
import { LogoMark } from "./logo";
import styles from "./crintro-loader.module.css";

/*
 * CRiNTRO Loader: the IronDäck wheel spins up, the name slams in letter by letter and the tread
 * strip is the real loading bar (hero photo + font). It never runs ahead of its own animation, so
 * with a warm cache it looks like a plain 1.9 s intro; on a slow line it waits (at most MAX), then
 * the curtain lifts and the hero's own entrance plays (html.crintro-wait holds it until then).
 */
const RULE_START = 0.45; // s
const RULE_END = 1.45; // s
const MIN = 1.9; // s, earliest curtain
const MAX = 3.6; // s, latest curtain

const WORD = ["IRON", "DÄCK"];
const SUB = "Däckverkstad · Göteborg";
let played = false; // once per page load
const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

export default function CrintroLoader() {
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(played);
  const fill = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (played) return;
    played = true;
    const store = crintro();
    const html = document.documentElement;
    const release = () => html.classList.remove("crintro-wait");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      release();
      setGone(true);
      return;
    }
    const t0 = performance.now();
    let shown = 0,
      raf = 0,
      last = t0,
      done = false;
    const ready = () => store.crit >= 1;
    const tick = (now: number) => {
      const s = (now - t0) / 1000;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const natural = ease((s - RULE_START) / (RULE_END - RULE_START));
      const forced = s >= MAX;
      const loaded = ready() ? 1 : Math.min(0.97, 0.15 + store.crit * 0.85);
      const target = forced ? 1 : Math.min(natural, loaded);
      const k = 1 - Math.pow(forced ? 1e-9 : 1e-5, dt);
      shown = Math.max(shown, shown + (target - shown) * k);
      if (fill.current) fill.current.style.transform = `scaleX(${shown.toFixed(4)})`;
      if (tip.current) {
        tip.current.style.transform = `translateX(${(shown * 100).toFixed(2)}cqw)`;
        tip.current.style.opacity = shown > 0.01 && shown < 0.995 ? "1" : "0";
      }
      root.current?.classList.toggle(styles.wait, s > MIN && !ready() && !forced);
      if (!done && s >= MIN && shown > 0.995) {
        done = true;
        release();
        setOut(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  let n = 0;
  return (
    <div
      ref={root}
      className={`${styles.loader} crintro-loader${out ? ` ${styles.out}` : ""}`}
      aria-hidden="true"
      onTransitionEnd={(e) => out && e.target === root.current && setGone(true)}
    >
      <div className={styles.inner}>
        <span className={styles.wheel}>
          <LogoMark className={styles.mark} />
        </span>
        <div className={styles.word}>
          {WORD.map((w, wi) => (
            <span key={w} className={wi === 1 ? styles.accent : undefined}>
              {w.split("").map((c) => (
                <i key={n} style={{ animationDelay: `${0.35 + n++ * 0.06}s` }}>
                  {c}
                </i>
              ))}
            </span>
          ))}
        </div>
        <div className={styles.track}>
          <div className={styles.fill} ref={fill} />
          <span className={styles.tip} ref={tip} />
        </div>
        <p className={styles.sub}>{SUB}</p>
      </div>
    </div>
  );
}
