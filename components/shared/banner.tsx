export default function Banner() {
  return (
    <div className="z-10 relative w-full items-center justify-between text-sm flex">
      <div className="galaxy-bg flex w-full justify-center pb-3 pt-4">
        <a
          className="pointer-events-none lg:pointer-events-auto text-white"
          href="//mcinnes.design/"
          target="_blank"
          rel="noopener"
        >
          A McInnes Design Product
        </a>
      </div>
    </div>
  );
}
