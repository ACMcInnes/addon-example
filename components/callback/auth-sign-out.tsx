import { auth, signOut } from "@/auth";
import getWebstore from "@/components/helper/getWebstore";
import deauth from "@/components/callback/deauth";


export default async function SignOut() {
  const session = await auth();

  if (session) {
    console.log(`session data:`);
    console.log(session);

    //if (Date.now() < (session?.expires_at as number * 1000)) {
    const webstore = await getWebstore(
      session?.webstore_api_id as string,
      session?.access_token as string
    );
    return (
      <form
        action={async () => {
          "use server";
          await deauth(webstore.result?.domain);
        }}
      >
        <button className="block mt-2 py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent">
          Sign Out
        </button>
      </form>
    );
  } else {
    return (
      <button
        disabled
        className="block mt-2 py-2 px-4 rounded-md text-gray-100 bg-indigo-900 border-transparent"
      >
        Sign Out
      </button>
    );
  }
}

// NOTE: does not sign out of Neto or run OAuth deauthorisation - only destroys AuthJS session in browser
// TODO: look at federated signout options, either extending signOut function or wrapping it in a custom function

/*
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({redirectTo: '/neto/login?type=signout'});
      }}
    >
      <button className="block mt-2 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Sign Out</button>
    </form>
  );
}
*/
