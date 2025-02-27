import { Session } from "next-auth";
import Avatar from "boring-avatars";
import getWebstore from "@/components/helper/getWebstore";
import SignOut from "@/components/callback/auth-sign-out";
import Link from "next/link";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Profile({
  session,
}: {
  session: Session | null;
}) {
  let webstore;
  if (session) {
    webstore = await getWebstore(
      session.webstore_api_id as string,
      session.access_token as string
    );
  } else {
    webstore = {
      messages: [],
      errors: [],
      result: {
        business_name: "Keylime",
        domain: "keylime.neto.com.au",
        timezone: "Australia/Brisbane",
        country: "AU",
        licenses: [],
      },
    };
  }

  return (
    <div className="h-full flex flex-col md:flex-row md:flex-wrap place-content-center gap-4 px-6 py-24 md:px-2 md:py-16 lg:px-4">
      <div className="self-center md:self-end">
        <Avatar
          name={`${session?.user?.name ? session.user.name : "Mother Frances"}`}
          variant="beam"
          className="size-40 md:size-50"
          colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
        />
      </div>
      <div className="flex flex-col text-center md:text-start">
        <p className="mb-6 text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
          Profile:
        </p>
        <p className="text-lg font-semibold">
          {session?.user?.name ? session.user.name : "Demo User"}
        </p>
        <p className="break-all">
          {session?.user?.email ? session.user.email : "demo@email.com.au"}
        </p>
        <Link
          href={`//${webstore.result.domain}`}
          target="_blank"
          className="mt-4 break-all text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
        >
          {webstore.result.domain}{" "}
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Link>
        <p className="mt-1">
          {`${webstore.result.timezone} ${webstore.result.country}`}
        </p>
        <p className="text-green-500 mt-4">
          {session?.access_token
            ? "Connected to Neto Webstore"
            : "Connected to Neto Demo Webstore"}
        </p>
      </div>
      <div className="w-full flex flex-col items-center mt-2 mb-6">
        {session?.access_token ? (
          <SignOut />
        ) : (
          <Link
            href={`/neto/login?type=webstore`}
            className="block py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}
