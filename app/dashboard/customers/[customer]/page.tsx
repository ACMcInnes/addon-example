import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Avatar from "boring-avatars";
import { auth } from "@/auth";
import getCustomer from "@/components/helper/getCustomer";

export default async function Customer({
  params,
}: {
  params: Promise<{ customer: string }>;
}) {
  const { customer } = await params;

  const session = await auth();

  if (session) {
    const customerData = await getCustomer(
      session?.webstore_api_id as string,
      session?.access_token as string,
      customer
    );

    if (customerData.Customer.length) {
      const results = customerData.Customer[0];

      return (
        <section>
          <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Customers
          </h2>
          <p className="mt-2 mb-8">
            <Link
              href="/dashboard"
              className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
            </Link>
            <Link
              href="/dashboard/customers"
              className="pr-2 ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
            >
              Customers
            </Link>
            <Link
              href={`/dashboard/customers/${customer}`}
              className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              {customer}
            </Link>
          </p>

          <Avatar
            name={`${results.BillingAddress.BillFirstName} ${results.BillingAddress.BillLastName}`}
            variant="beam"
            size={160}
            colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
            className="mx-auto size-56"
          />
          <h2 className="text-2xl font-semibold my-4 text-center">
            {results.BillingAddress.BillFirstName}{" "}
            {results.BillingAddress.BillLastName}
          </h2>

          <div className="py-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-base/7 font-semibold text-gray-900 dark:text-gray-100">
                Customer Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-300">
                All the Data!
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.BillingAddress.BillFirstName}{" "}
                    {results.BillingAddress.BillLastName}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.Username}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.EmailAddress}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Active
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.Active}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Classification
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.Classification2}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Subscriber
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.NewsletterSubscriber}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Register Date
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.DateAddedLocal}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-4">
            <p>
              <Link
                href={`/dashboard/customers`}
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Go back to all customers
              </Link>{" "}
              or return to{" "}
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Home
              </Link>
            </p>
          </div>
        </section>
      );
    } else {
      return (
        <div>
          <p className="mt-6">Could not load customer</p>
          <p>
            <Link
              href={`/dashboard/customer`}
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Go back to all customers
            </Link>{" "}
            or return to{" "}
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Home
            </Link>
          </p>
        </div>
      );
    }
  } else {
    return (
      <div>
        <p className="mt-6">Could not load customer</p>
        <p>
          <Link
            href={`/dashboard/customer`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Go back to all customers
          </Link>{" "}
          or return to{" "}
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Home
          </Link>
        </p>
      </div>
    );
  }
}