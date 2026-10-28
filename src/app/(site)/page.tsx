import Image from "next/image";
import Link from "next/link";
import { Flame, HeartHandshake, Leaf } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import OpenBadge from "@/components/OpenBadge";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import Gallery, { type GalleryImage } from "@/components/Gallery";
import LocationSection from "@/components/LocationSection";
import { SITE } from "@/lib/site";
import { getCategories } from "@/lib/data";

const VALUES = [
  { icon: Flame, title: "Usta İşi Lezzet", text: "Her hamur, her tarif usta ellerde şekillenir." },
  { icon: Leaf, title: "Taze Malzeme", text: "Günlük hazırlanan taze malzemelerle pişirilir." },
  { icon: HeartHandshake, title: "Kaliteli Hizmet", text: "Sıcak karşılama, hızlı ve özenli servis." },
];

const GALLERY: GalleryImage[] = [
  { src: "/images/dukkan/salon-1.jpg", alt: "Ömer Usta salonu, tuğla duvar ve sıcak ışık" },
  { src: "/images/dukkan/salon-2.jpg", alt: "Mermer masalar ve salon içi" },
  { src: "/images/dukkan/salon-3.jpg", alt: "Salonun farklı bir köşesi" },
  { src: "/images/dukkan/tezgah.jpg", alt: "Fırın ve tezgâh alanı" },
];

export default async function Home() {
  const categories = await getCategories();
  const featured = categories.flatMap((c) => c.products.map((p) => ({ p, categoryId: c.id }))).filter(({ p }) => p.isFeatured && p.isAvailable);

  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden md:items-center">
        <Image
          src="/images/dukkan/dis-cephe.jpg"
          alt="Ömer Usta'nın geceleri ışıklı tabelası ve vitrini"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[50%_30%] md:object-[50%_20%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/30 md:bg-gradient-to-r md:from-background md:via-background/70 md:to-transparent" />
        <Container className="pb-28 pt-16 md:pb-16">
          <div className="max-w-xl space-y-4">
            <OpenBadge />
            <Image src="/logo.png" alt="Ömer Usta logosu" width={88} height={88} priority />
            <h1 className="font-display text-7xl leading-none sm:text-8xl">ÖMER USTA</h1>
            <p className="font-display text-2xl tracking-wide sm:text-3xl">Pizza • Pide • Lahmacun</p>
            <p className="text-lg text-accent">{SITE.tagline}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/menu">Menüyü Gör</Button>
              <Button href={SITE.phoneHref} variant="outline">
                Hemen Ara
              </Button>
              <Button href={SITE.directionsUrl} variant="outline">
                Yol Tarifi
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <AnnouncementBar />

      <section className="py-16" aria-labelledby="degerler">
        <Container>
          <h2 id="degerler" className="sr-only">
            Değerlerimiz
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-border bg-surface p-6">
                <Icon className="mb-4 text-accent" size={32} strokeWidth={1.5} aria-hidden />
                <h3 className="font-display text-2xl tracking-wide">{title}</h3>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-16" aria-labelledby="one-cikanlar">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="one-cikanlar" className="font-display text-5xl tracking-wide">
              ÖNE ÇIKANLAR
            </h2>
            <Link href="/menu" className="inline-flex min-h-12 items-center font-semibold text-accent hover:underline">
              Tüm Menü
            </Link>
          </div>
          <ul className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0">
            {featured.map(({ p, categoryId }) => (
              <li key={p.id} className="flex w-64 shrink-0 snap-start">
                <ProductCard product={p} categoryId={categoryId} className="flex-1" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface py-16" aria-labelledby="hakkimizda">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/dukkan/salon-1.jpg"
              alt="Ömer Usta salonu"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 id="hakkimizda" className="font-display text-5xl tracking-wide">
              BİR USTA, BİR FIRIN
            </h2>
            <p className="text-muted">
              Siverek&apos;in kalbinde, fırından çıkan sıcak pide, lahmacun ve pizza sunuyoruz. Hamurumuzu her gün taze
              hazırlıyor, geleneksel tarifleri usta ellerle pişiriyoruz.
            </p>
            <p className="text-muted">Tuğla duvarlı sıcak salonumuzda sizi ağırlamaktan mutluluk duyarız. Afiyet olsun.</p>
          </div>
        </Container>
      </section>

      <section className="py-16" aria-labelledby="galeri">
        <Container>
          <h2 id="galeri" className="mb-6 font-display text-5xl tracking-wide">
            GALERİ
          </h2>
          <Gallery images={GALLERY} />
        </Container>
      </section>

      <section className="bg-surface py-12" aria-labelledby="degerlendirme">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 id="degerlendirme" className="font-display text-4xl tracking-wide">
            BİZİ DEĞERLENDİRİN
          </h2>
          <Button href={`https://www.google.com/maps/search/?api=1&query=${SITE.lat},${SITE.lng}`}>
            Google&apos;da Değerlendirin
          </Button>
        </Container>
      </section>

      <LocationSection />
    </>
  );
}
