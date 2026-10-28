import type { Metadata } from "next";
import Container from "@/components/Container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

const RIGHTS = [
  "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
  "İşlenmişse buna ilişkin bilgi talep etme,",
  "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
  "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
  "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
  "KVKK md. 7 kapsamında silinmesini veya yok edilmesini isteme,",
  "Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
  "İşlenen verilerin analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme,",
  "Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
];

export default function KvkkPage() {
  return (
    <Container className="max-w-3xl space-y-8 py-12 pb-28 md:pb-12">
      <header className="space-y-2">
        <h1 className="font-display text-5xl tracking-wide">KVKK AYDINLATMA METNİ</h1>
        <p className="text-sm text-muted">
          Taslak metindir. Köşeli parantez içindeki alanlar yayından önce doldurulmalı ve hukuki danışmanlıkla
          kontrol edilmelidir.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="font-display text-3xl tracking-wide text-accent">1. Veri Sorumlusu</h2>
        <p className="text-muted">
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca veri sorumlusu:
        </p>
        <ul className="space-y-1 text-muted">
          <li>Unvan: [İŞLETME UNVANI]</li>
          <li>Vergi Dairesi / No: [VERGİ DAİRESİ / NO]</li>
          <li>Adres: {SITE.address}</li>
          <li>Telefon: {SITE.phone}</li>
          <li>E-posta: [E-POSTA]</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-3xl tracking-wide text-accent">2. İşlenen Kişisel Veriler ve Amaç</h2>
        <ul className="list-disc space-y-1 pl-5 text-muted">
          <li>
            <strong className="text-foreground">İletişim formu:</strong> ad, telefon ve mesaj içeriği. Mesajınıza yanıt
            vermek ve talebinizi sonuçlandırmak amacıyla işlenir.
          </li>
          <li>
            <strong className="text-foreground">Zorunlu çerezler:</strong> sitenin çalışması için gereklidir (örneğin
            çerez bilgilendirmesini kapattığınız tercihin hatırlanması). Analitik veya pazarlama çerezi kullanılmaz.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-3xl tracking-wide text-accent">3. Hukuki Sebep</h2>
        <p className="text-muted">
          Verileriniz KVKK md. 5/2-(c) (bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması) ve 5/2-(f)
          (veri sorumlusunun meşru menfaati) hukuki sebeplerine dayanılarak işlenir.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-3xl tracking-wide text-accent">4. Aktarım</h2>
        <p className="text-muted">
          Verileriniz yasal yükümlülükler dışında üçüncü kişilerle paylaşılmaz. Verilerin barındırıldığı altyapı
          hizmeti sağlayıcıları teknik hizmet kapsamında verilere erişebilir.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-3xl tracking-wide text-accent">5. Saklama Süresi</h2>
        <p className="text-muted">
          İletişim formu verileri, talebin sonuçlandırılmasından itibaren en fazla [SAKLAMA SÜRESİ, örn. 1 yıl]
          saklanır, ardından silinir veya anonim hâle getirilir.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-3xl tracking-wide text-accent">6. Haklarınız (KVKK md. 11)</h2>
        <p className="text-muted">Veri sahibi olarak şu haklara sahipsiniz:</p>
        <ul className="list-disc space-y-1 pl-5 text-muted">
          {RIGHTS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-3xl tracking-wide text-accent">7. Başvuru Yolu</h2>
        <p className="text-muted">
          Taleplerinizi yazılı olarak yukarıdaki adrese veya [E-POSTA] adresine iletebilirsiniz. Başvurunuz en geç 30
          gün içinde sonuçlandırılır.
        </p>
      </section>
    </Container>
  );
}
