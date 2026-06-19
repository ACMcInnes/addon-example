import { headers } from 'next/headers';
import Image from "next/image";
import { authClient } from '@/lib/auth-client';
import Banner from '@/components/shared/banner';


async function getAuthContext() {
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



export default async function getServerUser() {

  const { session, token } = await getAuthContext();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  console.log(`TOKEN`)
  console.log(token)

  return (
    <>
      <header>
        <Banner />
      </header>
      <main className="flex flex-col items-center justify-between p-24">
        <div className="flex flex-col place-items-center pb-8">
          <h2>G&apos;day {session.user.name}</h2>
        </div>
      </main>
      <footer>
        <div className="flex flex-row w-full items-center justify-center bg-slate-800">
          <a
            className="pointer-events-none flex flex-row place-items-center gap-2 p-2 lg:pointer-events-auto"
            href="//andrew.mcinnes.design/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/am_logo.svg"
              alt="AM Logo"
              className="dark:invert"
              width={51}
              height={25}
              priority
            />
          </a>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}