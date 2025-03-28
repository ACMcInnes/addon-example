import Link from "next/link";

import getCustomersCache from "@/components/helper/getCustomersCache";

export default async function CustomersSummary({
  hash,
  secret,
  demo,
}: {
  hash: string;
  secret: string;
  demo: boolean;
}) {

    const customerData = await getCustomersCache(hash, secret, demo);
    const customerTotal = customerData.Customer.length;
    return (
      <div className="h-full px-6 py-24 md:px-2 md:py-16 lg:px-4">
        <div className="h-full flex flex-col justify-center mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
            Customers Synced:
          </h2>
          <div className="mx-0 my-auto">
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
            {customerTotal}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-700 dark:text-gray-300">
            {customerTotal === 0
              ? "Looks like you need to sync some customers mate"
              : "That's a lot of customers, great work!"}
          </p>
          <div className="mt-10 flex lg:flex-col xl:flex-row items-center justify-center gap-x-6">
            <Link
              href={`/${demo ? "demo" : "dashboard"}/customers`}
              className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
            >
              View Customers
            </Link>
          </div>
          </div>
        </div>
      </div>
    );
}
