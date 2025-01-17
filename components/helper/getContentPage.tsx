import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";

export default async function getContentPage(webstore: string, secret: string, id: string[]) {
  // webstore and secret passed from AuthJS
  const res = await fetch(`${API_ENDPOINT}${webstore}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      NETOAPI_ACTION: "GetContent",
    },
    body: `{
        "Filter": {
            "ContentID": [
                ${id}
            ],
            "OutputSelector": [
                "ContentID",
                "ContentName",
                "ContentType",
                "ParentContentID",
                "Active",
                "ContentReference",
                "ShortDescription1",
                "ShortDescription2",
                "ShortDescription3",
                "Description1",
                "Description2",
                "Description3",
                "Author",
                "ContentURL",
                "RelatedContents",
                "ExternalSource",
                "ExternalReference1",
                "ExternalReference2",
                "ExternalReference3",
                "DatePosted",
                "DatePostedLocal",
                "DatePostedUTC",
                "DateUpdated",
                "DateUpdatedLocal",
                "DateUpdatedUTC"
            ]
        }
    }`,
  });
 
  console.log(`GET CONTENT RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch content page`);
    if(res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(`${res.status} Response - Max API requests made, pausing and retrying...`);
      await delay(5000).then(() => getContentPage(webstore, secret, id));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json()
}
