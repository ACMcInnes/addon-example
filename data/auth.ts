'use server'
import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from "next/navigation";

export const getSessionContext = cache(async () => {
  const h = await headers();
  const cookie = h.get("cookie") ?? "";

  const sessionRes = await fetch(
    "https://auth.mcinnes.design/api/auth/get-session", 
    {
      headers: { cookie },
      cache: "no-store",
    }
  );

  return sessionRes.ok ? await sessionRes.json() : null;
})

export async function isAuth() {
  const session = await getSessionContext();
  if (!session) {
    console.log(`Account session missing: redirect to login`);
    redirect(`/login`);
  }
  return session
}