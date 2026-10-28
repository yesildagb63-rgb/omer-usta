import { CupSoda, Cookie, Pizza, Sandwich, UtensilsCrossed, Wheat } from "lucide-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ size?: number; className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;

// Kategoriye göre ince çizgi ikon (ürün fotoğrafı yokken kartlarda kullanılır)
const CATEGORY_ICONS: Record<string, IconType> = {
  lahmacun: Wheat,
  pideler: Sandwich,
  pizzalar: Pizza,
  "yan-urunler": UtensilsCrossed,
  icecekler: CupSoda,
  tatlilar: Cookie,
};

export function CategoryIcon({ categoryId, size = 40, className = "" }: { categoryId: string; size?: number; className?: string }) {
  const Icon = CATEGORY_ICONS[categoryId] ?? UtensilsCrossed;
  return <Icon size={size} strokeWidth={1.25} className={className} aria-hidden />;
}

export function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
