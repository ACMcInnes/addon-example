import delay from "@/components/helper/delay";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";

export default async function getCustomer(webstore: string, secret: string, username: string) {
  console.log(`Username: ${username}`);
  // webstore and secret passed from AuthJS
  const res = await fetch(`${API_ENDPOINT}${webstore}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      NETOAPI_ACTION: "GetCustomer",
    },
    body: `{
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
  }`,
  });
 
  console.log(`GET CUSTOMER RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch customer data for Username: ${username}`);
    if(res.status === 429) {
      // to many requests, rate limited by Neto
      console.log(`${res.status} Response - Max API requests made, pausing and retrying...`);
      await delay(5000).then(() => getCustomer(webstore, secret, username));
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json()
}
