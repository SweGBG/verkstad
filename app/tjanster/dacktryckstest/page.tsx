"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DacktryckstestPage() {
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

        <Link href="/#tjanster" style={{ textDecoration: "none" }}>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.3)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "48px", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(220,50,30,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >← Tillbaka</motion.div>
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "rgba(220,50,30,0.7)" }} />
            <span style={{ color: "rgba(220,50,30,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>NordDäck — 15 min</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 0.95, marginBottom: "24px" }}>
            Däck<span style={{ color: "rgba(220,50,30,0.9)" }}>tryck</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", lineHeight: 1.8, maxWidth: "600px", marginBottom: "48px" }}>
            Rätt däcktryck sparar bränsle, minskar däckslitage och förbättrar stabiliteten. Vi kontrollerar och justerar trycket på alla fyra hjul — gratis när du är hos oss för annan service.
          </p>
        </motion.div>

        {/* GRATIS BADGE */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: "60px" }}>
          <div style={{ background: "rgba(220,50,30,0.08)", border: "1px solid rgba(220,50,30,0.3)", borderRadius: "16px", padding: "36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.8), transparent)" }} />
            <p style={{ color: "rgba(220,50,30,0.6)", fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase", marginBottom: "12px" }}>Pris</p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "72px", fontWeight: 900, color: "rgba(220,50,30,0.9)", lineHeight: 1 }}>GRATIS</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", marginTop: "12px" }}>Alltid gratis — oavsett om du är kund eller bara kör förbi</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginBottom: "60px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "6px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "20px" }}>Vad ingår</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              "Kontroll av alla 4 hjul",
              "Justering till rekommenderat tryck",
              "Kontroll av reservhjul",
              "Råd om mönsterdjup",
              "Snabbt — klart på 15 minuter",
              "Ingen bokning krävs",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "rgba(220,50,30,0.8)", fontSize: "14px" }}>✓</span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: "flex", gap: "16px" }}>
          <Link href="/#boka" style={{ textDecoration: "none" }}>
            <motion.div whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(220,50,30,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(220,50,30,0.9)", color: "#fff", padding: "16px 36px", borderRadius: "6px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
            >Kör in direkt →</motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}