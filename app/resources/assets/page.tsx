import { faArrowUpRightFromSquare, faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const assets = [
  {
    name: "Boring Avatars",
    showLabel: true,
    role: "Profile Images",
    imageUrl: "/boring-avatars-icon.webp",
    imageWidth: 128,
    imageHeight: 128,
    icon: null,
    styling: "h-12 rounded-md",
    href: "//boringavatars.com/",
  },
  {
    name: "Font Awesome",
    showLabel: true,
    role: "Icon Library",
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    icon: faFontAwesome,
    styling: "text-[rgb(83_141_215)] text-5xl",
    href: "//fontawesome.com/",
  },
  {
    name: "Better Auth",
    showLabel: false,
    role: "Authentication",
    imageUrl: "/better-auth-icon.svg",
    imageWidth: 400,
    imageHeight: 51.657,
    icon: null,
    styling: "h-12",
    href: "//better-auth.com/",
  },
  {
    name: "Markdoc",
    showLabel: false,
    role: "Markdown Renderer",
    imageUrl: "/markdoc-icon.svg",
    imageWidth: 112,
    imageHeight: 37,
    icon: null,
    styling: "h-12",
    href: "//markdoc.dev/",
  },
  {
    name: "Tailwind Plus",
    showLabel: false,
    role: "Component Library",
    imageUrl: "/tailwindplus-icon.svg",
    imageWidth: 176,
    imageHeight: 21,
    icon: null,
    styling: "h-9 my-auto",
    href: "//tailwindcss.com/plus",
  },
  {
    name: "Headless UI",
    showLabel: false,
    role: "UI Components",
    imageUrl: "/headlessui-icon.svg",
    imageWidth: 174,
    imageHeight: 32,
    icon: null,
    styling: "h-9 my-auto",
    href: "//headlessui.com/",
  },  
  {
    name: "Formspree",
    showLabel: false,
    role: "JavaScript Form Library",
    imageUrl: "/formspree-icon.svg",
    imageWidth: 580,
    imageHeight: 128,
    icon: null,
    styling: "h-9 my-auto",
    href: "//formspree.io/",
  },
];

export default function Assets() {
  return (
    <section className="w-full max-w-(--breakpoint-xl)">
      <h1 className="mx-auto text-center mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Assets
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl/8">
        Wondering how the Neto Addon Example does something? This application
        uses a combination of bespoke code along with various 3rd party services
        to build out functionality &#40;why reinvent the wheel right?&#41;
      </p>

      <p className="mx-auto max-w-4xl mt-20 text-2xl font-semibold">
        3rd Party Assets
      </p>

      <ul role="list" className="mx-auto max-w-4xl mt-6 mb-4 divide-y divide-gray-100">
        {assets.map((asset) => (
          <li
            key={asset.name}
            className="relative py-5 hover:bg-neutral-100 dark:hover:bg-slate-700"
          >
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between gap-x-6">
                <div className="flex min-w-0 min-h-12 gap-x-4">
                  {/* SVG styling not applied in Safari :( */}
                  {asset.icon ? (
                    <FontAwesomeIcon
                      className={`size-12 -ml-2 flex-none ${asset.styling}`}
                      icon={asset.icon}
                    />
                  ) : (
                    <Image
                      src={asset.imageUrl}
                      width={asset.imageWidth}
                      height={asset.imageHeight}
                      alt={`${asset.name} logo`}
                      className={`w-auto max-w-64 flex-none ${asset.styling}`}
                    />
                  )}

                  <div className="min-w-0 flex-auto content-center">
                    <p className="text-2xl/6 text-gray-900 dark:text-gray-100">
                      {asset.showLabel && asset.name}
                      <a href={asset.href} target="_blank">
                        <span className="absolute inset-x-0 -top-px bottom-0" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-4">
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-md/6 text-gray-900 dark:text-gray-100">
                      {asset.role}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    className="flex-none text-2xl self-end sm:text-lg sm:self-auto text-gray-400 dark:text-gray-300"
                    icon={faArrowUpRightFromSquare}
                  />
                </div>
              </div>
              <p className="mt-2 sm:hidden text-md/6 text-gray-400 dark:text-gray-300">
                {asset.role}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-3xl text-pretty text-center text-gray-600 dark:text-gray-400">
        Using an iOS device or Safari Browser? Apple doesn&apos;t like the inline styling applied to some of these logos. 
        If something doesn&apos;t look right use the Theme Toggle to switch to Light Mode
      </p>
    </section>
  );
}
