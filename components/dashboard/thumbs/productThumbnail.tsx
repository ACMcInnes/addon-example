import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import getThumbnailCache from "@/components/helper/getThumbnailCache";

interface itemSpecificsObject {
  Value: string;
  Name: string;
}

export default async function ProductThumbnail({
  hash,
  secret,
  sku,
  webstore,
  demo,
}: {
  hash: string;
  secret: string;
  sku: string;
  webstore: string;
  demo: boolean;
}) {
  const webstoreProduct = await getThumbnailCache(hash, secret, sku, demo);
  const results = webstoreProduct.Item;
  return (
    <>
      {results.map(
        (product: {
          InventoryID: string;
          SKU: string;
          Name: string;
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
          Approved: string;
          IsActive: string;
        }) => (
          <div
            key={product.InventoryID}
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-xs rounded-lg"
          >
            <div className="p-4 sm:p-6 lg:grid lg:grid-cols-12 lg:gap-x-6">
              <div className="sm:flex lg:col-span-7">
                <Image
                  src={
                    product.Images[0]
                      ? `${product.Images[0].URL}?${new Date(
                          product.Images[0].Timestamp
                        ).getTime()}`
                      : "/thumb_fallback.jpg"
                  }
                  sizes="(max-width: 639px) 100vw, 160px"
                  alt={`${product.SKU} product image`}
                  width={1000}
                  height={1500}
                  className="shrink-0 rounded-md bg-[#F6F6F6] object-contain sm:w-40"
                />
                <div className="mt-6 sm:mt-0 sm:ml-6">
                  <h3 className="text-base font-medium text-gray-900 dark:text-gray-200">
                    <Link
                      href={`/${demo ? "demo" : "dashboard"}/products/${
                        product.SKU
                      }`}
                    >
                      {product.Name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                    ${product.DefaultPrice}
                  </p>                  
                  {product.ShortDescription
                    ? (
                      <>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                          {product.ShortDescription}
                        </p>
                        <p className="mt-3 text-sm text-gray-400">
                          {product.SKU}
                        </p>
                      </>
                      ) : (
                      <p className="mt-3 text-sm text-gray-400">
                        {product.SKU}
                      </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between mt-6 lg:col-span-5 lg:mt-0">
                <dl className="grid grid-cols-2 gap-x-6 text-sm">
                  <div>
                    <dt className="font-medium text-gray-900 dark:text-gray-200">
                      Item Specifics
                    </dt>
                    <dd className="mt-3 text-gray-500 dark:text-gray-300">
                      {Array.isArray(product.ItemSpecifics[0].ItemSpecific) ? (
                        product.ItemSpecifics[0].ItemSpecific.map(
                          (itemSpecific: itemSpecificsObject) => (
                            <p key={`${itemSpecific.Name.replace(/\s/g,"")}${itemSpecific.Value.replace(/\s/g, "")}`}>
                              <span className="font-semibold">
                                {itemSpecific.Name}
                                {": "}
                              </span>
                              {itemSpecific.Value}
                            </p>
                          )
                        )
                      ) : product.ItemSpecifics[0].ItemSpecific.Name ? (
                        <p>
                          <span className="font-semibold">
                            {product.ItemSpecifics[0].ItemSpecific.Name}
                            {": "}
                          </span>
                          {product.ItemSpecifics[0].ItemSpecific.Value}
                        </p>
                      ) : null}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900 dark:text-gray-200">Product Info</dt>
                    <dd className="mt-3 space-y-3 text-gray-500 dark:text-gray-300">
                      <p><span className="font-semibold">Type:</span>{" "}
                      {product.ParentSKU ? (
                        "Variant"
                      ) : product.VariantInventoryIDs.length ? (
                        "Parent"
                      ) : (
                        "Standalone"
                      )}
                      </p>
                      <p><span className="font-semibold">Active:</span> {product.IsActive}</p>
                      <p><span className="font-semibold">Approved:</span> {product.Approved}</p>
                    </dd>
                  </div>
                </dl>
                <p className="self-end mt-6 font-medium md:mt-10">
                  <Link
                    href={`/${demo ? "demo" : "dashboard"}/products/${
                      product.SKU
                    }`}
                    className="mr-3 pr-3 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
                  >
                    View In App
                  </Link>

                  {product.Approved === "True" ? (
                    <Link
                      href={`${webstore}/${product.ItemURL}`}
                      target="_blank"
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
            </div>
          </div>
        )
      )}
    </>
  );
}

/*
<div
  key={product.InventoryID}
  className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
>
  <div className="sm:col-span-5 sm:row-span-2 sm:row-end-2">
    <Link href={`/${demo ? "demo" : "dashboard"}/products/${product.SKU}`}>
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
      <Link href={`/${demo ? "demo" : "dashboard"}/products/${product.SKU}`}>
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
            
                //  Absolutely bonkers workaround for the fact that Neto can return an Object if there is only one result
                //  or it can return an Array with 1 or more elements in it
              
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
        href={`/${demo ? "demo" : "dashboard"}/products/${product.SKU}`}
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
*/
