import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const MAX_LIMIT = 10000;

async function getContentProducts(webstore: string, secret: string, content: string) {
  // webstore and secret passed from AuthJS
  const res = await fetch(`${API_ENDPOINT}${webstore}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      NETOAPI_ACTION: "GetItem",
    },
    body: `{
        "Filter": {
            "CategoryID": [
                "${content}"
            ],
            "ParentSKU": "",
            "Limit": "${MAX_LIMIT}"
        }
    }`,
  });
 
  console.log(`GET CONTENT PRODUCTS RESPONSE:`);
  console.log(`${res.status} - ${res.statusText}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch content products: ${content}`);
    if(res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(`${res.status} Response - Max API requests made, pausing and retrying...`);
      await delay(5000).then(() => getContentProducts(webstore, secret, content));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const contentProducts = await res.json()
  return contentProducts;
}

export default cache(getContentProducts);
