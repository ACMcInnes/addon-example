const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const MAX_LIMIT = 10000;

export default async function getProductTotal(webstore: string, secret: string) {
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
  });
 
  console.log(`GET PRODUCT TOTAL RESPONSE:`);
  console.log(`${res.status} - ${res.statusText}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch product totals')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const webstoreProducts = await res.json()
  return webstoreProducts;
}
