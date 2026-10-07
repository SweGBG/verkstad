// IronDäck — all innehållsdata på ett ställe.
// Byt namn, priser, adress m.m. här så uppdateras hela sajten.

export const FORETAG = {
  namn: "IronDäck",
  ort: "Göteborg",
  adress: "Hisingsbacka 12, 417 55 Göteborg",
  telefon: "031-123 45 67",
  telefonHref: "tel:+46311234567",
  email: "info@irondack.se",
  oppettider: [
    { dag: "Mån–Fre", tid: "07:00–18:00" },
    { dag: "Lördag", tid: "08:00–14:00" },
    { dag: "Söndag", tid: "Stängt" },
  ],
  grundat: 2026,
};

export type Pris = { namn: string; spec: string; pris: string; badge?: string };

export type Tjanst = {
  slug: string;
  titel: string;
  /** Rubriken delas i två — andra delen blir röd */
  rubrik: [string, string];
  tid: string;
  fran: string;
  kort: string;
  lang: string;
  bild: string;
  ikon: IkonNamn;
  priser: Pris[];
  ingar: string[];
  fotnot?: string;
  cta: string;
};

export type IkonNamn = "dack" | "hotell" | "olja" | "inst" | "broms" | "tryck";

export const TJANSTER: Tjanst[] = [
  {
    slug: "dackbyte",
    titel: "Däckbyte",
    rubrik: ["Däck", "byte"],
    tid: "30 min",
    fran: "från 595 kr",
    kort: "Sommar & vinter. Balansering och momentdragning ingår — klart samma dag.",
    lang: "Vi byter dina däck snabbt och säkert — sommar som vinter. Med rätt däck på bilen minskar du risken för olyckor och sparar bränsle. Hos IronDäck är du klar på 30 minuter.",
    bild: "/images/mount.webp",
    ikon: "dack",
    priser: [
      { namn: "Liten bil", spec: "Toyota Yaris, VW Polo", pris: "595 kr" },
      { namn: "Mellanstor bil", spec: "Volvo V60, Toyota RAV4", pris: "695 kr", badge: "Vanligast" },
      { namn: "Stor bil / SUV", spec: "Volvo XC90, BMW X5", pris: "795 kr" },
    ],
    ingar: [
      "Avmontering av gamla däck",
      "Montering av nya däck",
      "Balansering av alla hjul",
      "Kontroll av lufttryck",
      "Kontroll av bromsar & bromsskivor",
      "Åtdragning med momentnyckel",
    ],
    fotnot: "Priset gäller montering av medhavda däck. Däck kan köpas separat.",
    cta: "Boka däckbyte",
  },
  {
    slug: "dackhotell",
    titel: "Däckhotell",
    rubrik: ["Däck", "hotell"],
    tid: "Helårspris",
    fran: "från 495 kr/år",
    kort: "Vi förvarar, kontrollerar och tvättar dina däck mellan säsongerna.",
    lang: "Slipp krånglet med att förvara däcken hemma. Vi lagrar dina däck i rätt temperatur och fuktighet hela året. På säsongsskiftet hämtar vi fram dem, monterar och du kör vidare.",
    bild: "/images/hotel.webp",
    ikon: "hotell",
    priser: [
      { namn: "Personbil", spec: "Upp till 17\"", pris: "495 kr/år" },
      { namn: "SUV / Crossover", spec: "18\" – 20\"", pris: "595 kr/år" },
      { namn: "Skiftbyte ingår", spec: "Boka & glöm", pris: "795 kr/år", badge: "Bäst värde" },
    ],
    ingar: [
      "Lagring i klimatkontrollerat utrymme",
      "Märkning av dina däck",
      "Kontroll av skick vid inlämning",
      "SMS-påminnelse vid säsongsskifte",
      "Hämtning & montering ingår i helårspris",
      "Försäkring mot stöld & brand",
    ],
    cta: "Boka däckhotell",
  },
  {
    slug: "oljebyte",
    titel: "Oljebyte",
    rubrik: ["Olje", "byte"],
    tid: "45 min",
    fran: "från 795 kr",
    kort: "Rätt olja och nytt filter för just din motor. Vi kollar läckage och nivåer.",
    lang: "Regelbundet oljebyte är det bästa du kan göra för din motor. Vi använder rätt olja för just din bil och kontrollerar filter, nivåer och läckage — allt på 45 minuter.",
    bild: "/images/hero.webp",
    ikon: "olja",
    priser: [
      { namn: "Mineralolja", spec: "Äldre bensinmotorer", pris: "795 kr" },
      { namn: "Halvsyntetisk", spec: "Diesel & bensin", pris: "995 kr", badge: "Populär" },
      { namn: "Helsyntetisk", spec: "Moderna motorer", pris: "1 295 kr" },
    ],
    ingar: [
      "Tömning av gammal olja",
      "Byte av oljefilter",
      "Påfyllning av rätt olja",
      "Kontroll av övriga vätskenivåer",
      "Kontroll av eventuella läckage",
      "Servicepåminnelse sätts in i bilen",
    ],
    fotnot: "Olja & filter ingår i priset.",
    cta: "Boka oljebyte",
  },
  {
    slug: "hjulinstallning",
    titel: "Hjulinställning",
    rubrik: ["Hjul", "inställning"],
    tid: "60 min",
    fran: "från 695 kr",
    kort: "Lasermätning av toe, camber & caster. Jämnare slitage och rakare gång.",
    lang: "Felaktig hjulinställning sliter ojämnt på dina däck och ökar bränsleförbrukningen. Med rätt inställning förbättras körkomforten och du sparar pengar på däck och bränsle i längden.",
    bild: "/images/hero.webp",
    ikon: "inst",
    priser: [
      { namn: "2-hjulsinställning", spec: "Framaxel", pris: "695 kr" },
      { namn: "4-hjulsinställning", spec: "Alla hjul", pris: "995 kr", badge: "Rekommenderad" },
    ],
    ingar: [
      "Mätning med laserprecision",
      "Justering av toe, camber & caster",
      "Kontroll av styrled & kulleder",
      "Provkörning efter justering",
      "Utskrift av mätprotokoll",
      "Råd om däckslitage",
    ],
    cta: "Boka hjulinställning",
  },
  {
    slug: "bromskontroll",
    titel: "Bromskontroll",
    rubrik: ["Broms", "kontroll"],
    tid: "30 min",
    fran: "från 395 kr",
    kort: "Belägg, skivor, vätska och bromsok — med ett ärligt besked och offert.",
    lang: "Bromsar är din bils viktigaste säkerhetssystem. Vi kontrollerar belägg, skivor, bromsvätska och bromsok — och ger dig ett ärligt besked om vad som behöver åtgärdas.",
    bild: "/images/mount.webp",
    ikon: "broms",
    priser: [
      { namn: "Kontroll", spec: "Inspektion & rapport", pris: "395 kr" },
      { namn: "Bromsbelägg", spec: "Per axel inkl. arbete", pris: "1 495 kr" },
      { namn: "Bromsskivor", spec: "Per axel inkl. belägg", pris: "2 495 kr" },
    ],
    ingar: [
      "Mätning av bromsbeläggstjocklek",
      "Kontroll av bromsskivornas skick",
      "Kontroll av bromsvätska",
      "Kontroll av bromsok & ledningar",
      "Skriftlig rapport med rekommendationer",
      "Prisoffert på eventuella åtgärder",
    ],
    cta: "Boka bromskontroll",
  },
  {
    slug: "dacktryckstest",
    titel: "Däcktryckstest",
    rubrik: ["Däck", "tryck"],
    tid: "15 min",
    fran: "Gratis",
    kort: "Rätt tryck sparar bränsle och däck. Alltid gratis — kör in direkt.",
    lang: "Rätt däcktryck sparar bränsle, minskar däckslitage och förbättrar stabiliteten. Vi kontrollerar och justerar trycket på alla fyra hjul — alltid gratis, oavsett om du är kund eller bara kör förbi.",
    bild: "/images/hotel.webp",
    ikon: "tryck",
    priser: [{ namn: "Komplett kontroll", spec: "Alla 4 hjul + reserv", pris: "Gratis" }],
    ingar: [
      "Kontroll av alla 4 hjul",
      "Justering till rekommenderat tryck",
      "Kontroll av reservhjul",
      "Råd om mönsterdjup",
      "Snabbt — klart på 15 minuter",
      "Ingen bokning krävs",
    ],
    cta: "Kör in direkt",
  },
];

