"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const PRISLISTA = [
  {
    kategori: "Däckbyte",
    emoji: "⚙",
    href: "/tjanster/dackbyte",
    priser: [
      { namn: "Liten bil", spec: "Toyota Yaris, VW Polo", pris: "595 kr" },
      { namn: "Mellanstor bil", spec: "Volvo V60, Toyota RAV4", pris: "695 kr" },
      { namn: "Stor bil / SUV", spec: "Volvo XC90, BMW X5", pris: "795 kr" },
    ],
  },
  {
    kategori: "Däckhotell",
    emoji: "🏨",
    href: "/tjanster/dackhotell",
    priser: [
      { namn: "Personbil", spec: "Upp till 17\"", pris: "495 kr/år" },
      { namn: "SUV / Crossover", spec: "18\" - 20\"", pris: "595 kr/år" },
      { namn: "Skiftbyte ingår", spec: "Boka & glöm", pris: "795 kr/år" },
    ],
  },
  {
    kategori: "Oljebyte",
    emoji: "🔧",
    href: "/tjanster/oljebyte",
    priser: [
      { namn: "Mineralolja", spec: "Äldre bensinmotorer", pris: "795 kr" },
      { namn: "Halvsyntetisk", spec: "Diesel & bensin", pris: "995 kr" },
      { namn: "Helsyntetisk", spec: "Moderna motorer", pris: "1 295 kr" },
    ],
  },
  {
    kategori: "Hjulinställning",
    emoji: "🔍",
    href: "/tjanster/hjulinstallning",
    priser: [
      { namn: "2-hjulsinställning", spec: "Framaxel", pris: "695 kr" },
      { namn: "4-hjulsinställning", spec: "Alla hjul", pris: "995 kr" },
    ],
  },
  {
    kategori: "Bromskontroll",
    emoji: "⚡",
    href: "/tjanster/bromskontroll",
    priser: [
      { namn: "Kontroll", spec: "Inspektion & rapport", pris: "395 kr" },
      { namn: "Bromsbelägg", spec: "Per axel inkl. arbete", pris: "1 495 kr" },
      { namn: "Bromsskivor", spec: "Per axel inkl. belägg", pris: "2 495 kr" },
    ],
  },
  {
    kategori: "Däcktryckstest",
    emoji: "🛞",
    href: "/tjanster/dacktryckstest",
    priser: [
      { namn: "Komplett kontroll", spec: "Alla 4 hjul + reserv", pris: "GRATIS" },
    ],
  },
];

export default function PriserPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", fontFamily: "'Barlow', sans-serif", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');`}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "url('/images/verkstad_bg.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.15) saturate(0.2)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "linear-gradient(180deg, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.8) 100%)" }} />
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", opacity: 0.4 }}>
        <defs><pattern id="hex" x="0" y="0" width="60" height="69" patternUnits="userSpaceOnUse"><polygon points="30,3 57,18 57,51 30,66 3,51 3,18" fill="none" stroke="rgba(220,50,30,0.07)" strokeWidth="0.5" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "120px 24px 80px" }}>

        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.3)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "48px", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(220,50,30,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >← Tillbaka</motion.div>
        </Link>

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "rgba(220,50,30,0.7)" }} />
            <span style={{ color: "rgba(220,50,30,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>IronDäck — Transparent prissättning</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 0.95, marginBottom: "24px" }}>
            Våra<br /><span style={{ color: "rgba(220,50,30,0.9)" }}>priser</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", lineHeight: 1.8, maxWidth: "600px" }}>
            Inga dolda avgifter. Inga överraskningar. Du vet vad du betalar innan vi börjar.
          </p>
        </motion.div>

        {/* PRISLISTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {PRISLISTA.map((kat, ki) => (
            <motion.div key={kat.kategori} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ki * 0.1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "20px" }}>{kat.emoji}</span>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>{kat.kategori}</p>
                <Link href={kat.href} style={{ textDecoration: "none", marginLeft: "auto" }}>
                  <span style={{ color: "rgba(220,50,30,0.6)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>Läs mer →</span>
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${kat.priser.length}, 1fr)`, gap: "12px" }}>
                {kat.priser.map((p, i) => (
                  <div key={p.namn} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "20px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.4), transparent)" }} />
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>{p.spec}</p>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>{p.namn}</p>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", fontWeight: 900, color: p.pris === "GRATIS" ? "rgba(34,197,94,0.9)" : "rgba(220,50,30,0.9)" }}>{p.pris}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* NOTE */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: "48px", padding: "20px 24px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", lineHeight: 1.7 }}>
            * Priser inkl. moms. Däck och delar kan tillkomma. Kostnadsförslag ges alltid innan arbete påbörjas.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: "48px", display: "flex", gap: "16px" }}>
          <Link href="/#boka" style={{ textDecoration: "none" }}>
            <motion.div whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(220,50,30,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(220,50,30,0.9)", color: "#fff", padding: "16px 36px", borderRadius: "6px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
            >Boka tid →</motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}