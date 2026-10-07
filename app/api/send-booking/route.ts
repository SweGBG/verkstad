import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { AGARE, FROM, esc, mall } from "../../lib/mail";

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }
  const { namn, telefon, email, regnr, tjanst, datum, tid, meddelande = "" } = body;

  if (!namn || !telefon || !email || !regnr || !tjanst || !datum || !tid) {
    return NextResponse.json({ error: "Alla fält måste fyllas i." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Ogiltig e-postadress." }, { status: 400 });
  }

  // 1) Spara i Supabase (om konfigurerat) så den syns under Mina sidor + Admin
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url?.startsWith("http") && key) {
    try {
      const sb = createClient(url, key, { auth: { persistSession: false } });
      const { error } = await sb.from("bookings").insert({ namn, telefon, email, regnr, tjanst, datum, tid, status: "väntar" });
      if (error) console.error("Supabase insert:", error.message);
    } catch (e) {
      console.error("Supabase insert:", e);
    }
  }

  // 2) Demoläge — ingen Resend-nyckel satt
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY saknas — bokningen kördes i demoläge utan mejl.");
    return NextResponse.json({ success: true, demo: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const rader: [string, string][] = [
    ["Tjänst", tjanst],
    ["Datum", datum],
    ["Tid", `kl. ${tid}`],
    ["Reg.nr", regnr],
    ["Telefon", telefon],
  ];

  // Mejl till verkstaden — måste lyckas
  const agare = await resend.emails.send({
    from: FROM,
    to: AGARE,
    replyTo: email,
    subject: `Ny bokning — ${namn} · ${tjanst} ${datum} kl. ${tid}`,
    html: mall("Ny bokning", `<strong style="color:#fff">${esc(namn)}</strong> (${esc(email)}) har bokat en tid.${meddelande ? `<br><br><em>”${esc(meddelande)}”</em>` : ""}`, rader),
  });
  if (agare.error) {
    console.error("Resend (ägare):", agare.error);
    return NextResponse.json({ error: "Kunde inte skicka bokningen. Ring oss på 031-123 45 67." }, { status: 502 });
  }

  // Bekräftelse till kunden — kräver verifierad domän i Resend.
  // Misslyckas den loggas felet men bokningen räknas ändå som mottagen.
  const kund = await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Bokningsbekräftelse — ${tjanst} ${datum} kl. ${tid}`,
    html: mall(
      "Bokning mottagen",
      `Hej ${esc(namn.split(" ")[0])}! Tack för din bokning. Kom gärna 5 minuter innan din tid — vi har kaffe på.`,
      rader,
      `<p style="font-size:13px;color:#8a8780;margin-top:18px;line-height:1.6">Behöver du boka om? Svara på det här mejlet eller ring 031-123 45 67. Gratis avbokning upp till 24 h innan.</p>`
    ),
  });
  if (kund.error) console.error("Resend (kund):", kund.error);

  return NextResponse.json({ success: true });
}
