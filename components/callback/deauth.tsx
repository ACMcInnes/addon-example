import { redirect } from "next/navigation";

export default async function deauth(webstore: string) {
    const redirectURL = `https://neto.mcinnes.design/neto/callback`;
    const deauthURL = `https://api.netodev.com/oauth/v2/deauth?version=2&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectURL}&response_type=code&store_domain=${webstore}&state=uninstall`;

    console.log(`running deauth request...`)
    redirect(deauthURL);
}
