import type { Metadata } from "next";
import { Suspense } from "react";
import PanelShell from "@/components/panel/PanelShell";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="mt-10 text-center text-muted">Yükleniyor...</p>}>
      <PanelShell>{children}</PanelShell>
    </Suspense>
  );
}
