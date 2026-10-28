"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cerez-bilgi-tamam";

export default function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem(KEY);
    } catch {
      // localStorage kapalıysa çubuğu göster
    }
    if (seen) return;
    const id = setTimeout(() => setShow(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // localStorage kapalıysa yalnızca bu oturumda gizle
    }
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Çerez bilgilendirmesi"
      className="fixed inset-x-3 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-xl rounded-2xl border border-border bg-surface p-4 shadow-xl md:bottom-4"
    >
      <p className="text-sm text-muted">
        Sitemizde yalnızca sitenin çalışması için zorunlu çerezler kullanılır; analitik veya pazarlama çerezi yoktur.{" "}
        <Link href="/kvkk" className="inline-flex min-h-12 items-center text-accent underline">
          Aydınlatma Metni
        </Link>
      </p>
      <button
        type="button"
        onClick={accept}
        className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold uppercase text-background"
      >
        Tamam
      </button>
    </div>
  );
}
