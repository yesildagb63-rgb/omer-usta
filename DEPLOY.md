# Yayın ve Supabase Kurulum Rehberi

**[SİZ]** = senin yapman gereken adım (hesap açma, giriş). Diğerlerini komut olarak ver ya da Claude'a yaptır.

## A. GitHub'a yükleme

1. **[SİZ]** https://github.com adresinde ücretsiz hesap aç, e-postanı doğrula.
2. **[SİZ]** Sağ üstte **+ → New repository**. Ad: `omer-usta`. **Private** seç. "Add README / .gitignore" kutularını **işaretleme**. **Create repository**.
3. Git yüklü değilse https://git-scm.com/download/win adresinden kur (varsayılan ayarlar yeterli).
4. Proje klasöründe (VS Code terminali):
   ```
   git init
   git add .
   git commit -m "İlk sürüm"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADIN/omer-usta.git
   git push -u origin main
   ```
5. **[SİZ]** İlk `git push`'ta tarayıcı açılıp GitHub girişi isteyecek, izin ver.
6. Kontrol: GitHub'da repoyu aç. `.env.local` dosyasının **görünmemesi** gerekir (`.gitignore` engelliyor).

## B. Supabase (veritabanı + giriş + fotoğraf depolama)

1. **[SİZ]** https://supabase.com → **Start your project** → GitHub ile giriş yap.
2. **[SİZ]** **New project**: Ad `omer-usta`, güçlü bir **Database Password** belirle (bir yere kaydet), Region: **Frankfurt (eu-central-1)** gibi Avrupa'ya yakın bir bölge. Free planı seç. Oluşması ~2 dk sürer.
3. **[SİZ]** Soldan **SQL Editor → New query**. `supabase/migrations/0001_init.sql` dosyasının **tamamını** yapıştırıp **Run**. Sonra yeni bir sorguda `supabase/seed.sql` içeriğini yapıştırıp **Run** (mevcut menüyü aktarır).
4. **[SİZ]** **Authentication → Sign In / Providers → Email**: **"Allow new users to sign up"** seçeneğini **kapat** (kayıt olma kapalı olsun). Kaydet.
5. **[SİZ]** **Authentication → Users → Add user → Create new user**: kendi e-postanı ve şifreni yaz, **Auto Confirm User** işaretli olsun. Bu hesap panele girecek tek hesap.
6. **[SİZ]** **Project Settings → API**: **Project URL** ve **anon public** anahtarını kopyala.
7. Proje köküne `.env.local` dosyası oluştur (`.env.example` örnek):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
   Burada yalnızca **anon** anahtarı kullanılır; `service_role` anahtarını **asla** koda ya da GitHub'a koyma.
8. `npm run dev` → http://localhost:3000/panel → giriş yap. Fiyat değiştirip `/menu` sayfasında kontrol et.

## C. Netlify'a yayın

1. **[SİZ]** https://app.netlify.com → **Sign up with GitHub** ile giriş yap.
2. **[SİZ]** **Add new site → Import an existing project → GitHub** → `omer-usta` reposunu seç (Netlify GitHub'a erişim izni isteyecek, ver).
3. Build ayarları otomatik gelir (`netlify.toml` projede var). **Site configuration → Environment variables** bölümünde **[SİZ]** iki değişkeni ekle: `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` (B-7'deki değerler).
4. **Deploy site**. Bittiğinde `https://rastgele-ad.netlify.app` adresi çıkar. **Site configuration → Change site name** ile `omerusta` gibi bir ad ver → `https://omerusta.netlify.app`.
5. **[SİZ]** Supabase → **Authentication → URL Configuration**: **Site URL** alanına bu adresi yaz, **Redirect URLs** listesine `https://omerusta.netlify.app/**` ekle (şifre sıfırlama e-postası için).
6. Yayın adresi kesinleşince bana söyle: `src/lib/site.ts` içindeki `url` değerini güncelleyip QR kodunu üreteceğim.
7. Özel alan adı (isteğe bağlı): **Domain management → Add a domain**. Alan adını bir kayıt firmasından satın alman gerekir (ücretli, Netlify'ın kendisi ücretsiz).

## D. Yayından sonra kontrol

- Telefondan `/panel` → giriş → bir ürünün fiyatını değiştir → `/menu` sayfasını yenile (en geç 1 dakika, genelde anında).
- Çıkış yapıp `/panel` adresinin giriş istediğini doğrula.
- Google Haritalar / Instagram profiline site adresini ekle.
