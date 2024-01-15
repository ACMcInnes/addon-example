import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const apiEndpoint = "https://api.netodev.com/v2/stores/";

async function getWebstoreDets(
  authorization: string = "",
  authType: string = "",
  webstore: string = ""
) {
  console.log(`API Call Creds:`);
  //console.log(`authorization: ${authorization}`)
  console.log(`authType: ${authType}`);
  console.log(`webstore: ${webstore}`);

  try {
    const res = await fetch(`${apiEndpoint}${webstore}/properties`, {
      method: "GET",
      headers: {
        Authorization: `${authType} ${authorization}`,
        "Content-Type": "application/json",
      },
      //body: `{}`,
    });

    console.log(`RESPONSE:`);
    console.log(res.ok);
    console.log(res.status);
    console.log(res.statusText);

    if (!res.ok || res.status !== 200) {
      console.log(`issue with API call`);
      
      if (res.statusText === "Unauthorized") {
        console.log(`need to refresh token`);
        return res.statusText
      } else {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
    }

    const webstoreProperties = await res.json();
    console.log(`FETCH DATA:`);
    console.log(webstoreProperties);

    return webstoreProperties;
  } catch (e) {
    return `Could not get webstore properties. ${e}`;
  }
}

export default async function Dashboard() {
  const cookieStore = cookies();
  const webstoreHash = cookieStore.get("neto_api_id");

  if (webstoreHash) {
    const oauthType = cookieStore.get("neto_token_type");
    const oauthAccess = cookieStore.get("neto_access_token");
    const oauthRefresh = cookieStore.get("neto_refresh_token");

    //console.log(`COOKIES:`)
    //console.log(`hash: ${webstoreHash.value}`)
    //console.log(`type: ${oauthType?.value}`)
    //console.log(`access: ${oauthAccess?.value}`)
    //console.log(`refresh: ${oauthRefresh?.value}`)

    const details = await getWebstoreDets(
      oauthAccess?.value,
      oauthType?.value,
      webstoreHash.value
    );

    console.log(`WEBSTORE DETAILS:`);


    if (details === "Unauthorized") {
        console.log(`redirecting...`)
        redirect(`/neto/callback?refresh=y`);
    } else if (details.success === true) {
      return (
        <>
          <div>
            <p>Your dashboard</p>

            <p>Your Details:</p>
            <p>webstore - {details.result.domain} {webstoreHash.value}</p>
            <p>timezone - {details.result.timezone} {details.result.country}</p>
          </div>
          <div>
            <p>Return to <Link href="/">Home</Link>.</p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-col w-full p-8">
            <p>Your dashboard</p>

            <p>Your Details:</p>
            <p>webstore hash - {webstoreHash.value}</p>
            <p>Addon Credentials *KEEP THESE SECURE:</p>

            <details
              className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg"
            >
              <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                oAuth Access Token
              </summary>
              <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <p className="break-words">{oauthAccess?.value}</p>
              </div>
            </details>

            <details
              className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg"
            >
              <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                oAuth Refresh Token
              </summary>
              <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <p className="break-words">{oauthRefresh?.value}</p>
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
        <p>Return to <Link href="/">Home</Link> or <Link href="/dashboard/login">Login</Link>.</p>
      </div>
    );
  }
}
