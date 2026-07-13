-- Snapperhouse v1 schema (Supabase / PostgreSQL)
-- Apply in Supabase SQL editor. Enable PostGIS for distance search.

create extension if not exists postgis;
create extension if not exists pg_trgm;

-- Enums
create type trade_status as enum ('open', 'local_only', 'prohibited');
create type water_type as enum ('freshwater', 'brackish', 'marine');
create type breeding_difficulty as enum ('easy', 'moderate', 'challenging', 'specialist');
create type listing_type as enum ('for_sale', 'rehoming');
create type listing_status as enum ('draft', 'active', 'sold', 'removed', 'expired');
create type aus_state as enum ('ACT','NSW','NT','QLD','SA','TAS','VIC','WA');
create type equipment_category as enum (
  'filtration','heating','lighting','co2_system','pump_powerhead',
  'test_equipment','substrate','hardscape','décor','other'
);
create type equipment_condition as enum ('new','like_new','good','fair','spares_repair');
create type credit_ledger_type as enum ('purchase','consumed','refund','admin_adjustment');
create type noshow_flag_type as enum ('no_show','unresponsive');

-- Profiles (extends auth.users)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  email text not null,
  suburb text,
  state aus_state,
  lat decimal,
  lng decimal,
  email_confirmed boolean not null default false,
  is_seller boolean not null default false,
  seller_terms_agreed_at timestamptz,
  tax_ack_agreed_at timestamptz,
  google_oauth boolean not null default false,
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now(),
  is_suspended boolean not null default false,
  suspension_reason text,
  credits_purchased integer not null default 0,
  username text unique,
  is_admin boolean not null default false
);

create table public.taxonomy_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  section text not null check (section in ('fish','plants','equipment')),
  subgroups text[] default '{}',
  created_at timestamptz not null default now()
);

create table public.taxonomy_genera (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.taxonomy_groups(id) on delete cascade,
  name text not null,
  slug text not null,
  unique (group_id, slug)
);

create table public.taxonomy_species (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  common_name text not null,
  common_name_aliases text[] default '{}',
  scientific_name text not null,
  group_id uuid not null references public.taxonomy_groups(id),
  genus_id uuid not null references public.taxonomy_genera(id),
  trade_status trade_status not null default 'open',
  trade_notes text,
  water_type water_type not null default 'freshwater',
  temp_min decimal, temp_max decimal,
  ph_min decimal, ph_max decimal,
  gh_min decimal, gh_max decimal,
  kh_min decimal, kh_max decimal,
  diet text,
  min_tank_litres integer,
  compatibility text,
  breeding_difficulty breeding_difficulty,
  origin_notes text,
  care_summary text,
  suggested_by uuid references public.users(id),
  approved boolean not null default false,
  last_updated timestamptz not null default now()
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.users(id),
  listing_type listing_type not null,
  status listing_status not null default 'draft',
  species_id uuid not null references public.taxonomy_species(id),
  quantity_available integer not null check (quantity_available >= 1),
  price decimal not null check (price >= 0),
  price_negotiable boolean not null default false,
  location_suburb text not null,
  location_state aus_state not null,
  location_lat decimal,
  location_lng decimal,
  pickup_available boolean not null default false,
  freight_considered boolean not null default false,
  seller_temp decimal,
  seller_ph decimal,
  seller_gh decimal,
  seller_kh decimal,
  diet_notes text,
  min_tank_litres integer,
  compatibility_notes text,
  strain_variant text,
  breeding_notes text,
  description text not null check (char_length(description) <= 1000),
  completeness_score integer not null default 0,
  require_buyer_ack boolean not null default false,
  buyer_ack_text text,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint listings_collection_method check (pickup_available or freight_considered)
);

-- One active listing per species per seller
create unique index listings_one_active_per_species
  on public.listings (seller_id, species_id)
  where status = 'active';

create table public.listing_equipment (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.users(id),
  equipment_category equipment_category not null,
  brand text,
  model text,
  condition equipment_condition not null,
  price decimal not null check (price >= 0),
  price_negotiable boolean not null default false,
  location_suburb text not null,
  location_state aus_state not null,
  description text not null check (char_length(description) <= 1000),
  status listing_status not null default 'active',
  published_at timestamptz default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.listing_setups (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.users(id),
  tank_length_cm integer not null,
  tank_width_cm integer not null,
  tank_height_cm integer not null,
  tank_volume_litres integer not null,
  price decimal not null,
  price_negotiable boolean not null default false,
  location_suburb text not null,
  location_state aus_state not null,
  description text not null check (char_length(description) <= 2000),
  included jsonb not null default '{}',
  other_items text,
  status listing_status not null default 'active',
  published_at timestamptz default now(),
  created_at timestamptz not null default now()
);

create table public.listing_photos (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid,
  equipment_id uuid references public.listing_equipment(id) on delete cascade,
  setup_id uuid references public.listing_setups(id) on delete cascade,
  storage_path text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint listing_photos_parent check (
    (listing_id is not null)::int +
    (equipment_id is not null)::int +
    (setup_id is not null)::int = 1
  )
);

alter table public.listing_photos
  add constraint listing_photos_listing_fk
  foreign key (listing_id) references public.listings(id) on delete cascade;

create table public.inquiry_threads (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id),
  buyer_id uuid not null references public.users(id),
  seller_id uuid not null references public.users(id),
  created_at timestamptz not null default now(),
  unique (buyer_id, listing_id)
);

