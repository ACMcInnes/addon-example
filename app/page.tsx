import Link from "next/link";

import Banner from "@/components/shared/banner";
import Footer from "@/components/shared/footer";
import Nav from "@/components/shared/nav";
import LinkTiles from "@/components/home/link-tiles";
import Team from "@/components/home/team";
import Features from "@/components/home/features";
import Connectors from "@/components/home/connectors";
import Plans from "@/components/home/plans";
import Cta from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <header>
        <Banner/>
        <Nav />
      </header>
      <main className="flex flex-col items-center justify-between p-6 lg:p-24">
        <div className="@container w-full max-w-(--breakpoint-xl)">
          <p className="text-lg font-medium text-pretty text-gray-700 sm:text-xl/8 dark:text-gray-300">
            Say hello to
          </p>
          <h2 className="text-[22cqw] leading-none font-semibold tracking-tight">
            GUSTAVE
          </h2>
        </div>

        <div className="w-full max-w-(--breakpoint-xl) flex flex-col place-items-start pb-8">
          <p className="text-lg font-medium text-pretty text-gray-700 sm:text-xl/8 dark:text-gray-300">
            your customers very own
          </p>
          <h1 className="text-5xl lg:text-6xl font-semibold">
            Commerce Sommelier
          </h1>
          <div className="mt-6 px-6 lg:px-12 py-8 text-white text-center bg-linear-to-br from-indigo-800 from-40% to-indigo-600 dark:from-indigo-900 dark:to-indigo-950 rounded-2xl">
            <p className="mt-3 text-lg md:text-xl lg:text-2xl text-balance font-semibold">
              Gus offers customers a curated shopping experience by analyzing shopping habits and offering highly personalised product catalogues.
            </p>
            <p className="mt-6 text-lg md:text-xl lg:text-2xl text-balance font-semibold">
              Every fine dining establishment needs a Sommelier for wine pairings, so shouldn&apos;t your webstore have a Sommelier for pairing your products to your.
            </p>
            <p className="mt-6 text-lg md:text-xl lg:text-2xl text-balance font-semibold">
              Your own personal &quot;Comm Somm&quot;
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/documentation/getting-started`}
                className="group block mx-auto mb-2 py-3 px-8 rounded-md bg-white text-black mix-blend-screen dark:bg-white border-transparent"
              >
                Get Started{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </Link>
            </div>
            <p className="text-xs text-gray-200">*currently in development</p>
          </div>
        </div>

        <p className="text-lg font-medium text-pretty sm:text-xl/8 text-gray-700 dark:text-gray-300">
          or select an option below
        </p>
        <LinkTiles />

        <Features />
        <Connectors />
        <Plans />
        <Cta />
        <Team />

      </main>
      <Footer/>
    </>
  );
}
