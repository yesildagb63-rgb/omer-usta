import { createBrowserClient } from "@supabase/ssr";

// Tarayıcı istemcisi (panel). Oturum çerezde tutulur; yetki Supabase RLS ile sağlanır.
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
