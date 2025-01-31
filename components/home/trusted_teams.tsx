import Image from "next/image";

const teams = [
  {
    image: "https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg",
    alt: "Transistor",
  },
  {
    image: "https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg",
    alt: "Reform",
  },
  {
    image: "https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg",
    alt: "Tuple",
  },
  {
    image: "https://tailwindui.com/plus/img/logos/158x48/laravel-logo-gray-900.svg",
    alt: "Laravel",
  },
  {
    image: "https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg",
    alt: "SavvyCal",
  },
  {
    image: "https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg",
    alt: "Statamic",
  },
];

export default function TrustedTeams() {
  return (
    <div className="mt-20 w-full max-w-(--breakpoint-xl)">
      <h2 className="text-base/7 text-center font-semibold text-indigo-600 dark:text-indigo-500">
        Endorsements
      </h2>
      <p className="w-full max-w-(--breakpoint-xl) text-center mt-2 text-pretty text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-balance">
        Trusted by the world&apos;s most innovative teams
      </p>
      <div className="mx-auto mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:gap-x-10 md:grid-cols-3 xl:grid-cols-6">
        {teams.map((team) => (
          <Image
            src={team.image}
            width={158}
            height={48}
            alt={team.alt}
            className="col-span-1 max-h-12 w-full object-contain dark:invert"
            key={team.alt}
          />
        ))}
      </div>
    </div>
  );
}
