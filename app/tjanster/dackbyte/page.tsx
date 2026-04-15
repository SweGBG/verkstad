"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DackbytePage() {
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

        {/* BACK */}
        <Link href="/#tjanster" style={{ textDecoration: "none" }}>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.3)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "48px", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(220,50,30,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            ← Tillbaka
          </motion.div>
        </Link>

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "rgba(220,50,30,0.7)" }} />
            <span style={{ color: "rgba(220,50,30,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>NordDäck — 30 min</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 0.95, marginBottom: "24px" }}>
            Däck<span style={{ color: "rgba(220,50,30,0.9)" }}>byte</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", lineHeight: 1.8, maxWidth: "600px", marginBottom: "48px" }}>
            Vi byter dina däck snabbt och säkert — sommar som vinter. Med rätt däck på bilen minskar du risken för olyckor och sparar bränsle. Hos NordDäck är du klar på 30 minuter.
          </p>
        </motion.div>

        {/* PRISER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} style={{ marginBottom: "60px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "6px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "20px" }}>Prislista</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { bil: "Liten bil", ex: "Toyota Yaris, VW Polo", pris: "595 kr" },
              { bil: "Mellanstor bil", ex: "Volvo V60, Toyota RAV4", pris: "695 kr" },
              { bil: "Stor bil / SUV", ex: "Volvo XC90, BMW X5", pris: "795 kr" },
            ].map((p, i) => (
              <motion.div key={p.bil} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.5), transparent)" }} />
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>{p.ex}</p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "12px" }}>{p.bil}</p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "36px", fontWeight: 900, color: "rgba(220,50,30,0.9)" }}>{p.pris}</p>
              </motion.div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "12px" }}>* Priset gäller montering av medhavda däck. Däck kan köpas separat.</p>
        </motion.div>

        {/* INGÅR */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginBottom: "60px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "6px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "20px" }}>Vad ingår</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              "Avmontering av gamla däck",
              "Montering av nya däck",
              "Balansering av alla hjul",
              "Kontroll av lufttryck",
              "Kontroll av bromsar & bromsskivor",
              "Åtdragning med momentnyckel",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "rgba(220,50,30,0.8)", fontSize: "14px" }}>✓</span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: "flex", gap: "16px" }}>
          <Link href="/#boka" style={{ textDecoration: "none" }}>
            <motion.div whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(220,50,30,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(220,50,30,0.9)", color: "#fff", padding: "16px 36px", borderRadius: "6px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
            >Boka däckbyte →</motion.div>
          </Link>
          <Link href="tel:031-000-00-00" style={{ textDecoration: "none" }}>
            <motion.div whileHover={{ scale: 1.02 }}
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", padding: "16px 36px", borderRadius: "6px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
            >Ring oss</motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}