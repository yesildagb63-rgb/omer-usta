-- Ömer Usta: tablolar, RLS ve storage.
-- Supabase > SQL Editor'e yapıştırıp "Run" ile çalıştırın.
-- Kayıt olma kapalı olacağı için "authenticated" rolündeki tek kullanıcı admindir.

create table if not exists categories (
  id text primary key,
  name text not null,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table if not exists products (
  id text primary key,
  category_id text not null references categories(id) on delete restrict,
  name text not null,
  description text,
  price int,                        -- null: fiyat yok ("Sorunuz") ya da boy seçenekli
  image_url text,
  tags text[] not null default '{}',
  is_available boolean not null default true,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists products_category_idx on products(category_id);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references products(id) on delete cascade,
  name text not null,
  price int not null,
  sort_order int not null default 0
);
create index if not exists variants_product_idx on product_variants(product_id);

create table if not exists business_info (
  id int primary key default 1 check (id = 1),
  phone text,
  whatsapp text,
  address text,
  hours jsonb,
  about text,
  socials jsonb
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  sort_order int not null default 0
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- RLS
alter table categories       enable row level security;
alter table products         enable row level security;
alter table product_variants enable row level security;
alter table business_info    enable row level security;
alter table gallery          enable row level security;
alter table messages         enable row level security;

-- Herkes okur
create policy "public read" on categories       for select using (true);
create policy "public read" on products         for select using (true);
create policy "public read" on product_variants for select using (true);
create policy "public read" on business_info    for select using (true);
create policy "public read" on gallery          for select using (true);

-- Sadece giriş yapmış admin yazar
create policy "admin write" on categories       for all to authenticated using (true) with check (true);
create policy "admin write" on products         for all to authenticated using (true) with check (true);
create policy "admin write" on product_variants for all to authenticated using (true) with check (true);
create policy "admin write" on business_info    for all to authenticated using (true) with check (true);
create policy "admin write" on gallery          for all to authenticated using (true) with check (true);

-- Mesajlar: herkes ekler, sadece admin okur/siler
create policy "anyone insert" on messages for insert with check (true);
create policy "admin read"    on messages for select to authenticated using (true);
create policy "admin delete"  on messages for delete to authenticated using (true);

-- Storage: herkese açık okuma, sadece admin yükler/siler
insert into storage.buckets (id, name, public) values ('urunler', 'urunler', true) on conflict (id) do nothing;

create policy "urunler public read" on storage.objects for select using (bucket_id = 'urunler');
create policy "urunler admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'urunler');
create policy "urunler admin update" on storage.objects for update to authenticated using (bucket_id = 'urunler');
create policy "urunler admin delete" on storage.objects for delete to authenticated using (bucket_id = 'urunler');
