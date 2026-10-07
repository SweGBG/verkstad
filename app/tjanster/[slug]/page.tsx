import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../components/page-hero";
import { FORETAG, TJANSTER, getTjanst } from "../../lib/data";
import { IconArrow, IconPhone, TjanstIkon } from "../../components/icons";

// Alla sex tjänstesidor genereras från app/lib/data.ts
export function generateStaticParams() {
  return TJANSTER.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getTjanst((await params).slug);
  if (!t) return {};
  return { title: `${t.titel} i Göteborg — ${t.fran}`, description: t.lang };
}

export default async function TjanstSida({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTjanst((await params).slug);
  if (!t) notFound();
  const andra = TJANSTER.filter((x) => x.slug !== t.slug).slice(0, 3);
  const gratis = t.priser.length === 1;
  const bokaHref = t.slug === "dacktryckstest" ? "/kontakt" : `/?tjanst=${t.slug}#boka`;

  return (
    <main>
      <PageHero
        eyebrow={`${t.tid} · ${t.fran}`}
        titel={<>{t.rubrik[0]}<span className="ember-grad">{t.rubrik[1]}</span></>}
        text={t.lang}
        bild={t.bild}
        crumbs={[{ label: "Tjänster", href: "/#tjanster" }, { label: t.titel }]}
      >
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href={bokaHref} className="btn btn-primary">{t.cta} <IconArrow /></Link>
          <a href={FORETAG.telefonHref} className="btn btn-ghost"><IconPhone /> Ring oss</a>
        </div>
      </PageHero>

      {/* PRISER */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Prislista</span>
              <h2 className="h-display h2">Fast pris. <span className="ember">Inga överraskningar.</span></h2>
            </div>
          </div>
          {gratis ? (
            <div className="cta-band reveal" style={{ textAlign: "center" }}>
              <span className="pill" style={{ marginBottom: 18 }}>{t.priser[0].spec}</span>
              <div className="h-display ember-grad" style={{ fontSize: "clamp(90px, 16vw, 200px)", lineHeight: 0.9 }}>Gratis</div>
              <p className="lead" style={{ margin: "18px auto 0" }}>Alltid gratis — oavsett om du är kund eller bara kör förbi.</p>
            </div>
          ) : (
            <div className={`grid ${t.priser.length === 2 ? "g2" : "g3"}`}>
              {t.priser.map((p, i) => (
                <div key={p.namn} className={`card card-hover price-card reveal ${p.badge ? "featured card-glow" : ""}`} style={{ ["--d" as string]: `${i * 0.08}s` }}>
                  {p.badge && <span className="pill">{p.badge}</span>}
                  <span className="small muted" style={{ letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>{p.spec}</span>
                  <h3 className="h-display h3">{p.namn}</h3>
                  <div className="price">{p.pris}</div>
                </div>
              ))}
            </div>
          )}
          {t.fotnot && <p className="small muted reveal" style={{ marginTop: 16 }}>* {t.fotnot}</p>}
        </div>
      </section>

      {/* INGÅR */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div className="reveal reveal-l">
            <span className="eyebrow">Vad ingår</span>
            <h2 className="h-display h2" style={{ margin: "18px 0 30px" }}>Det här <span className="outline-text">gör vi</span></h2>
            <ul className="checklist" style={{ gap: 16 }}>
              {t.ingar.map((x) => <li key={x} style={{ fontSize: 17 }}>{x}</li>)}
            </ul>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 40 }}>
              <Link href={bokaHref} className="btn btn-primary">{t.cta} <IconArrow /></Link>
            </div>
          </div>
          <div className="split-media reveal reveal-r">
            <Image src={t.bild} alt={t.titel} fill sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="media-badge">
              <span className="service-icon" style={{ width: 46, height: 46 }}><TjanstIkon namn={t.ikon} size={22} /></span>
              <span><strong className="h-display" style={{ fontSize: 22 }}>{t.tid}</strong><br /><span className="small dim">{t.fran}</span></span>
            </div>
          </div>
        </div>
      </section>

      <div className="tread" />

      {/* ANDRA TJÄNSTER */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Fler tjänster</span>
              <h2 className="h-display h2">Passa på <span className="ember">samtidigt</span></h2>
            </div>
            <Link href="/priser" className="btn btn-ghost btn-sm">Alla priser <IconArrow /></Link>
          </div>
          <div className="grid g3">
            {andra.map((a, i) => (
              <Link key={a.slug} href={`/tjanster/${a.slug}`} className="card card-hover reveal" style={{ ["--d" as string]: `${i * 0.08}s`, display: "flex", gap: 18, alignItems: "center" }}>
                <span className="service-icon"><TjanstIkon namn={a.ikon} /></span>
                <span style={{ flex: 1 }}>
                  <span className="h-display h3" style={{ fontSize: 24, display: "block" }}>{a.titel}</span>
                  <span className="small dim">{a.tid} · {a.fran}</span>
                </span>
                <span className="ember"><IconArrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
