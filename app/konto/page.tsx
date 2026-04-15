"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase";

type Bokning = {
  id: string;
  namn: string;
  tjanst: string;
  datum: string;
  tid: string;
  regnr: string;
  status: string;
  created_at: string;
};

export default function KontoPage() {
  const [user, setUser] = useState<any>(null);
  const [bokningar, setBokningar] = useState<Bokning[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bokningar");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/medlem"); return; }
      setUser(user);

      const { data } = await supabase
        .from("bookings")
        .select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });

      setBokningar(data || []);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0d0d" }}>
      <p style={{ color: "rgba(220,50,30,0.5)", letterSpacing: "6px", fontSize: "12px", textTransform: "uppercase" }}>Laddar...</p>
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#0d0d0d", fontFamily: "'Barlow', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');`}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "url('/images/verkstad_bg.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.1) saturate(0.2)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "rgba(13,13,13,0.92)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "100px 24px 60px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "6px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "8px" }}>NordDäck</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "64px", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "8px" }}>
            Mitt Konto
          </h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>{user?.email}</p>
          <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(220,50,30,0.4), transparent)", marginTop: "24px" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "40px" }}>

          {/* Sidebar */}
          <div>
            {["bokningar", "inställningar"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "14px 16px", marginBottom: "4px", borderRadius: "6px",
                  border: "none", cursor: "pointer", fontFamily: "'Barlow', sans-serif",
                  background: activeTab === tab ? "rgba(220,50,30,0.1)" : "transparent",
                  color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
                  fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", transition: "all 0.2s",
                  borderLeft: activeTab === tab ? "2px solid rgba(220,50,30,0.8)" : "2px solid transparent",
                }}
              >
                {tab === "bokningar" ? `Bokningar (${bokningar.length})` : "Inställningar"}
              </button>
            ))}
            <button onClick={handleLogout}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "14px 16px", marginTop: "24px", borderRadius: "6px",
                border: "none", cursor: "pointer", background: "transparent",
                color: "rgba(220,50,30,0.5)", fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif",
              }}
            >
              Logga ut
            </button>
          </div>

          {/* Content */}
          <div>
            {activeTab === "bokningar" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontSize: "10px", letterSpacing: "5px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "20px" }}>Historik</p>
                {bokningar.length === 0 ? (
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
                    <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase" }}>Inga bokningar ännu</p>
                  </div>
                ) : (
                  bokningar.map((b, i) => (
                    <motion.div key={b.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px", marginBottom: "12px", position: "relative", overflow: "hidden" }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: b.status === "bekräftad" ? "rgba(34,197,94,0.7)" : "rgba(220,50,30,0.7)" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, color: "#fff", textTransform: "uppercase", margin: 0 }}>{b.tjanst}</h3>
                        <span style={{
                          fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
                          padding: "4px 12px", borderRadius: "20px",
                          background: b.status === "bekräftad" ? "rgba(34,197,94,0.1)" : "rgba(220,50,30,0.1)",
                          color: b.status === "bekräftad" ? "rgba(34,197,94,0.9)" : "rgba(220,50,30,0.9)",
                          border: `1px solid ${b.status === "bekräftad" ? "rgba(34,197,94,0.2)" : "rgba(220,50,30,0.2)"}`,
                        }}>{b.status || "Väntar"}</span>
                      </div>
                      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>📅 {b.datum}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>🕐 kl. {b.tid}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>🚗 {b.regnr}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === "inställningar" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontSize: "10px", letterSpacing: "5px", color: "rgba(220,50,30,0.5)", textTransform: "uppercase", marginBottom: "20px" }}>Kontoinformation</p>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "32px" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Email</p>
                  <p style={{ color: "#fff", fontSize: "16px", marginBottom: "24px" }}>{user?.email}</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Namn</p>
                  <p style={{ color: "#fff", fontSize: "16px" }}>{user?.user_metadata?.full_name || "—"}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}