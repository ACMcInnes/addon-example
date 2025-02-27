import Link from "next/link";

import getProductTotal from "@/components/helper/getProductTotal";

export default async function ProductsSummary({
  hash,
  secret,
  demo,
}: {
  hash: string;
  secret: string;
  demo: boolean;
}) {

    const webstoreProducts = await getProductTotal(hash, secret, demo);
    const productTotal = webstoreProducts.Item.length;
    return (
      <div className="h-full px-6 py-24 md:px-2 md:py-16 lg:px-4">
        <div className="h-full flex flex-col justify-center mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
            Products Synced:
          </h2>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
            {productTotal}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-700 dark:text-gray-300">
            {productTotal === 0
              ? "Looks like you need to sync some products mate"
              : "That's a lot of products, great work!"}
          </p>
          <div className="mt-10 flex lg:flex-col xl:flex-row items-center justify-center gap-x-6">
            <Link
              href={`/${demo ? "demo" : "dashboard"}/products?page=0`}
              className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    );
}
