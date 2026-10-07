"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, supabaseKonfigurerad } from "@/utils/supabase";
import { setDemo } from "../lib/demo";
import { useAuth } from "../lib/useAuth";
import { IconArrow, IconShield, IconUser } from "../components/icons";

type Flik = "login" | "register";

export default function Medlem() {
  const router = useRouter();
  const { user, klar } = useAuth();
  const [flik, setFlik] = useState<Flik>("login");
  const [namn, setNamn] = useState("");
  const [email, setEmail] = useState("");
  const [losen, setLosen] = useState("");
  const [loading, setLoading] = useState(false);
  const [fel, setFel] = useState("");
  const [ok, setOk] = useState("");

  // Läs ?flik=registrera från adressfältet
  useEffect(() => {
    const las = () => { if (new URLSearchParams(window.location.search).get("flik") === "registrera") setFlik("register"); };
    las();
  }, []);

  useEffect(() => {
    if (klar && user) router.replace(user.admin ? "/admin" : "/konto");
  }, [klar, user, router]);

  const byt = (f: Flik) => { setFlik(f); setFel(""); setOk(""); };

  const skicka = async (e: React.FormEvent) => {
    e.preventDefault();
    setFel(""); setOk("");
    if (!email || !losen || (flik === "register" && !namn)) return setFel("Fyll i alla fält.");
    if (losen.length < 6) return setFel("Lösenordet måste vara minst 6 tecken.");
    if (!supabaseKonfigurerad) return setFel("Inloggning är inte kopplad ännu (Supabase saknas). Testa demokontot nedan!");
    setLoading(true);
    const sb = createClient();
    if (flik === "login") {
      const { error } = await sb.auth.signInWithPassword({ email, password: losen });
      if (error) setFel("Fel e-post eller lösenord.");
      else router.push("/konto");
    } else {
      const { error } = await sb.auth.signUp({ email, password: losen, options: { data: { full_name: namn } } });
      if (error) setFel(error.message);
      else setOk("Konto skapat! Kolla din e-post för att bekräfta.");
    }
    setLoading(false);
  };

  const demo = (roll: "kund" | "admin") => {
    setDemo(roll);
    router.push(roll === "admin" ? "/admin" : "/konto");
  };

  return (
    <main className="auth">
      <div className="auth-media">
        <Image src="/images/hotel.webp" alt="" fill priority sizes="55vw" />
        <div className="auth-quote">
          <span className="eyebrow">Mina sidor</span>
          <h2 className="h-display h2" style={{ margin: "16px 0 14px" }}>Ditt garage.<br /><span className="ember-grad">Alltid öppet.</span></h2>
          <ul className="checklist">
            <li>Se och boka om dina tider</li>
            <li>Mönsterdjup och hyllplats för dina däck i hotellet</li>
            <li>Alla dina bilar och däckdimensioner på ett ställe</li>
          </ul>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-box" style={{ animation: "fadeUp .8s var(--ease) both" }}>
          <h1 className="h-display" style={{ fontSize: 52, lineHeight: 0.95, marginBottom: 10 }}>
            {flik === "login" ? <>Välkommen <span className="ember">tillbaka</span></> : <>Skapa <span className="ember">konto</span></>}
          </h1>
          <p className="dim" style={{ marginBottom: 28 }}>
            {flik === "login" ? "Logga in för att se bokningar, garage och däckhotell." : "Det tar 20 sekunder. Sen sparas dina bilar och bokningar."}
          </p>

          <div className="tabs" style={{ marginBottom: 24, width: "100%" }}>
            {(["login", "register"] as Flik[]).map((f) => (
              <button key={f} type="button" aria-pressed={flik === f} onClick={() => byt(f)} style={{ flex: 1 }}>
                {f === "login" ? "Logga in" : "Skapa konto"}
              </button>
            ))}
          </div>

          <form onSubmit={skicka} noValidate style={{ display: "grid", gap: 14 }}>
            {flik === "register" && (
              <div><label className="label" htmlFor="m-namn">Namn</label><input id="m-namn" className="input" autoComplete="name" value={namn} onChange={(e) => setNamn(e.target.value)} placeholder="Anders Svensson" /></div>
            )}
            <div><label className="label" htmlFor="m-mail">E-post</label><input id="m-mail" className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="anders@exempel.se" /></div>
            <div><label className="label" htmlFor="m-pw">Lösenord</label><input id="m-pw" className="input" type="password" autoComplete={flik === "login" ? "current-password" : "new-password"} value={losen} onChange={(e) => setLosen(e.target.value)} placeholder="••••••••" /></div>
            {fel && <p className="alert alert-bad" role="alert">{fel}</p>}
            {ok && <p className="alert alert-ok" role="status">{ok}</p>}
            <button className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: 6 }}>
              {loading ? "Vänta…" : <>{flik === "login" ? "Logga in" : "Skapa konto"} <IconArrow /></>}
            </button>
          </form>

          <div className="divider">eller testa direkt</div>

          <div className="grid g2" style={{ gap: 10 }}>
            <button type="button" className="btn btn-ghost" onClick={() => demo("kund")}><IconUser size={16} /> Demokund</button>
            <button type="button" className="btn btn-ghost" onClick={() => demo("admin")}><IconShield size={16} /> Demo-admin</button>
          </div>
          <p className="small muted" style={{ marginTop: 14, textAlign: "center" }}>Demokonton visar exempeldata — inget sparas.</p>
        </div>
      </div>
    </main>
  );
}
