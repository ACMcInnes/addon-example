import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/callback/login-form";
import Banner from "@/components/dashboard/banner";
import { Suspense } from "react";

export default function Login() {
  return (
<>
  <header>
    <Banner/>
  </header>
  <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-col place-items-center pb-8">
        <h1 className="text-3xl font-semibold mb-4">
          Error | Looks like we are missing some information
        </h1>
        <p>Please fill in your details below or return <Link href="/" className="text-sky-500">Home</Link>.</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
    <footer>
    <div className="flex flex-row w-full items-center justify-center bg-slate-800">
        <a
          className="pointer-events-none flex flex-row place-items-center gap-2 p-2 lg:pointer-events-auto"
          href="https://acmcinnes.au/"
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
