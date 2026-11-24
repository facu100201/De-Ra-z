-- Registros de la preventa (opcional, para Neon/Postgres vía DATABASE_URL)
create table if not exists preventa (
  id          bigint generated always as identity primary key,
  email       text not null unique,
  dominio     text not null,
  universidad text,
  creado_en   timestamptz not null default now()
);

create index if not exists preventa_dominio_idx on preventa (dominio);
