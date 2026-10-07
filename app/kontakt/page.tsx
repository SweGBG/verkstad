import type { Metadata } from "next";
import PageHero from "../components/page-hero";
import KontaktForm from "./kontaktform";
import OpenStatus from "../components/open-status";
import { FORETAG } from "../lib/data";
import { IconClock, IconMail, IconPhone, IconPin } from "../components/icons";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Hitta till IronDäck i Hisingsbacka, Göteborg. Ring ${FORETAG.telefon} eller skicka ett meddelande.`,
};

/** Stiliserad "karta" i SVG — byt gärna mot en Google Maps-iframe hos kund. */
function Karta() {
  return (
    <div className="map reveal">
      <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="kv" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" fill="none" stroke="rgba(255,255,255,.035)" />
          </pattern>
        </defs>
        <rect width="600" height="360" fill="url(#kv)" />
        <path d="M-20 250 C 120 230, 180 300, 330 260 S 520 180, 640 210" stroke="#1d3b55" strokeWidth="46" fill="none" opacity=".55" />
        <path d="M-20 250 C 120 230, 180 300, 330 260 S 520 180, 640 210" stroke="#26506f" strokeWidth="2" fill="none" opacity=".6" />
        <g stroke="rgba(255,255,255,.12)" strokeWidth="9" fill="none" strokeLinecap="round">
          <path d="M0 120 L600 150" />
          <path d="M300 -10 L320 370" />
          <path d="M80 -10 C 120 120, 160 180, 210 370" />
          <path d="M470 -10 L430 370" />
        </g>
        <g stroke="rgba(255,173,74,.5)" strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M0 120 L600 150" strokeDasharray="1 0" />
        </g>
        <g fill="rgba(255,255,255,.04)">
          <rect x="120" y="30" width="120" height="60" rx="6" /><rect x="340" y="40" width="90" height="70" rx="6" />
          <rect x="340" y="175" width="70" height="50" rx="6" /><rect x="490" y="60" width="90" height="60" rx="6" />
          <rect x="20" y="150" width="110" height="60" rx="6" />
        </g>
        <text x="20" y="108" fill="rgba(243,239,233,.35)" fontSize="11" letterSpacing="2" fontFamily="sans-serif">E6 / HISINGSLEDEN</text>
        <text x="330" y="340" fill="rgba(243,239,233,.3)" fontSize="11" letterSpacing="2" fontFamily="sans-serif">GÖTA ÄLV</text>
      </svg>
      <div className="map-pin">
        <svg width="44" height="54" viewBox="0 0 24 30" fill="currentColor"><path d="M12 0C5.4 0 0 5.2 0 11.6 0 20 12 30 12 30s12-10 12-18.4C24 5.2 18.6 0 12 0Z" /><circle cx="12" cy="11.5" r="4.5" fill="#0a0a0b" /></svg>
      </div>
      <div className="media-badge">
        <span className="ember"><IconPin /></span>
        <span className="small"><strong>{FORETAG.namn}</strong><br /><span className="dim">{FORETAG.adress}</span></span>
      </div>
    </div>
  );
}

export default function Kontakt() {
  const kort = [
    { ikon: <IconPhone />, rubrik: "Ring", text: FORETAG.telefon, href: FORETAG.telefonHref },
    { ikon: <IconMail />, rubrik: "Mejla", text: FORETAG.email, href: `mailto:${FORETAG.email}` },
    { ikon: <IconPin />, rubrik: "Besök", text: FORETAG.adress, href: `https://maps.google.com/?q=${encodeURIComponent(FORETAG.adress)}` },
  ];
  return (
    <main>
      <PageHero
        eyebrow="Vi finns här"
        titel={<>Kon<span className="ember-grad">takt</span></>}
        text="Frågor om däck, offert eller däckhotell? Ring, mejla eller kör förbi — lufttrycket kollar vi gratis medan du väntar."
        bild="/images/hotel.webp"
        crumbs={[{ label: "Kontakt" }]}
      />

      <section className="section" style={{ paddingTop: 70 }}>
        <div className="wrap">
          <div className="grid g3" style={{ marginBottom: 40 }}>
            {kort.map((k, i) => (
              <a key={k.rubrik} href={k.href} target={k.rubrik === "Besök" ? "_blank" : undefined} rel="noopener noreferrer" className="card card-hover card-glow reveal" style={{ ["--d" as string]: `${i * 0.08}s`, display: "flex", gap: 18, alignItems: "center" }}>
                <span className="service-icon">{k.ikon}</span>
                <span>
                  <span className="label" style={{ marginBottom: 4 }}>{k.rubrik}</span>
                  <strong style={{ fontSize: 16 }}>{k.text}</strong>
                </span>
              </a>
            ))}
          </div>

          <div className="split" style={{ alignItems: "start", gap: 40 }}>
            <div style={{ display: "grid", gap: 20 }}>
              <Karta />
              <div className="card reveal">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 12, flexWrap: "wrap" }}>
                  <span className="label" style={{ margin: 0, display: "flex", gap: 8, alignItems: "center" }}><IconClock size={15} /> Öppettider</span>
                  <span className="hero-meta" style={{ margin: 0, padding: 0, border: "none", opacity: 1, animation: "none" }}><OpenStatus /></span>
                </div>
                <table className="price-table">
                  <tbody>
                    {FORETAG.oppettider.map((o) => (
                      <tr key={o.dag}><td className="dim">{o.dag}</td><td style={{ fontSize: 20 }} className={o.tid === "Stängt" ? "muted" : ""}>{o.tid}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="reveal reveal-r"><KontaktForm /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
