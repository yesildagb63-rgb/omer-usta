"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import type { Category, Product } from "@/lib/menu-data";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const normalize = (s: string) => s.toLocaleLowerCase("tr-TR").trim();

export default function MenuView({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const [selected, setSelected] = useState<{ product: Product; categoryId: string } | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const visible = useMemo(() => {
    const q = normalize(query);
    return categories
      .map((c) => ({
        ...c,
        products: c.products.filter((p) => p.isAvailable && (!q || normalize(p.name).includes(q))),
      }))
      .filter((c) => c.products.length > 0);
  }, [categories, query]);

  // Kaydırdıkça aktif sekmeyi güncelle
  useEffect(() => {
    const sections = visible.map((c) => document.getElementById(`kategori-${c.id}`)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id.replace("kategori-", ""));
      },
      { rootMargin: "-210px 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [visible]);

  // Aktif sekmeyi sekme çubuğunda görünür tut
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    el?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  return (
    <>
      <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl space-y-2 px-5 py-3 sm:px-8">
          <label className="relative block">
            <span className="sr-only">Menüde ara</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="min-h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-base placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </label>
          <nav aria-label="Kategoriler">
            <div ref={tabsRef} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
              {visible.map((c) => (
                <a
                  key={c.id}
                  href={`#kategori-${c.id}`}
                  data-tab={c.id}
                  aria-current={active === c.id ? "true" : undefined}
                  className={`inline-flex min-h-12 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                    active === c.id
                      ? "border-accent bg-accent text-background"
                      : "border-border text-foreground hover:border-accent"
                  }`}
                >
                  {c.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-10 px-5 py-8 sm:px-8">
        {visible.length === 0 && (
          <p className="py-16 text-center text-muted">&ldquo;{query}&rdquo; için sonuç bulunamadı.</p>
        )}
        {visible.map((c) => (
          <section key={c.id} id={`kategori-${c.id}`} aria-labelledby={`baslik-${c.id}`} className="scroll-mt-52">
            <h2 id={`baslik-${c.id}`} className="mb-4 font-display text-4xl tracking-wide">
              {c.name}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  categoryId={c.id}
                  onSelect={(product) => setSelected({ product, categoryId: c.id })}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {selected && <ProductModal product={selected.product} categoryId={selected.categoryId} onClose={closeModal} />}
    </>
  );
}
