"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

// Türkiye saatine göre (Europe/Istanbul) saat hesaplar; 00:00 günün sonu sayılır.
function istanbulHour(now = new Date()) {
  const h = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    hourCycle: "h23",
    timeZone: "Europe/Istanbul",
  }).format(now);
  return Number(h);
}

export function isOpenNow(now = new Date()) {
  const h = istanbulHour(now);
  return h >= SITE.openHour && h < SITE.closeHour;
}

export default function OpenBadge({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Sunucuda saat bilinmediği için ilk çizimde yer tutucu (yükseklik sabit kalsın)
  if (open === null) return <span className={`inline-block h-8 w-28 ${className}`} aria-hidden />;

  return (
    <span
      role="status"
      className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-sm font-semibold ${
        open ? "border-green-500/50 bg-green-500/15 text-green-300" : "border-red-400/50 bg-red-500/15 text-red-300"
      } ${className}`}
    >
      <span className={`size-2 rounded-full ${open ? "bg-green-400" : "bg-red-400"}`} aria-hidden />
      {open ? "Şu an açık" : "Şu an kapalı"}
    </span>
  );
}
