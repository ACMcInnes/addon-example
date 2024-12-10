import { Session } from "next-auth";
import Avatar from "boring-avatars";
import getWebstore from "@/components/helper/getWebstore";
import SignOut from "@/components/callback/auth-sign-out";
import Link from "next/link";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Profile({ session }: { session: Session| null}) {

  if(session) {

    const webstore = await getWebstore(
        session.webstore_api_id as string,
        session.access_token as string
      );
    
      return (
        <>
          <div className="flex flex-col md:flex-row gap-4 p-6 pb-16 m-8 mb-2 border-b-2 border-indigo-600 dark:border-indigo-500">
            <div className="self-center md:self-start">
              <Avatar
                name={`${session.user?.name}`}
                variant="beam"
                size={160}
                colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
              />
            </div>
            <div className="flex flex-col text-center md:text-start">
              <p className="mb-6 text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">Profile:</p>
              <p className="text-lg font-semibold">{session.user?.name}</p>
              <p className="break-all">{session.user?.email}</p>
              
              <Link href={`//${webstore.result.domain}`} target="_blank" className="mt-4 break-all text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                {webstore.result.domain} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
              <p className="mt-1">
                {webstore
                  ? `${webstore.result.timezone} ${webstore.result.country}`
                  : ""}
              </p>
              {session?.access_token ? (
                <p className="text-green-500 mt-4">
                  Connected to Neto Webstore
                </p>
              ) : (
                <p className="text-red-500 mt-4">
                  Webstore connected failed, please refresh the page
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center mt-2 mb-6">
            <SignOut />
          </div>
        </>
      );


  } else {

    return (
        <>
          <div className="flex flex-col md:flex-row gap-4 p-6 pb-16 m-8 mb-2 border-b-2 border-indigo-600 dark:border-indigo-500">
            <div className="self-center md:self-start">
              <Avatar
                name="Mother Frances"
                variant="beam"
                size={160}
                colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
              />
            </div>
            <div className="flex flex-col text-center md:text-start">
              <p className="mb-6 text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">Profile:</p>
              <p className="text-lg font-semibold">Demo User</p>
              <p className="break-all">demo@email.com.au</p>
              
              <Link href={`//keylime.neto.com.au`} target="_blank" className="mt-4 break-all text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                keylime.neto.com.au <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
              <p className="mt-1">Australia/Brisbane AU</p>
              <p className="text-green-500 mt-4">Connected to Neto Webstore</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-2 mb-6">
            <Link href={`/neto/login?type=webstore`} className="block py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent">Log In</Link>
          </div>
        </>
      );    

  }


}
