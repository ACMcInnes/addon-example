import Image from "next/image";
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <div className="galaxy-bg fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-3 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          <a
            className="pointer-events-none lg:pointer-events-auto"
            href="https://developers.maropost.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built for Neto
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center pb-8">
        <h1 className="text-3xl text-center font-semibold">404 | We could not find the page you are looking for. <br/> Take me <Link href="/" className="text-sky-500">Home</Link>.</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link 
          href="/dashboard"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Dashboard{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Access your dashboard
          </p>
        </Link>
        <Link 
          href="/dashboard/login"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Login{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Don&apos;t have access? Login first
          </p>
        </Link>
        <a
          href="https://developers.maropost.com/documentation/engineers/api-documentation/introduction-and-getting-started/api-best-practices/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Best Practices{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Working with our API efficiently.
          </p>
        </a>
        <a
          href="https://developers.maropost.com/documentation/engineers/tutorials/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Tutorials{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Take a look at a similar Addon setup.
          </p>
        </a>
      </div>

      <div className="flex flex-col w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
        <a
          className="pointer-events-none flex flex-col md:flex-row place-items-center gap-2 p-8 lg:pointer-events-auto"
          href="https://acmcinnes.au/"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{" "}
          <Image
            src="/am_logo.svg"
            alt="AM Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </a>
        <div className="flex flex-col md:flex-row w-full items-center justify-center">
          <a
            className="pointer-events-none flex flex-col md:flex-row h-28 place-items-center gap-2 p-8 pb-2 md:pr-2 md:pb-8 lg:pointer-events-auto"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built using{" "}
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
            />
          </a>
          <a
            className="pointer-events-none flex flex-col md:flex-row h-28 place-items-center gap-2 p-8 pt-2 md:pl-2 md:pt-8 lg:pointer-events-auto"
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            and deployed on{" "}
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel Logo"
              width={180}
              height={37}
            />
          </a>
        </div>
        <div className="flex flex-col w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </main>
  );
}
