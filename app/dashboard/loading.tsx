import Link from "next/link";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div>
        <p>Your dashboard</p>
        <p>...is loading...</p>
      </div>
      <div>
        <p>Return to <Link href="/" className="text-sky-500">Home</Link>.</p>
      </div>
    </>
  );
}
