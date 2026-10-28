"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

// Mobilde tüm sayfalarda altta sabit Ara + WhatsApp. /menu kendi alt barını kullanır.
export function BottomBar({ whatsappLabel = "WhatsApp" }: { whatsappLabel?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl gap-3 px-4 py-2">
        <a
          href={SITE.phoneHref}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-accent font-bold text-accent"
        >
          <Phone size={18} aria-hidden /> Ara
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 flex-[2] items-center justify-center gap-2 rounded-full bg-accent font-bold text-background"
        >
          <MessageCircle size={18} aria-hidden /> {whatsappLabel}
        </a>
      </div>
    </div>
  );
}

export default function StickyActions() {
  const pathname = usePathname();
  if (pathname === "/menu") return null;
  return <BottomBar />;
}
