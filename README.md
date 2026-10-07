# IronDäck — däckverkstad (Next.js 16)

Demo-sajt för en däckverkstad i Göteborg: startsida med bokning, sex tjänstesidor, priser, om oss, kontakt, Mina sidor (kund) och adminpanel.

## Kom igång

```bash
npm install
npm run dev
```

Öppna http://localhost:3000. **Allt fungerar utan nycklar** i demoläge:

- Bokning och kontaktformulär visar "Demoläge — inget mejl skickades".
- `/medlem` → **Demokund** eller **Demo-admin** loggar in med exempeldata (sessionStorage, försvinner när fliken stängs).

## Koppla på riktigt

1. Kopiera `.env.example` → `.env.local` och fyll i.
2. Kör `supabase/schema.sql` i Supabase SQL Editor.
3. Lägg samma variabler i Vercel → Settings → Environment Variables.
4. Verifiera en domän i Resend och sätt `RESEND_FROM` — annars kommer bara mejlet till ägaren fram, inte kundens bekräftelse.

## Var ändrar jag saker?

| Vad | Fil |
| --- | --- |
| Namn, adress, telefon, öppettider, priser, tjänster, FAQ, team | `app/lib/data.ts` |
| Färger, typsnitt, animationer | `app/globals.css` (variabler överst) |
| Bilder | `public/images/*.webp` |
| Admin-e-post | `ADMIN_EMAIL` i `app/lib/data.ts` + policies i `supabase/schema.sql` |
| E-postmallar | `app/lib/mail.ts` |

Tjänstesidorna (`/tjanster/dackbyte` osv.) genereras alla från `app/tjanster/[slug]/page.tsx` + datan i `data.ts`.

Förval i bokningen: länka till `/?tjanst=dackbyte#boka`.

---
Skapad av [SweGBG](https://swegbg.com)
