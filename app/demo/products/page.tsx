import Link from "next/link";
import { Suspense, cache } from "react";

import ThumbLoader from "@/components/dashboard/thumbs/thumb-loader";
import ProductThumbnail from "@/components/dashboard/thumbs/productThumbnail";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getProductTotal from "@/components/helper/getProductTotal";

const WEBSTORE = "https://keylime.neto.com.au";

export default async function DemoProducts() {
  const demoData = await getProductTotal('', '', true);
  const productTotal = demoData.Item.length;
  const products = demoData.Item;

  if (productTotal) {
    return (
      <section className="mx-auto sm:px-6 lg:px-8">
        <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Products
        </h2>
        <p>
          <Link
            href="/demo"
            className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
          </Link>
          <Link
            href="/demo/products"
            className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Products
          </Link>
        </p>

        <div className="mx-auto max-w-(--breakpoint-lg) mt-16">
          <div className="space-y-8">
            {products.map(
              (
                product: {
                  InventoryID: string;
                  SKU: string;
                },
                index: number
              ) => (
                <Suspense key={product.InventoryID} fallback={<ThumbLoader />}>
                  <ProductThumbnail hash={""} secret={""} sku={product.SKU} webstore={WEBSTORE} demo={true} />
                </Suspense>
              )
            )}
          </div>
        </div>

        <div className="my-8">
          <p>
            Return to{" "}
            <Link
              href="/demo"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Demo Dashboard
            </Link>
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <div>
        <p className="mt-6">No products</p>
        <p>
          <Link
            href={`/demo`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Go back
          </Link>{" "}
          or return to{" "}
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Home
          </Link>
        </p>
      </div>
    );
  }
}
