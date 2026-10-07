"use client";
import { useEffect, useState } from "react";

/** "Öppet nu" / "Stängt" utifrån svensk tid. */
export default function OpenStatus() {
  const [txt, setTxt] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const calc = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Stockholm" }));
      const d = now.getDay();
      const m = now.getHours() * 60 + now.getMinutes();
      const [o, c] = d === 0 ? [0, 0] : d === 6 ? [8 * 60, 14 * 60] : [7 * 60, 18 * 60];
      const open = m >= o && m < c;
      const hh = (min: number) => `${String(min / 60).padStart(2, "0")}:00`;
      let text: string;
      if (open) text = `Öppet nu · stänger ${hh(c)}`;
      else if (d !== 0 && m < o) text = `Stängt · öppnar ${hh(o)}`;
      else if (d === 5) text = "Stängt · öppnar lör 08:00";
      else if (d === 6 || d === 0) text = "Stängt · öppnar mån 07:00";
      else text = "Stängt · öppnar 07:00 imorgon";
      setTxt({ open, text });
    };
    calc();
    const t = setInterval(calc, 60_000);
    return () => clearInterval(t);
  }, []);

  if (!txt) return <div><span className="dot-live" style={{ background: "var(--mute)", animation: "none" }} /> Öppettider</div>;
  return (
    <div>
      <span className="dot-live" style={txt.open ? undefined : { background: "var(--bad)", animation: "none" }} />
      {txt.text}
    </div>
  );
}
