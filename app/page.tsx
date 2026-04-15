"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const TJANSTER = [
  { icon: "⚙", title: "Däckbyte", desc: "Sommar & vinterdäck. Snabb service — klar samma dag.", tid: "30 min" },
  { icon: "🏨", title: "Däckhotell", desc: "Vi lagrar dina däck säkert mellan säsongerna.", tid: "Helårspris" },
  { icon: "🔧", title: "Oljebyte", desc: "Motorolja, filter & kontroll. Alltid rätt olja för din bil.", tid: "45 min" },
  { icon: "🔍", title: "Hjulinställning", desc: "Minskar slitage och förbättrar körkomfort.", tid: "60 min" },
  { icon: "⚡", title: "Bromskontroll", desc: "Bromsar, skivor & belägg. Vi kollar allt.", tid: "30 min" },
  { icon: "🛞", title: "Däcktryckstest", desc: "Rätt lufttryck sparar bränsle och ökar säkerheten.", tid: "15 min" },
];

const STATS = [
  { num: "93%", label: "Nöjda kunder" },
  { num: "1 dag", label: "Leveranstid" },
  { num: "15+", label: "Års erfarenhet" },
  { num: "5★", label: "Google-betyg" },
];

const TJANST_HREF: Record<string, string> = {
  "Däckbyte": "/tjanster/dackbyte",
  "Däckhotell": "/tjanster/dackhotell",
  "Oljebyte": "/tjanster/oljebyte",
  "Hjulinställning": "/tjanster/hjulinstallning",
  "Bromskontroll": "/tjanster/bromskontroll",
  "Däcktryckstest": "/tjanster/dacktryckstest",
};

