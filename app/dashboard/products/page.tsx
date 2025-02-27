import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";

import getWebstore from "@/components/helper/getWebstore";
import getProductTotal from "@/components/helper/getProductTotal";
import Pagination from "@/components/dashboard/pagination";
import ProductThumbnail from "@/components/dashboard/thumbs/productThumbnail";
import ThumbLoader from "@/components/dashboard/thumbs/thumb-loader";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();

  if (session) {
    const details = await getWebstore(
      session?.webstore_api_id as string,
      session?.access_token as string
    );
    const webstoreProducts = await getProductTotal(
      session?.webstore_api_id as string,
      session?.access_token as string,
      false
    );
    const webstore = details.result.domain;
    const productTotal = webstoreProducts.Item.length;

    // Neto index starts at 0, but page should start at 1 - TODO: mess with query value so it matches page
    let page = searchParams.page ? +searchParams.page : 0;
    let limit = 20;

    // console.log(`products:`);
    // console.log(products);
    const results = webstoreProducts.Item;
    const currentProducts = results.slice(page * limit, page * limit + 20);
    console.log(`products result: ${currentProducts.length}`);
    console.log(currentProducts);
    // console.log(`results type: ${typeof products}`);
    if (currentProducts.length) {
      return (
        <section className="mx-auto sm:px-6 lg:px-8">
          <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Products
          </h2>
          <p>
            <Link
              href="/dashboard"
              className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
            </Link>
            {page ? (
              <>
                          <Link
              href="/dashboard/products?page=0"
              className={`ml-2 pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 ${page ? "border-r-2 border-indigo-600 dark:border-indigo-500" : ""}`}
            >
              Products
            </Link>
            <Link
              href={`/dashboard/products?page=${page}`}
              className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Page {page + 1}
            </Link>
              </>

            ) : (
              <Link
              href="/dashboard/products?page=0"
              className={`ml-2 pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 ${page ? "border-r-2 border-indigo-600 dark:border-indigo-500" : ""}`}
            >
              Products - Page 1
            </Link>
            )}
          </p>

          <p className="mt-2">{`${page ? page * limit : 1} - ${(page * limit + limit) > productTotal ? (`${productTotal}`) : (`${page * limit + limit}`)} shown of ${productTotal}`}</p>

          <div className="mx-auto max-w-(--breakpoint-lg) mt-16">
            <div className="space-y-8">
              {currentProducts.map(
                (
                  product: {
                    InventoryID: string;
                    SKU: string;
                  },
                  index: number
                ) => (
                  <Suspense
                    key={`suspense-${index}`}
                    fallback={<ThumbLoader key={`fallback-${index}`} />}
                  >
                    <ProductThumbnail
                      hash={session?.webstore_api_id as string}
                      secret={session?.access_token as string}
                      sku={product.SKU}
                      webstore={webstore}
                      demo={false}
                    />
                  </Suspense>
                )
              )}
            </div>
          </div>

          <div className="my-8">
            <p>
              <FontAwesomeIcon icon={faArrowLeft} /> Back to{" "}
              <Link
                href={`/dashboard`}
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Dashboard
              </Link>
            </p>
          </div>
          <Pagination currentPage={page} limit={limit} total={productTotal} demo={false} contents={""} />
        </section>
      );
    } else {
      return (
        <div>
          <p className="mt-6">No more products.</p>
          <p>
            <Link
              href={`/dashboard/products?page=${--page}`}
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
  } else {
    return (
      <>
        <div className="mt-6">
          <p>You are not logged in</p>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p>
            Return to{" "}
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Home
            </Link>
          </p>
          <p className="m-2">or</p>
          <Link
            href={`/neto/login?type=webstore`}
            className="block ml-1 py-2 px-4 rounded-md text-gray-100 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-transparent"
          >
            Log In
          </Link>
        </div>
      </>
    );
  }
}
