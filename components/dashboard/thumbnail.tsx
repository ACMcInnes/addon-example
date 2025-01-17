import Link from "next/link";
import { cache } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import getThumbnail from "@/components/helper/getThumbnail";


// not sure how effective cache is here, needs further testing
const thumbnailCache = cache(
  async (webstore_api_id: string, access_token: string, sku: string) => {
    return await getThumbnail(webstore_api_id, access_token, sku);
  }
);

interface itemSpecificsObject {
  Value: string;
  Name: string;
}

export default async function Thumbnail({
  hash,
  secret,
  sku,
  webstore,
}: {
  hash: string;
  secret: string;
  sku: string;
  webstore: string;
}) {
  const webstoreProduct = await thumbnailCache(hash, secret, sku);
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
          Images: [
            {
                URL: string;
                Timestamp: string;
                ThumbURL: string;
                MediumThumbURL: string;
                Name: string;
            }
          ];
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
                  src={product.Images[0] ? `${product.Images[0].URL}?${new Date(product.Images[0].Timestamp).getTime()}` : "/thumb_fallback.jpg"}
                  sizes="(max-width: 768px) 100vw, 300px"
                  alt={`${product.SKU} product image`}
                  width={999}
                  height={1500}
                  className="w-full h-auto rounded-lg object-contain object-center hover:opacity-75"
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
                  href={`${webstore}/${product.ItemURL}`}
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