function ServiceCard({ s, i }: { s: typeof TJANSTER[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={TJANST_HREF[s.title] || "/"} style={{ textDecoration: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "rgba(220,50,30,0.08)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? "rgba(220,50,30,0.4)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "12px", padding: "28px 24px", cursor: "pointer",
          transition: "all 0.3s ease", position: "relative", overflow: "hidden", height: "100%",
        }}
      >
        {hovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.2), transparent)" }}
          />
        )}
        <div style={{ fontSize: "28px", marginBottom: "12px" }}>{s.icon}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <h3 style={{ color: "#fff", fontSize: "17px", fontWeight: 600, margin: 0, fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>{s.title}</h3>
          <span style={{ fontSize: "11px", color: "rgba(220,50,30,0.9)", background: "rgba(220,50,30,0.12)", padding: "3px 10px", borderRadius: "20px", fontWeight: 600, whiteSpace: "nowrap", marginLeft: "8px" }}>{s.tid}</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
        <div style={{ marginTop: "16px", color: "rgba(220,50,30,0.6)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>Läs mer →</div>
      </motion.div>
    </Link>
  );
}

export default function VerkstadPage() {
  const [skickad, setSkickad] = useState(false);

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", fontFamily: "'Barlow', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: rgba(220,50,30,0.5); border-radius: 2px; }
        input, select { font-family: 'Barlow', sans-serif; }
        ::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: #1a1a1a; color: #fff; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "url('/images/verkstad_bg.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.2) saturate(0.2)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "linear-gradient(180deg, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.7) 40%, rgba(13,13,13,0.9) 80%, #0d0d0d 100%)" }} />

      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", opacity: 0.4 }}>
        <defs>
          <pattern id="hex2" x="0" y="0" width="60" height="69" patternUnits="userSpaceOnUse">
            <polygon points="30,3 57,18 57,51 30,66 3,51 3,18" fill="none" stroke="rgba(220,50,30,0.07)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex2)" />
      </svg>

      {[...Array(10)].map((_, i) => (
        <motion.div key={i} animate={{ y: [0, -60, 0], opacity: [0, 0.3, 0] }} transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.8 }}
          style={{ position: "fixed", left: `${5 + i * 10}%`, bottom: `${10 + (i % 4) * 12}%`, width: "2px", height: "2px", borderRadius: "50%", background: i % 2 === 0 ? "rgba(220,50,30,0.7)" : "rgba(255,255,255,0.2)", pointerEvents: "none", zIndex: 0 }}
        />
      ))}

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", paddingTop: "80px" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", background: "rgba(220,50,30,0.7)" }} />
            <span style={{ color: "rgba(220,50,30,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Göteborg — Est. 2009</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(56px, 7vw, 88px)", fontWeight: 900, lineHeight: 0.95, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "8px" }}
          >
            Säkra<br /><span style={{ color: "rgba(220,50,30,0.9)" }}>Däck</span><br />Varje<br />Säsong.
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
            style={{ height: "2px", width: "80px", background: "linear-gradient(90deg, rgba(220,50,30,0.9), transparent)", marginBottom: "24px", transformOrigin: "left" }}
          />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.7 }}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.7, maxWidth: "420px", marginBottom: "40px" }}
          >
            Din lokala däckverkstad i Göteborg. Vi byter, lagrar och balanserar däck — snabbt, tryggt och utan krångel.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }} style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <motion.a href="#boka" whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(220,50,30,0.4)" }} whileTap={{ scale: 0.97 }}
              style={{ background: "rgba(220,50,30,0.9)", color: "#fff", padding: "16px 36px", borderRadius: "6px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", display: "inline-block" }}
            >Boka däckbyte</motion.a>
            <motion.a href="#tjanster" whileHover={{ scale: 1.02 }}
              style={{ background: "transparent", color: "rgba(255,255,255,0.7)", padding: "16px 36px", borderRadius: "6px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", display: "inline-block", border: "1px solid rgba(255,255,255,0.15)" }}
            >Se tjänster</motion.a>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
        >
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scrolla</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, rgba(220,50,30,0.6), transparent)" }} />
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px" }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "52px", fontWeight: 900, color: "rgba(220,50,30,0.9)", lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "8px" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TJÄNSTER */}
      <section id="tjanster" style={{ position: "relative", zIndex: 1, padding: "100px 60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "60px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "1px", background: "rgba(220,50,30,0.7)" }} />
              <span style={{ color: "rgba(220,50,30,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Vad vi gör</span>
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "56px", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>Våra tjänster</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {TJANSTER.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* BOKA */}
      <section id="boka" style={{ position: "relative", zIndex: 1, padding: "100px 60px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "56px 48px", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.8), transparent)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "30px", height: "1px", background: "rgba(220,50,30,0.7)" }} />
              <span style={{ color: "rgba(220,50,30,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Bokningsformulär</span>
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "42px", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>Boka din tid</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "36px", lineHeight: 1.6 }}>Vi bekräftar din bokning via email inom 30 minuter.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              {[
                { label: "Namn", placeholder: "Anders Svensson", type: "text" },
                { label: "Telefon", placeholder: "070-000 00 00", type: "tel" },
                { label: "Email", placeholder: "anders@exempel.se", type: "email" },
                { label: "Registreringsnummer", placeholder: "ABC 123", type: "text" },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "12px 16px", color: "#fff", fontSize: "14px", outline: "none", transition: "border-color 0.2s" }}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,30,0.6)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Tjänst</label>
                <select style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "12px 16px", color: "rgba(255,255,255,0.7)", fontSize: "14px", outline: "none" }}>
                  <option value="">Välj tjänst...</option>
                  {TJANSTER.map(t => <option key={t.title} value={t.title}>{t.title}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Önskat datum</label>
                <input type="date"
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "12px 16px", color: "rgba(255,255,255,0.7)", fontSize: "14px", outline: "none", colorScheme: "dark" }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,30,0.6)"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(220,50,30,0.4)" }} whileTap={{ scale: 0.98 }} onClick={() => setSkickad(true)}
              style={{ width: "100%", color: "#fff", border: "none", borderRadius: "6px", padding: "16px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s", background: skickad ? "rgba(34,197,94,0.8)" : "rgba(220,50,30,0.9)" }}
            >
              {skickad ? "✓ Bokning skickad!" : "Skicka bokning →"}
            </motion.button>
            {skickad && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: "rgba(34,197,94,0.8)", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>
                Tack! Vi återkommer inom 30 minuter.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, padding: "40px 60px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "16px" }}>🛞</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>NordDäck Göteborg</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>GÖTEBORG — EST. 2009</span>
        </div>
      </footer>
    </main>
  );
}