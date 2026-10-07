import { createBrowserClient } from "@supabase/ssr";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true när riktiga Supabase-nycklar finns i .env.local / Vercel */
export const supabaseKonfigurerad = Boolean(URL && KEY && URL.startsWith("http"));

export function createClient() {
  // Platshållare så att sajten inte kraschar i demoläge utan nycklar
  return createBrowserClient(
    supabaseKonfigurerad ? URL! : "https://placeholder.supabase.co",
    supabaseKonfigurerad ? KEY! : "placeholder-anon-key"
  );
}
