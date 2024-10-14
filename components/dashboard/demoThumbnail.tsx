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
        "Accept": "application/json",
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
              "VariantInventoryIDs"
          ]
      }
  }`,
  });
 
  console.log(`SKU: ${sku}: ${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch demo product')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json()
}


  export default async function DemoThumbnail({ sku }: {
    sku: string;
  }) {
      const webstoreProduct = await getDemoProduct(sku);
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
                <section key={`inventory-${index}-${result.InventoryID}`} className="flex flex-col md:flex-row py-6">
                    <div className="h-auto w-full md:h-[400px] md:w-[267px] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <Link href={`/demo/products/${result.SKU}`}>
                            <Image
                                src={
                                result.Images[0]
                                    ? result.Images[0].URL
                                    : "/am_logo.svg"
                                }
                                sizes="(max-width: 768px) 100vw, 300px"
                                alt={`${result.SKU} product image`}
                                width={999}
                                height={1500}
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
                                    href={`/demo/products/${result.SKU}`}
                                    className="mr-3 pr-3 font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400 border-r-2 border-indigo-600 dark:border-sky-500"
                                >
                                    View In App
                                </Link>
                                <Link 
                                    href={`${WEBSTORE}/${result.ItemURL}`}
                                    target="_blank"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
                                >
                                    View On Webstore <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
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
