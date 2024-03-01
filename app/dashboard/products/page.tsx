"use client"

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import getWebstore from "@/components/helper/getWebstore";
import getProducts from "@/components/helper/getProducts";
import getAuthenticated from "@/components/helper/getAuthenticated";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState } from "react";


export default async function Products() {
  /*
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
*/



// SOMETHING HERE IS BROKEN - INFINITE LOOP


    // console.log(`COOKIE:`);
    // console.log(jwtCookie);
    let webstore = '';
    const oauth = await getAuthenticated();

     console.log(`OAUTH COOKIE:`);
     console.log(oauth)
    // console.log(oauth.scope);
    // console.log(oauth.access_token);

    const details = await getWebstore(
      oauth.access_token,
      oauth.token_type,
      oauth.api_id
    );

    console.log(`WEBSTORE DETAILS:`);
    console.log(details)

    if (details === "Unauthorized") {
      console.log(`token refresh - redirecting...`);
      redirect(`/neto/callback?refresh=y`);
    } else if (details.success === true) {
      webstore = details.result.domain;
    } else {
      console.log(`could not retreive webstore`);
    }


    return (
      <div>
        <p>Could not load your products, have some webstore details:</p>
        <p>{details}</p>
      </div>
    );

    /*
    useEffect(() => {
      const currentProducts = async () => {
        const products = await getProducts(
          oauth.access_token,
          oauth.token_type,
          oauth.api_id
        );
        setProductData(products);
      }
      currentProducts();
    }, [currentPage, itemsPerPage]);
*/


    /*
    const products = await getProducts(
      oauth.access_token,
      oauth.token_type,
      oauth.api_id
    );

    console.log(`PRODUCTS:`);
    console.log(products);

    if (
      products.Ack === "Error" &&
      products.Messages[0].Error.Message.includes("Invalid token")
    ) {
      console.log(`Error: ${products.Messages[0].Error.Message}`);
      console.log(`refreshing token - redirecting...`);
      redirect(`/neto/callback?refresh=y`);
    } else if (products.Ack === "Success") {
      //console.log(`products:`);
      //console.log(products);
      const results = products.Item;
      console.log(`products result:`);
      console.log(results[1]);
      console.log(`results type: ${typeof products}`);
      return (
        <section className="max-w-screen-lg">
          <p>Your products:</p>

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
                        href={`//${webstore}/${result.ItemURL}`}
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
                      >
                        View <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )
          )}

          <div className="mt-4">
            <p>
              Return to <Link href="/dashboard">Dashboard</Link>.
            </p>
          </div>
        </section>
      );
    } else {
      return (
        <div>
          <p>Could not load your products</p>
          <p>
            Return to <Link href="/">Home</Link> or{" "}
            <Link href="/dashboard/login">Login</Link>.
          </p>
        </div>
      );
    }
    */
}
