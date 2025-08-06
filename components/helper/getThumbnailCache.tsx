import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";

async function getThumbnail(
  hash: string,
  secret: string,
  sku: string,
  demo: boolean
) {
  let fetchURL = "";
  let fetchData = {};
  let BODY = `{
                "Filter": {
                  "SKU": [
                    "${sku}"
                  ],
                  "OutputSelector": [
                    "Name",
                    "Brand",
                    "ShortDescription",
                    "DefaultPrice",
                    "Images",
                    "ItemURL",
                    "ParentSKU",
                    "VariantInventoryIDs",
                    "ItemSpecifics",
                    "Approved",
                    "IsActive"
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

  const res = await fetch(fetchURL, fetchData);

  console.log(`${demo ? "DEMO PRODUCT" : "WEBSTORE PRODUCT"}`);
  console.log(`GET ${sku.toUpperCase()}: ${res.status} - ${res.statusText}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch product thumbnail: ${sku}`);
    if (res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(
        `${res.status} Response - Max API requests made, pausing and retrying...`
      );
      await delay(5000).then(() => getThumbnail(hash, secret, sku, demo));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const thumbnailContent = await res.json();

  if (thumbnailContent.Ack === "Error") {
    console.dir(thumbnailContent.Messages[0], { maxArrayLength: null });

    let errorMessage = "Failed to fetch data:";
    thumbnailContent.Messages[0].Error.forEach(
      (error: { SeverityCode: string; Message: string }) => {
        errorMessage = errorMessage.concat(
          `${error.SeverityCode}: ${error.Message}\n`
        );
      }
    );
    throw new Error(`${errorMessage}`);
  }

  return thumbnailContent;
}

export default cache(getThumbnail);
