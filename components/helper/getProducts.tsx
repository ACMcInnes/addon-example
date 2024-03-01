const apiEndpoint = "https://api.netodev.com/v1/stores/";

export default async function currentProducts(
  authorization: string = "",
  authType: string = "",
  webstore: string = ""
) {
  try {
    const res = await fetch(`${apiEndpoint}${webstore}/do/WS/NetoAPI`, {
      method: "POST",
      headers: {
        Authorization: `${authType} ${authorization}`,
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
            "Page": "0",
            "Limit": "20",
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
        console.log(`need to refresh token`);
        return res.statusText;
      } else {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
    }

    const webstoreProducts = await res.json();
    return webstoreProducts;
  } catch (e) {
    return `Could not get products. ${e}`;
  }
}
