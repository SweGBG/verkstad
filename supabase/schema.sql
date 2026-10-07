-- IronDäck — kör i Supabase → SQL Editor
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  namn text not null,
  email text not null,
  telefon text not null,
  regnr text not null,
  tjanst text not null,
  datum date not null,
  tid text not null,
  status text not null default 'väntar' check (status in ('väntar','bekräftad','genomförd','avbokad')),
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- Vem som helst får skapa en bokning (formuläret på sajten)
create policy "alla kan boka" on public.bookings
  for insert to anon, authenticated with check (true);

-- Inloggade kunder ser och avbokar sina egna bokningar
create policy "kund ser egna" on public.bookings
  for select to authenticated using (email = auth.jwt() ->> 'email');
create policy "kund avbokar egna" on public.bookings
  for update to authenticated using (email = auth.jwt() ->> 'email') with check (status = 'avbokad');

-- Admin (byt e-post vid behov — samma som ADMIN_EMAIL i app/lib/data.ts)
create policy "admin ser allt" on public.bookings
  for select to authenticated using (auth.jwt() ->> 'email' = 'lenn.soder@protonmail.com');
create policy "admin uppdaterar" on public.bookings
  for update to authenticated using (auth.jwt() ->> 'email' = 'lenn.soder@protonmail.com');
