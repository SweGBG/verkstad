"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase";
import { useAuth } from "../lib/useAuth";
import { DEMO_ALLA_BOKNINGAR, type Bokning } from "../lib/demo";
import { TIDER, TJANSTER } from "../lib/data";
import { DateBox, StatusPill } from "../components/portal-ui";
import { IconMail, IconPhone, TjanstIkon } from "../components/icons";

const FILTER = ["alla", "väntar", "bekräftad", "genomförd", "avbokad"] as const;
type Filter = (typeof FILTER)[number];

const idagIso = () => new Date().toISOString().split("T")[0];
const prisFor = (tjanst: string) => {
  const p = TJANSTER.find((t) => t.titel === tjanst)?.priser[0]?.pris ?? "0";
  return Number(p.replace(/[^\d]/g, "")) || 0;
};

export default function Admin() {
  const router = useRouter();
  const { user, klar, loggaUt } = useAuth();
  const [bokningar, setBokningar] = useState<Bokning[] | null>(null);
  const [filter, setFilter] = useState<Filter>("alla");
  const [sok, setSok] = useState("");

  useEffect(() => {
    if (!klar) return;
    if (!user?.admin) { router.replace(user ? "/konto" : "/medlem"); return; }
    const ladda = async () => {
      if (user.demo) { setBokningar(DEMO_ALLA_BOKNINGAR); return; }
      const { data } = await createClient().from("bookings").select("*").order("datum", { ascending: true });
      setBokningar((data as Bokning[]) || []);
    };
    ladda();
  }, [klar, user, router]);

  const lista = useMemo(() => bokningar ?? [], [bokningar]);
  const idag = idagIso();

  const stats = useMemo(() => ({
    idag: lista.filter((b) => b.datum === idag && b.status !== "avbokad").length,
    vantar: lista.filter((b) => !b.status || b.status === "väntar").length,
    bekraftad: lista.filter((b) => b.status === "bekräftad").length,
    intakt: lista.filter((b) => b.datum >= idag && (b.status === "bekräftad" || b.status === "väntar")).reduce((s, b) => s + prisFor(b.tjanst), 0),
  }), [lista, idag]);

  const dagens = useMemo(() => {
    const m = new Map(lista.filter((b) => b.datum === idag && b.status !== "avbokad").map((b) => [b.tid, b]));
    return TIDER.map((t) => ({ tid: t, b: m.get(t) }));
  }, [lista, idag]);

  const visade = useMemo(() => {
    const q = sok.trim().toLowerCase();
    return lista
      .filter((b) => filter === "alla" || (b.status || "väntar") === filter)
      .filter((b) => !q || [b.namn, b.email, b.regnr, b.tjanst, b.telefon].some((v) => v?.toLowerCase().includes(q)))
      .sort((a, b) => (a.datum + a.tid).localeCompare(b.datum + b.tid));
  }, [lista, filter, sok]);

  const satt = async (id: string, status: string) => {
    setBokningar((p) => p?.map((b) => (b.id === id ? { ...b, status } : b)) ?? null);
    if (!user?.demo) await createClient().from("bookings").update({ status }).eq("id", id);
  };

  if (!klar || !user?.admin || bokningar === null) {
    return (
      <main className="wrap" style={{ padding: "130px 32px 80px", display: "grid", gap: 16 }}>
        <div className="skeleton" style={{ height: 70, width: 300 }} />
        <div className="grid g4">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: 110 }} />)}</div>
        <div className="skeleton" style={{ height: 300 }} />
      </main>
    );
  }

  return (
    <main className="wrap" style={{ padding: "120px 32px 90px" }}>
      {user.demo && (
        <div className="demo-bar">
          <span><strong>Demo-admin</strong> — ändringar sparas bara i fliken.</span>
          <button className="btn btn-ghost btn-sm" onClick={async () => { await loggaUt(); router.push("/"); }}>Avsluta demo</button>
        </div>
      )}

      <header style={{ marginBottom: 36 }}>
        <span className="eyebrow">Verkstadspanel</span>
        <h1 className="h-display h2" style={{ marginTop: 14 }}>Ad<span className="ember-grad">min</span></h1>
        <p className="dim small" style={{ marginTop: 6 }}>{new Date().toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {user.email}</p>
      </header>

      <div className="grid g4 kpis" style={{ marginBottom: 28 }}>
        {[
          { l: "Bilar idag", v: String(stats.idag) },
          { l: "Väntar på svar", v: String(stats.vantar), alert: stats.vantar > 0 },
          { l: "Bekräftade", v: String(stats.bekraftad) },
          { l: "Kommande (est.)", v: `${stats.intakt.toLocaleString("sv-SE")} kr` },
        ].map((k) => (
          <div key={k.l} className={`card kpi ${k.alert ? "card-glow" : ""}`} style={k.alert ? { borderColor: "var(--ember-line)", background: "var(--ember-soft)" } : undefined}>
            <div className="kpi-label" style={k.alert ? { color: "var(--ember-2)" } : undefined}>{k.l}</div>
            <div className="kpi-num">{k.v}</div>
          </div>
        ))}
      </div>

      <div className="portal" style={{ gridTemplateColumns: "300px 1fr" }} data-admin>
        {/* Dagens schema */}
        <aside className="card" style={{ position: "sticky", top: 96, padding: 22 }}>
          <h2 className="label" style={{ marginBottom: 16 }}>Dagens lyft</h2>
          <div style={{ display: "grid", gap: 6 }}>
            {dagens.map(({ tid, b }) => (
              <div key={tid} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 10px", borderRadius: 8, background: b ? "var(--ember-soft)" : "transparent", border: `1px solid ${b ? "rgba(226,64,31,.25)" : "var(--line)"}` }}>
                <span className="mono small" style={{ width: 44, color: b ? "var(--ember-2)" : "var(--mute)", fontWeight: 700 }}>{tid}</span>
                {b ? (
                  <span style={{ minWidth: 0 }}>
                    <strong style={{ fontSize: 14 }}>{b.tjanst}</strong>
                    <span className="small dim" style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.namn} · {b.regnr}</span>
                  </span>
                ) : (
                  <span className="small muted">Ledigt</span>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Bokningslista */}
        <section style={{ minWidth: 0 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "space-between", marginBottom: 18 }}>
            <div className="tabs">
              {FILTER.map((f) => (
                <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f} {f !== "alla" && `(${lista.filter((b) => (b.status || "väntar") === f).length})`}
                </button>
              ))}
            </div>
            <input className="input" placeholder="Sök namn, regnr, tjänst…" value={sok} onChange={(e) => setSok(e.target.value)} style={{ maxWidth: 260, padding: "10px 14px" }} />
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {visade.length === 0 && <div className="card" style={{ textAlign: "center", padding: 40 }}><p className="dim">Inga bokningar matchar.</p></div>}
            {visade.map((b) => {
              const s = b.status || "väntar";
              const ikon = TJANSTER.find((t) => t.titel === b.tjanst)?.ikon ?? "dack";
              return (
                <div key={b.id} className="row" style={{ ["--c" as string]: s === "bekräftad" ? "var(--ok)" : s === "avbokad" ? "var(--bad)" : s === "genomförd" ? "var(--line-2)" : "var(--warn)", alignItems: "center" }}>
                  <DateBox datum={b.datum} />
                  <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <strong className="h-display" style={{ fontSize: 21 }}>{b.namn}</strong>
                      <StatusPill s={s} />
                      {b.datum === idag && <span className="pill">Idag</span>}
                    </div>
                    <div className="small dim" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 4 }}>
                      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><span className="ember"><TjanstIkon namn={ikon} size={14} /></span>{b.tjanst} · kl. {b.tid}</span>
                      <span className="mono">{b.regnr}</span>
                    </div>
                    <div className="small muted" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 2 }}>
                      <a href={`tel:${b.telefon}`} style={{ display: "inline-flex", gap: 5, alignItems: "center" }}><IconPhone size={13} />{b.telefon}</a>
                      <a href={`mailto:${b.email}`} style={{ display: "inline-flex", gap: 5, alignItems: "center" }}><IconMail size={13} />{b.email}</a>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {s === "väntar" && <button className="btn btn-primary btn-sm" onClick={() => satt(b.id, "bekräftad")}>Bekräfta</button>}
                    {s === "bekräftad" && <button className="btn btn-ghost btn-sm" onClick={() => satt(b.id, "genomförd")}>Klar ✓</button>}
                    {(s === "väntar" || s === "bekräftad") && <button className="btn btn-ghost btn-sm" style={{ color: "var(--bad)" }} onClick={() => satt(b.id, "avbokad")}>Avboka</button>}
                    {(s === "avbokad" || s === "genomförd") && <button className="btn btn-ghost btn-sm" onClick={() => satt(b.id, "väntar")}>Återställ</button>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <style>{`@media (max-width: 1080px){ [data-admin]{ grid-template-columns: 1fr !important } [data-admin] > aside{ position: static !important } }`}</style>
    </main>
  );
}
