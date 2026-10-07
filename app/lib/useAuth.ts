"use client";
import { useEffect, useState } from "react";
import { createClient, supabaseKonfigurerad } from "@/utils/supabase";
import { ADMIN_EMAIL } from "./data";
import { DEMO_ANVANDARE, getDemo, setDemo, type DemoRoll } from "./demo";

export type Anvandare = {
  email: string;
  namn: string;
  demo: DemoRoll | null;
  admin: boolean;
};

/** Inloggad användare — riktig Supabase-session eller demokonto. */
export function useAuth() {
  const [user, setUser] = useState<Anvandare | null>(null);
  const [klar, setKlar] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let aktiv = true;

    const las = async () => {
      const demo = getDemo();
      if (demo) {
        const d = DEMO_ANVANDARE[demo];
        if (aktiv) {
          setUser({ email: d.email, namn: d.namn, demo, admin: demo === "admin" });
          setKlar(true);
        }
        return;
      }
      if (!supabaseKonfigurerad) {
        if (aktiv) { setUser(null); setKlar(true); }
        return;
      }
      try {
        const { data } = await supabase.auth.getUser();
        const u = data.user;
        if (aktiv) {
          setUser(u ? {
            email: u.email ?? "",
            namn: (u.user_metadata?.full_name as string) || u.email?.split("@")[0] || "",
            demo: null,
            admin: u.email === ADMIN_EMAIL,
          } : null);
        }
      } catch {
        if (aktiv) setUser(null);
      }
      if (aktiv) setKlar(true);
    };

    las();
    window.addEventListener("irondack-auth", las);
    const sub = supabaseKonfigurerad ? supabase.auth.onAuthStateChange(() => las()) : null;
    return () => {
      aktiv = false;
      window.removeEventListener("irondack-auth", las);
      sub?.data.subscription.unsubscribe();
    };
  }, []);

  const loggaUt = async () => {
    if (getDemo()) setDemo(null);
    else if (supabaseKonfigurerad) await createClient().auth.signOut();
    setUser(null);
    window.dispatchEvent(new Event("irondack-auth"));
  };

  return { user, klar, loggaUt };
}
