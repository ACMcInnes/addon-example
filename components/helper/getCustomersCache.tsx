import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const MAX_LIMIT = 10000;

  async function getCustomers(webstore: string, secret: string) {
    // webstore and secret passed from AuthJS {
    const res = await fetch(`${API_ENDPOINT}${webstore}/do/WS/NetoAPI`, {
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
    });

  console.log(`GET CUSTOMER RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to webstore customers`);
    if(res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(`${res.status} Response - Max API requests made, pausing and retrying...`);
      await delay(5000).then(() => getCustomers(webstore, secret));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const webstoreCustomers = await res.json()

  if(webstoreCustomers.Ack === 'Error') {
    console.dir(webstoreCustomers.Messages[0], {'maxArrayLength': null});
  }

  return webstoreCustomers;
}

export default cache(getCustomers);
