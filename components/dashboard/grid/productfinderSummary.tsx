import Link from "next/link";

import getContentTypesCache from "@/components/helper/getContentTypesCache";
import getContentsCache from "@/components/helper/getContentsCache";
import getProductFinderType from "@/components/helper/getProductFinderType";


export default async function PartsFinderSummary({
  hash,
  secret,
  demo,
}: {
  hash: string;
  secret: string;
  demo: boolean;
}) {

    let productFinderType = "";

    if (demo) {
      productFinderType = "part-finder";
    } else {
      const contentTypes = await getContentTypesCache(hash, secret);
      productFinderType = await getProductFinderType(contentTypes);
    }


    const finderContents = await getContentsCache(hash, secret, demo, productFinderType);
    const finderContentTotal = finderContents.Content.length;

    return (
      <div className="h-full px-6 py-24 md:px-2 md:py-16 lg:px-4">
        <div className="h-full flex flex-col justify-center mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
            Product Finder Indexed:
          </h2>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
            {finderContentTotal}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-700 dark:text-gray-300">
            {finderContentTotal === 0
              ? "Looks like you need to sync some customers mate"
              : "That's a lot of customers, great work!"}
          </p>
          <div className="mt-10 flex lg:flex-col xl:flex-row items-center justify-center gap-x-6">
            <Link
              href={`/${demo ? "demo" : "dashboard"}/finder`}
              className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
            >
              View Finder
            </Link>
          </div>
        </div>
      </div>
    );
}
