import Link from "next/link";
import parse from "html-react-parser";
import { auth } from "@/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import getProduct from "@/components/helper/getProduct";
import getChildProducts from "@/components/helper/getChildProducts";
import getWebstore from "@/components/helper/getWebstore";
import Images from "@/components/product/images";
import Variants from "@/components/product/variants";

// consider generating these pages at build time using https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// generateStaticParams() has issues with current cookie setup being out of global scope (https://nextjs.org/docs/messages/next-dynamic-api-wrong-context)

export default async function Product({
  params,
}: {
  params: { product: string };
}) {

  const session = await auth();

  if (session) {

    const details = await getWebstore(session?.webstore_api_id as string, session?.access_token as string);
    const webstore = details.result.domain;
    const product = await getProduct(session?.webstore_api_id as string, session?.access_token as string, params.product, false);

    // console.log(`products:`);
    // console.log(products);
    // const results = product.Item;
    // console.log(`products result: ${results.length}`);
    // console.log(results);
    // console.log(`results type: ${typeof product}`);
    if (product.Item.length) {
      const results = product.Item[0];
      let childProducts = await getChildProducts(
        session?.webstore_api_id as string, 
        session?.access_token as string,
        results.SKU,
        results.VariantInventoryIDs,
        false
      );
      
      // console.log(`CHILD/VARIANTS:`);
      // console.log(results.VariantInventoryIDs);
      // console.log(`Child products:`);
      // console.log(childProducts.Item.length);
      // console.log(`has variants: ${childProducts.Item.length > 0}`);

      return (
        <section className="grid gap-4 grid-cols-3 max-w-(--breakpoint-xl) mx-3">
          <h2 className="col-span-3 text-2xl font-semibold mt-4 mb-2">
            Viewing Product SKU: {params.product}
          </h2>
          <div className="col-span-3 md:col-span-2">
            <Images sku={results.SKU} images={results.Images} />
          </div>
          <div>
            <p>SKU: {results.SKU}</p>
            <p>Name: {results.Model}</p>
            {results.ParentSKU && (
              <Link
                href={`/dashboard/products/${results.ParentSKU}`}
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Go to parent product
              </Link>
            )}
          </div>
          <div className="col-span-3 mt-4 mb-2">
            <h2 className="text-2xl font-semibold">Information</h2>
            <p>Inventory ID: {results.ID}</p>
            <p>Active: {results.IsActive}</p>
            <p>Approved: {results.Approved}</p>
            <p>Brand: {results.Brand}</p>
            <p>Barcode: {results.UPC}</p>
            <p>Store Price: {results.DefaultPrice}</p>
            <p>QTY On Hand: {results.AvailableSellQuantity}</p>
            <p className="mt-4 text-2xl font-semibold">Description:</p>
            <div className="mt-2 prose prose-slate dark:prose-invert">
              {parse(results.Description)}
            </div>
          </div>
          {childProducts.Item.length > 0 && (
            <Variants sku={results.SKU} variants={childProducts.Item} demo={false} />
          )}
          <div className="col-span-3 md:col-span-2 mt-4">
            <p>
              <Link href={`/dashboard/products`} className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                Go back to all products
              </Link>{" "}
              or return to{" "}
              <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                Home
              </Link>
            </p>
          </div>
          <div className="col-span-3 md:col-span-1 md:mt-4">
            <p>
              <Link
                href={`//${webstore}/${results.ItemURL}`}
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                View On Webstore{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </p>
          </div>
        </section>
      );
    } else {
      return (
        <div>
          <p className="mt-6">Could not load SKU</p>
          <p>
            <Link href={`/dashboard/products`} className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              Go back to all products
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
          <p>Return to <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">Home</Link></p>
          <p className="m-2">or</p>
          <Link href={`/neto/login?type=webstore`} className="block ml-1 py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent">Log In</Link>
        </div>
      </>
    ); 
  }

}
