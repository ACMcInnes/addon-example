export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <section className="mx-auto sm:px-6 lg:px-8">
        <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Contents
        </h2>
        <div className="my-8 text-center text-xl animate-pulse">
          <p>... loading ...</p>
        </div>
      </section>
    );
  }
  