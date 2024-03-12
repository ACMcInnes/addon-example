import { redirect } from "next/navigation";
import getAuthenticated from "@/components/helper/getAuthenticated";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const MAX_LIMIT = 10000;

export default async function getProductTotal() {
  const oauth = await getAuthenticated();

  if (oauth.api_id) {
    let needsRedirect = false;
    let webstoreProducts;

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
        console.log(`issue with API call`);

        if (res.statusText === "Unauthorized") {
          needsRedirect = true;
        } else {
          // This will activate the closest `error.js` Error Boundary
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
      }

      webstoreProducts = await res.json();
      // console.log(`FETCH DATA:`);
      // console.log(webstoreProperties);
    } catch (e) {
      return `Could not get webstore products. ${e}`;
    }

    if (needsRedirect) {
      console.log(`token refreshing...`);
      redirect(`/refresh?referrer=products`);
    } else {
        const totalProducts = webstoreProducts.Item.length;
      return totalProducts;
    }
  } else {
    console.log(`oauth error - redirecting to login`);
    redirect(`/neto/login?type=webstore`);
  }
}
