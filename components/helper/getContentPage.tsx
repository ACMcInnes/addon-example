import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";

async function getContentPage(hash: string, secret: string, id: string[], demo: boolean) {
  let fetchURL = "";
  let fetchData = {};
  let BODY = `{
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
              }`;

  if (demo) {
    fetchURL = `${DEMO_WEBSTORE}/do/WS/NetoAPI`;
    fetchData = {
      method: "POST",
      headers: {
        NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
        NETOAPI_ACTION: "GetContent",
        Accept: "application/json",
      },
      body: BODY,
    };
  } else {
    fetchURL = `${API_ENDPOINT}${hash}/do/WS/NetoAPI`;
    fetchData = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        NETOAPI_ACTION: "GetContent",
      },
      body: BODY,
    };
  }

  const res = await fetch(fetchURL, fetchData);
 
  console.log(`GET ${demo ? "DEMO" : "WEBSTORE"} CONTENT RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch content page`);
    if(res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(`${res.status} Response - Max API requests made, pausing and retrying...`);
      await delay(5000).then(() => getContentPage(hash, secret, id, demo));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const webstoreContent = await res.json();
  if (webstoreContent.Ack === "Error") {
    console.dir(webstoreContent.Messages[0], { maxArrayLength: null });
  }
  
  return webstoreContent;
}

export default cache(getContentPage);
