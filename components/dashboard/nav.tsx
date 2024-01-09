"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-full items-center justify-center gap-8 my-12 py-2 text-sm flex bg-gray-300 dark:bg-slate-800">
      <Image
        src="/am_logo.svg"
        alt="AM Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      <ul className="flex flex-row gap-8">
        {[
          ["Home", "/"],
          ["Dashboard", "/dashboard"],
          ["Projects", "/projects"],
          ["Reports", "/reports"],
        ].map(([title, url]) => (
          <li>
            <Link className={`hover:underline hover:underline-offset-4 ${pathname === url ? 'underline underline-offset-8' : ''}`} href={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
