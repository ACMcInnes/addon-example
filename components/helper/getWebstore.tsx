const apiEndpoint = "https://api.netodev.com/v2/stores/";

export default async function getWebstore(
  authorization: string = "",
  authType: string = "",
  webstore: string = ""
) {
  try {
    const res = await fetch(`${apiEndpoint}${webstore}/properties`, {
      method: "GET",
      headers: {
        Authorization: `${authType} ${authorization}`,
        "Content-Type": "application/json",
      },
      //body: `{}`,
    });

    console.log(`WEBSTORE PROPERTIES RESPONSE:`);
    console.log(`${res.status} - ${res.statusText}`);

    if (!res.ok || res.status !== 200) {
      console.log(`issue with API call`);

      if (res.statusText === "Unauthorized") {
        console.log(`need to refresh token`);
        return res.statusText;
      } else {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
    }

    const webstoreProperties = await res.json();
    return webstoreProperties;
  } catch (e) {
    return `Could not get webstore properties. ${e}`;
  }
}
