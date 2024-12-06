import Banner from "@/components/shared/banner";
import Footer from "@/components/shared/footer";
import Nav from "@/components/shared/nav";
import Image from "next/image";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (

    <>
      <header>
        <Banner/>
        <Nav/>
      </header>
      <main className="flex flex-col items-center px-5">
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
          href="/neto/login?type=webstore"
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
      </main>
      <Footer/>
    </>
  );
}
