import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description: "Resources for the Commerce Sommelier",
};

const resources = [
  {
    id: "assets",
    title: "Assets",
    description:
      "See what makes up the Commerce Sommelier, really get into the nuts and bolts of it. Basically, what did we plug into Gus to make him work the way he does.",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "The who\'s who of who\'s using Commerce Sommelier. Read all about the highs, the lows, the middles. Nothing is off the table.",
  },
  {
    id: "plans",
    title: "Seller Plans",
    description:
      "Interested in becoming a Seller? Check out which plan is right for you and your business. From a generous and free basic plan, all the way up to your enterprise level usage.",
  },
  {
    id: "terms-of-use",
    title: "Terms of use",
    description:
      "Check out what\'s going on, legal wise.",
  },
];

export default function Resources() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
          Resources
        </h2>
        <p className="mt-6 text-base/7 text-gray-800 dark:text-gray-200">
          Looking for resources on the Commerce Sommelier? You&apos;ve come to
          the right place
        </p>
      </div>
      <div className="mt-20 space-y-16 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:gap-x-10">
        {resources.map((resource) => (
          <div key={resource.id}>
            <Link
              href={`/resources/${resource.id}`}
              className="text-base/7 hover:underline hover:underline-offset-4 font-semibold whitespace-nowrap text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {resource.title}
            </Link>
            <p className="mt-2 text-base/7 text-gray-700 dark:text-gray-300">
              {resource.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
