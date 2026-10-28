import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import Container from "./Container";
import { InstagramIcon } from "./icons";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div className="flex items-start gap-4">
          <Image src="/logo.png" alt="Ömer Usta logosu" width={64} height={64} />
          <div>
            <p className="font-display text-2xl tracking-wide">{SITE.name.toUpperCase()}</p>
            <p className="text-sm text-muted">Pizza • Pide • Lahmacun</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-display text-xl tracking-wide text-accent">İLETİŞİM</p>
          <p className="flex gap-2 text-muted">
            <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            {SITE.address}
          </p>
          <a href={SITE.phoneHref} className="flex min-h-12 items-center gap-2 hover:text-accent">
            <Phone size={18} className="text-accent" aria-hidden />
            {SITE.phone}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center gap-2 hover:text-accent"
          >
            <InstagramIcon size={18} className="text-accent" />
            {SITE.instagramHandle}
          </a>
        </div>

        <nav aria-label="Alt menü" className="text-sm">
          <p className="mb-2 font-display text-xl tracking-wide text-accent">SAYFALAR</p>
          <ul>
            {[...NAV_LINKS, { href: "/kvkk", label: "KVKK Aydınlatma Metni" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-12 items-center text-muted hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-border py-5 pb-24 text-center text-sm text-muted md:pb-5">
        <p className="font-display text-xl tracking-wide text-foreground">Afiyet Olsun...</p>
        <p className="mt-1">© {SITE.name}. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}
