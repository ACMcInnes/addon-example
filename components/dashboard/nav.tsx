"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faInstagram, faTwitter, faLinkedinIn, faBluesky, faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons";
import OfficeHours from "@/components/shared/office-hours";

export default function Nav() {
  const pathname = usePathname();
  const [nav, setNav] = useState(false);

  if (typeof window !== 'undefined') {
    // stop scroll when mobile menu is open
    if (nav) {
      document.body.style.position = 'fixed';
    } else {
      document.body.style.position = '';
    }
  }

  const handleResize = () => {
    if (window.innerWidth >= 768) { // Assuming 768px is your md breakpoint
        setNav(false);
    }
  };
  
  // Set up event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  
    // Clean up the event listener
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const links = [
    ["Dashboard", "/dashboard"],
    ["About Us", "/about-us"],
    ["Contact", "/contact"],
    ["Assets", "/resources/assets"],
  ];

  return (
    <nav className="w-full items-center justify-between md:justify-center gap-8 mb-12 py-2 text-sm flex bg-slate-800 text-white">
      <Link href="/">
      <Image
        src="/am_logo.svg"
        alt="AM Logo"
        className="invert ml-4"
        width={100}
        height={24}
        priority
      />
      </Link>
      <ul className="hidden md:flex md:flex-row md:gap-8">
        {links.map(([title, url], index) => (
          <li key={index}>
            <Link className={`hover:underline hover:underline-offset-4 ${pathname === url ? 'underline underline-offset-8' : ''}`} href={url}>{title}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className={`flex items-center gap-2 text-lg cursor-pointer px-4 z-10 md:hidden ${nav ? 'text-white bg-black py-2' : ''}`}
      >
        Menu {nav ? <FontAwesomeIcon icon={faXmark} className="text-xl" /> : <FontAwesomeIcon icon={faBars} />}
      </div>

      {nav && (
        <ul className="z-[1] flex flex-col justify-start items-start flex-auto gap-x-8 gap-y-2 p-12 overflow-y-auto text-base absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-white">
        <li key="footer" className="text-lg border-b-2 mb-2 w-full pt-20">
          Menu
        </li>
          {[
            ["Dashboard", "/dashboard"],
            ["About Us", "/about-us"],
            ["FAQ", "/faq"],
            ["Contact", "/contact"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end py-2">
              <Link
                className="text-sky-400"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}

        <li key="resources" className="text-lg border-b-2 mb-2 w-full">
          Resources
        </li>
          {[
            ["Assets", "/resources/assets"],
            ["Terms of use", "/resources/terms-of-use"],
            ["Plans", "/resources/plans"],
            ["Documentation", "/documentation"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end py-2">
              <Link
                className="text-sky-400"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}

        <li key="neto" className="text-lg border-b-2 mb-2 w-full">
          Neto
        </li>
          {[
            ["What is Neto", "//maropost.com/platform/neto-by-maropost/"],
            ["API Documentation", "//developers.maropost.com/documentation/engineers/api-documentation"],
            ["Status", "//status.netohq.com/"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end py-2">
              <Link
                className="text-sky-400"
                href={url}
                target="_blank"
              >
                {title} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </li>
          ))}
          <li key="socials" className="flex items-center justify-start gap-3 text-xl mt-8 pt-4 border-t-2 w-full">
            <FontAwesomeIcon icon={faYoutube} className="w-[24px] !h-[24px]" />
            <FontAwesomeIcon icon={faInstagram} className="w-[24px] !h-[24px]" />
            <FontAwesomeIcon icon={faTwitter} className="w-[24px] !h-[24px]" />
            <FontAwesomeIcon icon={faLinkedinIn} className="w-[24px] !h-[24px]" />
            <FontAwesomeIcon icon={faMastodon} className="w-[24px] !h-[24px]" />
            <FontAwesomeIcon icon={faBluesky} className="w-[24px] !h-[24px]" />
            <FontAwesomeIcon icon={faGithub} className="w-[24px] !h-[24px]" />
          </li>
          <li key="open">
            <OfficeHours />
          </li>
        </ul>
      )}


    </nav>
  );
}
