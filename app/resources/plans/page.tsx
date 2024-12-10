import FeatureGrid from "@/components/plans/feature_grid";

export default function PlansPage() {
  return (
    <>
      <div className="w-full max-w-screen-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
              Pricing plans that grow with you
            </h1>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 dark:text-gray-400 sm:text-xl/8">
            Choose an affordable plan that&apos;s packed with the best features
            for engaging your audience, creating customer loyalty, and driving
            sales.
          </p>
        </div>
      </div>
      <FeatureGrid />
    </>
  );
}
