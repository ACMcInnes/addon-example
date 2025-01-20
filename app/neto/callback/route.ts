import { signIn, signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hasWebstore = searchParams.has("store_domain");
  const hasStoreId = searchParams.has("store_id");

  console.log(`GET REQUEST`);
  // console.log(request);
  console.log(request.text);

  console.log(searchParams.toString());

  if (hasWebstore) {
    const webstoreURL = searchParams.get("store_domain") as string;
    // console.log(`redirect production url: //${process.env.VERCEL_PROJECT_PRODUCTION_URL}/dashboard`);
    // console.log(`redirect branch url: //${process.env.VERCEL_BRANCH_URL}/dashboard`);

    //try {
    await signIn(
      "neto",
      { redirectTo: `/rerouter` },
      { store_domain: webstoreURL }
    );

    // console.log(`AUTH RESPONSE:`);
    // console.log(auth);

    //} catch (e) {
    //  return NextResponse.json({ oauth: `Authentication failed. ${e}` }, { status: 500 });
    //}

    //redirect(`/dashboard`);
  } else if (hasStoreId) {
    const webstoreId = searchParams.get("store_id") as string;
    console.log(`this should be an uninstall request for: ${webstoreId}`);
    console.log(searchParams);
    return NextResponse.json(
      { oauth: `Uninstall Request failed, check logs for details` },
      { status: 500 }
    );
  } else {
    console.log(`oauth error, redirecting to login`);
    await signOut({redirectTo: '/neto/login?type=signout'});
  }
}

// FORCE LOGOUT URL:
// https://api.netodev.com/oauth/v2/auth

