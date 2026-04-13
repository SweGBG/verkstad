"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const TIDER = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const TJANSTER = [
  { icon: "⚙", label: "Däckbyte", pris: "från 595 kr" },
  { icon: "🏨", label: "Däckhotell", pris: "från 495 kr/år" },
  { icon: "🔧", label: "Oljebyte", pris: "från 795 kr" },
  { icon: "🔍", label: "Hjulinställning", pris: "från 695 kr" },
  { icon: "⚡", label: "Bromskontroll", pris: "från 395 kr" },
  { icon: "🛞", label: "Däcktryckstest", pris: "Gratis" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function BookingForm() {
  const [form, setForm] = useState({
    namn: "", telefon: "", email: "", regnr: "", tjanst: "", datum: "", tid: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [felmeddelande, setFelmeddelande] = useState("");

  const uppdatera = (falt: string, varde: string) =>
    setForm((prev) => ({ ...prev, [falt]: varde }));

  const skicka = async () => {
    const { namn, telefon, email, regnr, tjanst, datum, tid } = form;
    if (!namn || !telefon || !email || !regnr || !tjanst || !datum || !tid) {
      setFelmeddelande("Fyll i alla fält för att fortsätta.");
      return;
    }
    setFelmeddelande("");
    setStatus("loading");
    try {
      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px", padding: "60px 48px", textAlign: "center", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.8), transparent)" }} />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ fontSize: "56px", marginBottom: "24px" }}
        >🛞</motion.div>
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "36px", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "12px" }}>
          Bokning mottagen!
        </h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 32px" }}>
          En bekräftelse har skickats till <strong style={{ color: "#fff" }}>{form.email}</strong>. Vi ses {form.datum} kl. {form.tid}!
        </p>
        <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", padding: "16px 24px", display: "inline-block" }}>
          <p style={{ color: "rgba(34,197,94,0.9)", fontSize: "13px", fontWeight: 600, margin: 0 }}>
            ✓ {form.tjanst} · {form.datum} · kl. {form.tid}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", padding: "48px", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(220,50,25,0.8), transparent)" }} />

      {/* Rubrik */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div style={{ width: "30px", height: "1px", background: "rgba(220,50,25,0.7)" }} />
          <span style={{ color: "rgba(220,50,25,0.9)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Bokningsformulär</span>
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "40px", fontWeight: 900, color: "#fff", textTransform: "uppercase", margin: "0 0 6px" }}>Boka din tid</h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px", margin: 0 }}>Bekräftelse skickas direkt till din email.</p>
      </div>

      {/* Steg 1 — Tjänst */}
      <div style={{ marginBottom: "28px" }}>
        <label style={labelStyle}>1. Välj tjänst</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {TJANSTER.map((t) => (
            <motion.button
              key={t.label}
              whileTap={{ scale: 0.97 }}
              onClick={() => uppdatera("tjanst", t.label)}
              style={{
                background: form.tjanst === t.label ? "rgba(220,50,25,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${form.tjanst === t.label ? "rgba(220,50,25,0.6)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "8px", padding: "14px 10px", cursor: "pointer",
                textAlign: "center", transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>{t.icon}</div>
              <div style={{ color: form.tjanst === t.label ? "#fff" : "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>{t.label}</div>
              <div style={{ color: form.tjanst === t.label ? "rgba(220,50,25,0.9)" : "rgba(255,255,255,0.25)", fontSize: "11px", marginTop: "2px" }}>{t.pris}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Steg 2 — Datum & tid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
        <div>
          <label style={labelStyle}>2. Välj datum</label>
          <input
            type="date"
            value={form.datum}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => uppdatera("datum", e.target.value)}
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,25,0.6)"}
            onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
          />
        </div>
        <div>
          <label style={labelStyle}>3. Välj tid</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
            {TIDER.map((t) => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.95 }}
                onClick={() => uppdatera("tid", t)}
                style={{
                  background: form.tid === t ? "rgba(220,50,25,0.2)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${form.tid === t ? "rgba(220,50,25,0.6)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "6px", padding: "8px 4px",
                  color: form.tid === t ? "#fff" : "rgba(255,255,255,0.5)",
                  fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                }}
              >{t}</motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Steg 3 — Kontaktuppgifter */}
      <div style={{ marginBottom: "28px" }}>
        <label style={labelStyle}>4. Dina uppgifter</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { falt: "namn", placeholder: "Fullständigt namn", type: "text" },
            { falt: "telefon", placeholder: "Telefonnummer", type: "tel" },
            { falt: "email", placeholder: "Email-adress", type: "email" },
            { falt: "regnr", placeholder: "Registreringsnummer (ABC 123)", type: "text" },
          ].map(({ falt, placeholder, type }) => (
            <input
              key={falt}
              type={type}
              placeholder={placeholder}
              value={form[falt as keyof typeof form]}
              onChange={(e) => uppdatera(falt, e.target.value)}
              style={{ ...inputStyle, width: "100%" }}
              onFocus={e => e.currentTarget.style.borderColor = "rgba(220,50,25,0.6)"}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          ))}
        </div>
      </div>

      {/* Felmeddelande */}
      {felmeddelande && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: "rgba(220,50,25,0.9)", fontSize: "13px", marginBottom: "16px" }}
        >
          ⚠ {felmeddelande}
        </motion.p>
      )}

      {/* Sammanfattning */}
      {form.tjanst && form.datum && form.tid && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: "rgba(220,50,25,0.06)", border: "1px solid rgba(220,50,25,0.2)", borderRadius: "8px", padding: "14px 18px", marginBottom: "20px", display: "flex", gap: "16px", flexWrap: "wrap" }}
        >
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>📋 Sammanfattning:</span>
          <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>{form.tjanst}</span>
          <span style={{ color: "rgba(220,50,25,0.8)", fontSize: "12px" }}>📅 {form.datum}</span>
          <span style={{ color: "rgba(220,50,25,0.8)", fontSize: "12px" }}>🕐 kl. {form.tid}</span>
        </motion.div>
      )}

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(220,50,25,0.4)" }}
        whileTap={{ scale: 0.98 }}
        onClick={skicka}
        disabled={status === "loading"}
        style={{
          width: "100%", background: status === "loading" ? "rgba(220,50,25,0.5)" : "rgba(220,50,25,0.9)",
          color: "#fff", border: "none", borderRadius: "6px", padding: "16px",
          fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "Skickar bokning..." : "Bekräfta bokning →"}
      </motion.button>

      {status === "error" && (
        <p style={{ color: "rgba(220,50,25,0.9)", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>
          Något gick fel. Försök igen eller ring oss på 031-000 00 00.
        </p>
      )}
    </motion.div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", color: "rgba(255,255,255,0.4)",
  fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
  textTransform: "uppercase", marginBottom: "10px",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px", padding: "12px 16px", color: "#fff", fontSize: "14px",
  outline: "none", transition: "border-color 0.2s", colorScheme: "dark" as const,
  width: "100%",
};