import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const redirectURL = "https://addon-example.vercel.app/neto/callback";
// const localRedirectURL = "http://localhost:3000/neto/callback";
const tokenURL = "https://api.netodev.com/oauth/v2/token?version=2";
const codeURL = "https://api.netodev.com/oauth/v2/auth?version=2";

async function createCookie(name: string, data: any) {
  cookies().set(name, data, { secure: true });
}

export async function POST(code: String, grantType: String) {
  // const requestURL=`${tokenURL}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${localRedirectURL}&grant_type=authorization_code&code=${code}`
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
    console.log(`FETCH DATA:`);
    console.log(data);
    const oauthHash = data.api_id;

    if (oauthHash) {
      createCookie("neto_api_id", oauthHash);
      createCookie("neto_token_type", data.token_type);
      createCookie("neto_access_token", data.access_token);
      createCookie("neto_refresh_token", data.refresh_token);
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

  if (hasWebstore) {
    const webstoreURL = searchParams.get("store_domain");
    console.log(`store_domain: ${webstoreURL}`);
    redirect(
      `${codeURL}&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code&store_domain=${webstoreURL}&state=test`
    );
  } else if (hasCode) {
    const code = searchParams.get("code") ?? "";
    console.log(`code: ${code}`);

    const oauthRes = await POST(code, "authorization_code");

    if (oauthRes.status === 201) {
      console.log(`oauth complete, redirecting to dashboard`);
      redirect(`/dashboard`);
    } else {
      console.log(`oauth error, redirecting to login`);
      redirect(`/neto/login?type=webstore`);
    }
  } else if (hasRefresh) {
    const cookieStore = cookies();
    const refreshCookie = cookieStore.get("neto_refresh_token");
    const refreshToken = refreshCookie?.value ?? "";
    const refreshRes = await POST(refreshToken, "refresh_token");

    if (refreshRes.status === 201) {
      console.log(`oauth complete, redirecting to dashboard`);
      redirect(`/dashboard`);
    } else {
      console.log(`oauth error, redirecting to login`);
      redirect(`/neto/login?type=webstore`);
    }
    
  } else {
    console.log(`oauth error, redirecting to login`);
    redirect(`/neto/login?type=webstore`);
  }
}
