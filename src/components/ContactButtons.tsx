import { MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { InstagramIcon } from "./icons";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-bold transition-colors";

export default function ContactButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <a href={SITE.phoneHref} className={`${base} bg-accent text-background hover:bg-accent-strong`}>
        <Phone size={18} aria-hidden /> Ara
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-2 border-accent text-accent hover:bg-accent hover:text-background`}
      >
        <MessageCircle size={18} aria-hidden /> WhatsApp
      </a>
      <a
        href={SITE.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-2 border-border hover:border-accent`}
      >
        <InstagramIcon size={18} /> Instagram
      </a>
      <a
        href={SITE.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-2 border-border hover:border-accent`}
      >
        <MapPin size={18} aria-hidden /> Yol Tarifi
      </a>
    </div>
  );
}
