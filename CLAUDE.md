# Ömer Usta – Web Sitesi Projesi (Claude Code Promptu)

> Kullanım: Boş bir klasör aç, VS Code'da Claude'u başlat ve bu dosyanın tamamını yapıştır.
> Ya da bu dosyayı proje klasörüne `CLAUDE.md` adıyla koy, Claude'a "CLAUDE.md'deki planı Aşama 1'den başlat" de.

---

## Rol ve çalışma şekli

Benimle birlikte bir restoran web sitesi geliştireceksin. Proje **aşama aşama** ilerleyecek:
- Her aşamanın başında ne yapacağını kısaca anlat, sonra kodu yaz.
- Her aşama bittiğinde çalıştırma komutunu ver ve dur. Ben test edip "devam" deyince sonraki aşamaya geç.
- Kodları açıkla, ama uzun teori anlatma. Bir şeyi benim yapmam gerekiyorsa (Supabase hesabı açmak, .env doldurmak gibi) adım adım söyle.
- Kullanıcıya görünen tüm metinler **Türkçe** olacak.

## İşletme bilgileri

- **Ad:** Ömer Usta – Pizza • Pide • Lahmacun
- **Ana slogan:** "Bir Usta, Bir Fırın, Sonsuz Lezzet"
- **Diğer sloganlar:** "Lezzetin Yeni Adresi", "Geleneksel Lezzet, Usta Ellerden", "Afiyet Olsun"
- **Değerler (ikonlu üçlü):** Usta İşi Lezzet · Taze Malzeme · Kaliteli Hizmet
- **Adres:** Camikebir Mahallesi, Atatürk Bulvarı No: 123/A, 63600 Siverek / Şanlıurfa
  - Tarif: Yılmaz Güney Heykeli çaprazı, Baklavacı Şemsettin yanı
- **Telefon / WhatsApp:** 0538 038 00 87 (`tel:+905380380087`, `https://wa.me/905380380087`)
- **Instagram:** @siverekomerusta_pide → https://www.instagram.com/siverekomerusta_pide
- **Konum:** 37.7514166, 39.3241654
  - Yol tarifi: https://www.google.com/maps/dir/?api=1&destination=37.7514166,39.3241654
  - Harita embed: https://www.google.com/maps?q=37.7514166,39.3241654&z=17&output=embed
- **Çalışma saatleri:** Her gün 09:00 – 00:00 (panelden düzenlenebilir olsun; rozet Europe/Istanbul saatine göre)
- **Duyurular:** "Açılışa özel çorba ikramı" ve "Toplu sipariş alınır"
- **Logo:** `public/logo.png` (yuvarlak, siyah-turuncu çerçeve, ortada aşçı illüstrasyonu)
- **Fotoğraflar:** `public/images/dukkan/` (dis-cephe, salon-1..3, tezgah). Ürün fotoğrafı yok; stok/yapay zekâ görseli kullanma.

## Teknoloji

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** (+ gerekirse shadcn/ui bileşenleri)
- **Framer Motion** (ölçülü animasyonlar için)
- **Supabase:** Postgres veritabanı, Auth (tek admin), Storage (ürün fotoğrafları)
- **Yayın:** Netlify (ücretsiz plan, ticari kullanıma uygun)
- Ekstra ücretli servis kullanma. Her şey ücretsiz katmanda kalmalı.

## Tasarım yönü

