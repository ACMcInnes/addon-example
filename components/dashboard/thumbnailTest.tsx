import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import getProductsTest from "@/components/helper/getProductsTest";


  export default async function ThumbnailTest({ key, sku, webstore }: {
    key: string;
    sku: string;
    webstore: string;
  }) {

    const session = await auth();

    if (session) {
      const webstoreProduct = await getProductsTest(session?.webstore_api_id as string, session?.access_token as string, sku);
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
                <section key={`inventory-${result.InventoryID}`} className="flex flex-col md:flex-row py-6">
                <div className="h-auto w-full md:h-[400px] md:w-[267px] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
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
                        className="mr-3 font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
                    >
                        View In App
                    </Link>
                    <Link 
                        href={`//${webstore}/${result.ItemURL}`}
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


} else {
    return (
      <>
        <div className="mt-6">
          <p>You are not logged in</p>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p>Return to <Link href="/" className="text-sky-500">Home</Link></p>
          <p className="m-2">or</p>
          <Link href={`/neto/login?type=webstore`} className="block ml-1 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Log In</Link>
        </div>
      </>
  ); 
  }
}
