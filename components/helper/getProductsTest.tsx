const API_ENDPOINT = "https://api.netodev.com/v1/stores/";

export default async function getProductsTest(webstore: string, secret: string, sku: string) {
  console.log(`SKU: ${sku}`);
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
          "SKU": [
              "${sku}"
          ],
          "OutputSelector": [
              "Model",
              "Brand",
              "ShortDescription",
              "DefaultPrice",
              "Images",
              "ItemURL",
              "ParentSKU",
              "VariantInventoryIDs"
          ]
      }
  }`,
  });
 
  console.log(`GET PRODUCTS RESPONSE:`);
  console.log(`${res.status} - ${res.statusText}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch product catalogue')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json()
}
