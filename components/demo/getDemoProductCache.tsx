import { cache } from "react";

const WEBSTORE = "https://keylime.neto.com.au";
const CONTENT_ID = 468;

async function getDemoProducts() {
  const res = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
      NETOAPI_ACTION: "GetItem",      
      "Accept": "application/json",
    },
    body: `{
        "Filter": {
            "CategoryID": ${CONTENT_ID},
            "ParentSKU": ""
        }
    }`,
  });
 
  console.log(`GET DEMO PRODUCTS RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch demo products')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const webstoreProducts = await res.json()
  return webstoreProducts;
}

export default cache(getDemoProducts);
