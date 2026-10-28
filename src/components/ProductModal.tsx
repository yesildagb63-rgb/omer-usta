"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Product } from "@/lib/menu-data";
import { whatsappLink } from "@/lib/site";
import { PriceLabel, ProductVisual } from "./ProductCard";
import Button from "./Button";

export default function ProductModal({
  product,
  categoryId,
  onClose,
}: {
  product: Product;
  categoryId: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="urun-baslik"
        className="max-h-[90svh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-border bg-surface sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <ProductVisual product={product} categoryId={categoryId} sizes="448px" className="aspect-[16/9] w-full" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Pencereyi kapat"
            className="absolute right-3 top-3 inline-flex size-12 items-center justify-center rounded-full bg-background/80 text-foreground"
          >
            <X size={22} aria-hidden />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <h2 id="urun-baslik" className="font-display text-4xl leading-none tracking-wide">
            {product.name}
          </h2>
          {product.description && <p className="text-muted">{product.description}</p>}
          {product.tags && product.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <li key={t} className="rounded-full border border-border px-2.5 py-1 text-sm text-muted">
                  {t}
                </li>
              ))}
            </ul>
          )}

          {product.variants && product.variants.length > 0 ? (
            <ul className="divide-y divide-border rounded-xl border border-border">
              {product.variants.map((v) => (
                <li key={v.name} className="flex min-h-12 items-center justify-between px-4">
                  <span>{v.name}</span>
                  <span className="font-display text-2xl text-accent">{v.price} ₺</span>
                </li>
              ))}
            </ul>
          ) : (
            <PriceLabel product={product} />
          )}

          <Button href={whatsappLink(`Merhaba, ${product.name} sipariş vermek istiyorum.`)} className="w-full">
            WhatsApp&apos;tan Sipariş
          </Button>
        </div>
      </div>
    </div>
  );
}