create table public.inquiry_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.inquiry_threads(id) on delete cascade,
  sender_id uuid not null references public.users(id),
  body text not null check (char_length(body) <= 500),
  created_at timestamptz not null default now()
);

create table public.sales (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id),
  thread_id uuid references public.inquiry_threads(id),
  seller_id uuid not null references public.users(id),
  buyer_id uuid not null references public.users(id),
  sold_quantity integer,
  seller_price decimal,
  seller_note text,
  initiated_at timestamptz not null default now(),
  seller_confirmed_at timestamptz,
  buyer_confirmed_at timestamptz,
  buyer_elapsed boolean not null default false,
  confirmed_at timestamptz,
  constraint sales_confirm_ready check (
    confirmed_at is null or (seller_price is not null and sold_quantity is not null)
  )
);

create table public.ratings_seller (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null unique references public.sales(id) on delete cascade,
  stars integer not null check (stars between 1 and 5),
  note text check (char_length(note) <= 300),
  fish_as_described text,
  condition_as_expected text,
  followed_acclimation text,
  pending boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.ratings_buyer (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null unique references public.sales(id) on delete cascade,
  stars integer not null check (stars between 1 and 5),
  note text check (char_length(note) <= 300),
  buyer_as_described text,
  pending boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.noshow_flags (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.inquiry_threads(id),
  flagged_user_id uuid not null references public.users(id),
  flagged_by uuid not null references public.users(id),
  flag_type noshow_flag_type not null,
  notes text,
  removed_by_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  type credit_ledger_type not null,
  amount integer not null,
  stripe_payment_intent_id text,
  listing_id uuid references public.listings(id),
  notes text,
  created_at timestamptz not null default now()
);

create table public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  filters jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.seller_follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.users(id) on delete cascade,
  followed_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (follower_id, followed_id)
);

create table public.taxonomy_suggestions (
  id uuid primary key default gen_random_uuid(),
  suggested_by uuid not null references public.users(id),
  common_name text not null,
  scientific_name text,
  group_id uuid references public.taxonomy_groups(id),
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.care_corrections (
  id uuid primary key default gen_random_uuid(),
  species_id uuid not null references public.taxonomy_species(id),
  suggested_by uuid not null references public.users(id),
  field_name text not null,
  proposed_value text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- Credit balance helper
create or replace view public.credit_balances as
select user_id, coalesce(sum(amount), 0)::integer as balance
from public.credit_ledger
group by user_id;

-- RLS scaffolding (tighten per policy before production)
alter table public.users enable row level security;
alter table public.listings enable row level security;
alter table public.inquiry_threads enable row level security;
alter table public.inquiry_messages enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.saved_searches enable row level security;
alter table public.seller_follows enable row level security;
alter table public.notifications enable row level security;

create policy "Public profiles readable" on public.users
  for select using (true);

create policy "Users update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Active listings public" on public.listings
  for select using (status = 'active' or seller_id = auth.uid());

create policy "Sellers manage own listings" on public.listings
  for all using (seller_id = auth.uid());

create policy "Thread participants" on public.inquiry_threads
  for select using (buyer_id = auth.uid() or seller_id = auth.uid());

create policy "Message participants" on public.inquiry_messages
  for select using (
    exists (
      select 1 from public.inquiry_threads t
      where t.id = thread_id and (t.buyer_id = auth.uid() or t.seller_id = auth.uid())
    )
  );

create policy "Own credit ledger" on public.credit_ledger
  for select using (user_id = auth.uid());

create policy "Own saved searches" on public.saved_searches
  for all using (user_id = auth.uid());

create policy "Own follows" on public.seller_follows
  for all using (follower_id = auth.uid());

create policy "Own notifications" on public.notifications
  for all using (user_id = auth.uid());

-- Taxonomy publicly readable
alter table public.taxonomy_groups enable row level security;
alter table public.taxonomy_genera enable row level security;
alter table public.taxonomy_species enable row level security;

create policy "Taxonomy groups public" on public.taxonomy_groups for select using (true);
create policy "Taxonomy genera public" on public.taxonomy_genera for select using (true);
create policy "Approved species public" on public.taxonomy_species for select using (approved = true);