export const getTjanst = (slug: string) => TJANSTER.find((t) => t.slug === slug);

export const STATS = [
  { num: 4.9, suffix: "★", decimaler: 1, label: "Google-betyg" },
  { num: 30, suffix: " min", decimaler: 0, label: "Snittid däckbyte" },
  { num: 1200, suffix: "+", decimaler: 0, label: "Däckset i hotellet" },
  { num: 15, suffix: " år", decimaler: 0, label: "Erfarenhet i teamet" },
];

export const STEG = [
  { nr: "01", titel: "Boka online", text: "Välj tjänst, dag och tid. Bekräftelse direkt i inkorgen." },
  { nr: "02", titel: "Lämna bilen", text: "Kör in, ta en kaffe i väntrummet eller lämna nyckeln i boxen." },
  { nr: "03", titel: "Vi skruvar", text: "Momentdragning, balansering och kontroll av bromsar ingår." },
  { nr: "04", titel: "Kör vidare", text: "SMS när bilen är klar. Betala med Swish eller kort." },
];

export const OMDOMEN = [
  { namn: "Maria K.", ort: "Kungälv", text: "Bokade på kvällen, var inne 07:00 nästa morgon och klar 07:30. Bästa däckbytet jag gjort." },
  { namn: "Ahmed S.", ort: "Hisingen", text: "Däckhotellet är guld. SMS när det är dags, de har redan tvättat däcken. Noll stress." },
  { namn: "Johan L.", ort: "Angered", text: "Ärliga killar. Sa att bromsarna höll en säsong till istället för att sälja nya. Kommer tillbaka." },
];

