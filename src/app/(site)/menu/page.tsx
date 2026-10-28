import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import MenuView from "@/components/MenuView";
import { BottomBar } from "@/components/StickyActions";
import { getCategories } from "@/lib/data";
import { menuNotes } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menü",
  description: "Ömer Usta menüsü: lahmacun, pide, pizza, yan ürünler, içecekler ve tatlılar.",
  alternates: { canonical: "/menu" },
};

export default async function MenuPage() {
  const categories = await getCategories();
  return (
    <>
      <AnnouncementBar />
      <h1 className="sr-only">Menü</h1>
      <MenuView categories={categories} />
      <p className="px-5 pb-28 text-center text-sm text-muted md:pb-10">{menuNotes.vat}</p>
      <BottomBar whatsappLabel="WhatsApp'tan Sipariş" />
    </>
  );
}
