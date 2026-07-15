"use client";

import Image from "next/image";
import { authClient } from '@/lib/auth-client';
import Banner from '@/components/shared/banner';

export default function getUser() {

  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <div>Loading…</div>;
  if (error || !session) return <div>Signed out</div>;

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