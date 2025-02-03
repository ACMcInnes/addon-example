import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";
const MAX_LIMIT = 10000;

async function getContentProducts(
  hash: string,
  secret: string,
  content: string,
  demo: boolean
) {
  let fetchURL = "";
  let fetchData = {};
  let BODY = `{
                "Filter": {
                  "CategoryID": [
                    "${content}"
                  ],
                  "ParentSKU": "",
                  "Limit": "${MAX_LIMIT}"
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

  const res = await fetch(fetchURL, fetchData);

  console.log(`${demo ? "DEMO" : "WEBSTORE"} CONTENT PRODUCTS`);
  console.log(`GET CONTENT PRODUCTS RESPONSE:`);
  console.log(`${res.status} - ${res.statusText}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch content products: ${content}`);
    if (res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(
        `${res.status} Response - Max API requests made, pausing and retrying...`
      );
      await delay(5000).then(() =>
        getContentProducts(hash, secret, content, demo)
      );
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const contentProducts = await res.json();

  console.dir(contentProducts, { maxArrayLength: null });

  if (contentProducts.Ack === "Error") {
    console.dir(contentProducts.Messages[0], { maxArrayLength: null });
  }

  return contentProducts;
}

export default cache(getContentProducts);
