import Link from "next/link";
import { Suspense, cache } from "react";
import { auth } from "@/auth";

import getWebstore from "@/components/helper/getWebstore";
import getProducts from "@/components/helper/getProducts";
import getProductTotal from "@/components/helper/getProductTotal";
import Pagination from "@/components/dashboard/pagination";
import Thumbnail from "@/components/dashboard/thumbnail";
import ThumbLoader from "@/components/dashboard/thumb-loader";

const webstoreDetails = cache(async (webstore_api_id : string, access_token: string) => {
	return await getWebstore(webstore_api_id, access_token);
});

const productTotalDetails = cache(async (webstore_api_id : string, access_token: string) => {
	return await getProductTotal(webstore_api_id, access_token);
});

const productDetails = cache(async (webstore_api_id : string, access_token: string, page: number, limit: number) => {
	return await getProducts(webstore_api_id, access_token, page, limit);
});

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await auth();

    if (session) {
      const details = await webstoreDetails(session?.webstore_api_id as string, session?.access_token as string);
      const productTotal = await productTotalDetails(session?.webstore_api_id as string, session?.access_token as string);
      const webstore = details.result.domain;

      let page = searchParams.page ? +searchParams.page : 0;
      let limit = 20;
      
      const products = await productDetails(session?.webstore_api_id as string, session?.access_token as string, page, limit);
      // console.log(`products:`);
      // console.log(products);
      const results = products.Item;
       // console.log(`products result: ${results.length}`);
       // console.log(results);
      // console.log(`results type: ${typeof products}`);
      if (results.length) {
        return (
          <section className="max-w-screen-lg">
            <p>Your products - page {page}:</p>
  
            {results.map(
              (
                result: {
                  InventoryID: string;
                  ItemURL: string;
                  DefaultPrice: string;
                  Images: any;
                  Model: string;
                  SKU: string;
                },
                index: number
              ) => (
                <Suspense key={`suspense-${index}`} fallback={<ThumbLoader key={`fallback-${index}`} />}>
                  <Thumbnail key={`thumbnail-${index}`} result={result} webstore={webstore} />
                </Suspense>
              )
            )}
  
            <div className="my-8">
              <p>
                Return to <Link href="/dashboard" className="text-sky-500">Dashboard</Link>
              </p>
            </div>
            <Pagination currentPage={page} limit={limit} total={productTotal} />
          </section>
        );
      } else {
        return (
          <div>
            <p className="mt-6">No more products.</p>
            <p>
              <Link href={`/dashboard/products?page=${--page}`} className="text-sky-500">Go back</Link> or{" "}
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
