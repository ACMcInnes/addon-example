import ThumbLoader from "@/components/dashboard/thumbs/thumb-loader";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="mx-auto sm:px-6 lg:px-8">
      <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">Products</h2>
      <p className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
        <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
      </p>

      <div className="mx-auto max-w-(--breakpoint-lg) mt-16">
        <div className="space-y-8">
          <ThumbLoader key={`fallback-1`} />
          <ThumbLoader key={`fallback-2`} />
          <ThumbLoader key={`fallback-3`} />
        </div>
      </div>

      <div className="my-8 text-center text-xl animate-pulse">
        <p>... loading ...</p>
      </div>
    </section>
  );
}
