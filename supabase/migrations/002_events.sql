-- Track downloads (CV, etc.)
create table downloads (
  id       bigint generated always as identity primary key,
  file     text not null,
  date     date not null default current_date,
  count    int not null default 1,
  unique (file, date)
);

alter table downloads enable row level security;

create policy "insertion downloads"
  on downloads for insert
  with check (true);

create policy "lecture downloads"
  on downloads for select
  using (true);
