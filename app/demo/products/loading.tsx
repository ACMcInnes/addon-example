import ThumbLoader from "@/components/dashboard/thumb-loader";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="max-w-screen-lg">
      <h2 className="text-2xl font-semibold pt-4 pb-2">Products</h2>
      <p className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
        <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
      </p>

      <div className="mt-8">
        <div className="space-y-24">
          <ThumbLoader key={`fallback-1`} />
          <ThumbLoader key={`fallback-2`} />
          <ThumbLoader key={`fallback-3`} />
        </div>
      </div>

      <div className="my-8">
        <p>... loading ...</p>
      </div>
    </section>
  );
}
