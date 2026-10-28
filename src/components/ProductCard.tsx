import Image from "next/image";
import type { Product } from "@/lib/menu-data";
import { startingPrice } from "@/lib/menu-data";
import { CategoryIcon } from "./icons";

export function PriceLabel({ product, className = "" }: { product: Product; className?: string }) {
  const price = startingPrice(product);
  if (price === null) return <span className={`text-sm text-muted ${className}`}>Sorunuz</span>;
  return (
    <span className={`font-display text-2xl text-accent ${className}`}>
      {price} ₺{product.variants && product.variants.length > 1 ? <span className="font-sans text-sm text-muted">&apos;den</span> : null}
    </span>
  );
}

export function ProductVisual({
  product,
  categoryId,
  sizes,
  className = "",
}: {
  product: Product;
  categoryId: string;
  sizes: string;
  className?: string;
}) {
  if (product.image) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <Image src={product.image} alt={product.name} fill sizes={sizes} className="object-cover" loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center bg-surface-2 text-accent/70 ${className}`}>
      <CategoryIcon categoryId={categoryId} size={44} />
    </div>
  );
}

// Fotoğraf yoksa büyük ürün adı + fiyat + kategori ikonu; varsa üstte fotoğraf.
export default function ProductCard({
  product,
  categoryId,
  onSelect,
  className = "",
}: {
  product: Product;
  categoryId: string;
  onSelect?: (p: Product) => void;
  className?: string;
}) {
  const body = (
    <>
      {product.image ? (
        <ProductVisual product={product} categoryId={categoryId} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full" />
      ) : null}
      <div className="flex flex-1 flex-col gap-2 p-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight tracking-wide">{product.name}</h3>
          {!product.image && <CategoryIcon categoryId={categoryId} size={28} className="mt-0.5 shrink-0 text-accent" />}
        </div>
        {product.description && <p className="text-sm text-muted">{product.description}</p>}
        {product.tags && product.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <li key={t} className="rounded-full border border-border px-2.5 py-1 text-sm text-muted">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-1">
          <PriceLabel product={product} />
        </div>
      </div>
    </>
  );

  const cls = `flex min-h-12 w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60 ${className}`;

  if (!onSelect) return <article className={cls}>{body}</article>;
  return (
    <button type="button" onClick={() => onSelect(product)} className={cls} aria-label={`${product.name} detayları`}>
      {body}
    </button>
  );
}
