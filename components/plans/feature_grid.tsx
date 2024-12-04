import { Fragment } from "react";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface planTiers {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  mostPopular: boolean;
}

interface planSections {
  name: string;
  features: {
    name: string;
    tiers: { [key: string]: string | boolean };
  }[];
}

const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "#get-started",
    priceMonthly: "$0",
    mostPopular: false,
  } as planTiers,
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#get-started",
    priceMonthly: "$29",
    mostPopular: true,
  } as planTiers,
  {
    name: "Custom",
    id: "tier-custom",
    href: "#get-started",
    priceMonthly: "$99+",
    mostPopular: false,
  } as planTiers,
];

const sections = [
  {
    name: "Features",
    features: [
      {
        name: "Secure API Connection",
        tiers: { Hobby: true, Enterprise: true, Custom: true },
      },
      {
        name: "Product Limit",
        tiers: { Hobby: "10,000", Enterprise: "100,000", Custom: "Unlimited" },
      },
      {
        name: "Sync Time",
        tiers: { Hobby: "Daily", Enterprise: "Hourly", Custom: "Every 15 mins" },
      },
      {
        name: "Data Automations",
        tiers: { Hobby: false, Enterprise: false, Custom: true },
      },
    ],
  } as planSections,
  {
    name: "Addons",
    features: [
      {
        name: "Basic Reporting",
        tiers: { Hobby: true, Enterprise: true, Custom: true },
      },      
      {
        name: "Advanced Analytics",
        tiers: { Hobby: false, Enterprise: true, Custom: true },
      },
      {
        name: "Custom Integrations",
        tiers: { Hobby: false, Enterprise: true, Custom: true },
      },
      {
        name: "Data backup",
        tiers: { Hobby: false, Enterprise: false, Custom: true },
      },
    ],
  } as planSections,
  {
    name: "Support",
    features: [
      {
        name: "General Support",
        tiers: { Hobby: true, Enterprise: true, Custom: true },
      },
      {
        name: "Enterprise Support",
        tiers: { Hobby: false, Enterprise: true, Custom: true },
      },
      {
        name: "Priority phone support",
        tiers: { Hobby: false, Enterprise: false, Custom: true },
      },
      {
        name: "Dedicated support agent",
        tiers: { Hobby: false, Enterprise: false, Custom: true },
      },
    ],
  } as planSections,
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="mt-2 w-full max-w-screen-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* xs to lg */}
        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
          {tiers.map((tier) => (
            <section
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200"
                  : "",
                "p-8"
              )}
            >
              <h3
                id={tier.id}
                className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100"
              >
                {tier.name}
              </h3>
              <p className="mt-2 flex items-baseline gap-x-1 text-gray-900 dark:text-gray-100">
                <span className="text-4xl font-semibold">
                  {tier.priceMonthly}
                </span>
                <span className="text-sm font-semibold">/month</span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                  "mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                Buy plan
              </a>
              <ul
                role="list"
                className="mt-10 space-y-4 text-sm/6 text-gray-900 dark:text-gray-100"
              >
                {sections.map((section) => (
                  <li key={section.name}>
                    <ul role="list" className="space-y-4">
                      {section.features.map((feature) =>
                        feature.tiers[tier.name] ? (
                          <li key={feature.name} className="flex gap-x-3">
                            <FontAwesomeIcon
                              icon={faCheck}
                              aria-hidden="true"
                              className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-500"
                            />
                            <span>
                              {feature.name}{" "}
                              {typeof feature.tiers[tier.name] === "string" ? (
                                <span className="text-sm/6 text-gray-500 dark:text-gray-300">
                                  ({feature.tiers[tier.name]})
                                </span>
                              ) : null}
                            </span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="isolate mt-20 hidden lg:block">
          <div className="relative -mx-8">
            {tiers.some((tier) => tier.mostPopular) ? (
              <div className="absolute inset-x-4 inset-y-0 -z-10 flex">
                <div
                  style={{
                    marginLeft: `${
                      (tiers.findIndex((tier) => tier.mostPopular) + 1) * 25
                    }%`,
                  }}
                  aria-hidden="true"
                  className="flex w-1/4 px-4"
                >
                  <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
                </div>
              </div>
            ) : null}
            <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <colgroup>
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
              </colgroup>
              <thead>
                <tr>
                  <td />
                  {tiers.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className="px-6 pt-6 xl:px-8 xl:pt-8"
                    >
                      <div className="text-sm/7 font-semibold text-gray-900 dark:text-gray-100">
                        {tier.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <span className="sr-only">Price</span>
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-6 pt-2 xl:px-8">
                      <div className="flex items-baseline gap-x-1 text-gray-900 dark:text-gray-100">
                        <span className="text-4xl font-semibold">
                          {tier.priceMonthly}
                        </span>
                        <span className="text-sm/6 font-semibold">/month</span>
                      </div>
                      <a
                        href={tier.href}
                        className={classNames(
                          tier.mostPopular
                            ? "bg-indigo-600 text-white hover:bg-indigo-500"
                            : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                          "mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        )}
                      >
                        Buy plan
                      </a>
                    </td>
                  ))}
                </tr>
                {sections.map((section, sectionIdx) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className={classNames(
                          sectionIdx === 0 ? "pt-8" : "pt-16",
                          "pb-4 text-sm/6 font-semibold text-gray-900 dark:text-gray-100"
                        )}
                      >
                        {section.name}
                        <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10 dark:bg-gray-100/10" />
                      </th>
                    </tr>
                    {section.features.map((feature) => (
                      <tr key={feature.name}>
                        <th
                          scope="row"
                          className="py-4 text-sm/6 font-normal text-gray-900 dark:text-gray-100"
                        >
                          {feature.name}
                          <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5 dark:bg-gray-100/5" />
                        </th>
                        {tiers.map((tier) => (
                          <td key={tier.id} className="px-6 py-4 xl:px-8">
                            {typeof feature.tiers[tier.name] === "string" ? (
                              <div className="text-center text-sm/6 text-gray-500 dark:text-gray-300">
                                {feature.tiers[tier.name]}
                              </div>
                            ) : (
                              <>
                                {feature.tiers[tier.name] === true ? (
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    aria-hidden="true"
                                    className="mx-auto w-full size-5 text-indigo-600 dark:text-indigo-500"
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    aria-hidden="true"
                                    className="mx-auto w-full size-5 text-gray-400 dark:text-gray-300"
                                  />
                                )}

                                <span className="sr-only">
                                  {feature.tiers[tier.name] === true
                                    ? "Included"
                                    : "Not included"}{" "}
                                  in {tier.name}
                                </span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="get-started" className="my-4"></div>

      <div className="mt-16 mx-4 md:mx-28 flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 bg-neutral-100 dark:bg-slate-800 ring-1 ring-gray-900/10 dark:ring-gray-100/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
        <div className="lg:min-w-0 lg:flex-1">
          <h3 className="text-lg/7 font-semibold text-indigo-600 dark:text-indigo-500">
            Beta Program Application
          </h3>
          <p className="mt-2 text-base/7 text-gray-600 dark:text-gray-300">
            While in development only Hobby plan features will be available, and
            these will be rolled out in stages. Log in with your Neto
            credentials to see what is currently available.
          </p>
          <p className="mt-1 text-base/7 text-gray-600 dark:text-gray-400">
          <span className="align-top">*</span> No payment details required
          </p>
        </div>
        <Link
          href={`/documentation/getting-started`}
          className="group block mt-8 mb-4 py-3 px-8 rounded-md bg-indigo-600 text-white dark:bg-indigo-500 border-transparent"
        >
          Get Started{" "}
          <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
            -&gt;
          </span>
        </Link>
      </div>
    </div>
  );
}
