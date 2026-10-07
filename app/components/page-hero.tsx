import Image from "next/image";
import Link from "next/link";

type Props = {
  eyebrow: string;
  titel: React.ReactNode;
  text?: React.ReactNode;
  bild?: string;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
};

/** Gemensamt sidhuvud för undersidor. */
export default function PageHero({ eyebrow, titel, text, bild = "/images/hero.webp", crumbs, children }: Props) {
  return (
    <section className="page-hero">
      <div className="page-hero-media">
        <Image src={bild} alt="" fill priority sizes="100vw" />
      </div>
      <div className="wrap">
        {crumbs && (
          <nav className="crumbs" aria-label="Brödsmulor" style={{ opacity: 0, animation: "fadeUp .8s var(--ease) forwards" }}>
            <Link href="/">Hem</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: "contents" }}>
                <span>/</span>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span style={{ color: "var(--ink)" }}>{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <span className="eyebrow" style={{ opacity: 0, animation: "fadeUp .8s var(--ease) .1s forwards" }}>{eyebrow}</span>
        <h1 className="h-display h1" style={{ opacity: 0, animation: "fadeUp 1s var(--ease) .2s forwards" }}>{titel}</h1>
        {text && <p className="lead" style={{ opacity: 0, animation: "fadeUp 1s var(--ease) .35s forwards" }}>{text}</p>}
        {children && <div style={{ marginTop: 34, opacity: 0, animation: "fadeUp 1s var(--ease) .5s forwards" }}>{children}</div>}
      </div>
    </section>
  );
}
