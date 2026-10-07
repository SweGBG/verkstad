"use client";
import { useEffect, useMemo, useState } from "react";
import { TIDER, TJANSTER } from "../lib/data";
import { TjanstIkon, IconArrow } from "./icons";
import { useAuth } from "../lib/useAuth";

type Status = "idle" | "loading" | "success" | "error";
const VECKODAG = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
const MANAD = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Nästa 14 öppetdagar (söndag stängt). */
function kommandeDagar() {
  const ut: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (ut.length < 14) {
    if (d.getDay() !== 0) ut.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return ut;
}

/** Låtsas-beläggning så kalendern ser levande ut i demon. */
const upptagen = (datum: string, tid: string) => {
  let h = 0;
  for (const c of datum + tid) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 5 === 0;
};

export default function BookingForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ namn: "", telefon: "", email: "", regnr: "", tjanst: "", datum: "", tid: "", meddelande: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [fel, setFel] = useState("");
  const [demoSvar, setDemoSvar] = useState(false);
  const [dagar, setDagar] = useState<Date[]>([]);

  // Datum räknas i webbläsaren (undviker hydration-skillnad mot servern)
  useEffect(() => { setDagar(kommandeDagar()); }, []);

  // Förval via /?tjanst=dackbyte#boka
  useEffect(() => {
    const las = () => {
      const slug = new URLSearchParams(window.location.search).get("tjanst");
      const t = TJANSTER.find((x) => x.slug === slug);
      if (t) setForm((f) => ({ ...f, tjanst: t.titel }));
    };
    las();
    window.addEventListener("popstate", las);
    return () => window.removeEventListener("popstate", las);
  }, []);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, namn: f.namn || user.namn, email: f.email || user.email }));
  }, [user]);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const valdDag = dagar.find((d) => iso(d) === form.datum);
  const tider = useMemo(() => (valdDag?.getDay() === 6 ? TIDER.filter((t) => t < "14:00") : TIDER), [valdDag]);

  const steg = [!!form.tjanst, !!form.datum && !!form.tid, !!(form.namn && form.telefon && form.email && form.regnr)];

  const skicka = async () => {
    const { namn, telefon, email, regnr, tjanst, datum, tid } = form;
    if (!tjanst) return setFel("Välj en tjänst.");
    if (!datum || !tid) return setFel("Välj dag och tid.");
    if (!namn || !telefon || !email || !regnr) return setFel("Fyll i namn, telefon, e-post och registreringsnummer.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setFel("E-postadressen ser inte rätt ut.");
    setFel("");
    setStatus("loading");
    try {
      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, regnr: regnr.toUpperCase() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error);
      setDemoSvar(!!data.demo);
      setStatus("success");
    } catch (e) {
      setFel(e instanceof Error && e.message ? e.message : "Något gick fel.");
      setStatus("error");
    }
  };

  if (status === "success") {
    const d = valdDag;
    return (
      <div className="booking" style={{ textAlign: "center", padding: "56px 32px" }}>
        <svg className="success-ring" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <circle cx="50" cy="50" r="46" />
          <path d="M30 52l13 13 27-29" />
        </svg>
        <h3 className="h-display h2" style={{ fontSize: 44 }}>Bokning mottagen!</h3>
        <p className="dim" style={{ margin: "14px auto 26px", maxWidth: 420 }}>
          {demoSvar
            ? "Demoläge — inget mejl skickades, men så här ser flödet ut för kunden."
            : <>En bekräftelse är skickad till <strong style={{ color: "var(--ink)" }}>{form.email}</strong>.</>}
        </p>
        <div className="summary" style={{ justifyContent: "center", display: "inline-flex" }}>
          <strong>{form.tjanst}</strong>
          <span>{d ? `${VECKODAG[d.getDay()]} ${d.getDate()} ${MANAD[d.getMonth()]}` : form.datum}</span>
          <span>kl. {form.tid}</span>
          <span className="mono">{form.regnr.toUpperCase()}</span>
        </div>
        <div style={{ marginTop: 28 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => { setStatus("idle"); setForm((f) => ({ ...f, tjanst: "", datum: "", tid: "", meddelande: "" })); }}>
            Boka en till
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking">
      <div className="progress" aria-hidden="true">
        {steg.map((ok, i) => <span key={i} className={ok ? "on" : ""} />)}
      </div>

      <fieldset style={{ border: "none", marginBottom: 30 }}>
        <legend className="label">1 · Välj tjänst</legend>
        <div className="svc-grid">
          {TJANSTER.map((t) => (
            <button key={t.slug} type="button" className="chip svc-chip" aria-pressed={form.tjanst === t.titel} onClick={() => set("tjanst", t.titel)}>
              <span className="ember"><TjanstIkon namn={t.ikon} size={22} /></span>
              <span>{t.titel}</span>
              <span className="svc-price">{t.fran}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset style={{ border: "none", marginBottom: 30 }}>
        <legend className="label">2 · Välj dag</legend>
        <div className="days">
          {dagar.length === 0
            ? Array.from({ length: 7 }, (_, i) => <div key={i} className="skeleton" style={{ height: 64 }} />)
            : dagar.map((d) => {
                const v = iso(d);
                return (
                  <button key={v} type="button" className="chip day" aria-pressed={form.datum === v} onClick={() => { set("datum", v); set("tid", ""); }}>
                    <small>{VECKODAG[d.getDay()]}</small>
                    <b>{d.getDate()}</b>
                    <small>{MANAD[d.getMonth()]}</small>
                  </button>
                );
              })}
        </div>
      </fieldset>

      {form.datum && (
        <fieldset style={{ border: "none", marginBottom: 30, animation: "fadeUp .5s var(--ease)" }}>
          <legend className="label">3 · Välj tid</legend>
          <div className="time-grid">
            {tider.map((t) => (
              <button key={t} type="button" className="chip mono" aria-pressed={form.tid === t} disabled={upptagen(form.datum, t)} onClick={() => set("tid", t)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset style={{ border: "none", marginBottom: 24 }}>
        <legend className="label">{form.datum ? "4" : "3"} · Dina uppgifter</legend>
        <div className="grid g2" style={{ gap: 12 }}>
          <input className="input" placeholder="Namn" autoComplete="name" value={form.namn} onChange={(e) => set("namn", e.target.value)} />
          <input className="input" placeholder="Telefon" type="tel" autoComplete="tel" value={form.telefon} onChange={(e) => set("telefon", e.target.value)} />
          <input className="input" placeholder="E-post" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          <input className="input mono" placeholder="Reg.nr (ABC 123)" value={form.regnr} maxLength={8} style={{ textTransform: "uppercase", letterSpacing: "0.08em" }} onChange={(e) => set("regnr", e.target.value)} />
        </div>
        <textarea className="input" placeholder="Övrigt (valfritt) — t.ex. däckdimension eller om du vill vänta på plats" value={form.meddelande} onChange={(e) => set("meddelande", e.target.value)} style={{ marginTop: 12, minHeight: 84 }} />
      </fieldset>

      {form.tjanst && form.datum && form.tid && (
        <div className="summary" style={{ marginBottom: 18 }}>
          <strong>{form.tjanst}</strong>
          <span>{valdDag ? `${VECKODAG[valdDag.getDay()]} ${valdDag.getDate()} ${MANAD[valdDag.getMonth()]}` : ""}</span>
          <span>kl. {form.tid}</span>
        </div>
      )}

      {fel && <p className="alert alert-bad" role="alert" style={{ marginBottom: 16 }}>{fel}</p>}

      <button className="btn btn-primary btn-block" onClick={skicka} disabled={status === "loading"}>
        {status === "loading" ? "Skickar…" : <>Bekräfta bokning <IconArrow /></>}
      </button>
      <p className="small muted" style={{ textAlign: "center", marginTop: 14 }}>
        Gratis avbokning upp till 24 h innan. Bekräftelse direkt via e-post.
      </p>
    </div>
  );
}
