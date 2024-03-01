import Link from "next/link";
import { redirect } from "next/navigation";

import decodeJWT from "@/components/helper/decodeJWT";
import getCookie from "@/components/helper/getCookie";
import getWebstore from "@/components/helper/getWebstore";
import getAuthenticated from "@/components/helper/getAuthenticated";

export default async function Dashboard() {
    // console.log(`COOKIE:`);
    // console.log(jwtCookie);
    const oauth = await getAuthenticated();

     console.log(`DECODED COOKIE:`);
     console.log(oauth);
    // console.log(oauth.scope);
    // console.log(oauth.access_token);

    const details = await getWebstore(
      oauth.access_token,
      oauth.token_type,
      oauth.api_id
    );

    console.log(`WEBSTORE DETAILS:`);
    console.log(details);

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
}
