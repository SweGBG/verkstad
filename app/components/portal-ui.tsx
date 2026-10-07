const MANAD = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

export function StatusPill({ s }: { s: string }) {
  const map: Record<string, string> = { bekräftad: "pill-ok", väntar: "pill-warn", avbokad: "pill-bad", genomförd: "pill-mute" };
  return <span className={`pill ${map[s] ?? "pill-warn"}`}>{s || "väntar"}</span>;
}

export function Plate({ nr }: { nr: string }) {
  return <span className="plate"><span className="eu">S</span><span className="nr">{nr}</span></span>;
}

export function DateBox({ datum }: { datum: string }) {
  const d = new Date(datum + "T12:00:00");
  return <div className="date-box"><b>{d.getDate()}</b><small>{MANAD[d.getMonth()]}</small></div>;
}

