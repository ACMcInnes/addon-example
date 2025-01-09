import { auth } from "@/auth";
import Avatar from "boring-avatars";

export default async function User() {
  const session = await auth();

    return (
      <section className="static xl:sticky top-6 right-0 ml-auto w-72 flex flex-row gap-4 my-6 xl:my-0 py-2 px-4 rounded-full text-gray-100 bg-indigo-600 dark:bg-indigo-900 border-transparent">
        <div className="self-start -ml-2">
          <Avatar name={session ? `${session.user?.name}` : `Mother Frances`} variant="beam" className="size-20" colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]} />
        </div>
        <div className="flex flex-col justify-center max-w-36 text-lg truncate">
            <p>{session ? `${session.user?.name}` : `Demo User`}</p>
        </div>
      </section>
    );

}
