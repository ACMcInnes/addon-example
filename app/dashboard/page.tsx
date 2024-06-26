import Link from "next/link";
import { auth } from "@/auth";
import SignOut from "@/components/callback/auth-sign-out";

//import getWebstore from "@/components/helper/getWebstore";

const API_ENDPOINT = "https://api.netodev.com/v2/stores/";

async function getWebstoreProperties(webstore: string, secret: string) {
  const res = await fetch(`${API_ENDPOINT}${webstore}/properties`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    //body: `{}`,
  });
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch webstore properties')
    console.log('Failed to fetch webstore properties')
    return null
  }
    return res.json()
}
 

export default async function Dashboard() {
  //const details = await getWebstore();

  // console.log(`WEBSTORE DETAILS:`);
  // console.log(details);

  const session = await auth();

  if (session) {
    console.log(`session data:`);
    console.log(session);

    //if (Date.now() < (session?.expires_at as number * 1000)) {
      const webstore = await getWebstoreProperties(session?.webstore_api_id as string, session?.access_token as string);
      return (
        <>
          <div className="flex flex-col md:flex-row gap-4 p-6 border-b-2 border-sky-500">
            <img
              src={
                session.user?.image ??
                "https://source.boringavatars.com/beam/120"
              }
              className="md:self-start"
            />
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">Profile:</p>
              <p>{session.user?.name}</p>
              <p>{session.user?.email}</p>
              <p>{webstore ? webstore.result?.domain : "could not fetch webstore details"}</p>
              <p>{webstore ? `${webstore.result?.timezone} ${webstore.result?.country}` : ""}</p>
              {session?.access_token ? <p className="text-green-500 mt-1">You are able to make API calls</p> : <p className="text-red-500 mt-1">You are unable to make API calls</p> }
              {" "}
              <Link href="/dashboard/products" className="mt-6 py-2 px-4 rounded-md text-gray-100 text-center bg-sky-500 border-transparent">View Products</Link>
            </div>
            
  
          </div>
          <div className="flex flex-col items-center mt-8">
            <p>Return to <Link href="/" className="text-sky-500">Home</Link></p>
            <p className="m-2">or</p>
            <SignOut />
          </div>
        </>
    );
    /*
    } else {
      return (
      <>
        <div className="mt-6">
          <p>Your session has expired</p>
        </div>
        <div className="flex flex-col items-center mt-6">
            <p>Return to <Link href="/" className="text-sky-500">Home</Link></p>
            <p className="m-2">or</p>
            <SignOut />
        </div>
      </>
      );
    }
    */
  } else {
    return (
      <>
        <div className="mt-6">
          <p>You are not logged in</p>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p>Return to <Link href="/" className="text-sky-500">Home</Link></p>
          <p className="m-2">or</p>
          <Link href={`/neto/login?type=webstore`} className="block py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Log In</Link>
        </div>
      </>
  ); 
  }


}
