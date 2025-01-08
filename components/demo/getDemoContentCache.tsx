import { cache } from "react";

const WEBSTORE = "https://keylime.neto.com.au";

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
 
  console.log(`GET DEMO ${CONTENT_CODE.toUpperCase()} CONTENT RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch demo content')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const webstoreContent = await res.json()
  return webstoreContent;
}

export default cache(getDemoContent);
