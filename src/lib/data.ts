import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import { categories as staticCategories, type Category, type Product } from "./menu-data";

export const hasSupabase = () => !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type VariantRow = { name: string; price: number; sort_order: number };
type ProductRow = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  tags: string[] | null;
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  product_variants: VariantRow[];
};
type CategoryRow = { id: string; name: string; sort_order: number; products: ProductRow[] };

export function mapProduct(p: ProductRow): Product {
  const variants = [...p.product_variants].sort((a, b) => a.sort_order - b.sort_order).map((v) => ({ name: v.name, price: v.price }));
  return {
    id: p.id,
    name: p.name,
    description: p.description ?? undefined,
    price: p.price,
    variants: variants.length ? variants : undefined,
    image: p.image_url,
    tags: (p.tags ?? []) as Product["tags"],
    isAvailable: p.is_available,
    isFeatured: p.is_featured,
  };
}

// Menü en fazla 1 dakikada güncellenir; panelden kaydedince "menu" etiketi hemen yenilenir.
// Supabase ayarlı değilse ya da hata olursa menu-data.ts içindeki yedek veri kullanılır.
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
  cacheTag("menu");

  if (!hasSupabase()) return staticCategories;
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, sort_order, products(*, product_variants(name, price, sort_order))")
      .eq("is_active", true)
      .order("sort_order");
    if (error || !data) throw error;
    return (data as unknown as CategoryRow[]).map((c) => ({
      id: c.id,
      name: c.name,
      products: [...c.products].sort((a, b) => a.sort_order - b.sort_order).map(mapProduct),
    }));
  } catch {
    return staticCategories;
  }
}
