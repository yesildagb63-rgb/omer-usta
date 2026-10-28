"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryImage = { src: string; alt: string };

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`${img.alt} fotoğrafını büyüt`}
              className="relative block aspect-square w-full overflow-hidden rounded-2xl border border-border"
              style={i === 0 ? { aspectRatio: "auto", height: "100%", minHeight: "16rem" } : undefined}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fotoğraf galerisi"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <div className="relative h-[80svh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-contain"
            />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-full bg-surface text-foreground"
          >
            <X size={24} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Önceki fotoğraf"
            className="absolute left-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-foreground"
          >
            <ChevronLeft size={24} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Sonraki fotoğraf"
            className="absolute right-3 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-foreground"
          >
            <ChevronRight size={24} aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
