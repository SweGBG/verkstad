"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const INFO = [
  { label: "Adress", värde: "Hisingsbacka 12, 417 55 Göteborg", emoji: "📍" },
  { label: "Telefon", värde: "031-123 45 67", emoji: "📞" },
  { label: "Email", värde: "info@irondack.se", emoji: "✉️" },
  { label: "Öppettider", värde: "Mån–Fre: 07:00–18:00\nLör: 08:00–14:00", emoji: "🕐" },
];

export default function KontaktPage() {
  const [skickad, setSkickad] = useState(false);
  const [form, setForm] = useState({ namn: "", email: "", meddelande: "" });

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", fontFamily: "'Barlow', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        ::placeholder { color: rgba(255,255,255,0.25); }
        textarea { font-family: 'Barlow', sans-serif; resize: vertical; }
      `}</style>

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
            <span style={{ color: "rgba(220,50,30,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>IronDäck — Vi finns här</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 0.95, marginBottom: "24px" }}>
            Kontakta<br /><span style={{ color: "rgba(220,50,30,0.9)" }}>oss</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", lineHeight: 1.8, maxWidth: "600px" }}>
            Har du frågor om däck, priser eller tider? Hör av dig — vi svarar samma dag.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

          {/* INFO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p style={{ fontSize: "11px", letterSpacing: "6px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "24px" }}>Hitta oss</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {INFO.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "16px", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: "20px" }}>{item.emoji}</span>
                  <div>
                    <p style={{ color: "rgba(220,50,30,0.7)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.värde}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* KARTA PLACEHOLDER */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ marginTop: "20px", height: "180px", background: "rgba(220,50,30,0.05)", border: "1px solid rgba(220,50,30,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase" }}>📍 Hisingsbacka, Göteborg</p>
            </motion.div>
          </motion.div>

          {/* FORMULÄR */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p style={{ fontSize: "11px", letterSpacing: "6px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "24px" }}>Skicka meddelande</p>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.6), transparent)" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { label: "Namn", key: "namn", type: "text", placeholder: "Anders Svensson" },
                  { label: "Email", key: "email", type: "email", placeholder: "anders@exempel.se" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "12px 16px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,30,0.6)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Meddelande</label>
                  <textarea placeholder="Skriv ditt meddelande här..." rows={5} value={form.meddelande}
                    onChange={e => setForm({ ...form, meddelande: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "12px 16px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,30,0.6)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(220,50,30,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSkickad(true)}
                  style={{ width: "100%", color: "#fff", border: "none", borderRadius: "6px", padding: "14px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", background: skickad ? "rgba(34,197,94,0.8)" : "rgba(220,50,30,0.9)" }}
                >
                  {skickad ? "✓ Skickat!" : "Skicka meddelande →"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}