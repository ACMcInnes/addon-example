"use client";

import { authClient } from '@/lib/auth-client';
import { faLock, faUser, faCode, faCircleQuestion, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function LinkTiles() {

  const { data: session, isPending } = authClient.useSession();

  const links = [
    {
      url: session ? "/account" :"//auth.mcinnes.design",
      label: session ? "Seller Account" : "Seller Login",
      icon: session ? faUser : faLock,
      subtitle: session ? "View your product sync and account with Gus" : "Login to manage your products and account with Gus",
      external: false,
    },
    {
      url: "/documentation",
      label: "Seller Docs",
      icon: faCode,
      subtitle: "Learn how to load products into the Commerce Sommelier",
      external: false,
    },
    {
      url: "/faq",
      label: "FAQs",
      icon: faCircleQuestion,
      subtitle: "Have a question? We have you covered",
      external: false,
    },
    {
      url: "/about-us",
      label: "About Gus",
      icon: faCircleInfo,
      subtitle: "Learn about your Commerce Sommelier, Gustave",
      external: false,
    },
  ];

  if (isPending) return (
    <div className="my-4 grid text-center lg:grid-cols-2 lg:max-w-5xl lg:w-full lg:mb-0 xl:grid-cols-4 xl:text-left">
      {links.map((link) => (
        <React.Fragment key={`${link.label} SK`}>
          <div
            className="animate-pulse rounded-lg border border-transparent px-5 py-4"
          >
            <h2 className={`mb-3 text-2xl`}>
              <strong className="bg-black dark:bg-white text-transparent">
                Placeholder
              </strong>
            </h2>
            <p className={`m-0 text-sm`}>
              <span className="bg-black/75 dark:bg-white/75 text-transparent">
                I'm loading...<br/> me too!
              </span>
            </p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="my-4 grid text-center lg:grid-cols-2 lg:max-w-5xl lg:w-full lg:mb-0 xl:grid-cols-4 xl:text-left">
      {links.map((link) => (
        <React.Fragment key={link.label}>
          {link.external ? (
            <a
              href={link.url}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-indigo-300 hover:bg-indigo-100 dark:hover:border-indigo-700 dark:hover:bg-indigo-800/30"
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
              <p className={`m-0 text-sm opacity-75`}>{link.subtitle}</p>
            </a>
          ) : (
            <Link
              href={link.url}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-indigo-300 hover:bg-indigo-100 dark:hover:border-indigo-700 dark:hover:bg-indigo-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {link.label}{" "}
                <FontAwesomeIcon
                  className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                  icon={link.icon}
                />
              </h2>
              <p className={`m-0 text-sm opacity-75`}>{link.subtitle}</p>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
