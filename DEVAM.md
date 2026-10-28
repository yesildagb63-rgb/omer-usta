# Devam: Ana Sayfa + Menü + İletişim + KVKK (tek seferde)

Aşama 1 bitti. Gerçek içerik geldi. Bu dosyadaki her şeyi **tek seferde** yap, bölümler arasında onay bekleme.
En sonda `npm run build` çalıştır, hata varsa düzelt, sonra bana neyi yaptığını kısaca özetle.

Önce CLAUDE.md'deki "İşletme bilgileri" bölümünü aşağıdaki gerçek bilgilerle güncelle (planın geri kalanına dokunma).

---

## Gerçek işletme bilgileri

- **Ad:** Ömer Usta – Pizza • Pide • Lahmacun
- **Ana slogan:** "Bir Usta, Bir Fırın, Sonsuz Lezzet"
- **Diğer sloganlar:** "Lezzetin Yeni Adresi", "Geleneksel Lezzet, Usta Ellerden", "Afiyet Olsun"
- **Adres:** Camikebir Mahallesi, Atatürk Bulvarı No: 123/A, 63600 Siverek / Şanlıurfa
  - Tarif: Yılmaz Güney Heykeli çaprazı, Baklavacı Şemsettin yanı
- **Telefon / WhatsApp:** 0538 038 00 87
  - Arama: `tel:+905380380087`
  - WhatsApp: `https://wa.me/905380380087?text=Merhaba%2C%20sipari%C5%9F%20vermek%20istiyorum`
- **Instagram:** @siverekomerusta_pide → `https://www.instagram.com/siverekomerusta_pide`
- **Konum:** 37.7514166, 39.3241654
  - Yol tarifi butonu: `https://www.google.com/maps/dir/?api=1&destination=37.7514166,39.3241654`
  - Harita embed (API anahtarı gerekmez): `<iframe src="https://www.google.com/maps?q=37.7514166,39.3241654&z=17&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ömer Usta konum"></iframe>`
- **Çalışma saatleri:** Her gün 09:00 – 00:00
  - "Şu an açık / kapalı" rozeti Türkiye saatine (Europe/Istanbul) göre hesaplansın; kapanış gece yarısı olduğu için 00:00'ı günün sonu olarak ele al.
- **Duyurular:** "Açılışa özel çorba ikramı" ve "Toplu sipariş alınır"

## Fotoğraflar

`public/images/dukkan/` içinde:
- `dis-cephe.jpg`: gece çekilmiş ışıklı tabela ve vitrin (dikey). **Hero görseli bu.** Mobilde tam ekran, masaüstünde `object-position` ile tabela görünecek şekilde kırp, üstüne koyu degrade ile yazı okunabilirliği sağla.
- `salon-1.jpg`, `salon-2.jpg`, `salon-3.jpg`: salon içi (tuğla duvar, mermer masalar, sıcak ışık). Galeri ve "Hakkımızda" bölümü için.
- `tezgah.jpg`: fırın ve tezgâh alanı (küçük çözünürlük, galeride küçük kare olarak kullan).

**Ürün fotoğrafı henüz yok.** Stok fotoğraf ya da yapay zekâ görseli KULLANMA. Ürün kartları fotoğrafsız da şık görünsün: büyük ürün adı, fiyat, kategoriye göre ince bir çizgi ikon (inline SVG). `image` alanı doluysa fotoğraf göster, boşsa bu tasarımı kullan. Gerçek fotoğraflar gelince `public/images/urunler/<ürün-id>.jpg` olarak eklenecek.

## Menü verisi

Menü `lib/menu-data.ts` dosyasında hazır (gerçek fiyatlarla). Varsa eski örnek veri dosyasını (`sample-data.ts` vb.) kaldır ve her yerde bunu kullan.
- Pizzaların "Orta Boy / Büyük Boy" seçenekleri `variants` içinde. Kartta en düşük fiyatı "270 ₺'den" diye göster, detay penceresinde tüm boyları listele.
- `price: null` olan ürünlerde (içecekler, tatlılar) fiyat yerine küçük "Sorunuz" yazısı göster.
- `isFeatured: true` olanlar ana sayfadaki "Öne Çıkanlar" bölümünde.

