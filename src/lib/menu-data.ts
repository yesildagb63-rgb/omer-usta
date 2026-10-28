// Ömer Usta – Menü verisi
// Kaynak: işletmenin basılı menüsü (Ekim 2026).
// Aşama 4'te bu veri Supabase'e taşınacak; o zamana kadar menü buradan okunur.
// price: null olan ürünlerin fiyatı henüz belli değil (sitede fiyat yerine "Sorunuz" gösterilir).

export type Variant = { name: string; price: number };

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number | null;      // tek fiyatlı ürünler
  variants?: Variant[];      // boy seçenekli ürünler (pizza: Orta / Büyük)
  image?: string | null;     // gerçek ürün fotoğrafı gelince: /images/urunler/<id>.jpg
  tags?: ("Yeni" | "Çok Satan" | "Acılı" | "Vejetaryen")[];
  isAvailable: boolean;
  isFeatured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  products: Product[];
};

export const menuNotes = {
  campaign: "Açılışa özel çorba ikramı",
  bulkOrder: "Toplu sipariş alınır",
  vat: "Fiyatlarımıza KDV dahildir",
};

export const categories: Category[] = [
  {
    id: "lahmacun",
    name: "Lahmacun",
    products: [
      { id: "lahmacun", name: "Lahmacun", price: 70, isAvailable: true, isFeatured: true, tags: ["Çok Satan"] },
      { id: "antep-lahmacun", name: "Antep Lahmacun", price: 80, isAvailable: true, isFeatured: true },
    ],
  },
  {
    id: "pideler",
    name: "Pideler",
    products: [
      { id: "kiymali-pide", name: "Kıymalı Pide", price: 200, isAvailable: true, isFeatured: true },
      { id: "kiymali-kasarli", name: "Kıymalı Kaşarlı Pide", price: 200, isAvailable: true },
      { id: "kiymali-yumurtali", name: "Kıymalı Yumurtalı Pide", price: 200, isAvailable: true },
      { id: "kusbasili-pide", name: "Kuşbaşılı Pide", price: 220, isAvailable: true, isFeatured: true },
      { id: "kusbasili-kasarli", name: "Kuşbaşılı Kaşarlı Pide", price: 220, isAvailable: true },
      { id: "kusbasili-yumurtali", name: "Kuşbaşılı Yumurtalı Pide", price: 220, isAvailable: true },
      { id: "kasarli-pide", name: "Kaşarlı Pide", price: 220, isAvailable: true },
      { id: "kasarli-sucuklu", name: "Kaşarlı Sucuklu Pide", price: 220, isAvailable: true },
      { id: "kasarli-yumurtali", name: "Kaşarlı Yumurtalı Pide", price: 220, isAvailable: true },
      { id: "beyaz-peynirli-pide", name: "Beyaz Peynirli Pide", price: 220, isAvailable: true, tags: ["Vejetaryen"] },
      { id: "sebzeli-pide", name: "Sebzeli Pide", price: 220, isAvailable: true, tags: ["Vejetaryen"] },
      { id: "karisik-pide", name: "Karışık Pide", price: 250, isAvailable: true, isFeatured: true },
    ],
  },
  {
    id: "pizzalar",
    name: "Pizzalar",
    products: [
      { id: "margarita", name: "Margarita", price: null, variants: [{ name: "Orta Boy", price: 270 }, { name: "Büyük Boy", price: 420 }], isAvailable: true, tags: ["Vejetaryen"] },
      { id: "vejeteryan-pizza", name: "Vejeteryan", price: null, variants: [{ name: "Orta Boy", price: 280 }, { name: "Büyük Boy", price: 450 }], isAvailable: true, tags: ["Vejetaryen"] },
      { id: "sucuklu-pizza", name: "Sucuklu", price: null, variants: [{ name: "Orta Boy", price: 280 }, { name: "Büyük Boy", price: 430 }], isAvailable: true },
      { id: "karisik-pizza", name: "Karışık", price: null, variants: [{ name: "Orta Boy", price: 300 }, { name: "Büyük Boy", price: 450 }], isAvailable: true, isFeatured: true },
      { id: "kavurmali-pizza", name: "Kavurmalı", price: null, variants: [{ name: "Orta Boy", price: 300 }, { name: "Büyük Boy", price: 500 }], isAvailable: true },
      { id: "salam-sucuk-pizza", name: "Salam Sucuk", price: null, variants: [{ name: "Orta Boy", price: 290 }], isAvailable: true },
      { id: "beyaz-peynirli-pizza", name: "Beyaz Peynirli", price: null, variants: [{ name: "Orta Boy", price: 280 }], isAvailable: true, tags: ["Vejetaryen"] },
    ],
  },
  {
    id: "yan-urunler",
    name: "Yan Ürünler",
    products: [
      { id: "patates-kizartmasi", name: "Patates Kızartması", price: 150, isAvailable: true },
    ],
  },
  {
    id: "icecekler",
    name: "İçecekler",
    products: [
      { id: "kola", name: "Kola", price: null, isAvailable: true },
      { id: "yedigun", name: "Yedigün", price: null, isAvailable: true },
      { id: "sprite", name: "Sprite", price: null, isAvailable: true },
      { id: "ayran", name: "Ayran", price: null, isAvailable: true },
      { id: "salgam", name: "Şalgam", price: null, isAvailable: true },
      { id: "soda", name: "Soda", price: null, isAvailable: true },
      { id: "meyve-suyu", name: "Meyve Suyu", price: null, isAvailable: true },
    ],
  },
  {
    id: "tatlilar",
    name: "Tatlılar",
    products: [
      { id: "kunefe", name: "Künefe", price: null, isAvailable: true },
      { id: "katmer", name: "Katmer", price: null, isAvailable: true },
    ],
  },
];

// Yardımcı: bir ürünün en düşük fiyatı ("270 ₺'den başlayan" gösterimi için)
export function startingPrice(p: Product): number | null {
  if (p.variants?.length) return Math.min(...p.variants.map((v) => v.price));
  return p.price;
}

export const featuredProducts = categories.flatMap((c) => c.products).filter((p) => p.isFeatured && p.isAvailable);
