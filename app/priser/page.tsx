import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/page-hero";
import { TJANSTER } from "../lib/data";
import { IconArrow, TjanstIkon } from "../components/icons";

export const metadata: Metadata = {
  title: "Priser",
  description: "Fasta priser på däckbyte, däckhotell, oljebyte, hjulinställning och bromsar hos IronDäck i Göteborg.",
};

export default function Priser() {
  return (
    <main>
      <PageHero
        eyebrow="Transparent prissättning"
        titel={<>Pris<span className="ember-grad">lista</span></>}
        text="Det du ser är det du betalar. Inga dolda avgifter, inga påhittade tillägg — arbete och material ingår där det står."
        bild="/images/mount.webp"
        crumbs={[{ label: "Priser" }]}
      />

      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 20 }}>
          {TJANSTER.map((t, i) => (
            <article key={t.slug} className="card card-glow reveal" style={{ ["--d" as string]: `${(i % 2) * 0.06}s`, display: "grid", gridTemplateColumns: "minmax(0, 340px) 1fr", gap: 40, padding: "34px 36px" }} data-pris>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <span className="service-icon"><TjanstIkon namn={t.ikon} /></span>
                  <span className="pill pill-mute">{t.tid}</span>
                </div>
                <h2 className="h-display h3" style={{ fontSize: 36 }}>{t.titel}</h2>
                <p className="dim small" style={{ margin: "10px 0 18px", fontSize: 14.5 }}>{t.kort}</p>
                <Link href={`/tjanster/${t.slug}`} className="card-link">Vad ingår <IconArrow size={14} /></Link>
              </div>
              <table className="price-table">
                <tbody>
                  {t.priser.map((p) => (
                    <tr key={p.namn}>
                      <td>
                        <strong style={{ fontSize: 16 }}>{p.namn}</strong>{" "}
                        {p.badge && <span className="pill" style={{ marginLeft: 8 }}>{p.badge}</span>}
                        <div className="small muted">{p.spec}</div>
                      </td>
                      <td className={p.pris === "Gratis" ? "ember" : ""}>{p.pris}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ))}
          <p className="small muted reveal">Alla priser inkl. moms. Däck och reservdelar utöver det som anges tillkommer — vi ger alltid offert innan vi skruvar.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2 className="h-display h2" style={{ marginBottom: 14 }}>Hittade du rätt? <span className="ember-grad">Boka direkt.</span></h2>
            <p className="lead" style={{ marginBottom: 28 }}>Välj tjänst, dag och tid — klart på under en minut.</p>
            <Link href="/#boka" className="btn btn-primary">Boka tid <IconArrow /></Link>
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 760px) { [data-pris] { grid-template-columns: 1fr !important; gap: 22px !important; padding: 26px 22px !important; } }`}</style>
    </main>
  );
}
