import Link from "next/link";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div>
        <p>Your product</p>
        <p>...is loading...</p>
      </div>
      <div>
        <p>Return to <Link href="/dashboard/products" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">All Products</Link>.</p>
      </div>
    </>
  );
}
