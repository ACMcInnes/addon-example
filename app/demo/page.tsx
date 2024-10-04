import Link from "next/link";
import Avatar from "boring-avatars";

export default async function Demo() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-6 border-b-2 border-indigo-600 dark:border-sky-500">
        <div className="md:self-start">
          <Avatar name="Mother Frances" variant="beam" size={80} />
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Profile:</p>
          <p>Demo User</p>
          <p>demo@email.com</p>
          <p>keylime.neto.com.au</p>
          <p>Australia/Brisbane AU</p>
          <p className="text-green-500 mt-1">You are able to make API calls</p>
          <Link
            href="/demo/products"
            className="mt-6 py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-sky-500 dark:hover:bg-sky-400 border-transparent"
          >
            View Products
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <p>
          Return to{" "}
          <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">
            Home
          </Link>
        </p>
        <p className="m-2">or</p>
        <Link href={`/neto/login?type=webstore`} className="block py-2 px-4 rounded-md text-gray-100 bg-indigo-600 hover:bg-indigo-500 dark:bg-sky-500 dark:hover:bg-sky-400 border-transparent">Log In</Link>
      </div>
    </>
  );
}
