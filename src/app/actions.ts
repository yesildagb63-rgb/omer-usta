"use server";

import { updateTag } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";

// Panelde bir değişiklik kaydedilince herkese açık menünün önbelleğini hemen yeniler.
// Yalnızca giriş yapmış admin çağırabilir.
export async function refreshMenu() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Yetkisiz");
  updateTag("menu");
}
