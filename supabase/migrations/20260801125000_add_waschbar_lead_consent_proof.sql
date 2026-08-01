alter table public.waschbar_leads
  add column if not exists consent_voucher boolean not null default false,
  add column if not exists consent_voucher_at timestamptz,
  add column if not exists consent_voucher_text text,
  add column if not exists consent_email_marketing boolean not null default false,
  add column if not exists consent_email_marketing_at timestamptz,
  add column if not exists consent_email_marketing_text text,
  add column if not exists consent_marketing_at timestamptz,
  add column if not exists consent_marketing_text text,
  add column if not exists consent_form_version text,
  add column if not exists submitted_user_agent text,
  add column if not exists submitted_ip_hash text;
