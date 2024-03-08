import Link from "next/link";

import getWebstore from "@/components/helper/getWebstore";

export default async function Dashboard() {
  const details = await getWebstore();

  // console.log(`WEBSTORE DETAILS:`);
  // console.log(details);

  return (
      <>
        <div className="mt-6">
          <p>Your Details:</p>
          <p>webstore - {details.result.domain}</p>
          <p>timezone - {details.result.timezone} {details.result.country}</p>
        </div>
        <Link href="/dashboard/products" className="mt-6 py-2 px-4 rounded-md text-gray-100 bg-sky-500 border-transparent">Products</Link>
        <div className="mt-6">
          <p>Return to <Link href="/" className="text-sky-500">Home</Link></p>
          <p>Return to <Link href={`/neto/callback?logout=true`} className="text-sky-500">Logout</Link></p>
        </div>
      </>
  );
}
