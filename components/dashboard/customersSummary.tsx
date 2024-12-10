import Link from "next/link";

export default async function CustomersSummary({
  hash,
  secret,
}: {
  hash: string;
  secret: string;
}) {
  if (hash.length & secret.length) {
    // TODO: poll for customer details
    const customerTotal = 0;
    return (
      <div className="px-6 py-24 md:px-2 md:py-16 lg:px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
            Customers Synced:
          </h2>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            {customerTotal}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-700 dark:text-gray-300">
            {customerTotal === 0
              ? "Looks like you need to sync some customers mate"
              : "That's a lot of customers, great work!"}
          </p>
          <div className="mt-10 flex lg:flex-col xl:flex-row items-center justify-center gap-x-6">
            <Link
              href="#"
              className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
            >
              View Customers
            </Link>
            <a
              href="#"
              className="lg:mt-4 xl:mt-0 text-sm/6 font-semibold text-gray-900 dark:text-gray-100"
            >
              Manual Sync
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    const customerTotal = 0;
    return (
      <div className="px-6 py-24 md:px-2 md:py-16 lg:px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
            Customers Synced:
          </h2>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            {customerTotal}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-700 dark:text-gray-300">
            {customerTotal === 0
              ? "Sample data not available at this time"
              : "Sample data may change at any tim"}
          </p>
          <div className="mt-10 flex lg:flex-col xl:flex-row items-center justify-center gap-x-6">
            <Link
              href="#"
              className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
            >
              View Customers
            </Link>
            <a
              href="#"
              className="lg:mt-4 xl:mt-0 text-sm/6 font-semibold text-gray-900 dark:text-gray-100"
            >
              Manual Sync
            </a>
          </div>
        </div>
      </div>
    );
  }
}
