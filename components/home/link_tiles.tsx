import { faCode, faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const links = [
  {
    url: "/dashboard",
    label: "Dashboard",
    icon: faArrowRight,
    subtitle: "Access your dashboard",
    external: false,
  },
  {
    url: "/documentation",
    label: "Documentation",
    icon: faCode,
    subtitle: "Learn how to setup the Neto Addon",
    external: false,
  },
  {
    url: "/faq",
    label: "FAQs",
    icon: faArrowRight,
    subtitle: "Have a question? We have you covered",
    external: false,
  },
  {
    url: "https://developers.maropost.com/documentation/engineers/tutorials/",
    label: "Neto Tutorials",
    icon: faArrowUpRightFromSquare,
    subtitle: "Take a look at a similar Addon setup",
    external: true,
  },
];

export default function LinkTiles() {
  return (
    <div className="mb-4 grid text-center lg:grid-cols-2 lg:max-w-5xl lg:w-full lg:mb-0 xl:grid-cols-4 xl:text-left">
      {links.map((link) => (
        <React.Fragment key={link.label}>
          {link.external ? (
            <a
              href={link.url}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {link.label}{" "}
                <FontAwesomeIcon
                  className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                  icon={link.icon}
                />
              </h2>
              <p className={`m-0 text-sm opacity-50`}>{link.subtitle}</p>
            </a>
          ) : (
            <Link
              href={link.url}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {link.label}{" "}
                <FontAwesomeIcon
                  className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                  icon={link.icon}
                />
              </h2>
              <p className={`m-0 text-sm opacity-50`}>{link.subtitle}</p>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
