import { faCircleExclamation, faGears, faLock, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const features = [
  {
    name: 'Full Product Sync',
    description: 'Easily access your product data and preview your content',
    icon: faRotate,
  },
  {
    name: 'Secure Connection',
    description: 'The Neto Addon Example uses OAuth2.0 to securely access your data via the Neto API',
    icon: faLock,
  },
  {
    name: 'Notifications',
    description: 'Never miss an order or stocktake with notifications straight to your Neto Addon Example dashboard',
    icon: faCircleExclamation,
  },
  {
    name: 'Minimal Setup',
    description: 'No long winded import/export feed required, once connected all your Neto data is available in app',
    icon: faGears,
  },
];

export default function Features() {
  return (
    <div className="mt-20 w-full max-w-screen-xl">
      <div className="mx-auto px-0 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-500">
            Features
          </h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-balance">
            Everything you need to run your Neto webstore
          </p>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
            The Neto Addon Example is your one stop shop for all your Neto needs. 
            Sync your Neto data to the Neto Addon Example dashboard and take advantage
            of powerful automations and editing tools
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <span className="align-top">*</span> Automations and Tools may not be available while in beta and may change before release
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
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
