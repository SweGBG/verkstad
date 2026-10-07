"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./logo";
import { IconArrow, IconCalendar, IconGrid, IconLogout, IconMenu, IconShield, IconUser } from "./icons";
import { useAuth } from "../lib/useAuth";
import { FORETAG } from "../lib/data";

const LANKAR = [
  { label: "Tjänster", href: "/#tjanster" },
  { label: "Däckhotell", href: "/tjanster/dackhotell" },
  { label: "Priser", href: "/priser" },
  { label: "Om oss", href: "/om" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loggaUt } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setDrop(false); setMenu(false); } };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Stäng menyer vid sidbyte
  const [senasteSida, setSenasteSida] = useState(pathname);
  if (senasteSida !== pathname) {
    setSenasteSida(pathname);
    setMenu(false);
    setDrop(false);
  }

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  const ut = async () => {
    await loggaUt();
    setDrop(false);
    router.push("/");
  };

  const aktiv = (href: string) => !href.includes("#") && pathname.startsWith(href);
  const initialer = (user?.namn || "?").split(/\s+/).filter((w) => /^\p{L}/u.test(w)).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  // Auth-sidan har egen layout
  const doljLankar = pathname === "/medlem";

  return (
    <>
      <nav className={`nav ${scrolled || menu ? "scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <Link href="/" className="logo" aria-label={`${FORETAG.namn} — startsida`}>
            <LogoMark />
            <span>
              <span className="logo-text">Iron<span className="ember">Däck</span></span>
              <span className="logo-sub">Däckverkstad · {FORETAG.ort}</span>
            </span>
          </Link>

          {!doljLankar && (
            <div className="nav-links">
              {LANKAR.map((l) => (
                <Link key={l.href} href={l.href} className={`nav-link ${aktiv(l.href) ? "active" : ""}`}>{l.label}</Link>
              ))}
            </div>
          )}

          <div className="nav-right">
            <div ref={dropRef} style={{ position: "relative" }}>
              {user ? (
                <button className="avatar" onClick={() => setDrop((v) => !v)} aria-label="Konto" aria-expanded={drop}>{initialer}</button>
              ) : (
                <button className="icon-btn" onClick={() => setDrop((v) => !v)} aria-label="Konto" aria-expanded={drop}><IconUser /></button>
              )}
              {drop && (
                <div className="dropdown" role="menu">
                  {user ? (
                    <>
                      <div className="dropdown-head">
                        <div style={{ fontWeight: 700 }}>{user.namn}</div>
                        <div className="small muted">{user.email}</div>
                        {user.demo && <span className="pill pill-warn" style={{ marginTop: 8 }}>Demoläge</span>}
                      </div>
                      <Link href="/konto"><IconGrid size={16} /> Mina sidor</Link>
                      <Link href="/konto?flik=bokningar"><IconCalendar size={16} /> Mina bokningar</Link>
                      {user.admin && <Link href="/admin" style={{ color: "var(--ember-2)" }}><IconShield size={16} /> Admin</Link>}
                      <button onClick={ut} style={{ color: "var(--bad)" }}><IconLogout size={16} /> Logga ut</button>
                    </>
                  ) : (
                    <>
                      <div className="dropdown-head">
                        <div style={{ fontWeight: 700 }}>Mina sidor</div>
                        <div className="small muted">Bokningar, garage & däckhotell</div>
                      </div>
                      <Link href="/medlem"><IconUser size={16} /> Logga in</Link>
                      <Link href="/medlem?flik=registrera"><IconArrow size={16} className="" /> Skapa konto</Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <Link href="/#boka" className="btn btn-primary btn-sm">Boka tid</Link>
            <button className="icon-btn burger" onClick={() => setMenu((v) => !v)} aria-label="Meny" aria-expanded={menu}>
              <IconMenu open={menu} />
            </button>
          </div>
        </div>
      </nav>

      {menu && (
        <div className="mobile-menu">
          {LANKAR.map((l, i) => (
            <Link key={l.href} href={l.href} className="big" style={{ animationDelay: `${0.05 + i * 0.06}s` }} onClick={() => setMenu(false)}>
              {l.label}
            </Link>
          ))}
          <Link href={user ? "/konto" : "/medlem"} className="big" style={{ animationDelay: "0.4s", color: "var(--dim)" }} onClick={() => setMenu(false)}>
            {user ? "Mina sidor" : "Logga in"}
          </Link>
          <Link href="/#boka" className="btn btn-primary" style={{ marginTop: 36 }} onClick={() => setMenu(false)}>
            Boka tid <IconArrow />
          </Link>
          <a href={FORETAG.telefonHref} className="small muted" style={{ marginTop: 22, textAlign: "center" }}>
            eller ring {FORETAG.telefon}
          </a>
        </div>
      )}
    </>
  );
}
