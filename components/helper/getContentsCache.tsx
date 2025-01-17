import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const MAX_LIMIT = 10000;

  async function getContents(webstore: string, secret: string, content_code: string) {
    // webstore and secret passed from AuthJS {
    const res = await fetch(`${API_ENDPOINT}${webstore}/do/WS/NetoAPI`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
          NETOAPI_ACTION: "GetContent",
        },
      body: `{
          "Filter": {
              "ContentType": "${content_code}",
              "Limit": "${MAX_LIMIT}",
              "OutputSelector": [
                  "ContentName",
                  "ParentContentID",
                  "Active",
                  "ContentURL"
              ]
          }
      }`,
    });

  console.log(`GET ${content_code.toUpperCase()} CONTENT RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch webstore contents: ${content_code}`);
    if(res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(`${res.status} Response - Max API requests made, pausing and retrying...`);
      await delay(5000).then(() => getContents(webstore, secret, content_code));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const webstoreContent = await res.json()

  if(webstoreContent.Ack === 'Error') {
    console.dir(webstoreContent.Messages[0], {'maxArrayLength': null});
  }

  return webstoreContent;
}

export default cache(getContents);
