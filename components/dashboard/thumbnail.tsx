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
          <section
            key={`inventory-${result.InventoryID}`}
            className="flex flex-col md:flex-row py-6"
          >
            <div className="h-auto w-full md:h-[400px] md:w-[267px] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
              <Link href={`/dashboard/products/${result.SKU}`}>
                <Image
                  src={
                    result.Images[0]
                      ? result.Images[0].MediumThumbURL
                      : "/am_logo.svg"
                  }
                  alt={`${result.SKU} product image`}
                  width={533}
                  height={800}
                  className="h-full w-full object-contain object-center"
                />
              </Link>
            </div>

            <div className="mt-4 md:mt-0 mx-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
                  <h3>{result.Model}</h3>
                  <p className="ml-4">${result.DefaultPrice}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{result.SKU}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">{result.InventoryID}</p>

                <div className="flex">
                  <Link
                    href={`/dashboard/products/${result.SKU}`}
                    className="mr-3 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    View In App
                  </Link>
                  <Link
                    href={`//${webstore}/${result.ItemURL}`}
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    View On Webstore{" "}
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
}
