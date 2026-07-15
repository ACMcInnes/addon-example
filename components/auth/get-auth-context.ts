import { headers } from 'next/headers';

export async function getAuthContext() {
  const h = await headers();
  const cookie = h.get("cookie") ?? "";

  const [sessionRes, tokenRes] = await Promise.all([
    fetch("https://auth.mcinnes.design/api/auth/get-session", {
      headers: { cookie },
      cache: "no-store",
    }),
    fetch("https://auth.mcinnes.design/api/auth/get-access-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie,
        origin: "https://neto.mcinnes.design",
      },
      body: JSON.stringify({ providerId: "neto" }),
      cache: "no-store",
    }),
  ]);

  console.log(`AUTH CONTEXT`)
  console.log(sessionRes)
  console.log(`---`)
  console.log(tokenRes)

  return {
    session: sessionRes.ok ? await sessionRes.json() : null,
    token: tokenRes.ok ? await tokenRes.json() : null,
  };
}