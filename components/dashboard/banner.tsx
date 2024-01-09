export default function Banner() {
  return (
    <div className="z-10 w-full items-center justify-between text-sm flex">
      <div className="galaxy-bg fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-3 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
        <a
          className="pointer-events-none lg:pointer-events-auto"
          href="https://developers.maropost.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built for Neto
        </a>
      </div>
    </div>
  );
}
