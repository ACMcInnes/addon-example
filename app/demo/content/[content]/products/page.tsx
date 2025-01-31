import Link from "next/link";
import { Suspense } from "react";

import getDemoContentProducts from "@/components/demo/getDemoContentProductsCache";
import DemoContentThumbnail from "@/components/demo/demoContentThumbnail";
import ThumbLoader from "@/components/dashboard/thumb-loader";
import ContentPagination from "@/components/demo/demoContentPagination";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function DemoContentProducts({
  params,
  searchParams,
}: {
  params: Promise<{ content: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { content } = await params;

  console.log(`DEMO CONTENT PARAMS`);
  console.log(content);

  const webstoreProducts = await getDemoContentProducts(content);
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
      <section className="max-w-(--breakpoint-lg)">
        <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Content Products
        </h2>
        <p>
          <Link
            href="/demo"
            className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
          </Link>
          <Link
            href="/demo/content"
            className="ml-2 pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            Content
          </Link>
          <Link
            href={`/demo/content/${content}/products?page=0`}
            className="ml-2 pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            {content} - Products
          </Link>
          <Link
            href={`/demo/content/${content}/products?page=${page}`}
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
              <Suspense key={product.InventoryID} fallback={<ThumbLoader />}>
                <DemoContentThumbnail sku={product.SKU} />
              </Suspense>
            )
          )}
        </div>

        <div className="mt-16 mb-8">
          <p>
            <FontAwesomeIcon icon={faArrowLeft} /> Back to{" "}
            <Link
              href={`/demo/content`}
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Content
            </Link>{" "}
            or the{" "}
            <Link
              href="/demo"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Demo Dashboard
            </Link>
          </p>
        </div>
        <ContentPagination
          content={content}
          currentPage={page}
          limit={limit}
          total={productTotal}
        />
      </section>
    );
  } else {
    return (
      <section className="max-w-(--breakpoint-lg)">
        <h2 className="text-2xl font-semibold">Content Products</h2>
        <p>
          <Link
            href="/demo"
            className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
          </Link>
          <Link
            href="/demo/content"
            className="ml-2 pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            Content
          </Link>
          <Link
            href={`/demo/content/${content}/products?page=0`}
            className="ml-2 pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            {content} - Products
          </Link>
          <Link
            href={`/demo/content/${content}/products?page=${page}`}
            className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Page {page + 1}
          </Link>
        </p>
        <div className="my-16 text-center text-xl">
          <p>No more products</p>
        </div>
        <p>
          <Link
            href={`/demo/content`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Content
          </Link>{" "}
          or return to{" "}
          <Link
            href="/demo"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Demo Dashboard
          </Link>
        </p>
      </section>
    );
  }
}
