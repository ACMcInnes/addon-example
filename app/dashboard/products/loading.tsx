import ThumbLoader from "@/components/dashboard/thumb-loader";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="max-w-screen-lg">
      <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Products
      </h2>
      <p className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
        <FontAwesomeIcon icon={faArrowLeft} /> Dashboard
      </p>

      <div className="mt-8">
        <div className="space-y-24">
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
