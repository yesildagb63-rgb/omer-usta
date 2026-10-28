export type CategoryRow = { id: string; name: string; sort_order: number; is_active: boolean };
export type VariantRow = { id?: string; product_id?: string; name: string; price: number; sort_order: number };
export type ProductRow = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  tags: string[];
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  product_variants: VariantRow[];
};

export const TAGS = ["Acılı", "Vejetaryen", "Yeni", "Çok Satan"] as const;

export const inputCls =
  "min-h-12 w-full rounded-xl border border-border bg-surface-2 px-4 text-base placeholder:text-muted focus:border-accent focus:outline-none";
export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-bold text-background hover:bg-accent-strong disabled:opacity-50";
export const btnOutline =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-border px-5 font-semibold hover:border-accent disabled:opacity-50";