export async function POST(request: NextRequest) {
  console.log(`UNINSTALL POST RECEIVED:`);
  console.log(request);
  try {
    // Process the webhook payload
    const text = await request.json();
    if (text) {
      console.log(`UNINSTALL TEXT:`);
      console.log(text);

      console.log(`Uninstall Code: ${text.code}`);
      console.log(`Client: ${text.client_id}`);
      console.log(`Store: ${text.store_id}`);
      console.log(`Hash: ${text.api_id}`);

      const headersList = await headers();
      console.log(`headers:`);
      console.log(headersList);
      const verification_key = headersList.get("neto_verification_key");
      console.log(`verification key: ${verification_key}`);

      // confirm uninstall request, POST deauth code to Neto Token endpoint

      if (text.client_id === process.env.CLIENT_ID) {
        const deauthURL = `https://api.netodev.com/oauth/v2/token?version=2`;
        const redirectURL = `https://addon-example.vercel.app/neto/callback`;
        const localRedirectURL = `http://localhost:3000/neto/callback`;
        const params = new URLSearchParams();

        params.append("client_id", `${process.env.CLIENT_ID}`);
        params.append("client_secret", `${process.env.CLIENT_SECRET}`);
        if (process.env.VERCEL_ENV === "development" || process.env.NODE_ENV === "development") {
          params.append("redirect_uri", `${localRedirectURL}`);
        } else {
          params.append("redirect_uri", `${redirectURL}`);
        }
        params.append("grant_type", `authorization_code`);
        params.append("code", `${text.code}`);

        console.log(`running deauth request...`)

        try {
          const res = await fetch(deauthURL, {
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

          const data = await res.text();
          console.log(`FETCH DEAUTH DATA:`);
          console.log(data);

          return new NextResponse(`Uninstall successful: ${text.store_id}`, {
            status: 200,
          });
        } catch (e) {
          console.log(e);
          return NextResponse.json({ error: e }, { status: 500 });
        }
      } else {
        return new NextResponse(
          `Uninstall error: Uninstall Client does not match application Client`,
          {
            status: 400,
          }
        );
      }
    } else {
      return new NextResponse(`Uninstall error: no request body`, {
        status: 400,
      });
    }
  } catch (error) {
    // issue receiving uninstall request
    return new NextResponse(`Uninstall error: ${error}`, {
      status: 400,
    });
  }
}

/*

import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

import encodeJWT from "@/components/helper/encodeJWT";
import decodeJWT from "@/components/helper/decodeJWT";
import getCookie from "@/components/helper/getCookie";

const redirectURL = "https://addon-example.vercel.app/neto/callback";
const localRedirectURL = "http://localhost:3000/neto/callback";
const tokenURL = "https://api.netodev.com/oauth/v2/token?version=2";
const codeURL = "https://api.netodev.com/oauth/v2/auth?version=2";

async function createCookie(name: string, data: any) {
  if (process.env.VERCEL_ENV === "development") {
    cookies().set(name, data, { sameSite: "lax", secure: false });
    console.log(`SETTING COOKIE: ${name}`);
  } else {
    cookies().set(name, data, { secure: true });
  }
}

async function deleteCookie(name: string) {
  cookies().delete(name);
}

export async function POST(request: NextRequest, code: String, grantType: String) {
  // const requestURL=`${tokenURL}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${localRedirectURL}&grant_type=authorization_code&code=${code}`
  const params = new URLSearchParams();

  params.append("client_id", `${process.env.CLIENT_ID}`);
  params.append("client_secret", `${process.env.CLIENT_SECRET}`);
  if (process.env.VERCEL_ENV === "development") {
    params.append("redirect_uri", `${localRedirectURL}`);
  } else {
    params.append("redirect_uri", `${redirectURL}`);
  }
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
    // console.log(`FETCH OAUTH DATA:`);
    // console.log(data);
    const oauthHash = data.api_id;

    if (oauthHash) {
      // encode whole data object
      const jwtCookie = await encodeJWT(data);
      const cookieChunkA = jwtCookie.slice(0, jwtCookie.length / 2);
      const cookieChunkB = jwtCookie.slice(jwtCookie.length / 2);

      await createCookie("neto_oauth_a", cookieChunkA);
      await createCookie("neto_oauth_b", cookieChunkB);

      return NextResponse.json({ oauth: "success" }, { status: 201 });
    } else {
      return NextResponse.json({ oauth: "error" }, { status: 500 });
    }
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

// http://localhost:3000/neto/callback?store_domain=keylime.neto.com.au

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hasWebstore = searchParams.has("store_domain");
  const hasCode = searchParams.has("code");
  const hasRefresh = searchParams.has("refresh");
  const hasLogout = searchParams.has("logout");
  const hasError = searchParams.has("error");

  if (hasWebstore) {
    const webstoreURL = searchParams.get("store_domain");
    // console.log(`store_domain: ${webstoreURL}`);

    if (process.env.VERCEL_ENV === "development") {
      redirect(`${codeURL}&client_id=${process.env.CLIENT_ID}&redirect_uri=${localRedirectURL}&response_type=code&store_domain=${webstoreURL}&state=test`);
    } else {
      redirect(`${codeURL}&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code&store_domain=${webstoreURL}&state=test`);

    }
  } else if (hasCode) {
    const code = searchParams.get("code") ?? "";
    // console.log(`code: ${code}`);

    const oauthRes = await POST(request, code, "authorization_code");

    if (oauthRes.status === 201) {
      console.log(`oauth complete, redirecting to dashboard`);
      redirect(`/dashboard`);
    } else {
      console.log(`oauth error, redirecting to login`);
      redirect(`/neto/login?type=webstore`);
    }
  } else if (hasRefresh) {

    interface JwtPayload {
      scope: string;
      api_id: string;
      token_type: string;
      expires_in: number;
      access_token: string;
      refresh_token: string;
      iat: number;
      exp: number;
    }
   
    const referrer = searchParams.get("referrer") ?? "";
    const jwtCookieChunkA = getCookie("neto_oauth_a");
    const jwtCookieChunkB = getCookie("neto_oauth_b");
    const jwtCookie = `${jwtCookieChunkA}${jwtCookieChunkB}`;

    if (jwtCookie) {
      const oauth = (await decodeJWT(jwtCookie)) as JwtPayload;
      const refreshToken = oauth.refresh_token;
      const refreshRes = await POST(request, refreshToken, "refresh_token");

      if (refreshRes.status === 201) {
        if (referrer) {
          console.log(`oauth refreshed, redirecting to ${referrer}`);
          redirect(`/dashboard/${referrer}`);
        } else {
          console.log(`oauth refreshed, redirecting to dashboard`);
          redirect(`/dashboard`);
        }
      } else {
        console.log(`oauth refresh error, redirecting to login`);
        redirect(`/neto/login?type=webstore`);
      }
    }
  } else if (hasLogout) {
    deleteCookie("neto_oauth_a");
    deleteCookie("neto_oauth_b");
    console.log(`logout successful, redirecting to login`);
    redirect(`/neto/login?type=webstore`);
  } else if (hasError) {
    const errorDesc = searchParams.get("error_description") ?? "";
    const errorHint = searchParams.get("hint") ?? "";
    const errorMessage = searchParams.get("message") ?? "";

    console.log(`oauth error:`);
    console.log(`description: ${errorDesc}`);
    console.log(`hint: ${errorHint}`);
    console.log(`message: ${errorMessage}`);
    console.log(`redirecting to login...`);
    redirect(`/neto/login?type=webstore`);
  } else {
    console.log(`oauth error, redirecting to login`);
    redirect(`/neto/login?type=webstore`);
  }
}

*/