export const FAQ = [
  { q: "När ska jag byta till vinterdäck?", a: "Vinterdäck är lag 1 december–31 mars vid vinterväglag. Vi rekommenderar att byta när temperaturen ligger under +7° — boka gärna i oktober för att slippa köerna." },
  { q: "Hur djupt mönster måste mina däck ha?", a: "Lagkravet är 3 mm för vinterdäck och 1,6 mm för sommardäck. Vi mäter alltid vid byte och säger till i god tid." },
  { q: "Kan jag vänta medan ni byter?", a: "Absolut. Ett vanligt däckbyte tar cirka 30 minuter och vi har kaffe och wifi i väntrummet." },
  { q: "Hur fungerar däckhotellet?", a: "Du lämnar däcken hos oss, vi märker, kontrollerar och förvarar dem klimatsäkrat. Vid säsongsskiftet får du ett SMS och bokar en tid — däcken står redo." },
];

export const TEAM = [
  { namn: "Erik Lindqvist", roll: "Grundare & mekaniker", ar: "15 års erfarenhet", initialer: "EL" },
  { namn: "Jonas Bergström", roll: "Däckspecialist", ar: "10 års erfarenhet", initialer: "JB" },
  { namn: "Sara Nilsson", roll: "Kundansvarig", ar: "8 års erfarenhet", initialer: "SN" },
];

export const VARDERINGAR = [
  { titel: "Ärlighet", text: "Vi säger som det är. Inget onödigt — bara det din bil faktiskt behöver." },
  { titel: "Snabbhet", text: "Din tid är värdefull. Vi håller tider och levererar samma dag." },
  { titel: "Kvalitet", text: "Vi använder bara märkesdäck och originalreservdelar." },
  { titel: "Göteborg", text: `Lokalt ägd sedan ${2026}. Vi känner våra kunder vid namn.` },
];

export const TIDER = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export const ADMIN_EMAIL = "lenn.soder@protonmail.com";
