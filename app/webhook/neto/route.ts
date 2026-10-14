import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { XMLParser } from "fast-xml-parser";
import crypto from "crypto";
import minifyXML from "minify-xml";

export function verifySignature(
  data: string,
  signatureBase64: string,
  publicKey: string
): boolean {
  const dataBuffer = Buffer.from(minifyXML(data));
  const signatureBuffer = Buffer.from(signatureBase64, 'base64');
  const isVerified = crypto.verify(
    'sha256',
    dataBuffer,
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING // Match the padding used during signing (e.g., PSS or PKCS1)
    },
    signatureBuffer
  );

  return isVerified;
}

export async function POST(request: NextRequest) {
  try {
    // Process the webhook payload
    console.log(`WEBHOOK RECEIVED:`);

    const text = await request.text();
    if (text) {
      // console.log(`WEBHOOK FULL REQUEST:`);
      // console.log(request);

      // console.log(`WEBHOOK TEXT:`);
      console.log(text);

      const parser = new XMLParser();
      let webhook = parser.parse(text);
      // console.log(`WEBHOOK TEST JSON:`);
      // console.log(webhook);

      let eventSubtype = webhook.Event.EventSubtype || 'OrderStatus';

      console.log(`Webhook received: ${webhook.Event.CurrentTime}`);
      console.log(`Webhook order: ${webhook.Event.Order.OrderID}`);
      console.log(`Webhook order ${eventSubtype}: ${webhook.Event.Order[eventSubtype]}`);

      const order = webhook.Event.Order.OrderID;
      const headersList = await headers();
      

  return new NextResponse("200 OK", {
    status: 200,
  });

      console.log(`HEADERS`)
      headersList.forEach((value, key) => {
        console.log(`${key} ==> ${value}`);
      });

      const webstoreKey = headersList.get("NETOAPI_KEY");
      const eventType = headersList.get("NETO_NOTIFICATION"); // can use if Neto expands the webhook events they trigger
      const webstoreHash = headersList.get("X-Neto-Store-Id");
      const eventSignature = headersList.get("X-Neto-Signature") || '';
      const signatureError = headersList.get("X-Neto-Signature-Error");
      const publicKey = process.env.KEYLIME_RSA_PUBLIC_KEY!.replace(/\\n/g, '\n');

      if (webstoreHash) {
        console.log(`Webhook signature supplied, checking...`)
        /*
          // don't need to create a key object, 'verify' method handles key as a string
          const pubKeyObject = crypto.createPublicKey({
            key: publicKey,
            format: 'pem',
            type: 'pkcs1',
          });
          const publicKeyPem = pubKeyObject.export({
            type: 'pkcs1',
            format: 'pem',
          });
          console.log(publicKeyPem);
        */
        if (signatureError) {
          console.log("Failed to verify webhook source");
          console.log(signatureError)
          return new NextResponse(`Webhook error: ${signatureError}`, {
            status: 400,
          });
        }
        const validWebhook = verifySignature(text, eventSignature, publicKey)
        console.log('Signature valid:', validWebhook);

        // perform update actions here as webhook source is authentic

      }

      if (webstoreKey === process.env.KEYLIME_WEBHOOK_TOKEN) {
        console.log(`FETCHING WEBHOOK ORDER VIA API`);
        const res = await fetch(`https://keylime.neto.com.au/do/WS/NetoAPI`, {
          method: "POST",
          headers: {
            NETOAPI_ACTION: "GetOrder",
            NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
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
  // let Neto know we received the webhook
  return new NextResponse("200 OK", {
    status: 200,
  });
}

export async function GET(request: NextRequest) {
  return new Response(`Cannot access webhook endpoint via GET request`, {
    status: 400,
  });
}
