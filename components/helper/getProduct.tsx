import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";

async function getProduct(hash: string, secret: string, sku: string, demo: boolean) {

  let fetchURL = "";
  let fetchData = {};
  let BODY = `{
                "Filter": {
                    "SKU": [
                        "${sku}"
                    ],
                    "OutputSelector": [
                      "ParentSKU",
                      "ID",
                      "Brand",
                      "Model",
                      "Virtual",
                      "Name",
                      "PrimarySupplier",
                      "Approved",
                      "IsActive",
                      "FreeGifts",
                      "CrossSellProducts",
                      "UpsellProducts",
                      "PriceGroups",
                      "WarehouseQuantity",
                      "WarehouseLocations",
                      "CommittedQuantity",
                      "AvailableSellQuantity",
                      "ItemSpecifics",
                      "Categories",
                      "AccountingCode",
                      "RRP",
                      "DefaultPrice",
                      "PromotionPrice",
                      "UnitOfMeasure",
                      "SellUnitQuantity",
                      "PreOrderQuantity",
                      "ShortDescription",
                      "Description",
                      "Features",
                      "Specifications",
                      "Warranty",
                      "TermsAndConditions",
                      "Subtitle",
                      "AvailabilityDescription",
                      "Images",
                      "ProductURL",
                      "UPC",
                      "ReferenceNumber",
                      "InternalNotes",
                      "ItemURL",
                      "RelatedContents",
                      "SalesChannels",
                      "VariantInventoryIDs"
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

  console.log(`SKU: ${sku}`);
  // webstore and secret passed from AuthJS
  const res = await fetch(fetchURL, fetchData);
 
  console.log(`GET ${demo ? "DEMO" : "WEBSTORE"} PRODUCT RESPONSE:`);
  console.log(`${res.status == 200 ? "OK" : "ERROR"}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch product data for SKU: ${sku}`);
    if (res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(
        `${res.status} Response - Max API requests made, pausing and retrying...`
      );
      await delay(5000).then(() => getProduct(hash, secret, sku, demo));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const webstoreProduct = await res.json();
  if (webstoreProduct.Ack === "Error") {
    console.dir(webstoreProduct.Messages[0], { maxArrayLength: null });
  }
  
  return webstoreProduct;
}

export default cache(getProduct);