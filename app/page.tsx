import Image from "next/image";
import Link from "next/link";
import { FAQ, FORETAG, OMDOMEN, STATS, STEG, TJANSTER } from "./lib/data";
import ServiceCard from "./components/service-card";
import BookingForm from "./components/bookingform";
import Counter from "./components/counter";
import OpenStatus from "./components/open-status";
import TireSplit from "./components/tire-split";
import { TireArt } from "./components/logo";
import { IconArrow, IconClock, IconPhone, IconPin, IconStar } from "./components/icons";

const MARQUEE = ["Däckbyte 30 min", "Däckhotell", "Hjulinställning", "Oljebyte", "Bromskontroll", "Gratis lufttryck"];

export default function Hem() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-media">
          <Image src="/images/hero.webp" alt="Bil på en glödande lyft i IronDäcks verkstad i skymningen" fill priority sizes="100vw" />
        </div>
        <div className="hero-glow" />
        <div className="hero-shade" />
        <TireArt className="hero-tire" />

        <div className="wrap hero-content">
          <span className="eyebrow hero-eyebrow">Däckverkstad · {FORETAG.ort}</span>
          <h1 className="h-display h1">
            <span className="line"><span style={{ ["--d" as string]: "0.15s" }}>Säkra däck.</span></span>
            <span className="line"><span className="ember-grad" style={{ ["--d" as string]: "0.3s" }}>Varje säsong.</span></span>
          </h1>
          <p className="lead">
            Däckbyte på 30 minuter, klimatsäkrat däckhotell och service du kan lita på. Boka online — vi har lyften varm.
          </p>
          <div className="hero-ctas">
            <Link href="#boka" className="btn btn-primary">Boka däckbyte <IconArrow /></Link>
            <Link href="#tjanster" className="btn btn-ghost">Se tjänster & priser</Link>
          </div>
          <div className="hero-meta">
            <OpenStatus />
            <div><IconPin size={16} /> Hisingsbacka, {FORETAG.ort}</div>
            <div><span style={{ color: "var(--amber)", display: "inline-flex" }}><IconStar /></span> 4,9 på Google</div>
          </div>
        </div>
        <div className="scroll-cue">Scrolla</div>
      </section>

      {/* ============ LÖPBAND ============ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="marquee-item">{m}<span className="sep" /></span>
          ))}
        </div>
      </div>

      {/* ============ DÄCK SOM RULLAR ISÄR ============ */}
      <TireSplit />

      {/* ============ STATS ============ */}
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

      {/* ============ TJÄNSTER ============ */}
      <section id="tjanster" className="section" style={{ paddingTop: 60, scrollMarginTop: 40 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Vad vi gör</span>
              <h2 className="h-display h2">Allt för <span className="ember">hjulen</span></h2>
            </div>
            <p className="dim" style={{ maxWidth: 380 }}>Fasta priser, inga överraskningar. Klicka på en tjänst för vad som ingår.</p>
          </div>
          <div className="grid g3">
            {TJANSTER.map((t, i) => <ServiceCard key={t.slug} t={t} i={i} />)}
          </div>
        </div>
      </section>

      <div className="tread" />

      {/* ============ DÄCKHOTELL ============ */}
      <section className="section">
        <div className="wrap split">
          <div className="split-media reveal reveal-l">
            <Image src="/images/hotel.webp" alt="Långa rader med däck i IronDäcks klimatkontrollerade däckhotell" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="scan" />
            <div className="media-badge">
              <span className="h-display" style={{ fontSize: 40, lineHeight: 1 }}>1 200+</span>
              <span className="small dim" style={{ lineHeight: 1.35 }}>däckset i förvar<br />just nu</span>
            </div>
          </div>
          <div className="reveal reveal-r">
            <span className="eyebrow">Däckhotell</span>
            <h2 className="h-display h2" style={{ margin: "18px 0 22px" }}>Dina däck<br /><span className="outline-text">bor bättre</span><br />hos oss</h2>
            <p className="lead" style={{ marginBottom: 30 }}>
              Ingen mer släpning till förrådet. Vi märker, tvättar, kontrollerar och förvarar dina däck i rätt temperatur — och sms:ar när det är dags att byta.
            </p>
            <ul className="checklist" style={{ marginBottom: 36 }}>
              <li>Klimatkontrollerat och försäkrat mot stöld & brand</li>
              <li>Mönsterdjup mäts och syns under Mina sidor</li>
              <li>SMS-påminnelse när säsongen skiftar</li>
            </ul>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/tjanster/dackhotell" className="btn btn-primary">Från 495 kr/år <IconArrow /></Link>
              <Link href="/medlem" className="btn btn-ghost">Se ditt däckhotell</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SÅ GÅR DET TILL ============ */}
      <section className="section" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Så funkar det</span>
              <h2 className="h-display h2">Fyra steg. <span className="ember">Noll krångel.</span></h2>
            </div>
          </div>
          <div className="steps">
            {STEG.map((s, i) => (
              <div key={s.nr} className="step reveal" style={{ ["--d" as string]: `${i * 0.1}s` }}>
                <div className="step-nr">{s.nr}</div>
                <h3 className="h-display h3" style={{ marginBottom: 10 }}>{s.titel}</h3>
                <p className="dim" style={{ fontSize: 15 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOKA ============ */}
      <section id="boka" className="section" style={{ scrollMarginTop: 40 }}>
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="reveal reveal-l sticky-col" style={{ position: "sticky", top: 110 }}>
            <span className="eyebrow">Boka tid</span>
            <h2 className="h-display h2" style={{ margin: "18px 0 22px" }}>Välj tid.<br /><span className="ember-grad">Vi fixar resten.</span></h2>
            <p className="lead" style={{ marginBottom: 32 }}>Under en minut att boka. Du får bekräftelse direkt i inkorgen och ett SMS när bilen är klar.</p>
            <div className="split-media" style={{ aspectRatio: "16 / 11", marginBottom: 28 }}>
              <Image src="/images/mount.webp" alt="Mekaniker monterar ett vinterdäck" fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectPosition: "50% 40%" }} />
            </div>
            <div className="grid" style={{ gap: 14 }}>
              <a href={FORETAG.telefonHref} className="dim" style={{ display: "flex", gap: 12, alignItems: "center" }}><span className="ember"><IconPhone /></span> Hellre ringa? {FORETAG.telefon}</a>
              <div className="dim" style={{ display: "flex", gap: 12, alignItems: "center" }}><span className="ember"><IconClock /></span> Mån–fre 07–18 · Lör 08–14</div>
            </div>
          </div>
          <div className="reveal reveal-r">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ============ OMDÖMEN ============ */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Omdömen</span>
              <h2 className="h-display h2">Göteborgarna <span className="ember">säger</span></h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="h-display" style={{ fontSize: 56, lineHeight: 1 }}>4,9</span>
              <span>
                <span className="stars">{Array.from({ length: 5 }, (_, i) => <IconStar key={i} />)}</span>
                <span className="small muted">Exempelomdömen (demo)</span>
              </span>
            </div>
          </div>
          <div className="grid g3">
            {OMDOMEN.map((o, i) => (
              <figure key={o.namn} className="card card-glow quote reveal" style={{ ["--d" as string]: `${i * 0.1}s` }}>
                <span className="stars">{Array.from({ length: 5 }, (_, j) => <IconStar key={j} />)}</span>
                <p>”{o.text}”</p>
                <figcaption className="quote-by">
                  <span className="quote-av">{o.namn[0]}</span>
                  <span><strong>{o.namn}</strong><br /><span className="muted">{o.ort}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap wrap-sm">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow">Vanliga frågor</span>
            <h2 className="h-display h2" style={{ marginTop: 18 }}>Bra att veta</h2>
          </div>
          <div className="faq reveal">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span className="plus" /></summary>
                <p className="ans">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="cta-band reveal">
            <span className="eyebrow">Vintersäsongen är här</span>
            <h2 className="h-display h2" style={{ margin: "18px 0 16px", maxWidth: 760 }}>Slå köerna. Boka vinterdäcken <span className="ember-grad">idag.</span></h2>
            <p className="lead" style={{ marginBottom: 32 }}>Lediga tider redan i morgon bitti. Lufttrycket kollar vi gratis på köpet.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="#boka" className="btn btn-primary">Boka tid <IconArrow /></Link>
              <a href={FORETAG.telefonHref} className="btn btn-ghost"><IconPhone /> {FORETAG.telefon}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
