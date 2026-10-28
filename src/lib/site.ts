// İşletme bilgileri. Aşama 4'te Supabase `business_info` tablosundan okunacak;
// buradaki değerler varsayılan / yedek olarak kalır.
const LAT = 37.7514166;
const LNG = 39.3241654;

export const SITE = {
  name: "Ömer Usta",
  fullName: "Ömer Usta – Pizza • Pide • Lahmacun",
  tagline: "Bir Usta, Bir Fırın, Sonsuz Lezzet",
  slogans: ["Lezzetin Yeni Adresi", "Geleneksel Lezzet, Usta Ellerden", "Afiyet Olsun"],
  title: "Ömer Usta | Siverek Pide, Lahmacun ve Pizza",
  description:
    "Siverek'te usta ellerden pide, lahmacun ve pizza. Menüyü inceleyin, hemen arayın veya WhatsApp'tan sipariş verin.",
  url: "https://omerusta.netlify.app",
  phone: "0538 038 00 87",
  phoneHref: "tel:+905380380087",
  whatsappNumber: "905380380087",
  address: "Camikebir Mahallesi, Atatürk Bulvarı No: 123/A, 63600 Siverek / Şanlıurfa",
  addressNote: "Yılmaz Güney Heykeli çaprazı, Baklavacı Şemsettin yanı",
  instagramHandle: "@siverekomerusta_pide",
  instagramUrl: "https://www.instagram.com/siverekomerusta_pide",
  lat: LAT,
  lng: LNG,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`,
  hoursText: "Her gün 09:00 – 00:00",
  openHour: 9,
  closeHour: 24, // 00:00 günün sonu sayılır
  announcements: ["Açılışa özel çorba ikramı", "Toplu sipariş alınır"],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export function whatsappLink(message = "Merhaba, sipariş vermek istiyorum.") {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
