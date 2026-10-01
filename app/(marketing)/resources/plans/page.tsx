import FeatureGrid from "@/components/plans/feature-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plans | Resources",
  description: "Find the right Commerce Sommelier seller plan for your business",
};

export default function PlansPage() {
  return (
    <>
      <div className="w-full max-w-(--breakpoint-xl)">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-6xl">
              Seller Plans &amp; Features
            </h1>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-xl/8">
            Commerce Sommelier comes in a range of sizes to suit any business or
            use case. Get your feet wet as a Basic Seller to see what Gustave
            can do for you.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-xl/8">
            Or dive into the deep end as an Advanced Seller,
            unlocking more powerful personalisation to drive your products
            directly to customers that need them.
          </p>
        </div>
      </div>
      <FeatureGrid />
    </>
  );
}
