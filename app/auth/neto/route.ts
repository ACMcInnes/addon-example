import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// v1 API OAuth

const redirectURL = "http://localhost:3000/auth/neto";
const tokenURL = "https://apps.getneto.com/oauth/v2/token";
const codeURL = "https://apps.getneto.com/oauth/v2/auth";

const API_ENDPOINT_V1 = "/do/WS/NetoAPI";
const CLIENT_ID = `${process.env.CLIENT_ID}`;
const SECRET = `${process.env.CLIENT_SECRET}`;

const MAX_LIMIT = 10000;

interface oauthPayload {
    scope: string;
    store_id: string;
    store_domain: string;
    store_name: number;
    store_timezone: string;
    access_token: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    };
    billing_address: {
        street1: string;
        street2: string;
        city: string;
        post_code: string;
        state: string;
        country_name: string;
        country_code: string;
      }
  }

  interface oauthResponse {
    oauth: oauthPayload;
    webstore: object;
    activeProductTotal: string;
  }

  interface webstoreResponse {
    domain: string;
    business: string;
    timezone: string;
    country: string;
  }

let OAuthResponse = {} as oauthResponse;

async function getProductTotal(data: oauthPayload) {
    let webstoreProducts;

    try {
      const res = await fetch(`https://${data.store_domain}${API_ENDPOINT_V1}`, {
        method: "POST",
        headers: {
            NETOAPI_ACTION: "GetItem",
            X_ACCESS_KEY: CLIENT_ID,
            X_SECRET_KEY: data.access_token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: `{
            "Filter": {
                "Approved": [
                    "True"
                ],
                "Visible": [
                    "True"
                ],
                "ParentSKU": "",
                "Limit": "${MAX_LIMIT}"
            }
        }`,
      });

      console.log(`GET PRODUCT TOTAL RESPONSE:`);
      console.log(`${res.status} - ${res.statusText}`);

      if (!res.ok || res.status !== 200) {
        console.log(`issue with API call`);

        if (res.statusText === "Unauthorized") {
            console.log(`user is not authorized to make this request`);
        } else {
          // This will activate the closest `error.js` Error Boundary
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
      }

      webstoreProducts = await res.json();
      console.log(`WEBSTORE PRODUCTS:`);
      console.log(webstoreProducts);
      console.log(webstoreProducts.Messages);
    } catch (e) {
      return `Could not get webstore products. ${e}`;
    }
    const totalProducts = webstoreProducts.Item.length;
    return totalProducts;
}



export async function POST(request: NextRequest, code: String, grantType: String) {
  // const requestURL=`${tokenURL}&client_id=${CLIENT_ID}&client_secret=${SECRET}&redirect_uri=${localRedirectURL}&grant_type=authorization_code&code=${code}`
  if (process.env.NODE_ENV === "development") {
  
    console.log(`POST REQUEST STARTED`)

    const params = new URLSearchParams();

    params.append("client_id", `${CLIENT_ID}`);
    params.append("client_secret", `${SECRET}`);
    params.append("redirect_uri", `${redirectURL}`);
    params.append("grant_type", `${grantType}`);
    if (grantType === "authorization_code") {
        params.append("code", `${code}`);
    } else {
        params.append("refresh_token", `${code}`);
    }

    console.log(`SWAPPING CODE FOR TOKEN`)

    try {
        const res = await fetch(tokenURL, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            //'Content-Type': 'multipart/form-data',
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        });

        const data = await res.json();
        console.log(`OAUTH TOKEN RESPONSE:`);
        console.log(data);
        OAuthResponse.oauth = data;
        const accessToken = data.access_token;

        if (accessToken) {     
        // run API call here to confirm connection

        let webstoreFormatted = {} as webstoreResponse;
        webstoreFormatted.business = data.store_name;
        webstoreFormatted.domain = data.store_domain;
        webstoreFormatted.timezone = data.store_timezone;
        webstoreFormatted.country = data.billing_address.country_name;

        OAuthResponse.webstore = webstoreFormatted;

        const productTotal = await getProductTotal(data);

        OAuthResponse.activeProductTotal = productTotal;

        console.log(`OAUTH RESPONSE:`);
        console.log(OAuthResponse);

        return NextResponse.json({ oauth: "success - oauth connection created" }, { status: 201 });
        } else {
        return NextResponse.json({ oauth: "error - oauth connection failed" }, { status: 500 });
        }
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
  } else {
    return NextResponse.json({ oauth: "error - this page cannot be run in production" }, { status: 500 });
  }
}

// login:
// http://localhost:3000/auth/neto?store_domain=keylime.neto.com.au

// logout:
// https://apps.getneto.com/saml/logout

export async function GET(request: NextRequest) {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === "development") {
    const searchParams = request.nextUrl.searchParams;
    const hasWebstore = searchParams.has("store_domain");
    const hasCode = searchParams.has("code");
    const hasError = searchParams.has("error");

    if (hasWebstore) {
        const webstoreURL = searchParams.get("store_domain");
        // console.log(`store_domain: ${webstoreURL}`);
        redirect(`${codeURL}?client_id=${CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code&store_domain=${webstoreURL}&state=test`);

    } else if (hasCode) {
        const code = searchParams.get("code") ?? "";
        // console.log(`code: ${code}`);
        // return NextResponse.json({ OAuthResponse: `${code}` }, { status: 201 });

        const oauthRes = await POST(request, code, "authorization_code");

        console.log(`TOKEN RESPONSE`)
        console.log(oauthRes)

        if (oauthRes.status === 201) {
        console.log(`oauth complete`);
        return NextResponse.json({ OAuthResponse }, { status: 201 });
        } else {
        console.log(`oauth error`);
        return NextResponse.json({ oauth: "error - oauth connection failed" }, { status: 500 });
        }
    } else if (hasError) {
        const errorDesc = searchParams.get("error_description") ?? "";
        const errorHint = searchParams.get("hint") ?? "";
        const errorMessage = searchParams.get("message") ?? "";

        console.log(`oauth error:`);
        console.log(`description: ${errorDesc}`);
        console.log(`hint: ${errorHint}`);
        console.log(`message: ${errorMessage}`);
        return NextResponse.json({ oauth: "error - oauth connection failed" }, { status: 500 });
    } else {
        console.log(`oauth error`);
        return NextResponse.json({ oauth: "error - oauth connection failed" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ oauth: "error - this page cannot be run in production" }, { status: 500 });
  }
}
