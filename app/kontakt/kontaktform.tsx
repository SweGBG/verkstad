"use client";
import { useState } from "react";
import { IconArrow } from "../components/icons";

const AMNEN = ["Allmän fråga", "Offert på däck", "Däckhotell", "Bokning / ombokning", "Företagsavtal"];

export default function KontaktForm() {
  const [f, setF] = useState({ namn: "", email: "", telefon: "", amne: AMNEN[0], meddelande: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "demo">("idle");
  const [fel, setFel] = useState("");
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  const skicka = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.namn || !f.email || !f.meddelande) return setFel("Fyll i namn, e-post och meddelande.");
    setFel("");
    setStatus("loading");
    try {
      const res = await fetch("/api/kontakt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Något gick fel.");
      setStatus(data.demo ? "demo" : "ok");
      setF({ namn: "", email: "", telefon: "", amne: AMNEN[0], meddelande: "" });
    } catch (err) {
      setFel(err instanceof Error ? err.message : "Något gick fel.");
      setStatus("idle");
    }
  };

  return (
    <form className="booking" onSubmit={skicka} noValidate>
      <h2 className="h-display h3" style={{ fontSize: 34, marginBottom: 6 }}>Skicka ett meddelande</h2>
      <p className="dim small" style={{ marginBottom: 26 }}>Vi svarar normalt inom två timmar på vardagar.</p>

      <div className="grid g2" style={{ gap: 12, marginBottom: 12 }}>
        <div><label className="label" htmlFor="k-namn">Namn</label><input id="k-namn" className="input" autoComplete="name" value={f.namn} onChange={(e) => set("namn", e.target.value)} /></div>
        <div><label className="label" htmlFor="k-tel">Telefon (valfritt)</label><input id="k-tel" className="input" type="tel" autoComplete="tel" value={f.telefon} onChange={(e) => set("telefon", e.target.value)} /></div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label className="label" htmlFor="k-mail">E-post</label>
        <input id="k-mail" className="input" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <span className="label">Ämne</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {AMNEN.map((a) => (
            <button key={a} type="button" className="chip" style={{ padding: "9px 14px" }} aria-pressed={f.amne === a} onClick={() => set("amne", a)}>{a}</button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label className="label" htmlFor="k-msg">Meddelande</label>
        <textarea id="k-msg" className="input" value={f.meddelande} onChange={(e) => set("meddelande", e.target.value)} placeholder="Skriv ditt meddelande här…" />
      </div>

      {fel && <p className="alert alert-bad" role="alert" style={{ marginBottom: 14 }}>{fel}</p>}
      {status === "ok" && <p className="alert alert-ok" role="status" style={{ marginBottom: 14 }}>Tack! Ditt meddelande är skickat — vi hör av oss snart.</p>}
      {status === "demo" && <p className="alert alert-info" role="status" style={{ marginBottom: 14 }}>Demoläge — inget mejl skickades, men formuläret fungerar.</p>}

      <button className="btn btn-primary btn-block" disabled={status === "loading"}>
        {status === "loading" ? "Skickar…" : <>Skicka meddelande <IconArrow /></>}
      </button>
    </form>
  );
}
