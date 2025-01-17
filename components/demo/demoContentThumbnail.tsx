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

export default async function DemoContentThumbnail({ sku }: { sku: string }) {
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
            <div key={product.InventoryID} className="group relative">
              <Image
                src={product.Images[0] ? `${product.Images[0].URL}?${new Date(product.Images[0].Timestamp).getTime()}` : "/thumb_fallback.jpg"}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 250px"
                alt={`${product.SKU} product image`}
                width={999}
                height={1500}
                className="aspect-square w-full rounded-md bg-[#F6F6F6] object-contain group-hover:opacity-75"
              />
              <div className="mt-4 flex flex-col">
                <div className="flex flex-row justify-between">
                  <h3 className="text-sm text-gray-700 dark:text-gray-400">
                    <Link href={`/demo/products/${product.SKU}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.SKU}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">AUD ${product.DefaultPrice}</p>
                </div>
                <p className="text-sm mt-1 font-medium text-gray-900 dark:text-gray-100">{product.Model}</p>
              </div>
            </div>
        )
      )}
    </>
  );
}
