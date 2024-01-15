export default function Banner() {
  return (
    <div className="z-10 w-full items-center justify-between text-sm flex">
      <div className="galaxy-bg fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-3 pt-4">
        <a
          className="pointer-events-none lg:pointer-events-auto text-white"
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
