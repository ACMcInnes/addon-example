import Link from "next/link";
import parse from "html-react-parser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import Images from "@/components/product/images";
import Variants from "@/components/product/variants";
import getProduct from "@/components/helper/getProduct";
import getChildProducts from "@/components/helper/getChildProducts";

const WEBSTORE = "https://keylime.neto.com.au";

export async function generateStaticParams() {
    const products = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
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
      }).then((res) => res.json())
 
    return products.Item.map((p: { SKU: string; }) => ({
        product: p.SKU,
    }))
}

export default async function DemoProduct(
  props: {
    params: Promise<{ product: string }>;
  }
) {
  const params = await props.params;

  const product = await getProduct('', '', params.product, true);
  if (product.Item.length) {
    const results = product.Item[0];
    let childProducts = await getChildProducts(
      '', 
      '',
      results.SKU,
      results.VariantInventoryIDs,
      true
    );
    
    return (
      <section className="grid gap-4 grid-cols-3 max-w-(--breakpoint-xl) mx-3">
        <h2 className="col-span-3 text-2xl font-semibold mt-4 mb-2">
          Viewing Product SKU: {params.product}
        </h2>
        <Link href={`/demo/products`} className="col-span-3 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
          <FontAwesomeIcon icon={faArrowLeft} />{" "}
          Go back to all products
        </Link>
        <div className="col-span-3 md:col-span-2">
          <Images sku={results.SKU} images={results.Images} />
        </div>
        <div className="col-span-3 md:col-span-1">
          <p className="text-4xl font-semibold">{results.Name}</p>
          <p>SKU: {results.SKU}</p>
          {results.ParentSKU && (
            <Link
              href={`/demo/products/${results.ParentSKU}`}
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Go to parent product
            </Link>
          )}
          <h2 className="mt-4 mb-2 text-2xl font-semibold">Information</h2>
          <p>Inventory ID: {results.ID}</p>
          <p>Active: {results.IsActive}</p>
          <p>Approved: {results.Approved}</p>
          <p>Brand: {results.Brand}</p>
          <p>Barcode: {results.UPC}</p>
          <p>Store Price: {results.DefaultPrice}</p>
          <p>QTY On Hand: {results.AvailableSellQuantity}</p>
          {results.ParentSKU ? (
            <p>Product Type: Variant</p>
          ) : childProducts.Item.length ? (
            <p>Product Type: Parent</p>
          ) : (
            <p>Product Type: Standalone</p>
          )}
        </div>
        <div className="col-span-3 mt-4 mb-2">
          <h2 className="mt-4 mb-2 text-2xl font-semibold">Description</h2>
          <div className="prose prose-slate dark:prose-invert">
            {parse(results.Description)}
          </div>
        </div>
        {childProducts.Item.length > 0 && (
          <Variants sku={results.SKU} variants={childProducts.Item} demo={true} />
        )}
        <div className="col-span-3 md:col-span-2 mt-4">
          <p>
            <Link href={`/demo/products`} className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              Go back to all products
            </Link>{" "}
            or return to{" "}
            <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              Home
            </Link>
          </p>
        </div>
        <div className="col-span-3 md:col-span-1 md:mt-4 md:text-right">
          <p>
            {results.Approved === "True" ? (
              <Link
                href={`//${WEBSTORE}/${results.ItemURL}`}
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                View On Webstore{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            ) : (
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                View On Webstore{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </button>
            )}
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <div>
        <p className="mt-6">Could not load SKU</p>
        <p>
          <Link href={`/demo/products`} className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
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
}
