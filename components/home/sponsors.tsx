import Image from "next/image";

const sponsors = [
  {
    name: "McInnes Design",
    image: "/am_logo.svg",
    url: "https://acmcinnes.au/",
    key: "AM1",
  },
  {
    name: "McInnes Design",
    image: "/am_logo.svg",
    url: "https://acmcinnes.au/",
    key: "AM2",
  },
  {
    name: "McInnes Design",
    image: "/am_logo.svg",
    url: "https://acmcinnes.au/",
    key: "AM3",
  },
  {
    name: "McInnes Design",
    image: "/am_logo.svg",
    url: "https://acmcinnes.au/",
    key: "AM4",
  },
  {
    name: "McInnes Design",
    image: "/am_logo.svg",
    url: "https://acmcinnes.au/",
    key: "AM5",
  },
  {
    name: "McInnes Design",
    image: "/am_logo.svg",
    url: "https://acmcinnes.au/",
    key: "AM6",
  },
];

export default function Sponsors() {
  return (
    <>
      <h2 className="mt-20 w-full max-w-(--breakpoint-xl) text-base/7 text-left font-semibold text-indigo-600 dark:text-indigo-500">
        Sponsors
      </h2>
      <p className="w-full max-w-(--breakpoint-xl) text-left mt-2 text-pretty text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-balance">
        The Neto Addon Example would not be possible without these wonderful sponsors
      </p>
      <div className="mt-6 w-full max-w-(--breakpoint-xl)">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 items-center gap-1 rounded-2xl overflow-hidden lg:grid-cols-3 lg:divide-y-0">
          {sponsors.map((sponsor) => (
            <a
              className="pointer-events-none lg:pointer-events-auto w-full justify-items-center py-8 px-24 bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700"
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              key={sponsor.key}
            >
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                className="dark:invert w-full h-auto mx-auto"
                width={200}
                height={48}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
