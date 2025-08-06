import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";
const DEMO_USER_GROUP = 4;
const MAX_LIMIT = 10000;

async function getCustomers(hash: string, secret: string, demo: boolean) {
  let fetchURL = "";
  let fetchData = {};

  if (demo) {
    fetchURL = `${DEMO_WEBSTORE}/do/WS/NetoAPI`;
    fetchData = {
      method: "POST",
      headers: {
        NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
        NETOAPI_ACTION: "GetCustomer",
        Accept: "application/json",
      },
      body: `{
                  "Filter": {
                      "UserGroup": [
                          ${DEMO_USER_GROUP}
                      ],
                      "OutputSelector": [
                          "Username",
                          "BillingAddress",
                          "EmailAddress"
                      ]
                  }
              }`,
    };
  } else {
    fetchURL = `${API_ENDPOINT}${hash}/do/WS/NetoAPI`;
    fetchData = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        NETOAPI_ACTION: "GetCustomer",
      },
      body: `{
                  "Filter": {
                      "Active": [
                          "True", "False"
                      ],
                      "Limit": "${MAX_LIMIT}",
                      "OutputSelector": [
                          "Username",
                          "BillingAddress",
                          "EmailAddress"
                      ]
                  }
              }`,
    };
  }

  const res = await fetch(fetchURL, fetchData);
  console.log(`GET ${demo ? "DEMO" : "WEBSTORE"} CUSTOMER RESPONSE:`);
  console.log(`${res.status == 200 ? "OK" : "ERROR"}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to return customers`);
    if (res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(
        `${res.status} Response - Max API requests made, pausing and retrying...`
      );
      await delay(5000).then(() => getCustomers(hash, secret, demo));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const webstoreCustomers = await res.json();

  if (webstoreCustomers.Ack === "Error") {
    console.dir(webstoreCustomers.Messages[0], { maxArrayLength: null });

    let errorMessage = "Failed to fetch data:";
    webstoreCustomers.Messages[0].Error.forEach(
      (error: { SeverityCode: string; Message: string }) => {
        errorMessage = errorMessage.concat(
          `${error.SeverityCode}: ${error.Message}\n`
        );
      }
    );
    throw new Error(`${errorMessage}`);
  }

  return webstoreCustomers;
}

export default cache(getCustomers);
