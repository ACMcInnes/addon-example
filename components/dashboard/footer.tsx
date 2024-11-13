import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faInstagram ,faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";

import SubscriberForm from "@/components/dashboard/subscriber-form";
import OfficeHours from "@/components/shared/office-hours";
import MobileTop from "@/components/shared/mobile-top";

export default function Footer() {
  return (
    <footer>
      <section className="flex flex-col md:flex-row">
      <nav className="w-full md:w-6/12 flex flex-col lg:flex-row items-start justify-center gap-8 mt-12 p-12 md:p-8 text-sm bg-indigo-100 dark:bg-slate-800">
      <ul className="flex flex-col w-full flex-auto lg:flex-initial lg:basis-24 gap-x-8 gap-y-2">
        <li key="footer" className="text-lg border-b-2 border-black dark:border-inherit">
          Menu
        </li>
          {[
            ["Dashboard", "/dashboard"],
            ["About Us", "/about-us"],
            ["FAQ", "/faq"],
            ["Contact", "/contact"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end lg:self-auto">
              <Link
                className="text-sky-500 hover:text-sky-400"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col w-full flex-auto lg:flex-initial lg:basis-28 gap-x-8 gap-y-2">
        <li key="resources" className="text-lg border-b-2 border-black dark:border-inherit">
          Resources
        </li>
          {[
            ["Assets", "/resources/assets"],
            ["Case studies", "/resources/case-studies"],
            ["Terms of use", "/resources/terms-of-use"],
            ["Documentation", "/documentation"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end lg:self-auto">
              <Link
                className="text-sky-500 hover:text-sky-400"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col w-full flex-auto lg:flex-initial lg:basis-44 gap-x-8 gap-y-2">
        <li key="Neto" className="text-lg border-b-2 border-black dark:border-inherit">
          Neto
        </li>
          {[
            ["What is Neto", "//maropost.com/platform/neto-by-maropost/"],
            ["API Documentation", "//developers.maropost.com/documentation/engineers/api-documentation"],
            ["Status", "//status.netohq.com/"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end lg:self-auto">
              <Link
                className="text-sky-500 hover:text-sky-400"
                href={url}
                target="_blank"
              >
                {title} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="w-full md:w-6/12 flex flex-col items-end justify-center gap-2 md:mt-12 p-12 md:p-8 text-sm dark:bg-indigo-100 bg-slate-800 text-white dark:text-slate-800">
            
            <SubscriberForm/>
            
            <p className="mt-4 flex justify-center gap-1"><FontAwesomeIcon icon={faLocationDot} className="text-xl" /> Brisbane &#124; Meanjin, Australia</p>
            
            <OfficeHours />
            
            <p className="flex justify-center gap-1"><FontAwesomeIcon icon={faPhone} className="text-xl" /> 1800 975 709</p>
            
            <div className="flex items-center justify-center gap-4 text-xl pt-8">
              <FontAwesomeIcon icon={faYoutube} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>

            <MobileTop />


      </section>
      </section>

      <div className="flex flex-col w-full items-center justify-center bg-indigo-300 dark:bg-indigo-800">
        <a
          className="pointer-events-none flex flex-col md:flex-row place-items-center gap-2 p-8 pb-2 lg:pointer-events-auto"
          href="https://acmcinnes.au/"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{" "}
          <Image
            src="/am_logo.svg"
            alt="AM Logo"
            className="dark:invert"
            width={100}
            height={24}
          />
        </a>
        <div className="flex flex-col md:flex-row w-full items-center justify-center">
        <p className="flex flex-col md:flex-row h-20 place-items-center gap-2 p-8 pb-2 md:pr-1 md:pb-8">
          Built using{" "}
          <a
            className="pointer-events-none lg:pointer-events-auto"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={75}
              height={15}
            />
          </a>
            </p>
          <p className="flex flex-col md:flex-row h-20 place-items-center gap-2 p-8 pt-2 md:pl-1 md:pt-8">
            deployed on{" "}
            <a
            className="pointer-events-none lg:pointer-events-auto"
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel Logo"
              width={75}
              height={15}
            />
            </a>
          </p>

            

        </div>
        <div className="flex flex-col w-full pt-4 md:pb-4 items-center justify-center text-white bg-indigo-800 dark:bg-indigo-950">
          <p>&copy; {new Date().getFullYear()} &#124; McInnes Design</p>
        </div>
        <div className="md:hidden max-h-24 overflow-hidden flex flex-col w-full items-center justify-start text-white bg-indigo-800 dark:bg-indigo-950">
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
