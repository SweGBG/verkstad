"use client";
import { useEffect, useRef, useState } from "react";

/** Räknar upp till ett tal när det syns på skärmen. */
export default function Counter({ to, decimaler = 0, suffix = "" }: { to: number; decimaler?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setV(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  const txt = v.toLocaleString("sv-SE", { minimumFractionDigits: decimaler, maximumFractionDigits: decimaler });
  return <span ref={ref} className="mono">{txt}<span className="ember">{suffix}</span></span>;
}
