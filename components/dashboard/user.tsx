import { auth } from "@/auth";
import Avatar from "boring-avatars";

export default async function User() {
  const session = await auth();

  if (session) {
    return (

      <section className="hidden fixed top-36 right-0 w-72 xl:flex flex-col md:flex-row gap-4 mx-6 py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-sky-500 dark:hover:bg-sky-400 border-transparent">
        <div className="md:self-start">
            <Avatar name="{session.user?.name}" variant="beam" size={80} />
        </div>
        <div className="flex flex-col justify-center truncate">
            <p>{session.user?.name}</p>
            <p>{session.user?.email}</p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="hidden fixed top-36 right-0 w-72 xl:flex flex-col md:flex-row gap-4 mx-6 py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-sky-500 dark:hover:bg-sky-400 border-transparent">
        
        <div className="md:self-start">
            <Avatar name="Mother Frances" variant="beam" size={80} />
        </div>
        <div className="flex flex-col justify-center">
            <p>Demo User</p>
            <p>demo@email.com</p>
        </div>
      </section>
    );
  }
}