- **Renkler:** Siyah zemin (#0E0E0E / #161616), turuncu vurgu (#F28C1E civarı, logodan al), krem/beyaz metin. Koyu tema ağırlıklı, sıcak ve iştah açıcı.
- **Hissiyat:** Modern, premium, odun fırını sıcaklığı. Büyük yemek fotoğrafları, bol boşluk, net tipografi.
- **Yazı tipleri:** Başlıklar için güçlü, kalın bir display font (örn. Bebas Neue, Anton veya Oswald), metin için okunaklı bir sans (örn. Inter, DM Sans). Türkçe karakter desteği şart (İ, ı, ş, ğ, ü, ö, ç).
- **Animasyon:** Kaydırınca yumuşak beliren bölümler, hero'da hafif parallax veya fırın ateşi hissi veren ince bir efekt. Abartma. `prefers-reduced-motion` açıksa animasyonları kapat.
- **Mobil öncelikli:** Müşterilerin çoğu QR'dan telefonla gelecek. Önce 390px genişlikte mükemmel görünsün, sonra masaüstü.
- **Kaçınılacaklar:** Hazır şablon görüntüsü, gereksiz gradyanlar, emoji ikonlar, karışık menüler.

## Site sayfaları ve bölümleri

### 1. Ana sayfa (`/`)
- **Hero:** Tam ekran yemek görseli üzerinde logo, "ÖMER USTA" başlığı, "Pizza • Pide • Lahmacun" alt başlığı. Butonlar: **Menüyü Gör**, **Hemen Ara**, **Yol Tarifi**.
- **"Şu an açık / kapalı" rozeti:** Çalışma saatlerine göre otomatik.
- **Değerler:** Usta İşi Lezzet / Taze Malzeme / Kaliteli Hizmet, ikonlu üç kart.
- **Öne çıkanlar:** Panelden "öne çıkan" işaretlenen 3–6 ürün, kaydırılabilir kartlar.
- **Hikâye / Usta hakkında:** Kısa bir tanıtım metni ve fotoğraf (metni panelden düzenleyebilelim).
- **Galeri:** Fırından, salondan ve yemeklerden fotoğraflar (lightbox ile büyütme).
- **Google yorumları alanı:** Şimdilik sadece "Google'da bizi değerlendirin" butonu. Sahte yorum asla koyma.
- **Konum ve iletişim:** Google Maps embed, adres, telefon, çalışma saatleri tablosu.
- **Footer:** Logo, iletişim, sosyal medya, KVKK aydınlatma metni linki, "Afiyet Olsun..." kapanışı.

### 2. Menü sayfası (`/menu`): QR kod buraya gidecek
- Üstte yapışkan (sticky) **kategori sekmeleri**: Pizzalar, Pideler, Lahmacun, Dürümler, İçecekler, Tatlılar (kategoriler panelden yönetilir).
- Sekmeye tıklayınca ilgili bölüme yumuşak kaydırma, kaydırdıkça aktif sekme değişsin.
- **Arama kutusu:** Ürün adına göre anlık filtreleme.
- **Ürün kartı:** Fotoğraf, ad, kısa açıklama, fiyat (₺), etiketler (Acılı, Vejetaryen, Yeni, Çok Satan).
- Ürüne tıklayınca **detay penceresi**: büyük foto, açıklama, varsa porsiyon seçenekleri (örn. Tek / Çift, Küçük / Orta / Büyük ve her birinin fiyatı).
- "Bugün yok" işaretli ürünler gizlensin.
- Altta sabit buton: **WhatsApp'tan Sipariş Ver** (hazır mesajla `wa.me` linki).
- "Fiyatlarımıza KDV dahildir" notu.
- Bu sayfa çok hızlı açılmalı: fotoğraflar lazy-load, WebP, küçük boyut.

### 3. İletişim (`/iletisim`)
- Harita, adres, telefon, WhatsApp, çalışma saatleri.
- İsteğe bağlı: basit bir mesaj/rezervasyon formu (Supabase'e kaydedilsin, panelde görünsün).

### 4. Yasal
- `/kvkk`: KVKK aydınlatma metni (taslak şablon, `[DOLDURULACAK]` alanlarıyla).
- Sadece zorunlu çerez kullanılıyorsa basit bir bilgilendirme yeterli.

## İşletme paneli (`/panel`)

**Sadece işletme sahibi girecek.** Tek hesap, e-posta + şifre. Supabase'de kayıt olma kapalı.

- **Giriş ekranı:** E-posta, şifre, "Şifremi unuttum".
- **Ürünler:** Liste (fotoğraf, ad, fiyat, kategori). Her satırda "Menüde göster" anahtarı ve hızlı fiyat düzenleme. Sürükle-bırak sıralama.
- **Ürün ekle / düzenle:** Fotoğraf yükle (telefonda kamera açılsın), ad, açıklama, kategori, fiyat, porsiyon seçenekleri, etiketler, "öne çıkan" işareti. Kaydet / Sil (silmeden önce onay sor).
- **Fotoğraf yüklemede otomatik küçültme:** Tarayıcıda yüklemeden önce en fazla 1200px genişliğe ve WebP'ye çevir (~100 KB altı). Supabase ücretsiz trafik sınırını korumak için bu şart.
- **Kategoriler:** Ekle, sil, yeniden adlandır, sırala.
- **İşletme bilgileri:** Çalışma saatleri, telefon, adres, hakkımızda metni, sosyal linkler.
- **Galeri yönetimi:** Fotoğraf ekle / sil.
- **Mesajlar:** İletişim formundan gelenler (varsa).
- **QR kod oluşturucu:** `/menu` adresine giden QR kodu logolu olarak PNG/SVG indir. Masa kartı için yazdırılabilir bir A6 sayfası.
- Panel tamamen **mobil uyumlu** olsun. Sahibi telefondan yönetecek.

## Veritabanı (Supabase)

Tabloları öner ve SQL migration olarak yaz. Taslak:
- `categories` (id, name, sort_order, is_active)
- `products` (id, category_id, name, description, price, image_url, tags[], is_available, is_featured, sort_order, created_at)
- `product_variants` (id, product_id, name, price) – porsiyon seçenekleri
- `business_info` (tek satır: phone, whatsapp, address, hours jsonb, about, socials jsonb)
- `gallery` (id, image_url, sort_order)
- `messages` (id, name, phone, message, created_at)

**Güvenlik (RLS) zorunlu:**
- Herkes: kategorileri, ürünleri, galeriyi ve işletme bilgilerini **okuyabilir**.
- Sadece admin kullanıcı: **ekleyebilir / düzenleyebilir / silebilir**.
- `messages`: herkes ekleyebilir, sadece admin okuyabilir.
- Storage bucket: herkes okur, sadece admin yükler/siler.
- Gizli anahtarlar `.env.local` dosyasında, asla repoya girmesin (`.gitignore`).

## SEO ve performans

- Her sayfada başlık, açıklama, Open Graph görseli (WhatsApp'ta paylaşılınca logo ve görsel görünsün).
- Schema.org `Restaurant` JSON-LD: ad, adres, telefon, saatler, menü linki, mutfak türü.
- `sitemap.xml`, `robots.txt`, favicon ve PWA manifest (telefonda ana ekrana eklenebilsin).
- `next/image` ile optimize görseller.
- Menü sayfası ISR veya kısa süreli önbellek kullansın: fiyat değişince en geç 1 dakikada siteye yansısın, ama her ziyarette veritabanı yorulmasın.
- Hedef: Lighthouse mobilde Performance, Accessibility, SEO 90+.

## Erişilebilirlik

- Gerçek `<button>`, `<a>`, `<label>` kullan. Dokunma hedefleri en az 44px.
- Metin kontrastı en az 4.5:1 (turuncu üzerindeki yazılara dikkat).
- Tüm görsellerde anlamlı `alt` metni.

## Aşamalar

1. **Kurulum:** Next.js + Tailwind + klasör yapısı, renk/font tanımları, ortak bileşenler (Header, Footer, Button).
2. **Ana sayfa:** Tüm bölümler, gerçek menü verisiyle (`src/lib/menu-data.ts`).
3. **Menü sayfası:** Kategoriler, arama, ürün kartları, detay penceresi, WhatsApp butonu. Yine örnek verilerle.
4. **Supabase:** Tablolar, RLS kuralları, storage, admin hesabı. Siteyi örnek veriden gerçek veriye bağla.
5. **Panel:** Giriş, ürün/kategori yönetimi, fotoğraf yükleme ve küçültme, işletme bilgileri, galeri.
6. **Ekstralar:** QR oluşturucu, iletişim formu, KVKK sayfası, SEO, PWA.
7. **Yayın:** Netlify'a deploy, alan adı bağlama, Google İşletme Profili için kontrol listesi.
8. **Son kontrol:** Mobil test, Lighthouse, güvenlik (panel dışarıdan erişilemiyor mu, RLS çalışıyor mu).

Aşama 1'den başla.

