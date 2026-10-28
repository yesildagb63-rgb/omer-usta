import { Suspense } from "react";
import ProductForm from "@/components/panel/ProductForm";

export default function ProductPage() {
  return (
    <Suspense fallback={<p className="text-center text-muted">Yükleniyor...</p>}>
      <ProductForm />
    </Suspense>
  );
}
