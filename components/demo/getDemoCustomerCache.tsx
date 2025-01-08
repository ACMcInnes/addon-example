import { cache } from "react";

const WEBSTORE = "https://keylime.neto.com.au";
const USER_GROUP = 4;

async function getDemoCustomers() {
  const res = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
      NETOAPI_ACTION: "GetCustomer",      
      "Accept": "application/json",
    },
    body: `{
        "Filter": {
            "UserGroup": [
                ${USER_GROUP}
            ],
            "OutputSelector": [
                "Username",
                "BillingAddress",
                "EmailAddress"
            ]
        }
    }`,
  });
 
  console.log(`GET DEMO CUSTOMERS RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch demo customers')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  const webstoreCustomers = await res.json()
  return webstoreCustomers;
}

export default cache(getDemoCustomers);
