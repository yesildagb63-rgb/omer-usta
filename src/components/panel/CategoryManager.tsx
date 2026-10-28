"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { refreshMenu } from "@/app/actions";
import Switch from "./Switch";
import { btnPrimary, inputCls, type CategoryRow } from "./types";

const slugify = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function NameInput({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [text, setText] = useState(value);
  return (
    <input
      aria-label="Kategori adı"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => (text.trim() && text !== value ? onSave(text.trim()) : setText(value))}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
      className={inputCls}
    />
  );
}

export default function CategoryManager() {
  const supabase = useMemo(() => createClient(), []);
  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [newName, setNewName] = useState("");

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("categories").select("*").order("sort_order");
    if (error) setMsg("Kategoriler yüklenemedi.");
    setCats((data as CategoryRow[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const done = async (error: { message: string } | null, ok = "Kaydedildi") => {
    if (error) return setMsg("İşlem yapılamadı: " + error.message);
    try {
      await refreshMenu();
    } catch {
      // en geç 1 dakikada site kendiliğinden güncellenir
    }
    setMsg(ok);
    await load();
  };

  const add = async (e: FormEvent) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const id = `${slugify(name) || "kategori"}-${Math.random().toString(36).slice(2, 5)}`;
    const { error } = await supabase.from("categories").insert({ id, name, sort_order: cats.length });
    if (!error) setNewName("");
    await done(error, "Kategori eklendi");
  };

  const move = async (i: number, dir: -1 | 1) => {
    if (!cats[i + dir]) return;
    const ids = cats.map((c) => c.id);
    [ids[i], ids[i + dir]] = [ids[i + dir], ids[i]];
    const results = await Promise.all(ids.map((id, n) => supabase.from("categories").update({ sort_order: n }).eq("id", id)));
    await done(results.find((r) => r.error)?.error ?? null, "Sıra değişti");
  };

  const remove = async (c: CategoryRow) => {
    const { count } = await supabase.from("products").select("id", { count: "exact", head: true }).eq("category_id", c.id);
    if (count) return setMsg(`"${c.name}" içinde ${count} ürün var. Önce ürünleri silin veya başka kategoriye taşıyın.`);
    if (!window.confirm(`"${c.name}" kategorisini silmek istediğinize emin misiniz?`)) return;
    const { error } = await supabase.from("categories").delete().eq("id", c.id);
    await done(error, "Kategori silindi");
  };

  if (loading) return <p className="text-center text-muted">Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl tracking-wide">KATEGORİLER</h1>
      <p role="status" className="min-h-6 text-center text-sm font-semibold text-accent">
        {msg}
      </p>

      <ul className="space-y-3">
        {cats.map((c, i) => (
          <li key={c.id} className="space-y-2 rounded-2xl border border-border bg-surface p-4">
            <NameInput value={c.name} onSave={async (name) => done((await supabase.from("categories").update({ name }).eq("id", c.id)).error)} />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted">Menüde göster</span>
                <Switch checked={c.is_active} onChange={async (v) => done((await supabase.from("categories").update({ is_active: v }).eq("id", c.id)).error)} label={`${c.name} menüde göster`} />
              </div>
              <div className="flex">
                <button type="button" aria-label="Yukarı taşı" disabled={i === 0} onClick={() => move(i, -1)} className="inline-flex size-12 items-center justify-center disabled:opacity-30">
                  <ArrowUp size={20} aria-hidden />
                </button>
                <button type="button" aria-label="Aşağı taşı" disabled={i === cats.length - 1} onClick={() => move(i, 1)} className="inline-flex size-12 items-center justify-center disabled:opacity-30">
                  <ArrowDown size={20} aria-hidden />
                </button>
                <button type="button" aria-label={`${c.name} kategorisini sil`} onClick={() => remove(c)} className="inline-flex size-12 items-center justify-center text-red-300">
                  <Trash2 size={20} aria-hidden />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={add} className="flex gap-2">
        <input aria-label="Yeni kategori adı" placeholder="Yeni kategori adı" value={newName} onChange={(e) => setNewName(e.target.value)} className={inputCls} />
        <button type="submit" className={`${btnPrimary} shrink-0`}>
          Ekle
        </button>
      </form>
    </div>
  );
}
