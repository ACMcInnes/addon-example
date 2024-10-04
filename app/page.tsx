import Image from "next/image";
import Link from "next/link";

import Banner from "@/components/dashboard/banner";
import Footer from "@/components/dashboard/footer";
import Nav from "@/components/dashboard/nav";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <header>
        <Banner/>
        <Nav />
      </header>
      <main className="flex flex-col items-center justify-between p-12 lg:p-24">
        <div className="relative flex flex-col place-items-center pb-8">
          <h1 className="text-4xl lg:text-5xl font-semibold">
            A Neto Addon Example <span className="text-xs text-gray-500">*in development</span>
          </h1>
          <h2 className="text-lg md:text-xl lg:text-3xl font-semibold">
            Select an option below to get started
          </h2>
        </div>
        <div className="mb-4 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Link
            href="/dashboard"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Dashboard{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Access your dashboard
            </p>
          </Link>
          <Link
            href="/neto/login?type=webstore"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Login{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
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
              <FontAwesomeIcon className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" icon={faArrowUpRightFromSquare} />
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
              <FontAwesomeIcon className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none" icon={faArrowUpRightFromSquare} />
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Take a look at a similar Addon setup.
            </p>
          </a>
        </div>
        <div className="relative flex flex-col place-items-center mt-4 pb-8">
          <p>or take a look around</p>
          <Link href={`/demo`} className="block mt-2 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Demo</Link>
        </div>
      </main>
      <Footer/>
    </>
  );
}
