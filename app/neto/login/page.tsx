import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/callback/login-form";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <div className="galaxy-bg fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-3 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          <a
            className="pointer-events-none lg:pointer-events-auto text-white"
            href="https://developers.maropost.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built for Neto
          </a>
        </div>
      </div>

      <div className="flex flex-col place-items-center pb-8">
        <h1 className="text-3xl font-semibold mb-4">
          Error | Looks like we are missing some information
        </h1>
        <p>Please fill in your details below or return <Link href="/" className="text-sky-500">Home</Link>.</p>
        <LoginForm />
      </div>

      <div className="flex flex-row w-full items-center justify-center">
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
    </main>
  );
}
