'use server'
import { headers } from 'next/headers';
import { isAuth } from "./auth"

export const getTokenContext = async () => {
  const h = await headers();
  const cookie = h.get("cookie") ?? "";

  const tokenRes = await fetch(
    "https://auth.mcinnes.design/api/auth/get-access-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie,
        origin: "https://neto.mcinnes.design",
      },
      body: JSON.stringify({ providerId: "neto" }),
      cache: "no-store",
    }
  );

  return tokenRes.ok ? await tokenRes.json() : null;
}

export async function pollNeto() {
  const auth = await isAuth(); // if not authorised, will error out - don't need to handle here
  const token = await getTokenContext();

  console.log(`SESSION`)
  console.log(auth)
  console.log(`TOKEN`)
  console.log(token)

  if (!token) {
    throw new Error("Unauthorised: Accounting missing API Access")
  }

  const apiId = auth.user.subject.split(':')[0]

  console.log(`API ID`)
  console.log(apiId)

  return null;
  
  /*
  const netoRes = await fetch(
    "https://auth.mcinnes.design/api/auth/get-access-token", 
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 600 } // cache for 10
    }
  );
  */
}