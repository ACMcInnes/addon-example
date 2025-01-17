export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          All your Neto data in one handy dashboard
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-3">
          {/* Bento 1 */}
          <div className="flex p-px lg:col-span-4">
            <div className="w-full min-h-[600px] overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] animate-pulse">
            </div>
          </div>
          {/* Bento 2 */}
          <div className="flex p-px lg:col-span-2">
            <div className="w-full min-h-[600px] overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 lg:rounded-tr-[2rem] animate-pulse">
            </div>
          </div>
          {/* Bento 3 */}
          <div className="flex p-px lg:col-span-3">
            <div className="w-full min-h-[600px] overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 animate-pulse">
            </div>
          </div>
          {/* Bento 4 */}
          <div className="flex p-px lg:col-span-3">
            <div className="w-full min-h-[600px] overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 animate-pulse">
            </div>
          </div>
          {/* Bento 5 */}
          <div className="flex p-px lg:col-span-2">
            <div className="w-full min-h-[600px] overflow-hidden rounded-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 lg:rounded-bl-[2rem] animate-pulse">
            </div>
          </div>
          {/* Bento 6 */}
          <div className="flex p-px lg:col-span-4">
            <div className="w-full min-h-[600px] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem] animate-pulse">
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 mx-4 md:mx-28 flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/15 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center animate-pulse">
        <div className="min-h-16"></div>
      </div>
    </>
  );
}
