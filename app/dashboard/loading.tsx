import Link from "next/link";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="text-center">
        <p>Your dashboard</p>
        <p>...is loading...</p>
        <p>Return to <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">Home</Link>.</p>
      </div>
    </>
  );
}
