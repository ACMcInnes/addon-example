import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight  } from "@fortawesome/free-solid-svg-icons";

export default function ContentPagination({ content, currentPage, limit, total }: {
  content: string;  
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
          href={`/demo/content/${content}/products?page=0`} 
          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faAnglesLeft} className="text-lg" /> <span className="hidden sm:inline-block">First Page</span>
          </Link>
        ) : (
          <div></div>
        )}

        {currentPage ? (
          <Link
            href={`/demo/content/${content}/products?page=${previousPage}`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-lg" /> Previous <span className="hidden sm:inline-block">Page</span>
          </Link>
        ) : (
          <div></div>
        )}

        {currentPage < lastPage ? (
          <Link
            href={`/demo/content/${content}/products?page=${nextPage}`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 flex items-center gap-1"
          >
            Next <span className="hidden sm:inline-block">Page</span> <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
          </Link>
        ) : (
          <div></div>
        )}

        {currentPage < lastPage ? (
          <Link
            href={`/demo/content/${content}/products?page=${lastPage}`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 flex items-center gap-1"
          >
            <span className="hidden sm:inline-block">Last Page</span> <FontAwesomeIcon icon={faAnglesRight} className="text-lg" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <progress
          id="products"
          max={++lastPage}
          value={++currentPage}
          className="w-full h-1 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-indigo-500 [&::-moz-progress-bar]:bg-indigo-500"
        ></progress>
        <label htmlFor="products" className="block w-full text-center">
          Page {currentPage} of {lastPage}
        </label>
      </div>
    </section>
  );
}
