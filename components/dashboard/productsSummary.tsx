import Link from "next/link";
import { cache } from "react";

import getProductTotal from "@/components/helper/getProductTotal";
import getDemoProductCache from "@/components/demo/getDemoProductCache";

// not sure how effective cache is here, needs further testing
const productTotalCache = cache(
  async (webstore_api_id: string, access_token: string) => {
    return await getProductTotal(webstore_api_id, access_token);
  }
);

export default async function ProductsSummary({
  hash,
  secret,
}: {
  hash: string;
  secret: string;
}) {
  if (hash.length & secret.length) {
    const webstoreProducts = await productTotalCache(hash, secret);
    const productTotal = webstoreProducts.Item.length;
    return (
      <div className="px-6 py-24 md:px-2 md:py-16 lg:px-4">
        <div className="mx-auto max-w-2xl text-center">
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
              href="/dashboard/products?page=0"
              className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    const demoData = await getDemoProductCache();
    const productTotal = demoData.Item.length;
    return (
      <div className="px-6 py-24 md:px-2 md:py-16 lg:px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
            Products Synced:
          </h2>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
            {productTotal}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-700 dark:text-gray-300">
            {productTotal === 0
              ? "Sample data not available at this time"
              : "Sample data may change at any time"}
          </p>
          <div className="mt-10 flex lg:flex-col xl:flex-row items-center justify-center gap-x-6">
            <Link
              href="/demo/products"
              className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
