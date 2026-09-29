import { faCircleExclamation, faGears, faReceipt, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const features = [
    {
    name: 'Minimal Setup',
    description: 'No long winded import/export feed required, just securely connect your store and approve your products',
    icon: faGears,
  },
  {
    name: 'Automatic Product Sync',
    description: 'Once connected Gus takes care of everything, keeping your products listed and up to date',
    icon: faRotate,
  },
  {
    name: 'Your sale',
    description: 'Once Gus has curated a customers experience, he generates a cart on your webstore. You always get the sale',
    icon: faReceipt,
  },
  {
    name: 'No hallucinations',
    description: 'Gus is not an AI, product recommendations are filtered down using a complex system of algorithms based on a customers habits',
    icon: faCircleExclamation,
  },
];

export default function Features() {
  return (
    <div className="mt-20 w-full max-w-(--breakpoint-xl)">
      <div className="mx-auto px-0 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl lg:text-balance">
            Take the guess work out of your customers shopping journey
          </h2>
          <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
            Which stores are legit and which ones are a scam? Are those 5000 five star reviews real or are they AI? 
            Shoppers no longer trust everything they see online. Gustave offers a verified platform to host and sell your products without all the guess work.
          </p>
          <p className="mt-4 text-lg/8 text-gray-700 dark:text-gray-300">
            Instead, you&apos;re customers can just &quot;Ask Gus&quot;
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-gray-100">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                    <FontAwesomeIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                      icon={feature.icon}
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-700 dark:text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 ml-16 text-sm text-gray-600 dark:text-gray-400">
            <span className="align-top">*</span> Gustave is in beta, features may not be available or may change before release
          </p>
        </div>
      </div>
    </div>
  );
}
