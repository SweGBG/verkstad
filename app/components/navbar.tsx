"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase";
import { useRouter, usePathname } from "next/navigation";

const ADMIN_EMAIL = "lenn.soder@protonmail.com";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(13,13,13,0.95)" : "rgba(13,13,13,0.6)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        transition: "all 0.4s ease",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600;700&display=swap');`}</style>

      <Link href="/" onClick={handleLogoClick} style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(220,50,30,0.15)", border: "1px solid rgba(220,50,30,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🛞</div>
          <span style={{ color: "#fff", fontSize: "18px", fontWeight: 800, letterSpacing: "0.1em", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            NordDäck<span style={{ color: "rgba(220,50,30,0.9)" }}>.</span>
          </span>
        </div>
      </Link>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        <a href={isHome ? "#tjanster" : "/#tjanster"}
          style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
        >Tjänster</a>

        {["Om oss", "Priser", "Kontakt"].map((item) => (
          <a key={item} href={isHome ? `#${item.toLowerCase().replace(" ", "")}` : `/#${item.toLowerCase().replace(" ", "")}`}
            style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", fontWeight: 500, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          >{item}</a>
        ))}

        <div data-dropdown style={{ position: "relative" }}>
          <div onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ width: "36px", height: "36px", border: "1px solid rgba(220,50,30,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", fontSize: "15px", cursor: "pointer", background: "rgba(220,50,30,0.08)", transition: "all 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(220,50,30,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(220,50,30,0.4)")}
          >👤</div>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{ position: "absolute", top: "48px", right: 0, background: "#0d0d0d", border: "1px solid rgba(220,50,30,0.2)", borderRadius: "10px", overflow: "hidden", minWidth: "180px", zIndex: 200 }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.6), transparent)" }} />
                {user ? (
                  <>
                    <Link href="/konto" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>
                      <div style={{ padding: "12px 16px", color: "rgba(255,255,255,0.65)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,50,30,0.08)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                      >🛞 Mina bokningar</div>
                    </Link>
                    {user.email === ADMIN_EMAIL && (
                      <Link href="/admin" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>
                        <div style={{ padding: "12px 16px", color: "rgba(220,50,30,0.8)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "all 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,50,30,0.08)"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(220,50,30,0.8)"; }}
                        >⚙ Admin</div>
                      </Link>
                    )}
                    <div onClick={handleLogout}
                      style={{ padding: "12px 16px", color: "rgba(255,100,100,0.6)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,100,100,0.06)"; e.currentTarget.style.color = "rgba(255,100,100,0.9)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,100,100,0.6)"; }}
                    >Logga ut</div>
                  </>
                ) : (
                  <Link href="/medlem" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>
                    <div style={{ padding: "12px 16px", color: "rgba(220,50,30,0.8)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,50,30,0.08)"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(220,50,30,0.8)"; }}
                    >Logga in</div>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.a
          href={isHome ? "#boka" : "/#boka"}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{ background: "rgba(220,50,30,0.9)", color: "#fff", padding: "10px 22px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}
        >Boka tid</motion.a>
      </div>
    </motion.nav>
  );
}