import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faLocationDot,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faInstagram,
  faLinkedinIn,
  faGithub,
  faMastodon,
  faBluesky,
} from "@fortawesome/free-brands-svg-icons";

import SubscriberForm from "@/components/shared/subscriber-form";
import OfficeHours from "@/components/shared/office-hours";
import Status from "@/components/shared/status";
import MobileTop from "@/components/shared/mobile-top";

export default function Footer() {
  return (
    <footer className="mt-24 text-white bg-linear-to-b from-indigo-800 from-40% to-indigo-600 dark:from-indigo-900 dark:to-indigo-950">
      <section className="flex flex-col md:flex-row max-w-(--breakpoint-xl) mx-auto xl:border-b border-white/25">
        <nav className="w-full md:w-6/12 flex flex-col lg:flex-row items-start justify-start gap-8 mt-12 p-12 md:p-8 text-sm">
          <ul className="flex flex-col w-full flex-auto lg:flex-initial lg:basis-24 gap-x-8 gap-y-2">
            <li
              key="f-menu-heading"
              className="text-lg border-b-2 border-inherit mb-2"
            >
              Menu
            </li>
            {[
              ["Dashboard", "/dashboard"],
              ["About Us", "/about-us"],
              ["FAQ", "/faq"],
              ["Contact", "/contact"],
            ].map(([title, url], index) => (
              <li
                key={`f-menu-${index}`}
                className="self-end lg:self-auto py-2 md:py-0.5"
              >
                <Link
                  className="text-slate-200 hover:text-indigo-300"
                  href={url}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col w-full flex-auto lg:flex-initial lg:basis-28 gap-x-8 gap-y-2">
            <li
              key="f-res-heading"
              className="text-lg border-b-2 border-inherit mb-2"
            >
              Resources
            </li>
            {[
              ["Assets", "/resources/assets"],
              ["Terms of use", "/resources/terms-of-use"],
              ["Plans", "/resources/plans"],
              ["Documentation", "/documentation"],
            ].map(([title, url], index) => (
              <li
                key={`f-res-${index}`}
                className="self-end lg:self-auto py-2 md:py-0.5"
              >
                <Link
                  className="text-slate-200 hover:text-indigo-300"
                  href={url}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col w-full flex-auto lg:flex-initial lg:basis-44 gap-x-8 gap-y-2">
            <li
              key="f-neto-heading"
              className="text-lg border-b-2 border-inherit mb-2"
            >
              Neto
            </li>
            {[
              ["What is Neto", "//maropost.com/platform/neto-by-maropost/"],
              ["API Documentation", "//developers.maropost.com/documentation/engineers/api-documentation"],
              ["Status", "//status.netohq.com/"],
            ].map(([title, url], index) => (
              <li
                key={`f-neto-${index}`}
                className="self-end lg:self-auto py-2 md:py-0.5"
              >
                <Link
                  className="text-slate-200 hover:text-indigo-300"
                  href={url}
                  target="_blank"
                >
                  {title} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <section className="w-full md:w-6/12 flex flex-col items-end justify-center gap-2 md:mt-12 p-12 md:p-8 text-sm">
          <SubscriberForm />

          <p className="mt-4 flex justify-center gap-1">
            <FontAwesomeIcon icon={faLocationDot} className="text-xl" />{" "}
            Brisbane &#124; Meanjin, Australia
          </p>

          <OfficeHours />

          <p className="flex justify-center gap-1">
            <FontAwesomeIcon icon={faPhone} className="text-xl" /> 1800 975 709
          </p>

          <div className="flex items-center justify-center gap-3 text-xl pt-8">
            <FontAwesomeIcon icon={faYoutube} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faInstagram} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faLinkedinIn} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faMastodon} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faBluesky} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faGithub} className="w-[24px] h-[24px]!" />
          </div>

          <MobileTop />
        </section>
      </section>

      <div className="flex flex-col w-full items-center justify-center">
        <p className="flex flex-col md:flex-row place-items-center gap-2 p-12 pb-2">
          By{" "}
          <a
            href="https://acmcinnes.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/am_logo.svg"
              alt="AM Logo"
              className="invert"
              width={200}
              height={48}
            />
          </a>
        </p>
        <p className="pt-8 pb-6">Developed using</p>
        <div className="flex flex-row w-full items-center justify-center">
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={100}
              height={24}
            />
          </a>
          <FontAwesomeIcon icon={faPlus} size="lg" className="mx-6" />
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="invert"
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
            />
          </a>
        </div>

        <div className="flex flex-col w-full pt-4 md:pb-4 items-center justify-center">
          <div className="h-64 lg:h-80 w-11/12 md:w-8/12 lg:w-9/12 max-w-(--breakpoint-xl) my-8 mx-2">
            <div className="galaxy-bg flex flex-col items-center justify-center size-full! rounded-2xl">
              <p className="text-lg md:text-2xl">
                Connect your Neto webstore today
              </p>
              <Link
                href={`/documentation/getting-started`}
                className="group block mt-2 py-2 px-4 rounded-md bg-white text-black mix-blend-screen dark:bg-white border-transparent"
              >
                Get Started{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </Link>
            </div>
          </div>
        </div>

        <Status />
        <div className="flex flex-col w-full pt-4 md:pb-4 items-center justify-center">
          <p>&copy; {new Date().getFullYear()} &#124; McInnes Design</p>
        </div>
        <div className="md:hidden max-h-24 overflow-hidden flex flex-col w-full items-center justify-start">
          <Image
            src="/am_logo.svg"
            alt="AM Logo"
            className="invert"
            width={414}
            height={200}
          />
        </div>
      </div>
    </footer>
  );
}
