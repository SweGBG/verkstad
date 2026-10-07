// Demoläge — gör att inloggning, medlemssida och admin går att visa för
// kunder även utan Supabase. Flaggan ligger i sessionStorage och försvinner
// när fliken stängs.

export const DEMO_KEY = "irondack-demo";
export type DemoRoll = "kund" | "admin";

export const DEMO_ANVANDARE = {
  kund: { email: "demo@irondack.se", namn: "Anna Demo" },
  admin: { email: "admin@irondack.se", namn: "Erik Lindqvist" },
};

export function getDemo(): DemoRoll | null {
  try {
    const v = sessionStorage.getItem(DEMO_KEY);
    return v === "kund" || v === "admin" ? v : null;
  } catch {
    return null;
  }
}

export function setDemo(roll: DemoRoll | null) {
  try {
    if (roll) sessionStorage.setItem(DEMO_KEY, roll);
    else sessionStorage.removeItem(DEMO_KEY);
    window.dispatchEvent(new Event("irondack-auth"));
  } catch {}
}

const idag = new Date();
const dag = (offset: number) => {
  const d = new Date(idag);
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
};

export type Bokning = {
  id: string;
  namn: string;
  email: string;
  telefon: string;
  tjanst: string;
  datum: string;
  tid: string;
  regnr: string;
  status: string;
  created_at: string;
};

export const DEMO_BOKNINGAR: Bokning[] = [
  { id: "d1", namn: "Anna Demo", email: "demo@irondack.se", telefon: "070-123 45 67", tjanst: "Däckbyte", datum: dag(3), tid: "09:00", regnr: "ABC 123", status: "bekräftad", created_at: dag(-1) },
  { id: "d2", namn: "Anna Demo", email: "demo@irondack.se", telefon: "070-123 45 67", tjanst: "Hjulinställning", datum: dag(3), tid: "10:00", regnr: "ABC 123", status: "väntar", created_at: dag(-1) },
  { id: "d3", namn: "Anna Demo", email: "demo@irondack.se", telefon: "070-123 45 67", tjanst: "Däckbyte", datum: dag(-160), tid: "08:00", regnr: "ABC 123", status: "genomförd", created_at: dag(-170) },
  { id: "d4", namn: "Anna Demo", email: "demo@irondack.se", telefon: "070-123 45 67", tjanst: "Oljebyte", datum: dag(-210), tid: "14:00", regnr: "XYZ 789", status: "genomförd", created_at: dag(-215) },
];

export const DEMO_ALLA_BOKNINGAR: Bokning[] = [
  ...DEMO_BOKNINGAR.slice(0, 2),
  { id: "a1", namn: "Mikael Ek", email: "mikael@exempel.se", telefon: "073-555 12 12", tjanst: "Däckbyte", datum: dag(0), tid: "08:00", regnr: "MLK 404", status: "bekräftad", created_at: dag(-2) },
  { id: "a2", namn: "Leila Haddad", email: "leila@exempel.se", telefon: "076-222 33 44", tjanst: "Bromskontroll", datum: dag(0), tid: "11:00", regnr: "GBG 031", status: "väntar", created_at: dag(-1) },
  { id: "a3", namn: "Per Holm", email: "per@exempel.se", telefon: "070-987 65 43", tjanst: "Däckhotell", datum: dag(1), tid: "13:00", regnr: "HLM 552", status: "väntar", created_at: dag(0) },
  { id: "a4", namn: "Sofia Berg", email: "sofia@exempel.se", telefon: "072-111 22 33", tjanst: "Oljebyte", datum: dag(2), tid: "15:00", regnr: "SOF 118", status: "bekräftad", created_at: dag(-3) },
  { id: "a5", namn: "Tomas Nyberg", email: "tomas@exempel.se", telefon: "070-444 55 66", tjanst: "Däckbyte", datum: dag(-1), tid: "16:00", regnr: "TNB 900", status: "avbokad", created_at: dag(-6) },
];

export const DEMO_FORDON = [
  { regnr: "ABC 123", modell: "Volvo V60 D4", ar: 2019, dimension: "225/50 R17" },
  { regnr: "XYZ 789", modell: "VW Golf 1.5 TSI", ar: 2021, dimension: "205/55 R16" },
];

export const DEMO_DACKSET = [
  { regnr: "ABC 123", sasong: "Sommar", marke: "Michelin Primacy 4", monster: 5.8, hylla: "B-14", status: "I förvar" },
  { regnr: "ABC 123", sasong: "Vinter", marke: "Nokian Hakkapeliitta R5", monster: 7.2, hylla: "—", status: "Monterat" },
  { regnr: "XYZ 789", sasong: "Vinter", marke: "Continental VikingContact 7", monster: 3.4, hylla: "D-03", status: "I förvar" },
];
