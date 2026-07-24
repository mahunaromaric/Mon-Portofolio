-- 1. Messages (contact form)
create table messages (
  id         bigint generated always as identity primary key,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

-- RLS : INSERT public, lecture admin seulement
alter table messages enable row level security;

create policy "envoi public"
  on messages for insert
  with check (true);

create policy "lecture admin"
  on messages for select
  using (auth.role() = 'authenticated');

-- Index pour tri chronologique
create index idx_messages_created_at on messages(created_at desc);


-- 2. Projets
create table projects (
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

alter table projects enable row level security;

create policy "lecture publique projets"
  on projects for select
  using (published = true);

create policy "ecriture admin projets"
  on projects for all
  using (auth.role() = 'authenticated');


-- 3. Compétences
create table skill_categories (
  id    bigint generated always as identity primary key,
  name  text not null,
  color text not null default '#2563EB'
);

create table skills (
  id          bigint generated always as identity primary key,
  category_id bigint not null references skill_categories(id) on delete cascade,
  name        text not null,
  sort_order  int not null default 0
);

alter table skill_categories enable row level security;
alter table skills enable row level security;

create policy "lecture publique categories"
  on skill_categories for select using (true);

create policy "lecture publique skills"
  on skills for select using (true);

create policy "ecriture admin categories"
  on skill_categories for all
  using (auth.role() = 'authenticated');

create policy "ecriture admin skills"
  on skills for all
  using (auth.role() = 'authenticated');


-- 4. Expériences
create table experiences (
  id          bigint generated always as identity primary key,
  year        text not null,
  role        text not null,
  company     text not null,
  description text not null,
  sort_order  int not null default 0
);

alter table experiences enable row level security;

create policy "lecture publique experiences"
  on experiences for select using (true);

create policy "ecriture admin experiences"
  on experiences for all
  using (auth.role() = 'authenticated');


-- 5. Articles
create table articles (
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

alter table articles enable row level security;

create policy "lecture publique articles"
  on articles for select
  using (published = true);

create policy "ecriture admin articles"
  on articles for all
  using (auth.role() = 'authenticated');


-- 6. Analytics
create table page_views (
  id    bigint generated always as identity primary key,
  path  text not null,
  date  date not null default current_date,
  count int not null default 1,
  unique (path, date)
);

alter table page_views enable row level security;

create policy "insertion vues"
  on page_views for insert
  with check (true);

create policy "lecture vues"
  on page_views for select
  using (true);
