import Image from "next/image";

async function getCurrentYear() {
  'use cache'
  return new Date().getFullYear()
}

export default async function SlimFooter() {
  return (
    <footer>
      <div className="flex flex-row w-full items-center justify-center bg-slate-800 text-white">
        <a
          className="pointer-events-none flex flex-row place-items-center gap-2 p-2 lg:pointer-events-auto"
          href="//andrew.mcinnes.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{" "}
          <Image
            src="/am_logo.svg"
            alt="AM Logo"
            className="invert w-[51px] h-auto"
            width={1024}
            height={494}
            priority
          />
        </a>
        <p>&copy; {await getCurrentYear()}</p>
      </div>
    </footer>
  );
}
