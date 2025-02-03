import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";
const DEMO_CONTENT_ID = 468;
const MAX_LIMIT = 10000;

async function getProductTotal(hash: string, secret: string, demo: boolean) {
  let fetchURL = "";
  let fetchData = {};

  if (demo) {
    fetchURL = `${DEMO_WEBSTORE}/do/WS/NetoAPI`;
    fetchData = {
      method: "POST",
      headers: {
        NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
        NETOAPI_ACTION: "GetItem",
        Accept: "application/json",
      },
      body: `{
              "Filter": {
                "CategoryID": ${DEMO_CONTENT_ID},
                "ParentSKU": "",
                "Limit": "${MAX_LIMIT}"
              }
            }`,
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
      body: `{
              "Filter": {
                "Approved": [
                  "True"
                ],
                "Visible": [
                  "True"
                ],
                "ParentSKU": "",
                "Limit": "${MAX_LIMIT}"
              }
            }`,
    };
  }

  const res = await fetch(fetchURL, fetchData);

  console.log(`GET ${demo ? "DEMO" : "WEBSTORE"} PRODUCT TOTAL RESPONSE:`);
  console.log(`${res.status == 200 ? "OK" : "ERROR"}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to return product total`);
    if (res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(
        `${res.status} Response - Max API requests made, pausing and retrying...`
      );
      await delay(5000).then(() => getProductTotal(hash, secret, demo));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const webstoreProducts = await res.json();

  if (webstoreProducts.Ack === "Error") {
    console.dir(webstoreProducts.Messages[0], { maxArrayLength: null });
  }

  return webstoreProducts;
}

export default cache(getProductTotal);
