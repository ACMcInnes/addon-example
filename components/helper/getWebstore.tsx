import { redirect } from "next/navigation";
import getAuthenticated from "@/components/helper/getAuthenticated";

const apiEndpoint = "https://api.netodev.com/v2/stores/";

export default async function getWebstore() {
  const oauth = await getAuthenticated();

  if (oauth.api_id) {
    let needsRedirect = false;
    let webstoreProperties;

    try {
      const res = await fetch(`${apiEndpoint}${oauth.api_id}/properties`, {
        method: "GET",
        headers: {
          Authorization: `${oauth.token_type} ${oauth.access_token}`,
          "Content-Type": "application/json",
        },
        //body: `{}`,
      });

      console.log(`GET WEBSTORE RESPONSE:`);
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

      webstoreProperties = await res.json();
      // console.log(`FETCH DATA:`);
      // console.log(webstoreProperties);
    } catch (e) {
      return `Could not get webstore properties. ${e}`;
    }

    if (needsRedirect) {
      console.log(`token refreshing...`);
      redirect(`/refresh`);
    } else {
      return webstoreProperties;
    }
  } else {
    console.log(`oauth error - redirecting to login`);
    redirect(`/neto/login?type=webstore`);
  }
}
