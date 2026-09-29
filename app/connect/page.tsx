const platforms = [
  {
    name: 'Neto',
    anchor: 'neto',
    description:
      'Neto neto neto neto.',
    imageSrc: '/neto.svg',
    imageAlt: 'Neto platform logo',
  },
  {
    name: 'Shopify',
    anchor: 'shopify',
    description:
      'Shopify shopify shopify',
    imageSrc: '/shopify.svg',
    imageAlt: 'Shopify platform logo',
  },
  {
    name: 'Wix',
    anchor: 'wix',
    description:
      'Wix wix wix wix',
    imageSrc: '/wix.svg',
    imageAlt: 'Wix platform logo',
  },
  {
    name: 'Squarespace',
    anchor: 'squarespace',
    description:
      'Squarespace squarespace squarespace',
    imageSrc: '/squarespace.svg',
    imageAlt: 'Squarespace platform logo',
  },
  {
    name: 'WooCommerce',
    anchor: 'woo',
    description:
      'WooCommerce woo woo woo',
    imageSrc: '/woo.svg',
    imageAlt: 'WooCommerce platform logo',
  },
  {
    name: 'BigCommerce',
    anchor: 'big',
    description:
      'BigCommerce woo woo woo',
    imageSrc: '/bigcommerce.svg',
    imageAlt: 'BigCommerce platform logo',
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
          {platforms.map((feature, featureIdx) => (
            <div
              key={feature.name}
              id={feature.anchor}
              className="pt-4 flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              <div
                className={`${featureIdx % 2 === 0 ? "lg:col-start-7" : "lg:col-start-1"} mt-6 lg:col-span-6 lg:row-start-1 lg:mt-0`}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
              <div
                className={`${featureIdx % 2 === 0 ? "lg:col-start-1" : "lg:col-start-7"} flex-auto lg:col-span-6 lg:row-start-1 bg-neutral-100 dark:bg-slate-800 rounded-lg`}
              >
                <img
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
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
