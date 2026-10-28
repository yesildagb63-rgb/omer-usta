"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { btnPrimary, inputCls } from "./types";

export default function PasswordForm() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return setMsg("Şifre en az 8 karakter olmalı.");
    const { error } = await createClient().auth.updateUser({ password });
    if (error) return setMsg("Şifre değiştirilemedi. E-postadaki bağlantıyı yeniden isteyin.");
    setDone(true);
  };

  if (done)
    return (
      <p>
        Şifreniz değişti.{" "}
        <Link href="/panel" className="text-accent underline">
          Panele git
        </Link>
      </p>
    );

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <h1 className="font-display text-4xl tracking-wide">YENİ ŞİFRE</h1>
      <label className="block space-y-1">
        <span className="text-sm text-muted">Yeni şifre (en az 8 karakter)</span>
        <input type="password" required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
      </label>
      {msg && (
        <p role="alert" className="text-sm text-accent">
          {msg}
        </p>
      )}
      <button type="submit" className={`${btnPrimary} w-full`}>
        Şifreyi Kaydet
      </button>
    </form>
  );
}
