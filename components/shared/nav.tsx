"use client";

import { authClient } from '@/lib/auth-client';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faInstagram, faLinkedinIn, faBluesky, faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons";
import OfficeHours from "@/components/shared/office-hours";

export default function Nav() {
  const { data: session, isPending } = authClient.useSession();

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

  return (
    <nav className="w-full items-center justify-between md:justify-center gap-8 mb-12 py-2 text-sm flex bg-slate-800 text-white">
      <Link href="/" aria-label="Home">
        <Image
          src="/am_logo.svg"
          alt="AM Logo"
          className="invert ml-4 w-[100px] h-auto"
          width={1024}
          height={494}
          priority
        />
      </Link>
      <ul className="hidden md:flex md:flex-row md:gap-8">
        {[
          ["About Us", "/about-us"],
          ["Contact", "/contact"],
          ["Assets", "/resources/assets"],
          ["Connect", "/connect"],
          [`${session ? "Account" : "Login"}`, `${session ? "/account" : "/login"}`],
        ].map(([title, url], index) => (
          <li key={`d-menu-${index}`}>
            <Link
              className={`hover:underline hover:underline-offset-4 ${
                pathname === url ? "underline underline-offset-8" : ""
              }`}
              href={url}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className={`flex items-center gap-2 text-lg cursor-pointer px-4 z-10 md:hidden ${
          nav ? "text-white bg-black py-2" : ""
        }`}
      >
        {nav ? (
          <>
            Close <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </>
        ) : (
          <>
            Menu <FontAwesomeIcon icon={faBars} />
          </>
        )}
      </div>

      {nav && (
        <ul className="z-1 flex flex-col justify-start items-start flex-auto gap-x-8 gap-y-2 p-12 pb-28 overflow-y-auto text-base absolute top-0 left-0 w-full h-screen bg-linear-to-b from-black to-gray-800 text-white">
          <li
            key="m-menu-heading"
            className="text-lg border-b-2 mb-2 w-full pt-20"
          >
            Company
          </li>
          {[
            ["About Us", "/about-us"],
            ["FAQ", "/faq"],
            ["Contact", "/contact"],
          ].map(([title, url], index) => (
            <li
              key={`m-menu-${index}`}
              className={`self-end py-2 index-${index}`}
            >
              <Link className="text-sky-400" href={url} onClick={() => setNav(!nav)}>
                {title}
              </Link>
            </li>
          ))}

          <li
            key="m-res-heading"
            className="text-lg border-b-2 mb-2 w-full"
          >
            Resources
          </li>
          {[
            ["Assets", "/resources/assets"],
            ["Terms of use", "/resources/terms-of-use"],
            ["Plans", "/resources/plans"],
            ["Documentation", "/documentation"],
          ].map(([title, url], index) => (
            <li key={`m-res-${index}`} className="self-end py-2">
              <Link className="text-sky-400" href={url} onClick={() => setNav(!nav)}>
                {title}
              </Link>
            </li>
          ))}

          <li
            key="m-plat-heading"
            className="text-lg border-b-2 mb-2 w-full"
          >
            Connect
          </li>
          {[
            ["Neto", "/connect#neto"],
            ["Shopify", "/connect#shopify"],
            ["Wix", "/connect#wix"],
            ["Squarespace", "/connect#squarespace"],
            ["WooCommerce", "/connect#woo"],
            ["BigCommerce", "/connect#big"],
          ].map(([title, url], index) => (
            <li key={`m-plat-${index}`} className="self-end py-2">
              <Link className="text-sky-400" href={url} onClick={() => setNav(!nav)}>
                {title}
              </Link>
            </li>
          ))}
          <li
            key="header-socials"
            className="flex items-center justify-start gap-3 text-xl mt-8 pt-4 border-t-2 w-full"
          >
            <FontAwesomeIcon icon={faYoutube} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faInstagram} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faLinkedinIn} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faMastodon} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faBluesky} className="w-[24px] h-[24px]!" />
            <FontAwesomeIcon icon={faGithub} className="w-[24px] h-[24px]!" />
            <Link className="text-base text-sky-400 ml-auto" href={session ? "/account" : "/login"} onClick={() => setNav(!nav)}>
              <FontAwesomeIcon icon={faUser} className="text-xl w-[24px] h-[24px]!" />
            </Link>
            
          </li>
          <li key="header-open">
            <OfficeHours />
          </li>
        </ul>
      )}
    </nav>
  );
}
