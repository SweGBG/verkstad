"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase";

type Bokning = {
  id: string;
  namn: string;
  email: string;
  telefon: string;
  tjanst: string;
  datum: string;
  tid: string;
  regnr: string;
  status: string;
  created_at: string;
};

const ADMIN_EMAIL = "lenn.soder@protonmail.com"; // ← byt till din email

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [bokningar, setBokningar] = useState<Bokning[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bokningar");
  const [filter, setFilter] = useState("alla");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) { router.push("/"); return; }
      setUser(user);
      fetchBokningar();
    };
    init();
  }, []);

  const fetchBokningar = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    setBokningar(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBokningar(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const filteredBokningar = bokningar.filter(b => filter === "alla" ? true : b.status === filter);

  const stats = {
    total: bokningar.length,
    vantar: bokningar.filter(b => !b.status || b.status === "väntar").length,
    bekraftad: bokningar.filter(b => b.status === "bekräftad").length,
    idag: bokningar.filter(b => b.datum === new Date().toISOString().split("T")[0]).length,
  };

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0d0d" }}>
      <p style={{ color: "rgba(220,50,30,0.5)", letterSpacing: "6px", fontSize: "12px", textTransform: "uppercase" }}>Laddar...</p>
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", fontFamily: "'Barlow', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');`}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "url('/images/verkstad_bg.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.08) saturate(0.2)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "rgba(13,13,13,0.94)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "100px 24px 60px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "6px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "8px" }}>NordDäck</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "72px", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "4px" }}>Admin</h1>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>{user?.email}</p>
          <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(220,50,30,0.5), transparent)", marginTop: "20px" }} />
        </motion.div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }}>
          {[
            { label: "Totalt", value: stats.total },
            { label: "Väntar", value: stats.vantar, alert: stats.vantar > 0 },
            { label: "Bekräftade", value: stats.bekraftad },
            { label: "Idag", value: stats.idag },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ background: s.alert ? "rgba(220,50,30,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${s.alert ? "rgba(220,50,30,0.3)" : "rgba(255,255,255,0.06)"}`, borderRadius: "12px", padding: "20px 24px" }}
            >
              <p style={{ color: s.alert ? "rgba(220,50,30,0.6)" : "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</p>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "42px", fontWeight: 900, color: s.alert ? "rgba(220,50,30,0.9)" : "#fff", lineHeight: 1 }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["alla", "väntar", "bekräftad", "avbokad"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "8px 18px", borderRadius: "6px", border: "none", cursor: "pointer",
                background: filter === f ? "rgba(220,50,30,0.9)" : "rgba(255,255,255,0.04)",
                color: filter === f ? "#fff" : "rgba(255,255,255,0.4)",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", fontFamily: "'Barlow', sans-serif",
                transition: "all 0.2s",
              }}
            >{f}</button>
          ))}
        </div>

        {/* Bokningar */}
        <div>
          {filteredBokningar.length === 0 ? (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase" }}>Inga bokningar</p>
            </div>
          ) : (
            filteredBokningar.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px", marginBottom: "10px", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: b.status === "bekräftad" ? "rgba(34,197,94,0.7)" : b.status === "avbokad" ? "rgba(255,100,100,0.5)" : "rgba(220,50,30,0.7)" }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "16px", alignItems: "center" }}>
                  <div>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", fontWeight: 700, color: "#fff", textTransform: "uppercase", margin: "0 0 4px" }}>{b.namn}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>{b.email} · {b.telefon}</p>
                  </div>
                  <div>
                    <p style={{ color: "rgba(220,50,30,0.8)", fontSize: "13px", fontWeight: 600, margin: "0 0 4px" }}>{b.tjanst}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>🚗 {b.regnr}</p>
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontSize: "13px", margin: "0 0 4px" }}>📅 {b.datum}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>🕐 kl. {b.tid}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <button onClick={() => updateStatus(b.id, "bekräftad")}
                      style={{ padding: "6px 14px", borderRadius: "4px", border: "none", cursor: "pointer", background: "rgba(34,197,94,0.15)", color: "rgba(34,197,94,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }}
                    >✓ Bekräfta</button>
                    <button onClick={() => updateStatus(b.id, "avbokad")}
                      style={{ padding: "6px 14px", borderRadius: "4px", border: "none", cursor: "pointer", background: "rgba(255,100,100,0.1)", color: "rgba(255,100,100,0.7)", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }}
                    >✕ Avboka</button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}