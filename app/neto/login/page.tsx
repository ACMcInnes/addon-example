import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/callback/login-form";
import Banner from "@/components/shared/banner";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) {
    console.log(`auth session already exists:`);
    console.log(`redirecting to dashboard....`);
    redirect(`/dashboard`);
  } else {
    return (
      <>
        <header>
          <Banner />
        </header>
        <main className="flex flex-col items-center justify-between p-24">
          <div className="flex flex-col place-items-center pb-8">
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
}
