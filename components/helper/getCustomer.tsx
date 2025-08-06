import { cache } from "react";
import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";
const DEMO_WEBSTORE = "https://keylime.neto.com.au";

async function getCustomer(
  hash: string,
  secret: string,
  username: string,
  demo: boolean
) {
  let fetchURL = "";
  let fetchData = {};
  let BODY = `{
                "Filter": {
                  "Username": [
                    "${username}"
                  ],
                  "OutputSelector": [
                    "Username",
                    "ID",
                    "Type",
                    "EmailAddress",
                    "SecondaryEmailAddress",
                    "NewsletterSubscriber",
                    "BillingAddress",
                    "ShippingAddress",
                    "ParentUsername",
                    "ApprovalUsername",
                    "ReferralUsername",
                    "ReferralCommission",
                    "Gender",
                    "DateOfBirth",
                    "IdentificationType",
                    "IdentificationDetails",
                    "DefaultDiscounts",
                    "DefaultDocumentTemplate",
                    "RegistrationDate",
                    "InternalNotes",
                    "ABN",
                    "WebsiteURL",
                    "CreditLimit",
                    "DefaultInvoiceTerms",
                    "Classification1",
                    "Classification2",
                    "SalesChannel",
                    "DefaultShippingAddress",
                    "Active",
                    "OnCreditHold",
                    "UserGroup",
                    "AccountBalance",
                    "AvailableCredit",
                    "AccountManager",
                    "DefaultOrderType",
                    "DateAdded",
                    "DateAddedLocal",
                    "DateAddedUTC",
                    "DateUpdated",
                    "DateUpdatedLocal",
                    "DateUpdatedUTC",
                    "CustomerLog"
                  ]
                }
              }`;

  if (demo) {
    fetchURL = `${DEMO_WEBSTORE}/do/WS/NetoAPI`;
    fetchData = {
      method: "POST",
      headers: {
        NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
        NETOAPI_ACTION: "GetCustomer",
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
        NETOAPI_ACTION: "GetCustomer",
      },
      body: BODY,
    };
  }

  console.log(`Username: ${username}`);

  const res = await fetch(fetchURL, fetchData);

  console.log(`GET ${demo ? "DEMO" : "WEBSTORE"} CUSTOMER RESPONSE:`);
  console.log(`${res.status == 200 ? "OK" : "ERROR"}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch customer data for Username: ${username}`);
    if (res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(
        `${res.status} Response - Max API requests made, pausing and retrying...`
      );
      await delay(5000).then(() => getCustomer(hash, secret, username, demo));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  
  const webstoreCustomer = await res.json();

  if (webstoreCustomer.Ack === "Error") {
    console.dir(webstoreCustomer.Messages[0], { maxArrayLength: null });

    let errorMessage = "Failed to fetch data:";
    webstoreCustomer.Messages[0].Error.forEach(
      (error: { SeverityCode: string; Message: string }) => {
        errorMessage = errorMessage.concat(
          `${error.SeverityCode}: ${error.Message}\n`
        );
      }
    );
    throw new Error(`${errorMessage}`);
  }

  return webstoreCustomer;
}

export default cache(getCustomer);
