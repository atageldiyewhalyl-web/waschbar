create table if not exists public.waschbar_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  street text not null,
  postal_code text not null,
  city text not null,
  location text not null,
  consent_marketing boolean not null default false,
  page_url text,
  status text not null default 'new',
  email_sent_at timestamptz,
  email_error text
);

alter table public.waschbar_leads enable row level security;

create index if not exists waschbar_leads_created_at_idx
  on public.waschbar_leads (created_at desc);

create index if not exists waschbar_leads_email_idx
  on public.waschbar_leads (email);
