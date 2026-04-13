import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { namn, telefon, email, regnr, tjanst, datum, tid } = await req.json();

    if (!namn || !telefon || !email || !regnr || !tjanst || !datum || !tid) {
      return NextResponse.json({ error: "Alla fält måste fyllas i." }, { status: 400 });
    }

    // Email till kunden
    await resend.emails.send({
      from: "NordDäck <no-reply@dindoman.se>",
      to: email,
      subject: `Bokningsbekräftelse — ${tjanst} ${datum} kl. ${tid}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #ffffff; border-radius: 12px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a0a0a 0%, #0d0d0d 100%); padding: 40px 40px 30px; border-bottom: 2px solid #dc3219;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 28px;">🛞</span>
              <span style="font-size: 22px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; color: #ffffff;">NordDäck<span style="color: #dc3219;">.</span></span>
            </div>
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">Göteborg — Est. 2009</p>
          </div>

          <!-- Bekräftelse-badge -->
          <div style="background: rgba(220,50,25,0.1); border-left: 3px solid #dc3219; padding: 20px 40px; margin: 0;">
            <p style="color: #dc3219; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 4px;">Bokning bekräftad</p>
            <p style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">${tjanst}</p>
          </div>

          <!-- Detaljer -->
          <div style="padding: 32px 40px;">
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0 0 24px; line-height: 1.6;">Hej ${namn}! Din bokning är bekräftad. Vi ses på verkstaden — kom gärna 5 minuter innan din tid.</p>

            <!-- Info-kort -->
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
              ${[
          ["📅 Datum", datum],
          ["🕐 Tid", `kl. ${tid}`],
          ["⚙ Tjänst", tjanst],
          ["🚗 Registreringsnr", regnr],
          ["📞 Telefon", telefon],
        ].map(([label, value], i) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; ${i > 0 ? "border-top: 1px solid rgba(255,255,255,0.06);" : ""}">
                  <span style="color: rgba(255,255,255,0.4); font-size: 13px;">${label}</span>
                  <span style="color: #ffffff; font-size: 13px; font-weight: 600;">${value}</span>
                </div>
              `).join("")}
            </div>

            <!-- Info-text -->
            <div style="background: rgba(220,50,25,0.06); border-radius: 8px; padding: 16px 20px; margin-bottom: 32px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 12px; line-height: 1.7; margin: 0;">
                📍 <strong style="color: rgba(255,255,255,0.7);">Adress:</strong> Verkstadsgatan 12, 41234 Göteborg<br>
                📞 <strong style="color: rgba(255,255,255,0.7);">Tel:</strong> 031-000 00 00<br>
                🕐 <strong style="color: rgba(255,255,255,0.7);">Öppettider:</strong> Mån–Fre 07:00–18:00, Lör 08:00–14:00
              </p>
            </div>

            <!-- CTA -->
            <div style="text-align: center;">
              <a href="mailto:info@norddack.se" style="display: inline-block; background: #dc3219; color: #ffffff; padding: 14px 32px; border-radius: 6px; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;">Kontakta oss</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding: 20px 40px; text-align: center;">
            <p style="color: rgba(255,255,255,0.2); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0;">NordDäck Göteborg · norddack.se</p>
          </div>
        </div>
      `,
    });

    // Email till ägaren
    await resend.emails.send({
      from: "NordDäck Bokningar <no-reply@dindoman.se>",
      to: "din@email.se",
      subject: `🛞 Ny bokning — ${namn} · ${tjanst} ${datum} kl. ${tid}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0d0d0d; color: #fff; border-radius: 10px; overflow: hidden; border: 1px solid rgba(220,50,25,0.3);">
          <div style="background: #dc3219; padding: 20px 28px;">
            <h2 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.05em;">🛞 NY BOKNING</h2>
          </div>
          <div style="padding: 28px;">
            ${[
          ["Namn", namn],
          ["Telefon", telefon],
          ["Email", email],
          ["Regnr", regnr],
          ["Tjänst", tjanst],
          ["Datum", datum],
          ["Tid", `kl. ${tid}`],
        ].map(([label, value]) => `
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07);">
                <span style="color: rgba(255,255,255,0.4); font-size: 13px;">${label}</span>
                <span style="color: #fff; font-size: 13px; font-weight: 600;">${value}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Något gick fel. Försök igen." }, { status: 500 });
  }
}