## Yapılacaklar

### 1. Ana sayfa
- Hero: `dis-cephe.jpg`, logo, "ÖMER USTA", "Pizza • Pide • Lahmacun", ana slogan. Butonlar: **Menüyü Gör**, **Hemen Ara**, **Yol Tarifi**. Yanında "Şu an açık" rozeti.
- Duyuru şeridi: "Açılışa özel çorba ikramı · Toplu sipariş alınır".
- Değerler: Usta İşi Lezzet / Taze Malzeme / Kaliteli Hizmet.
- Öne Çıkanlar: `featuredProducts`, kaydırılabilir kartlar, "Tüm Menü" linki.
- Hakkımızda: salon fotoğrafı ve kısa metin ("Siverek'in kalbinde, odun fırınından çıkan pide, lahmacun ve pizza..." tonunda, abartısız, 2–3 cümle).
- Galeri: salon ve tezgâh fotoğrafları, tıklayınca büyüyen lightbox.
- Konum ve iletişim özeti, sonra footer.

### 2. Menü (`/menu`): QR kod buraya gidecek
- Sticky kategori sekmeleri (Lahmacun, Pideler, Pizzalar, Yan Ürünler, İçecekler, Tatlılar), kaydırdıkça aktif sekme değişsin.
- Arama kutusu, ürün kartları, detay penceresi (boy seçenekleri).
- Üstte duyuru şeridi, altta "Fiyatlarımıza KDV dahildir".
- Sabit alt bar: **Ara** + **WhatsApp'tan Sipariş**.
- Çok hızlı açılsın. Menü statik veriden geldiği için sayfa statik üretilsin.

### 3. İletişim (`/iletisim` + ana sayfadaki bölüm)
- Adres (tarifiyle birlikte), telefon, çalışma saatleri, harita embed.
- Butonlar: Ara, WhatsApp, Instagram, Yol Tarifi (ikonlu, en az 48px yükseklik).
- Mobilde tüm sayfalarda altta sabit Ara + WhatsApp butonları (menü sayfasındaki barla çakışmasın).

### 4. KVKK (`/kvkk`)
- 6698 sayılı KVKK kapsamında "Aydınlatma Metni" taslağı. Veri sorumlusu için şu yer tutucuları bırak: `[İŞLETME UNVANI]`, `[VERGİ DAİRESİ / NO]`, `[E-POSTA]`. Adres ve telefon yukarıdaki gerçek bilgiler.
- İşlenen veriler: iletişim formu (ad, telefon, mesaj) ve zorunlu çerezler. Analitik veya pazarlama çerezi yok.
- Haklar (KVKK md. 11), başvuru yolu, saklama süresi.
- Footer'a "KVKK Aydınlatma Metni" linki ekle. İletişim formu varsa "Aydınlatma Metni'ni okudum" onay kutusu ekle.
- Basit çerez bilgilendirme çubuğu: sadece zorunlu çerez kullanıldığını söylesin, tek "Tamam" butonu, seçim localStorage'da hatırlansın.

### 5. SEO
- Başlıklar: "Ömer Usta | Siverek Pide, Lahmacun ve Pizza".
- `Restaurant` JSON-LD: gerçek adres, telefon, koordinat, saatler (her gün 09:00–00:00), `servesCuisine`: Turkish, Pizza; `hasMenu`: /menu; `sameAs`: Instagram.
- Open Graph görseli: `dis-cephe.jpg`.

## Kontrol
- 390px genişlikte her sayfa düzgün görünsün, yatay kaydırma olmasın.
- Tüm butonlar gerçekten doğru numarayı ve linki açsın.
- `npm run build` hatasız geçsin.
