import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/page-hero";
import { FORETAG, STATS, TEAM, VARDERINGAR } from "../lib/data";
import Counter from "../components/counter";
import { IconArrow } from "../components/icons";

export const metadata: Metadata = {
  title: "Om oss",
  description: "IronDäck är en lokalt ägd däckverkstad i Göteborg. Ärligt hantverk, fasta priser och tider som hålls.",
};

export default function Om() {
  return (
    <main>
      <PageHero
        eyebrow={`${FORETAG.ort} · Est. ${FORETAG.grundat}`}
        titel={<>Om <span className="ember-grad">oss</span></>}
        text={`${FORETAG.namn} grundades ${FORETAG.grundat} med en enkel idé — ge Göteborgs bilister en verkstad de kan lita på. Inga dolda avgifter, inga onödiga reparationer. Bara hederligt arbete till rätt pris.`}
        crumbs={[{ label: "Om oss" }]}
      />

      <section className="section">
        <div className="wrap split">
          <div className="split-media reveal reveal-l">
            <Image src="/images/mount.webp" alt="Mekaniker hos IronDäck" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="reveal reveal-r">
            <span className="eyebrow">Vår historia</span>
            <h2 className="h-display h2" style={{ margin: "18px 0 24px" }}>Smutsiga händer.<br /><span className="outline-text">Rena besked.</span></h2>
            <p className="lead" style={{ marginBottom: 18 }}>
              Vi startade i en lånad lokal med en lyft och en balanseringsmaskin. I dag har vi en ljus verkstad i Hisingsbacka med plats för fyra bilar samtidigt och ett däckhotell med över tusen set.
            </p>
            <p className="dim">
              Det som inte har ändrats är hur vi jobbar: vi visar slitaget, förklarar vad som behöver göras och låter dig bestämma. Hellre en nöjd kund som kommer tillbaka än en dyr faktura.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="stats reveal">
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat-num"><Counter to={s.num} decimaler={s.decimaler} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Värderingar</span>
              <h2 className="h-display h2">Det vi <span className="ember">står för</span></h2>
            </div>
          </div>
          <div className="grid g4">
            {VARDERINGAR.map((v, i) => (
              <div key={v.titel} className="card card-hover card-glow reveal" style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <span className="h-display outline-text" style={{ fontSize: 56, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h-display h3" style={{ margin: "18px 0 10px" }}>{v.titel}</h3>
                <p className="dim" style={{ fontSize: 15 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Teamet</span>
              <h2 className="h-display h2">Folket bakom <span className="ember">lyften</span></h2>
            </div>
          </div>
          <div className="grid g3">
            {TEAM.map((p, i) => (
              <div key={p.namn} className="card card-hover reveal" style={{ ["--d" as string]: `${i * 0.08}s`, textAlign: "center", padding: "40px 28px" }}>
                <div style={{ width: 110, height: 110, margin: "0 auto 22px", borderRadius: "50%", display: "grid", placeItems: "center", position: "relative", background: "radial-gradient(circle at 30% 30%, #2a2a2e, #141416)", border: "1px solid var(--line-2)" }}>
                  <svg viewBox="0 0 120 120" style={{ position: "absolute", inset: -6, width: 122, height: 122 }} aria-hidden="true">
                    <circle cx="60" cy="60" r="57" fill="none" stroke="url(#teamg)" strokeWidth="2" strokeDasharray="6 10" className="spin-slow" />
                    <defs><linearGradient id="teamg"><stop offset="0" stopColor="#e2401f" /><stop offset="1" stopColor="#ffad4a" /></linearGradient></defs>
                  </svg>
                  <span className="h-display" style={{ fontSize: 38 }}>{p.initialer}</span>
                </div>
                <h3 className="h-display h3">{p.namn}</h3>
                <p className="ember" style={{ fontWeight: 600, margin: "8px 0 4px" }}>{p.roll}</p>
                <p className="small muted">{p.ar}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta-band reveal">
            <h2 className="h-display h2" style={{ marginBottom: 14 }}>Kom förbi. <span className="ember-grad">Kaffet är på.</span></h2>
            <p className="lead" style={{ marginBottom: 28 }}>{FORETAG.adress}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/#boka" className="btn btn-primary">Boka tid <IconArrow /></Link>
              <Link href="/kontakt" className="btn btn-ghost">Kontakta oss</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
