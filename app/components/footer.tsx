"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./logo";
import { FORETAG, TJANSTER } from "../lib/data";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/medlem") return null;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 20 }}>
              <LogoMark />
              <span className="logo-text">Iron<span className="ember">Däck</span></span>
            </Link>
            <p className="dim" style={{ maxWidth: 320, fontSize: 15 }}>
              Däckbyte, däckhotell och service i {FORETAG.ort}. Ärligt hantverk, fasta priser och tider som hålls.
            </p>
          </div>
          <div>
            <h4>Tjänster</h4>
            <ul>
              {TJANSTER.map((t) => <li key={t.slug}><Link href={`/tjanster/${t.slug}`}>{t.titel}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Verkstaden</h4>
            <ul>
              <li><Link href="/om">Om oss</Link></li>
              <li><Link href="/priser">Priser</Link></li>
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><Link href="/medlem">Mina sidor</Link></li>
              <li><Link href="/#boka">Boka tid</Link></li>
            </ul>
          </div>
          <div>
            <h4>Hitta hit</h4>
            <ul>
              <li>{FORETAG.adress}</li>
              <li><a href={FORETAG.telefonHref}>{FORETAG.telefon}</a></li>
              <li><a href={`mailto:${FORETAG.email}`}>{FORETAG.email}</a></li>
              {FORETAG.oppettider.map((o) => <li key={o.dag} className="mono">{o.dag}: {o.tid}</li>)}
            </ul>
          </div>
        </div>
        <div className="footer-word" aria-hidden="true">IronDäck</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {FORETAG.namn} {FORETAG.ort}. Alla rättigheter förbehållna.</span>
          <a href="https://swegbg.com" target="_blank" rel="noopener noreferrer">Skapad av SweGBG</a>
        </div>
      </div>
    </footer>
  );
}
