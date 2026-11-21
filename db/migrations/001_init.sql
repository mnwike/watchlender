-- WatchLender schema (build brief section 5) + lead capture.
create extension if not exists pgcrypto;

create table watch_reference (
  id uuid primary key default gen_random_uuid(),
  ref_key text not null unique,            -- brandSlug/slug used by the site
  brand text not null,
  brand_normalized text not null,
  family text,
  model_name text not null,
  reference_display text not null,
  reference_normalized text not null,
  variant_key text not null default '',
  specs_json jsonb not null default '{}',
  status text not null default 'unverified' check (status in ('unverified','verified','retired')),
  created_at timestamptz not null default now(),
  unique (brand_normalized, reference_normalized, variant_key)
);
create index watch_reference_lookup on watch_reference (brand_normalized, reference_normalized);

create table ingestion_run (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  endpoint text not null,
  run_time timestamptz not null default now(),
  success boolean not null,
  error text
);

create table raw_payload (
  id uuid primary key default gen_random_uuid(),
  ingestion_run_id uuid references ingestion_run(id),
  provider text not null,
  content_hash text not null,
  payload jsonb not null,
  data_retention_policy text not null default 'per-licence',
  fetched_at timestamptz not null default now(),
  unique (provider, content_hash)          -- idempotent re-ingestion
);

create table source_mapping (
  id uuid primary key default gen_random_uuid(),
  watch_reference_id uuid references watch_reference(id),
  provider text not null,
  external_id text not null,
  external_url text,
  raw_reference text not null,
  match_score numeric(4,3) not null,
  match_confidence text not null check (match_confidence in ('high','medium','low','rejected')),
  review_status text not null default 'pending' check (review_status in ('auto','pending','approved','rejected')),
  created_at timestamptz not null default now(),
  unique (provider, external_id)
);
create index source_mapping_review on source_mapping (review_status);

-- Time series: one row per observation, never overwritten.
create table market_valuation (
  id uuid primary key default gen_random_uuid(),
  watch_reference_id uuid not null references watch_reference(id),
  provider text not null,
  value numeric(14,2) not null,
  currency char(3) not null,
  estimated_at timestamptz not null,
  fetched_at timestamptz not null default now(),
  methodology_label text not null,
  raw_payload_id uuid references raw_payload(id)
);
create index market_valuation_latest on market_valuation (watch_reference_id, estimated_at desc);

create table listing (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  listing_id text not null,
  watch_reference_id uuid references watch_reference(id),
  title text not null,
  ask_price numeric(14,2) not null,       -- asking price, never a realised sale
  currency char(3) not null,
  condition text,
  year int,
  box_papers text,
  location text,
  listing_url text not null,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  status text not null default 'active' check (status in ('active','inactive')),
  unique (provider, listing_id)
);
create index listing_seen on listing (watch_reference_id, last_seen desc);

create table media_asset (
  id uuid primary key default gen_random_uuid(),
  watch_reference_id uuid references watch_reference(id),
  listing_id uuid references listing(id),
  provider text not null,
  image_url text,
  stored_key text,
  licence_type text not null,              -- no row without a licence
  attribution text not null,
  rights_expiry date,
  fetched_at timestamptz not null default now()
);

create table manual_match_review (
  id uuid primary key default gen_random_uuid(),
  source_mapping_id uuid not null references source_mapping(id),
  candidate_ids uuid[] not null default '{}',
  reviewer text not null,
  decision text not null check (decision in ('approve','reject','remap')),
  reason text,
  decided_at timestamptz not null default now()
);

create table fx_rate (
  base char(3) not null,
  quote char(3) not null,
  rate numeric(18,8) not null,
  as_of timestamptz not null,
  primary key (base, quote, as_of)
);

create table lead (
  id uuid primary key,
  intent text not null check (intent in ('sell','loan')),
  name text not null,
  email text not null,
  phone text,
  postcode text,
  watch_ref_key text,
  watch_text text,
  condition text,
  box_papers text,
  message text,
  consent_at timestamptz not null,
  source_url text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index lead_created on lead (created_at desc);
