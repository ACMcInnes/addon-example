import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { XMLParser } from "fast-xml-parser";

export async function POST(request: NextRequest) {
  try {
    // Process the webhook payload
    console.log(`WEBHOOK RECEIVED:`);

    const text = await request.text();
    if (text) {
      // console.log(`WEBHOOK FULL REQUEST:`);
      // console.log(request);

      console.log(`WEBHOOK TEXT:`);
      console.log(text);

      const parser = new XMLParser();
      let jsText = parser.parse(text);
      console.log(`WEBHOOK TEST JSON:`);
      console.log(jsText);

      console.log(`Webhook received: ${jsText.Event.CurrentTime}`);
      console.log(`Webhook order: ${jsText.Event.Order.OrderID}`);
      console.log(`Webhook order status: ${jsText.Event.Order.OrderStatus}`);

      const order = jsText.Event.Order.OrderID;
      const headersList = headers();
      const webstore_key = headersList.get("NETOAPI_KEY");

      if (webstore_key === process.env.KEYLIME_GLOBAL_KEY) {
        console.log(`FETCHING WEBHOOK ORDER VIA API`);
        const res = await fetch(`https://keylime.neto.com.au/do/WS/NetoAPI`, {
          method: "POST",
          headers: {
            NETOAPI_ACTION: "GetOrder",
            NETOAPI_KEY: `${webstore_key}`,
            Accept: "application/json",
          },
          body: `{
              "Filter": {
                "OrderID": [
                  "${order}"
                ],
                "OutputSelector": [
                  "Username",
                  "Email",
                  "ShipAddress",
                  "BillAddress",
                  "SalesChannel",
                  "GrandTotal"
                ]
              }
            }`,
        });

        console.log(`GET ORDER RESPONSE:`);
        console.log(`${res.status} - ${res.statusText}`);

        if (!res.ok || res.status !== 200) {
          console.log("Failed to fetch webhook order details");
          return new NextResponse(`Webhook error: webhook order could not be found`, {
            status: 400,
          });
        }

        const webstoreOrder = await res.json()
        console.log(`ORDER DATA:`);
        console.log(webstoreOrder);

        // continue to use order data in application as needed

      } else {
        return new NextResponse(`Webhook error: webhook webstore does not match application webstore`, {
          status: 400,
        });
      }
    } else {
      return new NextResponse(`Webhook error: no request body`, {
        status: 400,
      });
    }
  } catch (error) {
    // issue receiving webhook
    return new NextResponse(`Webhook error: ${error}`, {
      status: 400,
    });
  }

  return new NextResponse("200 OK", {
    status: 200,
  });
}

export async function GET(request: NextRequest) {
  return new Response(`Cannot access webhook endpoint via GET request`, {
    status: 400,
  });
}
