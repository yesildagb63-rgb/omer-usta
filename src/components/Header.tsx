"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Container from "./Container";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex min-h-12 items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Ömer Usta logosu" width={44} height={44} priority />
          <span className="font-display text-2xl tracking-wide">{SITE.name.toUpperCase()}</span>
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-background hover:bg-accent-strong"
          >
            <Phone size={16} aria-hidden /> Ara
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-full text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobil-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>
      </Container>

      {open && (
        <nav id="mobil-menu" aria-label="Mobil menü" className="border-t border-border bg-surface md:hidden">
          <Container className="flex flex-col py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center text-lg font-semibold"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={SITE.phoneHref}
              className="my-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent font-bold text-background"
            >
              <Phone size={18} aria-hidden /> {SITE.phone}
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
