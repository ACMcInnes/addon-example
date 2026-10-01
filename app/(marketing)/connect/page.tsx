import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connect",
  description: "Learn how to connect your ecommerce platform to the Commerce Sommelier",
};

const platforms = [
  {
    name: 'Neto',
    anchor: 'neto',
    description:
      'Allows Commerce Sommelier to automatically sync with your Neto product catalogue.',
    imageSrc: '/neto.svg',
    imageAlt: 'Neto platform logo',
    live: true,
  },
  {
    name: 'Shopify',
    anchor: 'shopify',
    description:
      'Allows Commerce Sommelier to automatically sync with your Shopify product catalogue.',
    imageSrc: '/shopify.svg',
    imageAlt: 'Shopify platform logo',
    live: false,
  },
  {
    name: 'Wix',
    anchor: 'wix',
    description:
      'Allows Commerce Sommelier to automatically sync with your Wix product catalogue.',
    imageSrc: '/wix.svg',
    imageAlt: 'Wix platform logo',
    live: false,
  },
  {
    name: 'Squarespace',
    anchor: 'squarespace',
    description:
      'Allows Commerce Sommelier to automatically sync with your Squarespace product catalogue.',
    imageSrc: '/squarespace.svg',
    imageAlt: 'Squarespace platform logo',
    live: false,
  },
  {
    name: 'WooCommerce',
    anchor: 'woo',
    description:
      'Allows Commerce Sommelier to automatically sync with your WooCommerce product catalogue.',
    imageSrc: '/woo.svg',
    imageAlt: 'WooCommerce platform logo',
    live: false,
  },
  {
    name: 'BigCommerce',
    anchor: 'big',
    description:
      'Allows Commerce Sommelier to automatically sync with your BigCommerce product catalogue.',
    imageSrc: '/bigcommerce.svg',
    imageAlt: 'BigCommerce platform logo',
    live: false,
  },  
]

export default function Connect() {
  return (
    <section>
      <h1 className="mx-auto text-center mt-2 text-balance text-4xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
        Supported Platforms
      </h1>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mt-4">
            Connect Commerce Sommelier using your existing commerce platform
            account, no juggling additional passwords or forgotten usernames.
            Commerce Sommelier securely connects and authenticates with your
            commerce platform so your data stays secure.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              id={platform.anchor}
              className="pt-4 flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              <div
                className={`${index % 2 === 0 ? "lg:col-start-7" : "lg:col-start-1"} mt-6 lg:col-span-6 lg:row-start-1 lg:mt-0`}
              >
                <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                  {platform.name}
                </h2>
                <p className="my-2 text-sm text-gray-700 dark:text-gray-300">
                  {platform.description}
                </p>
                {platform.live ? (
                  <Link
                    href={`/documentation/getting-started-${platform.anchor}`}
                    className="group mt-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 border-transparent"
                  >
                    Connect Neto{" "}
                    <FontAwesomeIcon
                      className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none"
                      icon={faArrowRight}
                    />
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400"><span className="align-top">*</span>Coming Soon</p>
                )}
              </div>
              <div
                className={`${index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-7"} flex-auto lg:col-span-6 lg:row-start-1 bg-neutral-100 dark:bg-slate-800 rounded-lg`}
              >
                <img
                  alt={platform.imageAlt}
                  src={platform.imageSrc}
                  className="aspect-video sm:aspect-2/1 w-full px-6 dark:invert object-fit"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
