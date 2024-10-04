import Link from "next/link";
import { Suspense, cache } from "react";

import ThumbLoader from "@/components/dashboard/thumb-loader";
import DemoThumbnail from "@/components/dashboard/demoThumbnail";
import User from "@/components/dashboard/user";

const WEBSTORE = "https://keylime.neto.com.au";

async function getDemoProducts() {
  // webstore and secret passed from AuthJS
  const res = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
      NETOAPI_ACTION: "GetItem",      
      "Accept": "application/json",
    },
    body: `{
        "Filter": {
            "CategoryID": 468
        }
    }`,
  });
 
  console.log(`GET DEMO PRODUCTS RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch demo products')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const webstoreProducts = await res.json()
  return webstoreProducts;
}



export default async function DemoProducts() {

      const demoData = await getDemoProducts();
      const productTotal = demoData.Item.length
      const products = demoData.Item;


       console.log(`products result: ${products.length}`);
       console.log(products);
      // console.log(`results type: ${typeof products}`);
      if (productTotal) {
        return (
          <section className="max-w-screen-lg">
            <User />
            <p>Products:</p>
  
            {products.map(
              (
                product: {
                  InventoryID: string;
                  SKU: string;
                },
                index: number
              ) => (
                <Suspense key={`suspense-${index}`} fallback={<ThumbLoader key={`fallback-${index}`} />}>
                  <DemoThumbnail key={`thumbnail-${index}`} sku={product.SKU} />
                </Suspense>
              )
            )}
  
            <div className="my-8">
              <p>
                Return to <Link href="/demo" className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">Demo Dashboard</Link>
              </p>
            </div>
          </section>
        );
      } else {
        return (
          <div>
            <p className="mt-6">No products</p>
            <p>
              <Link href={`/demo`} className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">Go back</Link> or{" "}
              return to <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">Home</Link>
            </p>
          </div>
        );
      }
}
