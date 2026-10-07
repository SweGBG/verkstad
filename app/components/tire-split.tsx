"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { IconArrow } from "./icons";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Två däck (lager) som ligger ihop och rullar isär när man scrollar.
 * Scrollprogress skrivs som CSS-variabler på sektionen — all rörelse sker i CSS.
 *   --e      0→1  hur långt däcken har rullat isär
 *   --spark  0→1→0 gnistan i mitten när de släpper
 *   --c      0→1  texten mellan däcken
 */
export default function TireSplit() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = reduce ? 1 : clamp(-r.top / Math.max(1, total));
      const e = ease(clamp((p - 0.06) / 0.62));
      el.style.setProperty("--e", e.toFixed(4));
      el.style.setProperty("--spark", Math.sin(Math.PI * clamp(e / 0.28)).toFixed(4));
      el.style.setProperty("--c", ease(clamp((p - 0.5) / 0.3)).toFixed(4));
      el.style.setProperty("--hint", (1 - clamp(p / 0.08)).toFixed(4));
      el.classList.toggle("copy-on", p > 0.55);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="tsplit" aria-label="Säsongsbyte">
      <div className="tsplit-stage">
        <div className="tsplit-word" aria-hidden="true">
          <span>Sommar</span>
          <span>Vinter</span>
        </div>

        <div className="tsplit-spark" aria-hidden="true" />

        <div className="tire tire-r">
          <div className="tire-shadow" />
          <div className="tire-spin">
            <Image src="/images/tire-summer.webp" alt="Sommardäck på silverfälg" fill sizes="(max-width: 640px) 64vw, 520px" />
          </div>
          <span className="tire-label">Sommar</span>
        </div>
        <div className="tire tire-l">
          <div className="tire-shadow" />
          <div className="tire-spin">
            <Image src="/images/tire-winter.webp" alt="Vinterdäck på grafitfälg" fill sizes="(max-width: 640px) 64vw, 520px" />
          </div>
          <span className="tire-label">Vinter</span>
        </div>

        <div className="tsplit-copy">
          <span className="eyebrow">Säsongsbyte</span>
          <h2 className="h-display">Sommar ut.<br /><span className="ember-grad">Vinter in.</span></h2>
          <p className="dim">30 minuter på lyften. Balansering, momentdragning och lufttryck ingår — dina sommardäck flyttar in på hotellet.</p>
          <div className="tsplit-ctas">
            <Link href="/?tjanst=dackbyte#boka" className="btn btn-primary">Boka däckbyte <IconArrow /></Link>
            <Link href="/tjanster/dackhotell" className="btn btn-ghost">Däckhotell</Link>
          </div>
        </div>

        <div className="tsplit-hint" aria-hidden="true">Scrolla — vi byter däcken</div>
      </div>
    </section>
  );
}
