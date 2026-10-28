import { SITE } from "@/lib/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-accent text-background">
      <p className="mx-auto max-w-6xl px-5 py-2 text-center text-sm font-bold uppercase tracking-wide sm:px-8">
        {SITE.announcements.join(" · ")}
      </p>
    </div>
  );
}
