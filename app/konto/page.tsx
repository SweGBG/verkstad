"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase";
import { useAuth } from "../lib/useAuth";
import { DEMO_BOKNINGAR, DEMO_DACKSET, DEMO_FORDON, type Bokning } from "../lib/demo";
import { TJANSTER } from "../lib/data";
import { DateBox, Plate, StatusPill } from "../components/portal-ui";
import { IconArrow, IconBell, IconCalendar, IconCar, IconGrid, IconLogout, IconPlus, IconUser, TjanstIkon } from "../components/icons";

type Flik = "oversikt" | "bokningar" | "garage" | "hotell" | "profil";
type Fordon = { regnr: string; modell: string; ar: number; dimension: string };
type Dackset = (typeof DEMO_DACKSET)[number];

const idagIso = () => new Date().toISOString().split("T")[0];
const kommande = (b: Bokning) => b.datum >= idagIso() && b.status !== "avbokad" && b.status !== "genomförd";

const ikonFor = (tjanst: string) => TJANSTER.find((t) => t.titel === tjanst)?.ikon ?? "dack";
const slugFor = (tjanst: string) => TJANSTER.find((t) => t.titel === tjanst)?.slug ?? "";

export default function Konto() {
  const router = useRouter();
  const { user, klar, loggaUt } = useAuth();
  const [flik, setFlik] = useState<Flik>("oversikt");
  const [bokningar, setBokningar] = useState<Bokning[] | null>(null);
  const [fordon, setFordon] = useState<Fordon[]>([]);
  const [dackset, setDackset] = useState<Dackset[]>([]);
  const [filter, setFilter] = useState<"kommande" | "historik">("kommande");
  const [nyttFordon, setNyttFordon] = useState<Fordon | null>(null);
  const [notiser, setNotiser] = useState({ sms: true, mejl: true, sasong: true });

  useEffect(() => {
    const las = () => {
      const f = new URLSearchParams(window.location.search).get("flik") as Flik | null;
      if (f && ["oversikt", "bokningar", "garage", "hotell", "profil"].includes(f)) setFlik(f);
    };
    las();
  }, []);

  useEffect(() => {
    if (!klar) return;
    if (!user) { router.replace("/medlem"); return; }
    const ladda = async () => {
      if (user.demo) {
        setBokningar(DEMO_BOKNINGAR);
        setFordon(DEMO_FORDON);
        setDackset(DEMO_DACKSET);
        return;
      }
      const { data } = await createClient().from("bookings").select("*").eq("email", user.email).order("datum", { ascending: false });
      const b = (data as Bokning[]) || [];
      setBokningar(b);
      // Bygg garage av registreringsnummer i bokningarna
      const unika = [...new Set(b.map((x) => x.regnr?.toUpperCase()).filter(Boolean))];
      setFordon(unika.map((r) => ({ regnr: r, modell: "—", ar: 0, dimension: "—" })));
    };
    ladda();
  }, [klar, user, router]);

  const lista = useMemo(() => bokningar ?? [], [bokningar]);
  const kom = useMemo(() => lista.filter(kommande).sort((a, b) => (a.datum + a.tid).localeCompare(b.datum + b.tid)), [lista]);
  const hist = useMemo(() => lista.filter((b) => !kommande(b)), [lista]);
  const nasta = kom[0];

  const avboka = async (id: string) => {
    setBokningar((prev) => prev?.map((b) => (b.id === id ? { ...b, status: "avbokad" } : b)) ?? null);
    if (!user?.demo) await createClient().from("bookings").update({ status: "avbokad" }).eq("id", id);
  };

  const byt = (f: Flik) => {
    setFlik(f);
    window.history.replaceState(null, "", f === "oversikt" ? "/konto" : `/konto?flik=${f}`);
  };

  const ut = async () => { await loggaUt(); router.push("/"); };

  if (!klar || !user || bokningar === null) {
    return (
      <main className="wrap" style={{ padding: "130px 32px 80px", display: "grid", gap: 16 }}>
        <div className="skeleton" style={{ height: 70, width: 340 }} />
        <div className="skeleton" style={{ height: 300 }} />
      </main>
    );
  }

  const menyn: { id: Flik; label: string; ikon: React.ReactNode; count?: number }[] = [
    { id: "oversikt", label: "Översikt", ikon: <IconGrid /> },
    { id: "bokningar", label: "Bokningar", ikon: <IconCalendar />, count: kom.length },
    { id: "garage", label: "Mitt garage", ikon: <IconCar />, count: fordon.length },
    { id: "hotell", label: "Däckhotell", ikon: <TjanstIkon namn="hotell" size={18} />, count: dackset.filter((d) => d.status === "I förvar").length },
    { id: "profil", label: "Profil", ikon: <IconUser /> },
  ];

  const bokningRad = (b: Bokning) => (
    <div key={b.id} className="row" style={{ ["--c" as string]: b.status === "bekräftad" ? "var(--ok)" : b.status === "avbokad" ? "var(--bad)" : b.status === "genomförd" ? "var(--line-2)" : "var(--warn)" }}>
      <DateBox datum={b.datum} />
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <strong className="h-display" style={{ fontSize: 22, letterSpacing: "0.02em" }}>{b.tjanst}</strong>
          <StatusPill s={b.status} />
        </div>
        <div className="small dim">kl. {b.tid} · {b.regnr}</div>
      </div>
      {kommande(b) ? (
        <button className="btn btn-ghost btn-sm" onClick={() => avboka(b.id)}>Avboka</button>
      ) : (
        <Link className="btn btn-ghost btn-sm" href={`/?tjanst=${slugFor(b.tjanst)}#boka`}>Boka igen</Link>
      )}
    </div>
  );

  return (
    <main className="wrap" style={{ padding: "120px 32px 90px" }}>
      {user.demo && (
        <div className="demo-bar">
          <span><strong>Demoläge</strong> — exempeldata, inget sparas.</span>
          <button className="btn btn-ghost btn-sm" onClick={ut}>Avsluta demo</button>
        </div>
      )}

      <header className="reveal in" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
        <div>
          <span className="eyebrow">Mina sidor</span>
          <h1 className="h-display h2" style={{ marginTop: 14 }}>Hej, <span className="ember-grad">{user.namn.split(" ")[0]}</span></h1>
        </div>
        <Link href="/#boka" className="btn btn-primary">Ny bokning <IconArrow /></Link>
      </header>

      <div className="portal">
        <aside className="side" aria-label="Kontomeny">
          {menyn.map((m) => (
            <button key={m.id} aria-current={flik === m.id} onClick={() => byt(m.id)}>
              {m.ikon} {m.label} {m.count !== undefined && <span className="count">{m.count}</span>}
            </button>
          ))}
          <button onClick={ut} style={{ color: "var(--bad)" }}><IconLogout /> Logga ut</button>
        </aside>

        <section key={flik} style={{ animation: "fadeUp .5s var(--ease)", minWidth: 0 }}>
          {/* ------- ÖVERSIKT ------- */}
          {flik === "oversikt" && (
            <div style={{ display: "grid", gap: 20 }}>
              {nasta ? (
                <div className="cta-band" style={{ padding: "34px 34px" }}>
                  <span className="eyebrow">Nästa besök</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 18, flexWrap: "wrap" }}>
                    <span className="service-icon" style={{ width: 66, height: 66 }}><TjanstIkon namn={ikonFor(nasta.tjanst)} size={30} /></span>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <h2 className="h-display" style={{ fontSize: 40, lineHeight: 1 }}>{nasta.tjanst}</h2>
                      <p className="dim" style={{ marginTop: 6 }}>
                        {new Date(nasta.datum + "T12:00:00").toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" })} · kl. {nasta.tid}
                      </p>
                    </div>
                    <Plate nr={nasta.regnr} />
                    <StatusPill s={nasta.status} />
                  </div>
                </div>
              ) : (
                <div className="card" style={{ textAlign: "center", padding: 40 }}>
                  <p className="dim" style={{ marginBottom: 18 }}>Inga kommande besök.</p>
                  <Link href="/#boka" className="btn btn-primary btn-sm">Boka tid</Link>
                </div>
              )}

              <div className="grid g4 kpis">
                {[
                  { l: "Kommande", v: kom.length },
                  { l: "Fordon", v: fordon.length },
                  { l: "Däck i hotellet", v: dackset.filter((d) => d.status === "I förvar").length },
                  { l: "Genomförda", v: hist.filter((b) => b.status === "genomförd").length },
                ].map((k) => (
                  <div key={k.l} className="card kpi"><div className="kpi-label">{k.l}</div><div className="kpi-num">{k.v}</div></div>
                ))}
              </div>

              {dackset.some((d) => d.monster < 4) && (
                <div className="alert alert-info" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <IconBell /> <span style={{ flex: 1 }}><strong>Dags att se över däcken:</strong> ett av dina vinterset har under 4 mm mönsterdjup.</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => byt("hotell")}>Visa</button>
                </div>
              )}

              <div className="grid g3">
                {[
                  { t: "Boka däckbyte", s: "dackbyte" },
                  { t: "Boka hjulinställning", s: "hjulinstallning" },
                  { t: "Boka oljebyte", s: "oljebyte" },
                ].map((q) => (
                  <Link key={q.s} href={`/?tjanst=${q.s}#boka`} className="card card-hover" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span className="ember"><TjanstIkon namn={TJANSTER.find((t) => t.slug === q.s)!.ikon} /></span>
                    <strong style={{ flex: 1 }}>{q.t}</strong>
                    <span className="ember"><IconArrow /></span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ------- BOKNINGAR ------- */}
          {flik === "bokningar" && (
            <div style={{ display: "grid", gap: 14 }}>
              <div className="tabs" style={{ justifySelf: "start", marginBottom: 6 }}>
                <button aria-pressed={filter === "kommande"} onClick={() => setFilter("kommande")}>Kommande ({kom.length})</button>
                <button aria-pressed={filter === "historik"} onClick={() => setFilter("historik")}>Historik ({hist.length})</button>
              </div>
              {(filter === "kommande" ? kom : hist).map((b) => bokningRad(b))}
              {(filter === "kommande" ? kom : hist).length === 0 && (
                <div className="card" style={{ textAlign: "center", padding: 40 }}><p className="dim">Inga bokningar här ännu.</p></div>
              )}
            </div>
          )}

          {/* ------- GARAGE ------- */}
          {flik === "garage" && (
            <div style={{ display: "grid", gap: 16 }}>
              <div className="grid g2">
                {fordon.map((f) => (
                  <div key={f.regnr} className="card card-glow" style={{ display: "grid", gap: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Plate nr={f.regnr} />
                      <span className="ember"><IconCar size={24} /></span>
                    </div>
                    <div>
                      <h3 className="h-display h3">{f.modell}</h3>
                      <p className="small dim">{f.ar ? `Årsmodell ${f.ar}` : "Lägg till modell vid nästa besök"}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px dashed var(--line)" }}>
                      <span className="small muted">Däckdimension</span>
                      <strong className="mono">{f.dimension}</strong>
                    </div>
                  </div>
                ))}
                {nyttFordon ? (
                  <form
                    className="card"
                    style={{ display: "grid", gap: 10 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!nyttFordon.regnr) return;
                      setFordon((p) => [...p, { ...nyttFordon, regnr: nyttFordon.regnr.toUpperCase() }]);
                      setNyttFordon(null);
                    }}
                  >
                    <input className="input mono" placeholder="Reg.nr" maxLength={8} value={nyttFordon.regnr} onChange={(e) => setNyttFordon({ ...nyttFordon, regnr: e.target.value })} style={{ textTransform: "uppercase" }} autoFocus />
                    <input className="input" placeholder="Modell (t.ex. Volvo XC60)" value={nyttFordon.modell} onChange={(e) => setNyttFordon({ ...nyttFordon, modell: e.target.value })} />
                    <input className="input mono" placeholder="Däckdimension (225/55 R17)" value={nyttFordon.dimension} onChange={(e) => setNyttFordon({ ...nyttFordon, dimension: e.target.value })} />
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Spara</button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setNyttFordon(null)}>Avbryt</button>
                    </div>
                  </form>
                ) : (
                  <button className="card card-hover" style={{ display: "grid", placeItems: "center", gap: 10, minHeight: 190, borderStyle: "dashed", color: "var(--dim)" }} onClick={() => setNyttFordon({ regnr: "", modell: "", ar: 0, dimension: "" })}>
                    <span className="icon-btn"><IconPlus /></span>
                    <strong>Lägg till fordon</strong>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ------- DÄCKHOTELL ------- */}
          {flik === "hotell" && (
            <div style={{ display: "grid", gap: 14 }}>
              {dackset.length === 0 ? (
                <div className="card" style={{ textAlign: "center", padding: 44 }}>
                  <span className="service-icon" style={{ margin: "0 auto 16px" }}><TjanstIkon namn="hotell" /></span>
                  <h3 className="h-display h3" style={{ marginBottom: 8 }}>Inga däck i hotellet</h3>
                  <p className="dim" style={{ marginBottom: 20 }}>Lämna dina däck hos oss — från 495 kr/år.</p>
                  <Link href="/tjanster/dackhotell" className="btn btn-primary btn-sm">Läs mer</Link>
                </div>
              ) : (
                dackset.map((d, i) => {
                  const pct = Math.min(100, (d.monster / 8) * 100);
                  const lag = d.monster < 4;
                  return (
                    <div key={i} className="card" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center" }} data-hotell>
                      <span className="service-icon" style={{ width: 60, height: 60, color: d.sasong === "Vinter" ? "#7cc4ff" : "var(--amber)", borderColor: "var(--line-2)", background: "var(--panel-2)" }}>
                        <TjanstIkon namn="dack" size={28} />
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                          <strong className="h-display" style={{ fontSize: 22 }}>{d.sasong}däck</strong>
                          <span className={`pill ${d.status === "I förvar" ? "pill-ok" : "pill-mute"}`}>{d.status}</span>
                          <span className="small muted">{d.regnr}</span>
                        </div>
                        <div className="small dim" style={{ marginBottom: 10 }}>{d.marke}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div className="tread-meter" style={{ flex: 1, maxWidth: 260 }}>
                            <span style={{ width: `${pct}%`, ["--c1" as string]: lag ? "var(--bad)" : "var(--ember)", ["--c2" as string]: lag ? "var(--warn)" : "var(--ok)" }} />
                          </div>
                          <span className="small mono" style={{ color: lag ? "var(--warn)" : "var(--dim)" }}>{d.monster.toLocaleString("sv-SE")} mm</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="label" style={{ marginBottom: 2 }}>Hylla</div>
                        <div className="h-display" style={{ fontSize: 30 }}>{d.hylla}</div>
                      </div>
                    </div>
                  );
                })
              )}
              <p className="small muted">Mönsterdjup mäts vid varje inlämning. Lagkrav vinter: 3 mm · sommar: 1,6 mm. Vi rekommenderar byte under 4 mm.</p>
            </div>
          )}

          {/* ------- PROFIL ------- */}
          {flik === "profil" && (
            <div style={{ display: "grid", gap: 20 }}>
              <div className="card" style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
                <span className="avatar" style={{ width: 70, height: 70, fontSize: 24 }}>{user.namn.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()}</span>
                <div>
                  <h3 className="h-display h3">{user.namn}</h3>
                  <p className="dim">{user.email}</p>
                </div>
              </div>
              <div className="card">
                <h3 className="label">Notiser</h3>
                {([
                  ["sms", "SMS när bilen är klar"],
                  ["mejl", "Bokningsbekräftelser via e-post"],
                  ["sasong", "Påminnelse vid säsongsskifte"],
                ] as const).map(([k, l]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: "1px solid var(--line)" }}>
                    <span>{l}</span>
                    <button className="toggle" aria-pressed={notiser[k]} aria-label={l} onClick={() => setNotiser((n) => ({ ...n, [k]: !n[k] }))} />
                  </div>
                ))}
              </div>
              <button className="btn btn-ghost" style={{ justifySelf: "start", color: "var(--bad)" }} onClick={ut}><IconLogout /> Logga ut</button>
            </div>
          )}
        </section>
      </div>
      <style>{`@media (max-width: 640px){ [data-hotell]{ grid-template-columns: auto 1fr !important; } [data-hotell] > div:last-child{ grid-column: 1 / -1; text-align:left !important; display:flex; gap:10px; align-items:baseline } }`}</style>
    </main>
  );
}
