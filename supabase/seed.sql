-- Mevcut menüyü (src/lib/menu-data.ts) veritabanına aktarır. 0001_init.sql'den SONRA çalıştırın.

insert into categories (id, name, sort_order) values ('lahmacun', 'Lahmacun', 0) on conflict (id) do nothing;
insert into categories (id, name, sort_order) values ('pideler', 'Pideler', 1) on conflict (id) do nothing;
insert into categories (id, name, sort_order) values ('pizzalar', 'Pizzalar', 2) on conflict (id) do nothing;
insert into categories (id, name, sort_order) values ('yan-urunler', 'Yan Ürünler', 3) on conflict (id) do nothing;
insert into categories (id, name, sort_order) values ('icecekler', 'İçecekler', 4) on conflict (id) do nothing;
insert into categories (id, name, sort_order) values ('tatlilar', 'Tatlılar', 5) on conflict (id) do nothing;

insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('lahmacun', 'lahmacun', 'Lahmacun', null, 70, '{"Çok Satan"}', true, true, 0) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('antep-lahmacun', 'lahmacun', 'Antep Lahmacun', null, 80, '{}', true, true, 1) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kiymali-pide', 'pideler', 'Kıymalı Pide', null, 200, '{}', true, true, 0) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kiymali-kasarli', 'pideler', 'Kıymalı Kaşarlı Pide', null, 200, '{}', true, false, 1) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kiymali-yumurtali', 'pideler', 'Kıymalı Yumurtalı Pide', null, 200, '{}', true, false, 2) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kusbasili-pide', 'pideler', 'Kuşbaşılı Pide', null, 220, '{}', true, true, 3) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kusbasili-kasarli', 'pideler', 'Kuşbaşılı Kaşarlı Pide', null, 220, '{}', true, false, 4) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kusbasili-yumurtali', 'pideler', 'Kuşbaşılı Yumurtalı Pide', null, 220, '{}', true, false, 5) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kasarli-pide', 'pideler', 'Kaşarlı Pide', null, 220, '{}', true, false, 6) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kasarli-sucuklu', 'pideler', 'Kaşarlı Sucuklu Pide', null, 220, '{}', true, false, 7) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kasarli-yumurtali', 'pideler', 'Kaşarlı Yumurtalı Pide', null, 220, '{}', true, false, 8) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('beyaz-peynirli-pide', 'pideler', 'Beyaz Peynirli Pide', null, 220, '{"Vejetaryen"}', true, false, 9) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('sebzeli-pide', 'pideler', 'Sebzeli Pide', null, 220, '{"Vejetaryen"}', true, false, 10) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('karisik-pide', 'pideler', 'Karışık Pide', null, 250, '{}', true, true, 11) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('margarita', 'pizzalar', 'Margarita', null, null, '{"Vejetaryen"}', true, false, 0) on conflict (id) do nothing;
insert into product_variants (product_id, name, price, sort_order) values ('margarita', 'Orta Boy', 270, 0);
insert into product_variants (product_id, name, price, sort_order) values ('margarita', 'Büyük Boy', 420, 1);
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('vejeteryan-pizza', 'pizzalar', 'Vejeteryan', null, null, '{"Vejetaryen"}', true, false, 1) on conflict (id) do nothing;
insert into product_variants (product_id, name, price, sort_order) values ('vejeteryan-pizza', 'Orta Boy', 280, 0);
insert into product_variants (product_id, name, price, sort_order) values ('vejeteryan-pizza', 'Büyük Boy', 450, 1);
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('sucuklu-pizza', 'pizzalar', 'Sucuklu', null, null, '{}', true, false, 2) on conflict (id) do nothing;
insert into product_variants (product_id, name, price, sort_order) values ('sucuklu-pizza', 'Orta Boy', 280, 0);
insert into product_variants (product_id, name, price, sort_order) values ('sucuklu-pizza', 'Büyük Boy', 430, 1);
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('karisik-pizza', 'pizzalar', 'Karışık', null, null, '{}', true, true, 3) on conflict (id) do nothing;
insert into product_variants (product_id, name, price, sort_order) values ('karisik-pizza', 'Orta Boy', 300, 0);
insert into product_variants (product_id, name, price, sort_order) values ('karisik-pizza', 'Büyük Boy', 450, 1);
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kavurmali-pizza', 'pizzalar', 'Kavurmalı', null, null, '{}', true, false, 4) on conflict (id) do nothing;
insert into product_variants (product_id, name, price, sort_order) values ('kavurmali-pizza', 'Orta Boy', 300, 0);
insert into product_variants (product_id, name, price, sort_order) values ('kavurmali-pizza', 'Büyük Boy', 500, 1);
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('salam-sucuk-pizza', 'pizzalar', 'Salam Sucuk', null, null, '{}', true, false, 5) on conflict (id) do nothing;
insert into product_variants (product_id, name, price, sort_order) values ('salam-sucuk-pizza', 'Orta Boy', 290, 0);
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('beyaz-peynirli-pizza', 'pizzalar', 'Beyaz Peynirli', null, null, '{"Vejetaryen"}', true, false, 6) on conflict (id) do nothing;
insert into product_variants (product_id, name, price, sort_order) values ('beyaz-peynirli-pizza', 'Orta Boy', 280, 0);
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('patates-kizartmasi', 'yan-urunler', 'Patates Kızartması', null, 150, '{}', true, false, 0) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kola', 'icecekler', 'Kola', null, null, '{}', true, false, 0) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('yedigun', 'icecekler', 'Yedigün', null, null, '{}', true, false, 1) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('sprite', 'icecekler', 'Sprite', null, null, '{}', true, false, 2) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('ayran', 'icecekler', 'Ayran', null, null, '{}', true, false, 3) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('salgam', 'icecekler', 'Şalgam', null, null, '{}', true, false, 4) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('soda', 'icecekler', 'Soda', null, null, '{}', true, false, 5) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('meyve-suyu', 'icecekler', 'Meyve Suyu', null, null, '{}', true, false, 6) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('kunefe', 'tatlilar', 'Künefe', null, null, '{}', true, false, 0) on conflict (id) do nothing;
insert into products (id, category_id, name, description, price, tags, is_available, is_featured, sort_order) values ('katmer', 'tatlilar', 'Katmer', null, null, '{}', true, false, 1) on conflict (id) do nothing;

insert into business_info (id, phone, whatsapp, address) values (1, '0538 038 00 87', '905380380087', 'Camikebir Mahallesi, Atatürk Bulvarı No: 123/A, 63600 Siverek / Şanlıurfa') on conflict (id) do nothing;

