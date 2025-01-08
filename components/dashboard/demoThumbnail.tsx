import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const WEBSTORE = "https://keylime.neto.com.au";

async function getDemoProduct(sku: string) {
  // console.log(`SKU: ${sku}`);
  // webstore and secret passed from AuthJS
  const res = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
      NETOAPI_ACTION: "GetItem",
      Accept: "application/json",
    },
    body: `{
      "Filter": {
          "SKU": [
              "${sku}"
          ],
          "OutputSelector": [
              "Model",
              "Brand",
              "ShortDescription",
              "DefaultPrice",
              "Images",
              "ItemURL",
              "ParentSKU",
              "VariantInventoryIDs",
              "ItemSpecifics"
          ]
      }
  }`,
  });

  console.log(`SKU: ${sku}: ${res.status == 200 ? "OK" : "ERROR"}`);

  if (!res.ok || res.status !== 200) {
    console.log("Failed to fetch demo product");
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
}

interface itemSpecificsObject {
  Value: string;
  Name: string;
}

export default async function DemoThumbnail({ sku }: { sku: string }) {
  const webstoreProduct = await getDemoProduct(sku);
  const results = webstoreProduct.Item;
  return (
    <>
      {results.map(
        (product: {
          InventoryID: string;
          SKU: string;
          Model: string;
          Brand: string;
          DefaultPrice: string;
          ShortDescription: string;
          ItemURL: string;
          Images: any;
          ItemSpecifics: [
            {
              ItemSpecific: Array<itemSpecificsObject> | itemSpecificsObject;
            }
          ];
          ParentSKU: string;
          VariantInventoryIDs: string[];
        }) => (
          <div
            key={product.InventoryID}
            className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
          >
            <div className="sm:col-span-5 sm:row-span-2 sm:row-end-2">
              <Link href={`/demo/products/${product.SKU}`}>
                <Image
                  src={
                    product.Images[0] ? product.Images[0].URL : "/am_logo.svg"
                  }
                  sizes="(max-width: 768px) 100vw, 300px"
                  alt={`${product.SKU} product image`}
                  width={999}
                  height={1500}
                  className="w-full h-auto rounded-lg object-contain object-center"
                />
              </Link>
            </div>
            <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                <Link href={`/demo/products/${product.SKU}`}>
                  {product.Model}
                </Link>
              </h3>
              <p className="mt-1 font-medium text-gray-900 dark:text-gray-100">
                AUD ${product.DefaultPrice}
              </p>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                {product.ShortDescription
                  ? product.ShortDescription
                  : product.SKU}
              </p>
            </div>
            <div className="sm:col-span-7 flex flex-col justify-around">
              <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 dark:border-gray-500 py-8 md:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                <div>
                  <dt className="font-medium text-lg text-gray-900 dark:text-gray-100">Item Specifics</dt>
                  <dd className="mt-3 text-pretty text-gray-500 dark:text-gray-300">
                    {/* 
                            Absolutely bonkers workaround for the fact that Neto can return an Object if there is only one result
                            or it can return an Array with 1 or more elements in it
                        */}
                    {Array.isArray(product.ItemSpecifics[0].ItemSpecific) ? (
                      product.ItemSpecifics[0].ItemSpecific.map(
                        (itemSpecific: itemSpecificsObject) => (
                          <p key={`${itemSpecific.Name.replace(/\s/g,'')}${itemSpecific.Value.replace(/\s/g,'')}`}>
                            <span className="font-semibold">{itemSpecific.Name}{": "}</span>{itemSpecific.Value}
                          </p>
                        )
                      )
                    ) : product.ItemSpecifics[0].ItemSpecific.Name ? (
                      <p>
                        <span className="font-semibold">{product.ItemSpecifics[0].ItemSpecific.Name}{": "}</span>{product.ItemSpecifics[0].ItemSpecific.Value}
                      </p>
                    ) : null}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-lg text-gray-900 dark:text-gray-100">
                    Product Type
                  </dt>
                  <dd className="mt-3 space-y-3 text-gray-500 dark:text-gray-300">
                    {product.ParentSKU ? (
                        <p>Variant</p>
                    ) : product.VariantInventoryIDs.length ? (
                        <p>Parent</p>
                    ) : (
                        <p>Standalone</p>
                    )}
                  </dd>
                </div>
              </dl>
              <p className="self-end mt-6 font-medium md:mt-10">
                <Link
                  href={`/demo/products/${product.SKU}`}
                  className="mr-3 pr-3 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
                >
                  View In App
                </Link>
                <Link
                  href={`${WEBSTORE}/${product.ItemURL}`}
                  target="_blank"
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
                >
                  View On Webstore{" "}
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
              </p>
            </div>
          </div>
        )
      )}
    </>
  );
}
