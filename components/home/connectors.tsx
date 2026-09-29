import Image from "next/image";

const connectors = [
  {
    name: "Neto",
    image: "/neto.svg",
    url: "//netohq.com/",
    key: "neto",
    width: 218,
    height: 98,
    live: true,
  },
  {
    name: "Shopify",
    image: "/shopify.svg",
    url: "//www.shopify.com/",
    key: "shopify",
    width: 300,
    height: 86,
    live: false,
  },
  {
    name: "Wix",
    image: "/wix.svg",
    url: "//www.wix.com/",
    key: "wix",
    width: 166,
    height: 64,
    live: false,
  },
  {
    name: "Squarespace",
    image: "/squarespace.svg",
    url: "//www.squarespace.com/",
    key: "square",
    width: 829,
    height: 196,
    live: false,
  },
  {
    name: "WooCommerce",
    image: "/woo.svg",
    url: "//woocommerce.com/",
    key: "woo",
    width: 300,
    height: 78,
    live: false,
  },
  {
    name: "BigCommerce",
    image: "/bigcommerce.svg",
    url: "//www.bigcommerce.com.au/",
    key: "big",
    width: 1024,
    height: 494,
    live: false,
  },
];

export default function Connectors() {
  return (
    <div className="mt-20 w-full max-w-(--breakpoint-xl)">
      <h2 className="w-full max-w-(--breakpoint-xl) text-left mt-2 text-pretty text-4xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-5xl lg:text-balance">
        Connect Gustave with all major platforms
      </h2>
      <div className="mt-6 mx-auto grid grid-cols-1 sm:grid-cols-2 items-center gap-1 rounded-2xl overflow-hidden lg:grid-cols-3 lg:divide-y-0">
        {connectors.map((connector) => (
          <a
            className="relative pointer-events-none lg:pointer-events-auto w-full py-8 px-12 justify-items-center bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700"
            href={connector.url}
            target="_blank"
            rel="noopener noreferrer"
            key={connector.key}
          >
            <Image
              src={connector.image}
              alt={connector.name}
              className="dark:invert w-auto h-[100px] mx-auto my-2"
              width={connector.width}
              height={connector.height}
            />
            {connector.live ? (
              <p className="absolute right-3 text-indigo-600 dark:text-indigo-500"><span className="align-top">*</span> Available Now</p>
            ) : (
              <p className="absolute right-3 text-gray-500 dark:text-gray-400"><span className="align-top">*</span> Coming Soon</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
