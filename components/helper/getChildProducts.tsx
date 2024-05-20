import { redirect } from "next/navigation";
import getAuthenticated from "@/components/helper/getAuthenticated";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";

export default async function getChildProducts(parent: string, ids: Array<Number>) {
  console.log(`IDs: ${ids}`);
  const oauth = await getAuthenticated();

  if (oauth.api_id) {
    let needsRedirect = false;
    let webstoreProduct;

    try {
      const res = await fetch(`${API_ENDPOINT}${oauth.api_id}/do/WS/NetoAPI`, {
        method: "POST",
        headers: {
          Authorization: `${oauth.token_type} ${oauth.access_token}`,
          "Content-Type": "application/json",
          NETOAPI_ACTION: "GetItem",
        },
        body: `{
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
        }`,
      });

      console.log(`GET CHILD PRODUCT RESPONSE:`);
      console.log(`${res.status} - ${res.statusText}`);

      if (!res.ok || res.status !== 200) {
        console.log(`issue with API call`);

        if (res.statusText === "Unauthorized") {
          needsRedirect = true;
        } else {
          // This will activate the closest `error.js` Error Boundary
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
      }

      webstoreProduct = await res.json();
      // console.log(`FETCH DATA:`);
      // console.log(webstoreProduct);
    } catch (e) {
      return `Could not get webstore products. ${e}`;
    }

    if (needsRedirect) {
      console.log(`token refreshing...`);
      redirect(`/refresh?referrer=products%2F${parent}`);
    } else {
      return webstoreProduct;
    }
  } else {
    console.log(`oauth error - redirecting to login`);
    redirect(`/neto/login?type=webstore`);
  }
}
