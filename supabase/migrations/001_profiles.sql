-- Global Amor: Profiles + Media + RLS
create extension if not exists "pgcrypto";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 50),
  birthdate date not null,
  city text,
  country text,
  bio text check (char_length(bio) <= 500),
  languages text[] default '{}',
  interests text[] default '{}',
  looking_for text check (looking_for in ('friendship','dating','marriage','networking')),
  is_18_confirmed boolean default false,
  is_published boolean default false,
  completion_pct int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table profile_media (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  url text not null,
  type text default 'photo' check (type in ('photo','video')),
  is_primary boolean default false,
  moderation_status text default 'pending' check (moderation_status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

create or replace function handle_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger profiles_updated_at before update on profiles for each row execute function handle_updated_at();

-- Indexes for global discovery
create index idx_profiles_published_country on profiles(is_published, country);
create index idx_profiles_city on profiles(city);
create index idx_media_user on profile_media(user_id);

-- RLS
alter table profiles enable row level security;
alter table profile_media enable row level security;

-- Public can view published profiles
create policy "Public can view published profiles"
on profiles for select using (is_published = true);

-- Users can manage own profile
create policy "Users can manage own profile"
on profiles for all using (auth.uid() = id) with check (auth.uid() = id);

-- Media policies
create policy "Users manage own media"
on profile_media for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Public can view approved media of published profiles"
on profile_media for select using (moderation_status = 'approved');

-- Storage bucket must be created manually: avatars (public)
