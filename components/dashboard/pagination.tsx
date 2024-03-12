import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight  } from "@fortawesome/free-solid-svg-icons";

export default function Pagination({ currentPage, limit, total }: {
  currentPage: number;
  limit: number;
  total: number;
}) {

  let previousPage = currentPage > 0 ? currentPage - 1 : 0;
  let lastPage = Math.floor(total / limit);
  let nextPage = currentPage === lastPage ? lastPage : currentPage + 1;

  return (
    <section className="mt-4">
      <div className="flex justify-between">
        {currentPage ? (
          <Link 
          href={`/dashboard/products?page=0`} 
          className="text-sky-500 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faAnglesLeft} className="text-lg" /> <span className="hidden sm:inline-block">First Page</span>
          </Link>
        ) : (
          ""
        )}

        {currentPage ? (
          <Link
            href={`/dashboard/products?page=${previousPage}`}
            className="text-sky-500 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-lg" /> Previous <span className="hidden sm:inline-block">Page</span>
          </Link>
        ) : (
          ""
        )}

        {currentPage < lastPage ? (
          <Link
            href={`/dashboard/products?page=${nextPage}`}
            className="text-sky-500 flex items-center gap-1"
          >
            Next <span className="hidden sm:inline-block">Page</span> <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
          </Link>
        ) : (
          ""
        )}

        {currentPage < lastPage ? (
          <Link
            href={`/dashboard/products?page=${lastPage}`}
            className="text-sky-500 flex items-center gap-1"
          >
            <span className="hidden sm:inline-block">Last Page</span> <FontAwesomeIcon icon={faAnglesRight} className="text-lg" />
          </Link>
        ) : (
          ""
        )}
      </div>
      <div>
        <progress
          id="products"
          max={++lastPage}
          value={++currentPage}
          className="w-full h-1 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-sky-500 [&::-moz-progress-bar]:bg-sky-500"
        ></progress>
        <label htmlFor="products" className="block w-full text-center">
          Page {currentPage} of {lastPage}
        </label>
      </div>
    </section>
  );
}
