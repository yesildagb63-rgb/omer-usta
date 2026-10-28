import { Clock, MapPin, Phone } from "lucide-react";
import Container from "./Container";
import ContactButtons from "./ContactButtons";
import OpenBadge from "./OpenBadge";
import { SITE } from "@/lib/site";

export default function LocationSection({ id = "konum", headingLevel = 2 }: { id?: string; headingLevel?: 1 | 2 }) {
  const H = `h${headingLevel}` as "h1" | "h2";
  return (
    <section id={id} className="py-16" aria-labelledby={`${id}-baslik`}>
      <Container className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <H id={`${id}-baslik`} className="font-display text-5xl tracking-wide">
            KONUM VE İLETİŞİM
          </H>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-accent" size={20} aria-hidden />
              <div>
                <p>{SITE.address}</p>
                <p className="text-sm text-muted">{SITE.addressNote}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 shrink-0 text-accent" size={20} aria-hidden />
              <a href={SITE.phoneHref} className="inline-flex min-h-12 items-center hover:text-accent">
                {SITE.phone}
              </a>
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <Clock className="shrink-0 text-accent" size={20} aria-hidden />
              <span>{SITE.hoursText}</span>
              <OpenBadge />
            </li>
          </ul>
          <ContactButtons />
        </div>
        <iframe
          src={SITE.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ömer Usta konum"
          className="h-80 w-full rounded-2xl border border-border lg:h-full lg:min-h-96"
        />
      </Container>
    </section>
  );
}
