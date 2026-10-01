import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function TrustedTeams() {
  return (

        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/75 px-6 py-16 shadow-lg ring-1 ring-gray-900/5 rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center md:py-12 lg:py-8 xl:gap-x-20 xl:px-20 dark:bg-slate-800 dark:shadow-none">
            <Image
              alt=""
              src="/am_logo.svg"
              width={1024}
              height={494}
              className="h-96 w-full flex-none rounded-2xl shadow-none lg:aspect-square lg:h-auto lg:max-w-sm dark:invert"
            />
            <div className="w-full flex-auto">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty sm:text-5xl text-indigo-600 dark:text-indigo-500">
                Meet the team behind Gus
              </h2>
              <p className="mt-6 text-lg/8 text-pretty text-gray-800 dark:text-gray-200">
                Gustave, the Commerce Sommelier has been crafted with care by McInnes Design. A boutique design and development agency based in Brisbane &#124; Meanjin, Australia.
              </p>
              <div className="mt-10 flex">
                <a
                  href="//mcinnes.design/"
                  target="_blank"
                  rel="noopener"
                  className="hover:underline hover:underline-offset-4 font-semibold whitespace-nowrap text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Check out our other stuff{" "}
                  <FontAwesomeIcon className="!align-super !size-3 rotate-45" icon={faArrowUp} />
                </a>
              </div>
            </div>
          </div>


          <div className="mt-24 mx-auto max-w-2xl text-center">
            <h2 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
              Gustave, your shops personal Commerce Sommelier
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty font-medium text-gray-900 dark:text-gray-100">
              No complex AI prompt required, get setup instantly by linking your webstore, Gus will do the rest
            </p>
            <div className="mt-4 flex items-center justify-center gap-x-6">
              <Link href={`/documentation`} className=" group block py-3 px-8 rounded-md bg-indigo-600 text-white dark:bg-indigo-500 border-transparent">
                Get Started{" "}
                <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">-&gt;</span>
              </Link>
            </div>
          </div>

        </div>

  );
}
