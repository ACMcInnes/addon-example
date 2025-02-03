import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";
const MAX_LIMIT = 10000;

/*
async function getDemoContent(CONTENT_CODE: string, PARENT_ID: string = '') {
  const res = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
      NETOAPI_ACTION: "GetContent",      
      "Accept": "application/json",
    },
    body: `{
        "Filter": {
            "ContentType": "${CONTENT_CODE}",
            ${PARENT_ID && `"ParentContentID": "${PARENT_ID}",`}
            "OutputSelector": [
                "ContentName",
                "ParentContentID",
                "Active",
                "ContentURL"
            ]
        }
    }`,
  });
  */

async function getContents(
  hash: string,
  secret: string,
  demo: boolean,
  content_code: string
) {
  let fetchURL = "";
  let fetchData = {};
  let BODY = `{
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
              }`
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

  // webstore and secret passed from AuthJS {
  const res = await fetch(fetchURL, fetchData);

  console.log(`${demo ? "DEMO CONTENT" : "WEBSTORE CONTENT"}`);
  console.log(`GET CONTENT ID ${content_code.toUpperCase()} RESPONSE:`);
  console.log(`${res.status == 200 ? "OK" : "ERROR"}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch webstore contents: ${content_code}`);
    if (res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(
        `${res.status} Response - Max API requests made, pausing and retrying...`
      );
      await delay(5000).then(() =>
        getContents(hash, secret, demo, content_code)
      );
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

export default cache(getContents);
