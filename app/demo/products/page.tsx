import Link from "next/link";
import { Suspense, cache } from "react";

import ThumbLoader from "@/components/dashboard/thumb-loader";
import DemoThumbnail from "@/components/dashboard/demoThumbnail";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getDemoProductCache from "@/components/demo/getDemoProductCache";

export default async function DemoProducts() {

      const demoData = await getDemoProductCache();
      const productTotal = demoData.Item.length
      const products = demoData.Item;


       // console.log(`products result: ${products.length}`);
       // console.log(products);
      // console.log(`results type: ${typeof products}`);
      if (productTotal) {
        return (
          <section className="max-w-screen-lg">
            <h2 className="text-2xl font-semibold pt-4 pb-2">Products</h2>
            <Link href="/demo" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              <FontAwesomeIcon icon={faArrowLeft} />{" "}Demo Dashboard
            </Link>

            {products.map(
              (
                product: {
                  InventoryID: string;
                  SKU: string;
                },
                index: number
              ) => (
                <Suspense key={`suspense-${index}-${product.SKU}`} fallback={<ThumbLoader />}>
                  <DemoThumbnail sku={product.SKU} />
                </Suspense>
              )
            )}
  
            <div className="my-8">
              <p>
                Return to <Link href="/demo" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">Demo Dashboard</Link>
              </p>
            </div>
          </section>
        );
      } else {
        return (
          <div>
            <p className="mt-6">No products</p>
            <p>
              <Link href={`/demo`} className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">Go back</Link> or{" "}
              return to <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">Home</Link>
            </p>
          </div>
        );
      }
}
