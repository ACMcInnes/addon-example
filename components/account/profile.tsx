import { getUser } from '@/data/user';
import { netoRequest } from '@/data/neto';
import Link from 'next/link';
import Avatar from 'boring-avatars';

export default async function Profile() {

  const user = await getUser();
  const staff = await netoRequest({request: 'users', filter: `?username=${user.username}`});
  const webstore = await netoRequest({request: 'properties'});
  const items = await netoRequest({request: 'getitem', data:'{ "Filter": { "Visible": ["True"], "IsActive": ["True"], "Page": "0", "Limit": "100", "OutputSelector": ["Model"] }}'});
  const initials = user.name.match(/\b(\w)/g)?.join('').toUpperCase() || "";

  console.log(`STAFF`)
  console.log(staff)

  console.log(`WEBSTORE`)
  console.dir(webstore, { maxArrayLength: null });

  console.log(`ITEMS`)
  console.log(items)

  return (
    <div className="flex flex-col place-items-center pb-8">
      <div className="max-w-4xl">
        <div className="grid mx-auto mt-2">
          <Avatar
            name={user.name}
            colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
            className="col-start-1 col-span-1 row-start-1 row-span-1 size-56"
          />
          <p className="col-start-1 col-span-1 row-start-1 row-span-1 place-self-center text-7xl">{initials}</p>
        </div>
        <h2 className="mx-auto text-center mt-2 mb-8 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl text-balance text-4xl font-semibold text-gray-900 dark:text-gray-100 sm:text-5xl">
          <strong className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-2 py-0.5 rounded wrap-break-word">
            G&apos;day {user.name}
          </strong>
        </h2>
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900 dark:text-white">
              McInnes Design &lt;&gt; Neto
            </h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400">
              See what Neto data the McInnes Design application has access
              too. For details around how this is used, refer to our{" "}
              <Link
                className="hover:underline hover:underline-offset-4 font-semibold whitespace-nowrap text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                href="/resources/terms-of-use"
              >
                terms &amp; conditions
              </Link>
              .
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100 dark:border-white/10">
            <dl className="divide-y divide-gray-100 dark:divide-white/10">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  Name
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400 break-all">
                  {user.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  Email address
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
                  {user.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  Username
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-400">
                  {user.username}
                </dd>
              </div>
              <div className="px-4 py-6 grid grid-cols-3 gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  Manage Account
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 col-span-2 mt-0 dark:text-gray-400 text-right">
                  <Link
                    className="rounded-md bg-indigo-600 ml-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                    href="//auth.mcinnes.design/account"
                    target="_blank"
                  >
                    View Account
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
