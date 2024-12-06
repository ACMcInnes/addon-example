import Image from "next/image";
import Link from "next/link";

import Banner from "@/components/shared/banner";
import Footer from "@/components/shared/footer";
import Nav from "@/components/shared/nav";
import LinkTiles from "@/components/home/link_tiles";
import TrustedTeams from "@/components/home/trusted_teams";
import Features from "@/components/home/features";
import Sponsors from "@/components/home/sponsors";
import Plans from "@/components/home/plans";
import Cta from "@/components/home/cta";

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
            A Neto Addon Example
          </h1>
          <p className="text-xs text-gray-500">*currently in development</p>
          <Link href={`/documentation/getting-started`} className="group block mt-8 mb-4 py-3 px-8 rounded-md bg-indigo-600 text-white dark:bg-indigo-500 border-transparent">
            Get Started{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">-&gt;</span>
          </Link>
          <h2 className="lg:mb-24 text-lg md:text-xl lg:text-2xl font-semibold">
            or select an option below
          </h2>
        </div>

        <LinkTiles />

        <div className="relative flex flex-col place-items-center mt-8 pb-8">
          <p>Don&apos;t have a Neto Webstore? Take a look around using our demo data</p>
          <Link href={`/demo`} className="block mt-4 py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent">Demo Dashboard</Link>
        </div>


        <h2 className="mt-12 w-full max-w-screen-xl text-base/7 text-left font-semibold text-indigo-600 dark:text-indigo-500">
            What is the Neto Addon Example?
        </h2>
        <p className="w-full max-w-screen-xl text-left mt-2 text-pretty text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-balance">
          The Neto Addon Example outlines how an integration with the Neto eCommerce platform might function.
        </p>
        <div className="w-full max-w-screen-xl mt-6 px-12 py-8 text-white text-center bg-gradient-to-br from-indigo-800 from-40% to-indigo-600 dark:from-indigo-900 dark:to-indigo-950 rounded-2xl">
          <p className="mt-3 text-pretty text-lg">
            From a technical standpoint, the Neto Addon Example shows a method of completing the OAuth authentication flow required to access the Neto API.
            It also shows some of the ways the Neto API can be polled and that data used at an application level. This application is just an example and does
            not outline any requirements for a Neto integration - these should be discussed with Neto directly.
          </p>
          <p className="mt-6 text-pretty text-lg">
            From a feature standpoint, the Neto Addon Example lets you connect to your Neto webstore and retreive your control panel data.
            Currently this is limited to product data, to show a list of thumbnails, then a main product page - similar to a Neto webstore frontend.
            Additional functionality will be added over time.
          </p>
        </div>

        <Features />

        <Sponsors />

        <Plans />

        <Cta />

        <TrustedTeams />

      </main>
      <Footer/>
    </>
  );
}
