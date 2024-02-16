"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars, faArrowUpRightFromSquare, faCircle } from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faInstagram, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {faCircle as faCircleR} from "@fortawesome/free-regular-svg-icons";

export default function Nav() {
  const pathname = usePathname();
  const [nav, setNav] = useState(false);


  const displayDay = new Intl.DateTimeFormat("en-AU", { weekday: "long", timeZone: "Australia/Brisbane" }).format(new Date());
  const displayTime = new Intl.DateTimeFormat("en-AU", { timeStyle: "short", timeZone: "Australia/Brisbane" }).format(new Date());
  const openHours = new Intl.DateTimeFormat("en-AU", { timeStyle: "medium", timeZone: "Australia/Brisbane", hourCycle: "h24" }).format(new Date('01/01/2024 9:00 am'));
  const closingHours = new Intl.DateTimeFormat("en-AU", { timeStyle: "medium", timeZone: "Australia/Brisbane", hourCycle: "h24" }).format(new Date('01/01/2024 5:00 pm'));
  const timestamp = new Intl.DateTimeFormat("en-AU", { timeStyle: "medium", timeZone: "Australia/Brisbane", hourCycle: "h24" }).format(new Date());


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
    ["Home", "/"],
    ["Dashboard", "/dashboard"],
    ["Projects", "/projects"],
    ["Reports", "/reports"],
  ];

  return (
    <nav className="w-full items-center justify-between md:justify-center gap-8 mb-12 py-2 text-sm flex bg-gray-300 dark:bg-slate-800">
      <Link href="/">
      <Image
        src="/am_logo.svg"
        alt="AM Logo"
        className="dark:invert ml-4"
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
        className={`flex items-center gap-2 text-lg cursor-pointer pr-4 z-10 md:hidden ${nav ? 'text-white' : ''}`}
      >
        Menu {nav ? <FontAwesomeIcon icon={faXmark} className="text-xl" /> : <FontAwesomeIcon icon={faBars} />}
      </div>

      {nav && (
        <ul className="z-[1] flex flex-col justify-center items-start flex-auto gap-x-8 gap-y-2 p-12 text-base absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-white">
        <li key="footer" className="text-lg border-b-2 w-full">
          Menu
        </li>
          {[
            ["Dashboard", "/dashboard"],
            ["About Us", "/about"],
            ["FAQ", "/faq"],
            ["Contact", "/contact"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end">
              <Link
                className="text-sky-500 hover:text-sky-600"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}

        <li key="resources" className="text-lg border-b-2 w-full">
          Resources
        </li>
          {[
            ["Assets", "/assets"],
            ["Case studies", "/cases"],
            ["Terms of use", "/terms"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end lg:self-auto">
              <Link
                className="text-sky-500 hover:text-sky-600"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}

        <li key="neto" className="text-lg border-b-2 w-full">
          Neto
        </li>
          {[
            ["What is Neto", "//maropost.com/platform/neto-by-maropost/"],
            ["API Documentation", "//developers.maropost.com/documentation/engineers/api-documentation"],
            ["Status", "//status.netohq.com/"],
          ].map(([title, url], index) => (
            <li key={index} className="self-end">
              <Link
                className="text-sky-500 hover:text-sky-600"
                href={url}
              >
                {title} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </li>
          ))}
          <li key="socials" className="flex items-center justify-start gap-4 text-xl mt-8 pt-4 border-t-2 w-full">
              <FontAwesomeIcon icon={faYoutube} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faLinkedinIn} />
          </li>
          <li key="open">
            <p className="text-sm">{displayDay} {displayTime} {timestamp > openHours && timestamp < closingHours ? <FontAwesomeIcon icon={faCircle} className="text-green-500" /> : <FontAwesomeIcon icon={faCircleR} className="text-yellow-500" />} {timestamp > openHours && timestamp < closingHours ? "available" : "gone for the day"}</p>
          </li>
        </ul>
      )}


    </nav>
  );
}
