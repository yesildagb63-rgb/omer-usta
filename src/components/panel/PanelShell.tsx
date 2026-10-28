"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { btnPrimary, inputCls } from "./types";

const NAV = [
  { href: "/panel", label: "Ürünler" },
  { href: "/panel/kategoriler", label: "Kategoriler" },
];

function LoginForm() {
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg("E-posta veya şifre hatalı.");
    setBusy(false);
  };

  const forgot = async () => {
    if (!email) return setMsg("Önce e-posta adresinizi yazın.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/panel/sifre`,
    });
    setMsg(error ? "Gönderilemedi, tekrar deneyin." : "Şifre yenileme bağlantısı e-postanıza gönderildi.");
  };

  return (
    <form onSubmit={login} className="mx-auto mt-10 w-full max-w-sm space-y-4 rounded-2xl border border-border bg-surface p-6">
      <h1 className="font-display text-4xl tracking-wide">PANEL GİRİŞİ</h1>
      <label className="block space-y-1">
        <span className="text-sm text-muted">E-posta</span>
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
      </label>
      <label className="block space-y-1">
        <span className="text-sm text-muted">Şifre</span>
        <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
      </label>
      {msg && (
        <p role="alert" className="text-sm text-accent">
          {msg}
        </p>
      )}
      <button type="submit" disabled={busy} className={`${btnPrimary} w-full`}>
        {busy ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
      <button type="button" onClick={forgot} className="inline-flex min-h-12 w-full items-center justify-center text-sm text-muted underline">
        Şifremi unuttum
      </button>
    </form>
  );
}

export default function PanelShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = useMemo(() => (configured ? createClient() : null), [configured]);
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  // Şifre yenileme sayfası giriş istemeden açılır (e-postadaki bağlantının oturumunu kullanır)
  if (pathname.startsWith("/panel/sifre")) return <div className="mx-auto w-full max-w-lg px-5 py-8">{children}</div>;

  let body: ReactNode;
  if (!configured) {
    body = <p className="mt-10 rounded-2xl border border-border bg-surface p-6">Panel henüz yapılandırılmadı.</p>;
  } else if (session === undefined) {
    body = <p className="mt-10 text-center text-muted">Yükleniyor...</p>;
  } else if (!session) {
    body = <LoginForm />;
  } else {
    body = children;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16">
      <header className="flex items-center gap-3 py-3">
        <Image src="/logo.png" alt="Ömer Usta" width={40} height={40} />
        <span className="font-display text-2xl tracking-wide">PANEL</span>
        {session && (
          <button
            type="button"
            onClick={() => supabase?.auth.signOut()}
            className="ml-auto inline-flex min-h-12 items-center px-3 text-sm text-muted underline"
          >
            Çıkış
          </button>
        )}
      </header>
      {session && (
        <nav aria-label="Panel menüsü" className="mb-4 flex gap-2 border-b border-border pb-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
              className={`inline-flex min-h-12 items-center rounded-full px-5 font-semibold ${
                pathname === n.href ? "bg-accent text-background" : "border border-border"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
      {body}
    </div>
  );
}
