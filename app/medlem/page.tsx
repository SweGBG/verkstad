"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase";

export default function MedlemPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [namn, setNamn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Fel email eller lösenord.");
    else router.push("/konto");
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: namn } }
    });
    if (error) setError(error.message);
    else setSuccess("Konto skapat! Kolla din email för bekräftelse.");
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Barlow', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');`}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "url('/images/verkstad_bg.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.15) saturate(0.2)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "linear-gradient(180deg, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.8) 100%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "440px" }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛞</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
            Nord<span style={{ color: "rgba(220,50,30,0.9)" }}>Däck</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "4px" }}>Göteborg — Est. 2009</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,30,0.8), transparent)" }} />

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {(["login", "register"] as const).map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                style={{
                  flex: 1, padding: "16px", border: "none", cursor: "pointer",
                  background: tab === t ? "rgba(220,50,30,0.08)" : "transparent",
                  color: tab === t ? "rgba(220,50,30,0.9)" : "rgba(255,255,255,0.3)",
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em",
                  textTransform: "uppercase", fontFamily: "'Barlow', sans-serif",
                  borderBottom: tab === t ? "1px solid rgba(220,50,30,0.5)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {t === "login" ? "Logga in" : "Skapa konto"}
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{ padding: "32px" }}>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                {tab === "register" && (
                  <div style={{ marginBottom: "16px" }}>
                    <label style={labelStyle}>Namn</label>
                    <input value={namn} onChange={e => setNamn(e.target.value)} placeholder="Anders Svensson" style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,30,0.6)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                )}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="anders@exempel.se" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,30,0.6)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={labelStyle}>Lösenord</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,30,0.6)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "rgba(220,50,30,0.9)", fontSize: "13px", marginBottom: "16px", textAlign: "center" }}>
                    ⚠ {error}
                  </motion.p>
                )}
                {success && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "rgba(34,197,94,0.9)", fontSize: "13px", marginBottom: "16px", textAlign: "center" }}>
                    ✓ {success}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(220,50,30,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={tab === "login" ? handleLogin : handleRegister}
                  disabled={loading}
                  style={{
                    width: "100%", background: loading ? "rgba(220,50,30,0.5)" : "rgba(220,50,30,0.9)",
                    color: "#fff", border: "none", borderRadius: "6px", padding: "14px",
                    fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em",
                    textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  {loading ? "Laddar..." : tab === "login" ? "Logga in →" : "Skapa konto →"}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", color: "rgba(255,255,255,0.4)",
  fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
  textTransform: "uppercase", marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
  padding: "12px 16px", color: "#fff", fontSize: "14px",
  outline: "none", transition: "border-color 0.2s",
  fontFamily: "'Barlow', sans-serif",
};