import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const redirectURL = "http://localhost:3000/auth/test";
const tokenURL = "https://api.netodev.com/oauth/v2/token?version=2";
const codeURL = "https://api.netodev.com/oauth/v2/auth?version=2";

const API_ENDPOINT_V1 = "https://api.netodev.com/v1/stores/";
const API_ENDPOINT_V2 = "https://api.netodev.com/v2/stores/";
const MAX_LIMIT = 10000;

interface oauthPayload {
    scope: string;
    api_id: string;
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
    iat: number;
    exp: number;
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

async function getWebstore(oauth: oauthPayload) {
    let webstoreProperties;

    try {
      const res = await fetch(`${API_ENDPOINT_V2}${oauth.api_id}/properties`, {
        method: "GET",
        headers: {
          Authorization: `${oauth.token_type} ${oauth.access_token}`,
          "Content-Type": "application/json",
        },
        //body: `{}`,
      });

      console.log(`GET WEBSTORE RESPONSE:`);
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

      webstoreProperties = await res.json();
      // console.log(`FETCH DATA:`);
      // console.log(webstoreProperties);
    } catch (e) {
      return `Could not get webstore properties. ${e}`;
    }
    return webstoreProperties;
}

async function getProductTotal(oauth: oauthPayload) {
    let webstoreProducts;

    try {
      const res = await fetch(`${API_ENDPOINT_V1}${oauth.api_id}/do/WS/NetoAPI`, {
        method: "POST",
        headers: {
          Authorization: `${oauth.token_type} ${oauth.access_token}`,
          "Content-Type": "application/json",
          NETOAPI_ACTION: "GetItem",
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
      // console.log(`FETCH DATA:`);
      // console.log(webstoreProperties);
    } catch (e) {
      return `Could not get webstore products. ${e}`;
    }
    const totalProducts = webstoreProducts.Item.length;
    return totalProducts;
}



export async function POST(request: NextRequest, code: String, grantType: String) {
  // const requestURL=`${tokenURL}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${localRedirectURL}&grant_type=authorization_code&code=${code}`
  if (process.env.VERCEL_ENV === "development") {
  
    const params = new URLSearchParams();

    params.append("client_id", `${process.env.CLIENT_ID}`);
    params.append("client_secret", `${process.env.CLIENT_SECRET}`);
    params.append("redirect_uri", `${redirectURL}`);
    params.append("grant_type", `${grantType}`);
    if (grantType === "authorization_code") {
        params.append("code", `${code}`);
    } else {
        params.append("refresh_token", `${code}`);
    }

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
        //console.log(`FETCH OAUTH DATA:`);
        //console.log(data);
        OAuthResponse.oauth = data;
        const oauthHash = data.api_id;

        if (oauthHash) {     
        // run API call here to confirm connection
        const webstore = await getWebstore(data);

        let webstoreFormatted = {} as webstoreResponse;
        webstoreFormatted.business = webstore.result.business_name;
        webstoreFormatted.domain = webstore.result.domain;
        webstoreFormatted.timezone = webstore.result.timezone;
        webstoreFormatted.country = webstore.result.country;
        //console.log(`FETCH WEBSTORE DATA:`);
        //console.log(webstore);
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
// http://localhost:3000/auth/test?store_domain=keylime.neto.com.au

// logout:
// https://apps.getneto.com/saml/logout

export async function GET(request: NextRequest) {
  if (process.env.VERCEL_ENV === "development") {
    const searchParams = request.nextUrl.searchParams;
    const hasWebstore = searchParams.has("store_domain");
    const hasCode = searchParams.has("code");
    const hasError = searchParams.has("error");

    if (hasWebstore) {
        const webstoreURL = searchParams.get("store_domain");
        // console.log(`store_domain: ${webstoreURL}`);
        redirect(`${codeURL}&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code&store_domain=${webstoreURL}&state=test`);

    } else if (hasCode) {
        const code = searchParams.get("code") ?? "";
        // console.log(`code: ${code}`);
        // return NextResponse.json({ OAuthResponse: `${code}` }, { status: 201 });

        const oauthRes = await POST(request, code, "authorization_code");

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
