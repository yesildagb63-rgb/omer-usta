"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { refreshMenu } from "@/app/actions";
import { CategoryIcon } from "../icons";
import Switch from "./Switch";
import { btnPrimary, inputCls, type CategoryRow, type ProductRow } from "./types";

// Fiyat kutusu: yazıp alandan çıkınca (veya Enter ile) kaydeder
function PriceInput({ value, label, onSave }: { value: number | null; label: string; onSave: (v: number) => Promise<void> }) {
  const [text, setText] = useState(value === null ? "" : String(value));
  const save = async () => {
    const n = Number(text);
    if (text === "" || !Number.isFinite(n) || n < 0 || n === value) return setText(value === null ? "" : String(value));
    await onSave(Math.round(n));
  };
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm text-muted">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        className={`${inputCls} w-28`}
        aria-label={`${label} fiyatı (₺)`}
      />
      <span className="text-muted">₺</span>
    </label>
  );
}

export default function ProductList() {
  const supabase = useMemo(() => createClient(), []);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const [c, p] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("products").select("*, product_variants(*)").order("sort_order"),
    ]);
    if (c.error || p.error) setMsg("Veriler yüklenemedi. İnternetinizi kontrol edin.");
    setCategories((c.data as CategoryRow[]) ?? []);
    setProducts((p.data as ProductRow[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const done = async (error: { message: string } | null, okText = "Kaydedildi") => {
    if (error) return setMsg("Kaydedilemedi: " + error.message);
    try {
      await refreshMenu();
    } catch {
      // Önbellek yenilenemese de en geç 1 dakikada site güncellenir
    }
    setMsg(okText);
    await load();
  };

  const setAvailable = async (p: ProductRow, v: boolean) => {
    const { error } = await supabase.from("products").update({ is_available: v }).eq("id", p.id);
    await done(error, v ? "Menüde gösteriliyor" : "Menüden gizlendi");
  };

  const setPrice = async (p: ProductRow, price: number) => {
    const { error } = await supabase.from("products").update({ price }).eq("id", p.id);
    await done(error, "Fiyat güncellendi");
  };

  const setVariantPrice = async (variantId: string, price: number) => {
    const { error } = await supabase.from("product_variants").update({ price }).eq("id", variantId);
    await done(error, "Fiyat güncellendi");
  };

  // Listeyi yer değiştirip indekse göre yeniden numaralandırır (aynı sıra numaraları olsa da çalışır)
  const move = async (list: ProductRow[], index: number, dir: -1 | 1) => {
    if (!list[index + dir]) return;
    const ids = list.map((p) => p.id);
    [ids[index], ids[index + dir]] = [ids[index + dir], ids[index]];
    const results = await Promise.all(ids.map((id, i) => supabase.from("products").update({ sort_order: i }).eq("id", id)));
    await done(results.find((r) => r.error)?.error ?? null, "Sıra değişti");
  };

  if (loading) return <p className="text-center text-muted">Yükleniyor...</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-4xl tracking-wide">ÜRÜNLER</h1>
        <Link href="/panel/urun/yeni" className={btnPrimary}>
          <Plus size={18} aria-hidden /> Yeni Ürün
        </Link>
      </div>

      <p role="status" className="sticky top-2 z-10 min-h-6 text-center text-sm font-semibold text-accent">
        {msg}
      </p>

      {categories.map((c) => {
        const list = products.filter((p) => p.category_id === c.id).sort((a, b) => a.sort_order - b.sort_order);
        return (
          <section key={c.id} aria-labelledby={`k-${c.id}`} className="space-y-3">
            <h2 id={`k-${c.id}`} className="font-display text-3xl tracking-wide text-accent">
              {c.name}
              {!c.is_active && <span className="ml-2 font-sans text-sm text-muted">(gizli kategori)</span>}
            </h2>
            {list.length === 0 && <p className="text-sm text-muted">Bu kategoride ürün yok.</p>}
            <ul className="space-y-3">
              {list.map((p, i) => (
                <li key={p.id} className={`space-y-3 rounded-2xl border border-border bg-surface p-4 ${p.is_available ? "" : "opacity-60"}`}>
                  <div className="flex items-center gap-3">
                    {p.image_url ? (
                      <Image src={p.image_url} alt="" width={56} height={56} className="size-14 shrink-0 rounded-xl object-cover" />
                    ) : (
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent/70">
                        <CategoryIcon categoryId={c.id} size={28} />
                      </span>
                    )}
                    <Link href={`/panel/urun/${p.id}`} className="flex min-h-12 flex-1 items-center text-lg font-semibold hover:text-accent">
                      {p.name}
                    </Link>
                    <div className="flex flex-col">
                      <button type="button" aria-label="Yukarı taşı" disabled={i === 0} onClick={() => move(list, i, -1)} className="inline-flex size-12 items-center justify-center disabled:opacity-30">
                        <ArrowUp size={20} aria-hidden />
                      </button>
                      <button type="button" aria-label="Aşağı taşı" disabled={i === list.length - 1} onClick={() => move(list, i, 1)} className="inline-flex size-12 items-center justify-center disabled:opacity-30">
                        <ArrowDown size={20} aria-hidden />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-3">
                      {p.product_variants.length > 0 ? (
                        [...p.product_variants]
                          .sort((a, b) => a.sort_order - b.sort_order)
                          .map((v) => <PriceInput key={`${v.id}-${v.price}`} value={v.price} label={v.name} onSave={(n) => setVariantPrice(v.id!, n)} />)
                      ) : (
                        <PriceInput key={`${p.id}-${p.price}`} value={p.price} label="Fiyat" onSave={(n) => setPrice(p, n)} />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted">Menüde göster</span>
                      <Switch checked={p.is_available} onChange={(v) => setAvailable(p, v)} label={`${p.name} menüde göster`} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
