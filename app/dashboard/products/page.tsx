import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import getWebstore from "@/components/helper/getWebstore";
import getProducts from "@/components/helper/getProducts";
import getProductTotal from "@/components/helper/getProductTotal";
import Pagination from "@/components/dashboard/pagination";

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    const details = await getWebstore("products");
    const productTotal = await getProductTotal();
    const webstore = details.result.domain;

    let page = searchParams.page ? +searchParams.page : 0;
    let limit = 20;
    
    const products = await getProducts(page, limit);

    if (
      products.Ack === "Error" &&
      products.Messages[0].Error.Message.includes("Invalid token")
    ) {
      console.log(`Error: ${products.Messages[0].Error.Message}`);
      console.log(`refreshing token - redirecting...`);
      redirect(`/refresh?referrer=products`);
    } else if (products.Ack === "Success") {
      // console.log(`products:`);
      // console.log(products);
      const results = products.Item;
       // console.log(`products result: ${results.length}`);
       // console.log(results);
      // console.log(`results type: ${typeof products}`);
      if (results.length) {
        return (
          <section className="max-w-screen-lg">
            <p>Your products - page {page}:</p>
  
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
                <section key={index} className="flex flex-col md:flex-row py-6">
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
  
            <div className="my-8">
              <p>
                Return to <Link href="/dashboard" className="text-sky-500">Dashboard</Link>
              </p>
            </div>
            <Pagination currentPage={page} limit={limit} total={productTotal} />
          </section>
        );
      } else {
        return (
          <div>
            <p className="mt-6">No more products.</p>
            <p>
              <Link href={`/dashboard/products?page=${--page}`} className="text-sky-500">Go back</Link> or{" "}
              return to <Link href="/" className="text-sky-500">Home</Link>
            </p>
          </div>
        );
      }
    } else {
      return (
        <div>
          <p>Could not load your products</p>
          <p>
            Return to <Link href="/" className="text-sky-500">Home</Link> or{" "}
            <Link href="/dashboard/login" className="text-sky-500">Login</Link>.
          </p>
        </div>
      );
    }
}
