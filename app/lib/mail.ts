// Gemensamt för e-postmallar (Resend).

export const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

/** Avsändare — byt till egen verifierad domän i Vercel: RESEND_FROM="IronDäck <boka@irondack.se>" */
export const FROM = process.env.RESEND_FROM || "IronDäck <onboarding@resend.dev>";
/** Mottagare av nya bokningar/meddelanden */
export const AGARE = process.env.OWNER_EMAIL || "lenn.soder@protonmail.com";

export function mall(rubrik: string, ingress: string, rader: [string, string][], fot = "") {
  return `
  <div style="background:#0a0a0b;padding:32px 12px;font-family:'Helvetica Neue',Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#111113;border:1px solid #26262a;border-radius:14px;overflow:hidden;color:#f3efe9">
      <div style="height:4px;background:linear-gradient(90deg,#e2401f,#ff6b2c,#ffad4a)"></div>
      <div style="padding:30px 34px 10px">
        <div style="font-size:24px;font-weight:900;letter-spacing:.06em;text-transform:uppercase">Iron<span style="color:#ff6b2c">Däck</span></div>
        <div style="font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#8a8780;margin-top:4px">Däckverkstad · Göteborg</div>
      </div>
      <div style="padding:20px 34px 6px">
        <div style="font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#ff6b2c">${esc(rubrik)}</div>
        <p style="font-size:15px;line-height:1.7;color:#cfcac2;margin:10px 0 22px">${ingress}</p>
        <table style="width:100%;border-collapse:collapse;background:#17171a;border:1px solid #26262a;border-radius:10px">
          ${rader.map(([k, v], i) => `
            <tr>
              <td style="padding:13px 18px;font-size:13px;color:#8a8780;${i ? "border-top:1px solid #26262a;" : ""}">${esc(k)}</td>
              <td style="padding:13px 18px;font-size:14px;font-weight:700;text-align:right;${i ? "border-top:1px solid #26262a;" : ""}">${esc(v)}</td>
            </tr>`).join("")}
        </table>
        ${fot}
      </div>
      <div style="padding:22px 34px;border-top:1px solid #26262a;margin-top:26px;font-size:11px;color:#6b6862;letter-spacing:.08em">
        IronDäck · Hisingsbacka 12, 417 55 Göteborg · 031-123 45 67
      </div>
    </div>
  </div>`;
}
