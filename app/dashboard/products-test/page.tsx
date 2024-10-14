import Link from "next/link";
import { Suspense, cache } from "react";
import { auth } from "@/auth";

import getWebstore from "@/components/helper/getWebstore";
import getProducts from "@/components/helper/getProducts";
import getProductTotalTest from "@/components/helper/getProductTotalTest";
import PaginationTest from "@/components/dashboard/paginationTest";
import ThumbnailTest from "@/components/dashboard/thumbnailTest";
import ThumbLoader from "@/components/dashboard/thumb-loader";

export default async function ProductsTest({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await auth();

    if (session) {
      const details = await getWebstore(session?.webstore_api_id as string, session?.access_token as string);
      const webstoreProducts = await getProductTotalTest(session?.webstore_api_id as string, session?.access_token as string);
      const webstore = details.result.domain;
      const productTotal = webstoreProducts.Item.length

      let page = searchParams.page ? +searchParams.page : 0;
      let limit = 20;
      
      // console.log(`products:`);
      // console.log(products);
      const results = webstoreProducts.Item;
      const currentProducts = results.slice((page * limit), (page * limit) + 20);
       console.log(`products result: ${currentProducts.length}`);
       console.log(currentProducts);
      // console.log(`results type: ${typeof products}`);
      if (currentProducts.length) {
        return (
          <section className="max-w-screen-lg">
            <p>Your products - page {page}:</p>
  
            {currentProducts.map(
              (
                product: {
                  InventoryID: string;
                  SKU: string;
                },
                index: number
              ) => (
                <Suspense key={`suspense-${index}`} fallback={<ThumbLoader key={`fallback-${index}`} />}>
                  <ThumbnailTest key={`thumbnail-${index}`} sku={product.SKU} webstore={webstore} />
                </Suspense>
              )
            )}
  
            <div className="my-8">
              <p>
                Return to <Link href="/dashboard" className="text-sky-500">Dashboard</Link>
              </p>
            </div>
            <PaginationTest currentPage={page} limit={limit} total={productTotal} />
          </section>
        );
      } else {
        return (
          <div>
            <p className="mt-6">No more products.</p>
            <p>
              <Link href={`/dashboard/products-test?page=${--page}`} className="text-sky-500">Go back</Link> or{" "}
              return to <Link href="/" className="text-sky-500">Home</Link>
            </p>
          </div>
        );
      }
    } else {
      return (
        <>
          <div className="mt-6">
            <p>You are not logged in</p>
          </div>
          <div className="flex flex-col items-center mt-6">
            <p>Return to <Link href="/" className="text-sky-500">Home</Link></p>
            <p className="m-2">or</p>
            <Link href={`/neto/login?type=webstore`} className="block ml-1 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Log In</Link>
          </div>
        </>
    ); 
    }
}
