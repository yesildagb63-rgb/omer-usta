"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Camera, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/image";
import { refreshMenu } from "@/app/actions";
import Switch from "./Switch";
import { TAGS, btnOutline, btnPrimary, inputCls, type CategoryRow, type ProductRow } from "./types";

const BUCKET = "urunler";

const slugify = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Public URL'den storage yolunu çıkarır (silmek için)
const storagePath = (url: string | null) => url?.split(`/object/public/${BUCKET}/`)[1] ?? null;

type VariantDraft = { name: string; price: string };

export default function ProductForm() {
  const { id: routeId } = useParams<{ id: string }>();
  const isNew = routeId === "yeni";
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState<CategoryRow[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [useVariants, setUseVariants] = useState(false);
  const [variants, setVariants] = useState<VariantDraft[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<{ blob: Blob; preview: string } | null>(null);

  useEffect(() => {
    (async () => {
      const { data: cats } = await supabase.from("categories").select("*").order("sort_order");
      setCategories((cats as CategoryRow[]) ?? []);
      if (isNew) {
        setCategoryId((cats as CategoryRow[] | null)?.[0]?.id ?? "");
      } else {
        const { data } = await supabase.from("products").select("*, product_variants(*)").eq("id", routeId).single();
        const p = data as ProductRow | null;
        if (p) {
          setName(p.name);
          setDescription(p.description ?? "");
          setCategoryId(p.category_id);
          setPrice(p.price === null ? "" : String(p.price));
          setUseVariants(p.product_variants.length > 0);
          setVariants([...p.product_variants].sort((a, b) => a.sort_order - b.sort_order).map((v) => ({ name: v.name, price: String(v.price) })));
          setTags(p.tags ?? []);
          setFeatured(p.is_featured);
          setAvailable(p.is_available);
          setImageUrl(p.image_url);
        } else setMsg("Ürün bulunamadı.");
      }
      setLoading(false);
    })();
  }, [supabase, routeId, isNew]);

  const pickImage = async (file: File | undefined) => {
    if (!file) return;
    setMsg("Fotoğraf küçültülüyor...");
    try {
      const blob = await compressImage(file);
      setNewImage({ blob, preview: URL.createObjectURL(blob) });
      setMsg(`Fotoğraf hazır (${Math.round(blob.size / 1024)} KB).`);
    } catch {
      setMsg("Fotoğraf okunamadı. Başka bir fotoğraf deneyin.");
    }
  };

  const toggleTag = (t: string) => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryId) return setMsg("Önce bir kategori ekleyin.");
    const cleanVariants = variants.filter((v) => v.name.trim() && v.price !== "");
    if (useVariants && cleanVariants.length === 0) return setMsg("En az bir boy/porsiyon ekleyin.");

    setBusy(true);
    setMsg("");
    try {
      const id = isNew ? `${slugify(name) || "urun"}-${Math.random().toString(36).slice(2, 6)}` : routeId;

      let image_url = imageUrl;
      if (newImage) {
        const path = `${id}-${Date.now()}.webp`;
        const up = await supabase.storage.from(BUCKET).upload(path, newImage.blob, { contentType: "image/webp", cacheControl: "31536000" });
        if (up.error) throw up.error;
        image_url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
        const old = storagePath(imageUrl);
        if (old) await supabase.storage.from(BUCKET).remove([old]);
      }

      let sort_order: number | undefined;
      if (isNew) {
        const { data } = await supabase.from("products").select("sort_order").eq("category_id", categoryId).order("sort_order", { ascending: false }).limit(1);
        sort_order = ((data as { sort_order: number }[] | null)?.[0]?.sort_order ?? -1) + 1;
      }

      const row = {
        id,
        category_id: categoryId,
        name: name.trim(),
        description: description.trim() || null,
        price: useVariants || price === "" ? null : Math.round(Number(price)),
        image_url,
        tags,
        is_available: available,
        is_featured: featured,
        ...(sort_order !== undefined ? { sort_order } : {}),
      };
      const { error } = await supabase.from("products").upsert(row);
      if (error) throw error;

      await supabase.from("product_variants").delete().eq("product_id", id);
      if (useVariants) {
        const { error: ve } = await supabase.from("product_variants").insert(
          cleanVariants.map((v, i) => ({ product_id: id, name: v.name.trim(), price: Math.round(Number(v.price)), sort_order: i })),
        );
        if (ve) throw ve;
      }

      try {
        await refreshMenu();
      } catch {
        // en geç 1 dakikada site kendiliğinden güncellenir
      }
      router.push("/panel");
    } catch (err) {
      setMsg("Kaydedilemedi: " + (err instanceof Error ? err.message : (err as { message?: string }).message ?? "bilinmeyen hata"));
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`"${name}" ürününü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) return;
    setBusy(true);
    const old = storagePath(imageUrl);
    if (old) await supabase.storage.from(BUCKET).remove([old]);
    const { error } = await supabase.from("products").delete().eq("id", routeId);
    if (error) {
      setMsg("Silinemedi: " + error.message);
      return setBusy(false);
    }
    try {
      await refreshMenu();
    } catch {
      // en geç 1 dakikada site kendiliğinden güncellenir
    }
    router.push("/panel");
  };

  if (loading) return <p className="text-center text-muted">Yükleniyor...</p>;

  const shownImage = newImage?.preview ?? imageUrl;

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-4xl tracking-wide">{isNew ? "YENİ ÜRÜN" : "ÜRÜNÜ DÜZENLE"}</h1>
        <Link href="/panel" className="inline-flex min-h-12 items-center px-2 text-sm text-muted underline">
          Vazgeç
        </Link>
      </div>

      <div className="space-y-3">
        <span className="text-sm text-muted">Fotoğraf</span>
        {shownImage && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
            {/* blob: önizlemeler next/image ile optimize edilemez */}
            {newImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={shownImage} alt="Seçilen fotoğraf önizlemesi" className="size-full object-cover" />
            ) : (
              <Image src={shownImage} alt={name || "Ürün fotoğrafı"} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            )}
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => pickImage(e.target.files?.[0])} aria-label="Fotoğraf seç" />
        <button type="button" onClick={() => fileRef.current?.click()} className={`${btnOutline} w-full`}>
          <Camera size={20} aria-hidden /> {shownImage ? "Fotoğrafı Değiştir" : "Fotoğraf Çek / Seç"}
        </button>
      </div>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Ürün adı</span>
        <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Açıklama (isteğe bağlı)</span>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={`${inputCls} py-3`} />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-muted">Kategori</span>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputCls}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="space-y-3">
        <legend className="mb-1 text-sm text-muted">Fiyat</legend>
        <div className="flex items-center justify-between rounded-xl border border-border px-4">
          <span>Boy / porsiyon seçenekleri var</span>
          <Switch
            checked={useVariants}
            onChange={(v) => {
              setUseVariants(v);
              if (v && variants.length === 0) setVariants([{ name: "Orta Boy", price: "" }]);
            }}
            label="Boy seçenekleri var"
          />
        </div>
        {useVariants ? (
          <div className="space-y-2">
            {variants.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <input aria-label="Boy adı" placeholder="Örn. Büyük Boy" value={v.name} onChange={(e) => setVariants((vs) => vs.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} className={inputCls} />
                <input aria-label="Boy fiyatı (₺)" type="number" inputMode="numeric" min={0} placeholder="₺" value={v.price} onChange={(e) => setVariants((vs) => vs.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))} className={`${inputCls} w-28 shrink-0`} />
                <button type="button" aria-label="Boyu sil" onClick={() => setVariants((vs) => vs.filter((_, j) => j !== i))} className="inline-flex size-12 shrink-0 items-center justify-center text-muted hover:text-accent">
                  <Trash2 size={20} aria-hidden />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setVariants((vs) => [...vs, { name: "", price: "" }])} className={btnOutline}>
              <Plus size={18} aria-hidden /> Boy Ekle
            </button>
          </div>
        ) : (
          <label className="block space-y-1">
            <span className="text-sm text-muted">Fiyat (₺). Boş bırakırsanız menüde &ldquo;Sorunuz&rdquo; yazar.</span>
            <input type="number" inputMode="numeric" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className={inputCls} />
          </label>
        )}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm text-muted">Etiketler</legend>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tags.includes(t)}
              onClick={() => toggleTag(t)}
              className={`inline-flex min-h-12 items-center rounded-full border px-5 ${tags.includes(t) ? "border-accent bg-accent text-background font-bold" : "border-border"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="divide-y divide-border rounded-xl border border-border px-4">
        <div className="flex items-center justify-between">
          <span>Öne çıkan (ana sayfada göster)</span>
          <Switch checked={featured} onChange={setFeatured} label="Öne çıkan" />
        </div>
        <div className="flex items-center justify-between">
          <span>Menüde göster</span>
          <Switch checked={available} onChange={setAvailable} label="Menüde göster" />
        </div>
      </div>

      {msg && (
        <p role="status" className="text-center text-sm font-semibold text-accent">
          {msg}
        </p>
      )}

      <div className="space-y-3">
        <button type="submit" disabled={busy} className={`${btnPrimary} w-full`}>
          {busy ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {!isNew && (
          <button type="button" onClick={remove} disabled={busy} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-red-400/60 font-semibold text-red-300 disabled:opacity-50">
            <Trash2 size={18} aria-hidden /> Ürünü Sil
          </button>
        )}
      </div>
    </form>
  );
}
