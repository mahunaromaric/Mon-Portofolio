-- Tout exécuter en une fois dans SQL Editor

-- 1. Messages
create table if not exists messages (
  id         bigint generated always as identity primary key,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2. Projets
create table if not exists projects (
  id          bigint generated always as identity primary key,
  title       text not null,
  subtitle    text not null,
  description text not null,
  tags        text[] not null default '{}',
  focus       text[] not null default '{}',
  accent      text not null default '#2563EB',
  image_url   text,
  project_url text,
  github_url  text,
  published   boolean not null default false,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 3. Compétences
create table if not exists skill_categories (
  id    bigint generated always as identity primary key,
  name  text not null,
  color text not null default '#2563EB'
);

create table if not exists skills (
  id          bigint generated always as identity primary key,
  category_id bigint not null references skill_categories(id) on delete cascade,
  name        text not null,
  sort_order  int not null default 0
);

-- 4. Expériences
create table if not exists experiences (
  id          bigint generated always as identity primary key,
  year        text not null,
  role        text not null,
  company     text not null,
  description text not null,
  sort_order  int not null default 0
);

-- 5. Articles
create table if not exists articles (
  id         bigint generated always as identity primary key,
  title      text not null,
  slug       text not null unique,
  excerpt    text not null,
  content    text not null,
  tags       text[] not null default '{}',
  cover_url  text,
  published  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. Analytics
create table if not exists page_views (
  id    bigint generated always as identity primary key,
  path  text not null,
  date  date not null default current_date,
  count int not null default 1,
  unique (path, date)
);

-- 7. Downloads (CV tracking)
create table if not exists downloads (
  id    bigint generated always as identity primary key,
  file  text not null,
  date  date not null default current_date,
  count int not null default 1,
  unique (file, date)
);

-- === RLS ===

-- Messages
alter table messages enable row level security;
drop policy if exists "envoi public" on messages;
drop policy if exists "lecture admin" on messages;
create policy "envoi public" on messages for insert with check (true);
create policy "lecture admin" on messages for select using (auth.role() = 'authenticated');
create index if not exists idx_messages_created_at on messages(created_at desc);

-- Projets
alter table projects enable row level security;
drop policy if exists "lecture publique projets" on projects;
drop policy if exists "ecriture admin projets" on projects;
create policy "lecture publique projets" on projects for select using (published = true);
create policy "ecriture admin projets" on projects for all using (auth.role() = 'authenticated');

-- Compétences
alter table skill_categories enable row level security;
alter table skills enable row level security;
drop policy if exists "lecture publique categories" on skill_categories;
drop policy if exists "ecriture admin categories" on skill_categories;
drop policy if exists "lecture publique skills" on skills;
drop policy if exists "ecriture admin skills" on skills;
create policy "lecture publique categories" on skill_categories for select using (true);
create policy "ecriture admin categories" on skill_categories for all using (auth.role() = 'authenticated');
create policy "lecture publique skills" on skills for select using (true);
create policy "ecriture admin skills" on skills for all using (auth.role() = 'authenticated');

-- Expériences
alter table experiences enable row level security;
drop policy if exists "lecture publique experiences" on experiences;
drop policy if exists "ecriture admin experiences" on experiences;
create policy "lecture publique experiences" on experiences for select using (true);
create policy "ecriture admin experiences" on experiences for all using (auth.role() = 'authenticated');

-- Articles
alter table articles enable row level security;
drop policy if exists "lecture publique articles" on articles;
drop policy if exists "ecriture admin articles" on articles;
create policy "lecture publique articles" on articles for select using (published = true);
create policy "ecriture admin articles" on articles for all using (auth.role() = 'authenticated');

-- Page views
alter table page_views enable row level security;
drop policy if exists "insertion vues" on page_views;
drop policy if exists "lecture vues" on page_views;
create policy "insertion vues" on page_views for insert with check (true);
create policy "lecture vues" on page_views for select using (true);

-- Downloads
alter table downloads enable row level security;
drop policy if exists "insertion downloads" on downloads;
drop policy if exists "lecture downloads" on downloads;
create policy "insertion downloads" on downloads for insert with check (true);
create policy "lecture downloads" on downloads for select using (true);

-- === Privilèges (requis pour éviter les erreurs 401 côté anon) ===

grant select on projects to anon;
grant select on skill_categories to anon;
grant select on skills to anon;
grant select on experiences to anon;
grant select on articles to anon;
grant select, insert, update on page_views to anon;
grant select, insert, update on downloads to anon;
grant insert on messages to anon;

grant all on projects, skill_categories, skills, experiences, articles, messages to authenticated;
grant all on page_views, downloads to authenticated;
