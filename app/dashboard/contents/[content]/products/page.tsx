import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";

import getWebstore from "@/components/helper/getWebstore";
import ContentThumbnail from "@/components/dashboard/contentThumbnail";
import ThumbLoader from "@/components/dashboard/thumb-loader";
import getContentProducts from "@/components/helper/getContentProducts";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@/components/dashboard/pagination";

export default async function ContentProducts({
    params,
    searchParams,
  }: {
    params: Promise<{ content: string }>;
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
    const { content } = await params;

  const session = await auth();

  if (session) {

    console.log(`CONTENT PARAMS`)
    console.log(content)

    const details = await getWebstore(session?.webstore_api_id as string, session?.access_token as string);
    const webstoreProducts = await getContentProducts(session?.webstore_api_id as string, session?.access_token as string, content);
    const webstore = details.result.domain;
    const productTotal = webstoreProducts.Item.length;

    // Neto index starts at 0, but page should start at 1 - TODO: mess with query value so it matches page
    let page = searchParams.page ? +searchParams.page : 0;
    let limit = 20;

    // console.log(`products:`);
    // console.log(products);
    const results = webstoreProducts.Item;
    const currentProducts = results.slice(page * limit, page * limit + 20);
    console.log(`content products result: ${currentProducts.length}`);
    console.log(currentProducts);

    // console.log(`results type: ${typeof products}`);
    if (currentProducts.length) {
      return (
        <section className="max-w-screen-lg">
        <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Content Products
        </h2>
        <p>
          <Link
            href="/dashboard"
            className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
          </Link>
          <Link
            href="/dashboard/contents"
            className="ml-2 pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            Content
          </Link>
          <Link
            href={`/dashboard/contents/${content}/products?page=0`}
            className="ml-2 pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            {content} - Products
          </Link>
          <Link
            href={`/dashboard/content/${content}/products?page=${page}`}
            className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Page {page + 1}
          </Link>
        </p>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentProducts.map(
            (
              product: {
                InventoryID: string;
                SKU: string;
              },
              index: number
            ) => (
              <Suspense key={`suspense-${index}`} fallback={ <ThumbLoader key={`fallback-${index}`} /> } >
                <ContentThumbnail
                  hash={session?.webstore_api_id as string}
                  secret={session?.access_token as string}
                  sku={product.SKU}
                  webstore={webstore}
                />
              </Suspense>
            )
          )}
        </div>

          <div className="my-8">
            <p>
              Return to{" "}
              <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                Dashboard
              </Link>
            </p>
          </div>
          <Pagination currentPage={page} limit={limit} total={productTotal} contents={content} />
        </section>
      );
    } else {
      return (
        <div>
          <p className="mt-6">No more products.</p>
          <p>
            <Link
              href={`/dashboard/contents`}
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Go back
            </Link>{" "}
            or return to{" "}
            <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
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
            <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
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
