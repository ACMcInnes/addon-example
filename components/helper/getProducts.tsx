import { redirect } from "next/navigation";
import getAuthenticated from "@/components/helper/getAuthenticated";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";

export default async function getProducts(page: number, limit: number) {
  console.log(`Page: ${page}`);
  console.log(`Limit: ${limit}`);
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
                "Page": "${page}",
                "Limit": "${limit}",
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

      console.log(`GET PRODUCT RESPONSE:`);
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
      return webstoreProducts;
    }
  } else {
    console.log(`oauth error - redirecting to login`);
    redirect(`/neto/login?type=webstore`);
  }
}
