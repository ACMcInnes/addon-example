import ThumbLoader from "@/components/dashboard/thumb-loader";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="max-w-screen-lg">
    <p>Products:</p>

    <ThumbLoader key={`fallback-1`} />
    <ThumbLoader key={`fallback-2`} />    
    <ThumbLoader key={`fallback-3`} />

    <div className="my-8">
      <p>
        ... loading ...
      </p>
    </div>
  </section>
  );
}
