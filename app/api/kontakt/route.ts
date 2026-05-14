import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { namn, email, meddelande } = await req.json();

    if (!namn || !email || !meddelande) {
      return NextResponse.json({ error: "Alla fält måste fyllas i" }, { status: 400 });
    }

    await resend.emails.send({
      from: "IronDäck Kontakt <no-reply@dindoman.se>",
      to: "info@irondack.se", // Byt till din riktiga email
      replyTo: email,
      subject: `Nytt meddelande från ${namn}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #fff; border-radius: 10px; overflow: hidden; border: 1px solid rgba(220,50,25,0.3);">
          <div style="background: #dc3219; padding: 24px 32px;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.05em;">✉️ NYTT KONTAKTMEDDELANDE</h2>
          </div>
          <div style="padding: 32px;">
            <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0 0 24px;">Du har fått ett nytt meddelande via kontaktformuläret på IronDäck.se</p>
            
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0 0 4px;">Från</p>
              <p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0 0 16px;">${namn}</p>
              
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0 0 4px;">Email</p>
              <p style="color: #fff; font-size: 14px; margin: 0 0 16px;">${email}</p>
              
              <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0 0 8px;">Meddelande</p>
              <p style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${meddelande}</p>
            </div>
            
            <div style="text-align: center; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06);">
              <a href="mailto:${email}" style="display: inline-block; background: #dc3219; color: #fff; padding: 12px 28px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none; letter-spacing: 0.05em;">SVARA</a>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Kunde inte skicka mejl" }, { status: 500 });
  }
}