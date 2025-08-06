import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";

export default async function getChildProducts(hash: string, secret: string, parent: string, ids: Array<Number>, demo: boolean) {

  let fetchURL = "";
  let fetchData = {};
  let BODY = `{
                "Filter": {
                  "InventoryID": [
                    ${ids}
                  ],
                  "OutputSelector": [
                    "Model",
                    "DefaultPrice",
                    "Images",
                    "ItemURL"
                  ]
                }
              }`;

  if (demo) {
    fetchURL = `${DEMO_WEBSTORE}/do/WS/NetoAPI`;
    fetchData = {
      method: "POST",
      headers: {
        NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
        NETOAPI_ACTION: "GetItem",
        Accept: "application/json",
      },
      body: BODY,
    };
  } else {
    fetchURL = `${API_ENDPOINT}${hash}/do/WS/NetoAPI`;
    fetchData = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        NETOAPI_ACTION: "GetItem",
      },
      body: BODY,
    };
  }


  console.log(`Variant IDs: ${ids}`);
  // webstore and secret passed from AuthJS
  const res = await fetch(fetchURL, fetchData);
 
  console.log(`GET ${demo ? "DEMO" : "WEBSTORE"} PRODUCT VARIANTS RESPONSE:`);
  console.log(`${res.status == 200 ? "OK" : "ERROR"}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch product variant data for SKU: ${parent}`);
    if (res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(
        `${res.status} Response - Max API requests made, pausing and retrying...`
      );
      await delay(5000).then(() => getChildProducts(hash, secret, parent, ids, demo));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const childProducts = await res.json();

  if (childProducts.Ack === "Error") {
    console.dir(childProducts.Messages[0], { maxArrayLength: null });

    let errorMessage = "Failed to fetch data:";
    childProducts.Messages[0].Error.forEach(
      (error: { SeverityCode: string; Message: string }) => {
        errorMessage = errorMessage.concat(
          `${error.SeverityCode}: ${error.Message}\n`
        );
      }
    );
    throw new Error(`${errorMessage}`);
  }
  
  return childProducts;
}
