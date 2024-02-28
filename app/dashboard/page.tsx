import Link from "next/link";
import { redirect } from "next/navigation";

import decodeJWT from "@/components/helper/decodeJWT";
import getCookie from "@/components/helper/getCookie";

const apiEndpoint = "https://api.netodev.com/v2/stores/";

async function getWebstoreDets(
  authorization: string = "",
  authType: string = "",
  webstore: string = ""
) {
  // console.log(`API Call Creds:`);
  // console.log(`authorization: ${authorization}`)
  // console.log(`authType: ${authType}`);
  // console.log(`webstore: ${webstore}`);

  try {
    const res = await fetch(`${apiEndpoint}${webstore}/properties`, {
      method: "GET",
      headers: {
        Authorization: `${authType} ${authorization}`,
        "Content-Type": "application/json",
      },
      //body: `{}`,
    });

    console.log(`API RESPONSE:`);
    console.log(`${res.status} - ${res.statusText}`);

    if (!res.ok || res.status !== 200) {
      console.log(`issue with API call`);

      if (res.statusText === "Unauthorized") {
        console.log(`need to refresh token`);
        return res.statusText;
      } else {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
    }

    const webstoreProperties = await res.json();
    // console.log(`FETCH DATA:`);
    // console.log(webstoreProperties);

    return webstoreProperties;
  } catch (e) {
    return `Could not get webstore properties. ${e}`;
  }
}

export default async function Dashboard() {

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

  const jwtCookieChunkA = getCookie("neto_oauth_a");
  const jwtCookieChunkB = getCookie("neto_oauth_b");
  const jwtCookie = `${jwtCookieChunkA}${jwtCookieChunkB}`;

  if (jwtCookie) {
    // console.log(`COOKIE:`);
    // console.log(jwtCookie);
    const oauth = (await decodeJWT(jwtCookie)) as JwtPayload;

    // console.log(`DECODED COOKIE:`);
    // console.log(decodedCookie)
    // console.log(oauth.scope);
    // console.log(oauth.access_token);

    const details = await getWebstoreDets(
      oauth.access_token,
      oauth.token_type,
      oauth.api_id
    );

    // console.log(`WEBSTORE DETAILS:`);

    if (details === "Unauthorized") {
      console.log(`token refresh - redirecting...`);
      redirect(`/neto/callback?refresh=y`);
    } else if (details.success === true) {
      return (
        <>
          <div className="mt-6">
            <p>Your Details:</p>
            <p>webstore - {details.result.domain} {oauth.api_id}</p>
            <p>timezone - {details.result.timezone} {details.result.country}</p>
          </div>
          <Link href="/dashboard/products" className="mt-6 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Products</Link>
          <div>
            <p>Return to <Link href="/">Home</Link>.</p>
            <p>Return to <Link href={`/neto/callback?logout=true`}>Logout</Link>.</p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-col w-full p-8">
            <p>Your dashboard</p>

            <p>Your Details:</p>
            <p>webstore hash - {oauth.api_id}</p>
            <p>Addon Credentials *KEEP THESE SECURE:</p>

            <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
              <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                oAuth Access Token
              </summary>
              <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <p className="break-words">{oauth.access_token}</p>
              </div>
            </details>

            <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
              <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                oAuth Refresh Token
              </summary>
              <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <p className="break-words">{oauth.refresh_token}</p>
              </div>
            </details>
          </div>
          <div>
            <p>Return to <Link href="/">Home</Link>.</p>
          </div>
        </>
      );
    }
  } else {
    return (
      <div>
        <p>Your dashboard data could not be loaded</p>
        <p>
          Return to <Link href="/">Home</Link> or{" "}
          <Link href="/dashboard/login">Login</Link>.
        </p>
      </div>
    );
  }
}
