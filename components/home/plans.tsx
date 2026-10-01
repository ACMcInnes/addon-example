import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const plans = [
    {
      name: 'Basic Seller',
      id: 'plan-hobby',
      href: '/resources/plans',
      priceMonthly: '$0',
      description: "The perfect plan for casual users or if you're just getting started with Commerce Sommelier.",
      features: ['List 10,000 products', 'Daily syncs', 'Basic personalisation', 'General support available'],
      featured: false,
    },
    {
      name: 'Advanced Seller',
      id: 'plan-enterprise',
      href: '/resources/plans',
      priceMonthly: '$29',
      description: 'Level up Gustave, unlock advanced personalisation, enable recommendations, and integration support',
      features: [
        'List 100,000 products',
        'Hourly syncs',
        'Advanced personalisation',
        'Enterpise level support',
        'Personalisation suggestions',
        'Integration support',
      ],
      featured: true,
    },
    {
        name: 'Custom Seller',
        id: 'plan-custom',
        href: '/resources/plans',
        priceMonthly: '$99+',
        description: "Need Gus to work for you, reach out and we'll discuss your options",
        features: ['Unlimited products', 'Syncs your data every 15 minutes', 'Dedicated support agent', 'Plus all Enterprise plan features'],
        featured: false,
      },    
  ]
  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Plans() {
    return (
      <div className="mt-20 w-full max-w-(--breakpoint-xl)">
        <div className="mx-auto text-center">
          <h2 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl">
            Create a Seller Account
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl/8">
          Allow your webstore catalogue, or a selection of approved products to be recommended by Gustave. 
          Buyers will be funneled towards your products if they match the buyers intent.
        </p>
        <div className="mx-auto mt-16 grid w-full grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:grid-cols-3">
          {plans.map((plan, planIdx) => (
            <div
              key={plan.id}
              className={classNames(
                plan.featured ? 'relative bg-gray-900 dark:bg-indigo-900 shadow-2xl' : 'bg-white dark:bg-slate-800 sm:mx-8 lg:mx-0',
                plan.featured
                  ? ''
                  : planIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                    : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
              )}
            >
              <h3
                id={plan.id}
                className={classNames(plan.featured ? 'text-indigo-400 dark:text-indigo-300' : 'text-indigo-600 dark:text-indigo-500', 'text-base/7 font-semibold')}
              >
                {plan.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    plan.featured ? 'text-white' : 'text-gray-900 dark:text-gray-100',
                    'text-5xl font-semibold tracking-tight',
                  )}
                >
                  {plan.priceMonthly}
                </span>
                <span className={classNames(plan.featured ? 'text-gray-400 dark:text-gray-300' : 'text-gray-500 dark:text-gray-300', 'text-base')}>/month</span>
              </p>
              <p className={classNames(plan.featured ? 'text-gray-300 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400', 'mt-6 text-base/7')}>
                {plan.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  plan.featured ? 'text-gray-300 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400',
                  'mt-8 space-y-3 text-sm/6 sm:mt-10',
                )}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <FontAwesomeIcon icon={faCheck} aria-hidden="true"
                      className={classNames(plan.featured ? 'text-indigo-400 dark:text-indigo-300' : 'text-indigo-600 dark:text-indigo-500', 'h-6 w-5 flex-none')} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                aria-describedby={plan.id}
                className={classNames(
                  plan.featured
                    ? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                )}
              >
                Become a Seller
              </a>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
          <span className="align-top">*</span> while Commerce Sommelier is in beta, all accounts will use the &apos;Basic Seller&apos; plan
        </p>
      </div>
    )
  }
  