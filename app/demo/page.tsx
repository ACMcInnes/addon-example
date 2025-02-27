import Link from "next/link";
import Image from "next/image";
import CustomersSummary from "@/components/dashboard/grid/customersSummary";
import ProductsSummary from "@/components/dashboard/grid/productsSummary";
import Profile from "@/components/dashboard/grid/profile";
import ProductFinderSummary from "@/components/dashboard/grid/productfinderSummary";
import ContentSummary from "@/components/dashboard/grid/contentSummary";

export default async function Demo() {
  return (
    <>
      <div className="mx-auto sm:px-6 lg:px-8">
        <h2 className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Did somebody say &quot;sample data&quot;
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-3">
          {/* Bento 1 */}
          <div className="flex p-px lg:col-span-4">
            <div className="w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]">
              <Profile session={null} />
            </div>
          </div>
          {/* Bento 2 */}
          <div className="flex p-px lg:col-span-2">
            <div className="w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 lg:rounded-tr-[2rem]">
              <ProductsSummary hash={''} secret={''} demo={true} />
            </div>
          </div>
          {/* Bento 3 */}
          <div className="flex p-px lg:col-span-3">
            <div className="w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15">
              <CustomersSummary hash={''} secret={''} demo={true} />
            </div>
          </div>
          {/* Bento 4 */}
          <div className="flex p-px lg:col-span-3">
            <div className="w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15">
              <ContentSummary hash={''} secret={''} demo={true} />
            </div>
          </div>
          {/* Bento 5 */}
          <div className="flex p-px lg:col-span-2">
            <div className="w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 lg:rounded-bl-[2rem]">
              <ProductFinderSummary hash={''} secret={''} demo={true} />
            </div>
          </div>
          {/* Bento 6 */}
          <div className="flex p-px lg:col-span-4">
            <div className="w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
              <Image
                src={`/am_logo.svg`}
                alt={`AM Logo`}
                className="dark:invert w-full h-auto p-12"
                width={200}
                height={48}
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-600 dark:text-gray-400">Coming Soon</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100">Additional Features</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                  New features will continue to be added during the beta testing period. Watch this space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 mx-4 md:mx-28 flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
        <div className="lg:min-w-0 lg:flex-1">
          <h3 className="text-lg/7 font-semibold text-indigo-600 dark:text-indigo-500">
            Need some help?
          </h3>
          <p className="mt-2 text-base/7 text-gray-700 dark:text-gray-200">
            Check out our documentation and setup guides to get you started
          </p>
        </div>
        <Link
          href={`/documentation`}
          className="group block mt-8 mb-4 py-3 px-8 rounded-md bg-indigo-600 text-white dark:bg-indigo-500 border-transparent"
        >
          Documentation{" "}
          <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
            -&gt;
          </span>
        </Link>
      </div>


    </>
  );
}
