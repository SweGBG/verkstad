import { NextResponse } from "next/server";
import { Resend } from "resend";
import { AGARE, FROM, esc, mall } from "../../lib/mail";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }
  const { namn, email, telefon = "", amne = "Allmän fråga", meddelande } = body;

  if (!namn || !email || !meddelande) {
    return NextResponse.json({ error: "Fyll i namn, e-post och meddelande." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Ogiltig e-postadress." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY saknas — kontaktformuläret kördes i demoläge.");
    return NextResponse.json({ success: true, demo: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM,
    to: AGARE,
    replyTo: email,
    subject: `Nytt meddelande från ${namn} — ${amne}`,
    html: mall(
      "Nytt kontaktmeddelande",
      `<span style="white-space:pre-wrap">${esc(meddelande)}</span>`,
      [["Från", namn], ["E-post", email], ["Telefon", telefon || "—"], ["Ämne", amne]]
    ),
  });

  if (error) {
    console.error("Resend:", error);
    return NextResponse.json({ error: "Kunde inte skicka meddelandet. Försök igen eller ring oss." }, { status: 502 });
  }
  return NextResponse.json({ success: true });
}
