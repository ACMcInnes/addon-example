import Link from "next/link";

import { faArrowLeft, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar from "boring-avatars";
import { auth } from "@/auth";
import getCustomersCache from "@/components/helper/getCustomersCache";

export default async function Customers() {

    const session = await auth();

    if (session) {

  const customerData = await getCustomersCache(session?.webstore_api_id as string, session?.access_token as string, false);
  const customerTotal = customerData.Customer.length;
  const customers = customerData.Customer;

  if (customerTotal) {
    return (
      <section className="max-w-(--breakpoint-lg)">
        <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Customers
        </h2>
        <p>
          <Link
            href="/dashboard"
            className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
          </Link>
          <Link
            href="/dashboard/customers"
            className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Customers
          </Link>
        </p>


        <div className="py-12">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl">
              <p className="mt-6 text-lg/8 text-balance text-gray-600 dark:text-gray-300">
                These people signed up for a webstore account, bought something, or both! which is kinda cool. 
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {customers.map(
                (
                  customer: {
                    Username: string;
                    EmailAddress: string;
                    BillingAddress: {
                      BillFirstName: string;
                      BillLastName: string;
                      BillCompany: string;
                    };
                  },
                  index: number
                ) => (
                  <li key={customer.Username}>
                    <Avatar
                      name={`${customer.BillingAddress.BillFirstName} ${customer.BillingAddress.BillLastName}`}
                      variant="beam"
                      colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
                      className="mx-auto size-56"
                    />
                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                      {customer.BillingAddress.BillFirstName}{" "}{customer.BillingAddress.BillLastName}
                    </h3>
                    <p className="text-sm/6 text-gray-600">
                      {customer.BillingAddress.BillCompany}
                    </p>
                    <ul
                      role="list"
                      className="mt-4 flex justify-center gap-x-6"
                    >
                      <li>
                        <a
                          href={`#`}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <FontAwesomeIcon icon={faEnvelope} size="xl" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`/dashboard/customers/${customer.Username}`}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <FontAwesomeIcon icon={faUser} size="xl" />
                        </a>
                      </li>
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="my-8">
          <p>
            Return to{" "}
            <Link
              href="/dashboard"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Dashboard
            </Link>
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <div>
        <p className="mt-6">No customers</p>
        <p>
          <Link
            href={`/dashboard`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Go back
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
      <>
        <div className="mt-6">
          <p>You are not logged in</p>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p>
            Return to{" "}
            <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              Home
            </Link>
          </p>
          <p className="m-2">or</p>
          <Link
            href={`/neto/login?type=webstore`}
            className="block ml-1 py-2 px-4 rounded-md text-gray-100 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-transparent"
          >
            Log In
          </Link>
        </div>
      </>
    );
  }

}
