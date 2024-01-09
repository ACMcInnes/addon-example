import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <nav className="w-full items-center justify-center gap-8 mt-12 py-8 text-sm flex bg-gray-300 dark:bg-slate-800">
        <Image
          src="/am_logo.svg"
          alt="AM Logo"
          className="dark:invert"
          width={100}
          height={24}
        />
        <ul className="flex flex-col gap-x-8 gap-y-2">
          {[
            ["Home", "/"],
            ["Dashboard", "/dashboard"],
            ["Projects", "/projects"],
            ["Reports", "/reports"],
          ].map(([title, url], index) => (
            <li key={index}>
              <Link
                className="hover:underline hover:underline-offset-4"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-x-8 gap-y-2">
          {[
            ["Home", "/"],
            ["Dashboard", "/dashboard"],
            ["Projects", "/projects"],
            ["Reports", "/reports"],
          ].map(([title, url], index) => (
            <li key={index}>
              <Link
                className="hover:underline hover:underline-offset-4"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-x-8 gap-y-2">
          {[
            ["Home", "/"],
            ["Dashboard", "/dashboard"],
            ["Projects", "/projects"],
            ["Reports", "/reports"],
          ].map(([title, url], index) => (
            <li key={index}>
              <Link
                className="hover:underline hover:underline-offset-4"
                href={url}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
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
            priority
          />
        </a>
        <div className="flex flex-col md:flex-row w-full items-center justify-center">
          <a
            className="pointer-events-none flex flex-col md:flex-row h-20 place-items-center gap-2 p-8 pb-2 md:pr-1 md:pb-8 lg:pointer-events-auto"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built using{" "}
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={75}
              height={15}
            />
          </a>
          <a
            className="pointer-events-none flex flex-col md:flex-row h-20 place-items-center gap-2 p-8 pt-2 md:pl-1 md:pt-8 lg:pointer-events-auto"
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            and deployed on{" "}
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel Logo"
              width={75}
              height={15}
            />
          </a>
        </div>
        <div className="flex flex-col w-full pb-4 items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
