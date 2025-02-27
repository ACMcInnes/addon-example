import Link from "next/link";
import {
  faArrowTurnUp,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getContentsCache from "@/components/helper/getContentsCache";
import getContentsTotal from "@/components/helper/getContentsTotal";

interface contentTypeObject {
  id: number;
  code: string;
  name: string;
  internal_description: string;
  sort_order: number;
  system: string;
  default: string;
}

let contentResponse: {
  name: string;
  code: string;
  description: string;
  response: {
    Ack: string;
    Content: {
      ContentID: string;
      ContentName: string;
      ContentURL: string;
      ParentContentID: string;
      Active: string;
    }[];
  };
};
const contentFullPathData: {
  [key: string]: { fullpathIDs: string[]; fullpathNames: string[] };
} = {};

const CONTENT_SUMMARY_LIMIT = 10;

export default async function ContentList({
  hash,
  secret,
  content,
  webstore,
  demo,
}: {
  hash: string;
  secret: string;
  content: contentTypeObject;
  webstore: string;
  demo: boolean;
}) {
  const contentSummary = await getContentsCache(
    hash,
    secret,
    demo,
    content.code,
    CONTENT_SUMMARY_LIMIT
  );

  const contentData = await getContentsTotal(hash, secret, demo, content.code);

  const contentTotal = contentData.Content.length;

  contentSummary.Content.map(
    (c: {
      ContentName: string;
      ContentID: string;
      ParentContentID: string;
    }) => {
      // 1 content level
      contentFullPathData[`${c.ContentID}`] = {
        fullpathIDs: [`${c.ContentID}`],
        fullpathNames: [`${c.ContentName}`],
      };

      if (+c.ParentContentID > 0) {
        const parentObject = contentSummary.Content.find(
          (x: { ContentID: string; ParentContentID: string }) =>
            x.ContentID === c.ParentContentID
        );

        // 2 content levels
        contentFullPathData[`${c.ContentID}`] = {
          fullpathIDs: [`${parentObject.ContentID}`, `${c.ContentID}`],
          fullpathNames: [`${parentObject.ContentName}`, `${c.ContentName}`],
        };

        if (+parentObject.ParentContentID > 0) {
          const parentsParentObject = contentSummary.Content.find(
            (x: { ContentID: string; ParentContentID: string }) =>
              x.ContentID === parentObject.ParentContentID
          );

          // 3 content levels
          contentFullPathData[`${c.ContentID}`] = {
            fullpathIDs: [
              `${parentsParentObject.ContentID}`,
              `${parentObject.ContentID}`,
              `${c.ContentID}`,
            ],
            fullpathNames: [
              `${parentsParentObject.ContentName}`,
              `${parentObject.ContentName}`,
              `${c.ContentName}`,
            ],
          };
        }
      }
    }
  );
  // console.log(contentFullPathData)
  contentResponse = {
    name: content.name,
    code: content.code,
    description: content.internal_description,
    response: contentSummary,
  };

  return (
    <div key={contentResponse.code} className="mb-4">
      {contentResponse.response.Ack === "Success" ? (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h3
                id={contentResponse.code}
                className="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                {contentResponse.name}
              </h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {contentResponse.description}
              </p>
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
                Page Count: {contentTotal}
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="inline-block rounded-md bg-indigo-600 dark:bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:enabled:bg-indigo-500 dark:hover:enabled:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Edit
              </button>
            </div>
          </div>
          <div className="-mx-4 mt-8 sm:-mx-0">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 lg:table-cell"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell"
                  >
                    Content Path
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Active
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {contentResponse.response.Content.map(
                  (page: {
                    ContentID: string;
                    ContentName: string;
                    ContentURL: string;
                    ParentContentID: string;
                    Active: string;
                  }) => (
                    <tr key={page.ContentID}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:w-auto sm:max-w-none sm:pl-0">
                        {page.ContentName}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">ID</dt>
                          <dd className="mt-1 text-gray-700 dark:text-gray-400">
                            {page.ContentID}
                          </dd>
                          <dt className="sr-only sm:hidden">Content Path</dt>
                          <dd className="mt-1 text-gray-500 dark:text-gray-300 sm:hidden">
                            {contentFullPathData[
                              page.ContentID
                            ].fullpathNames.join(" > ") === page.ContentName
                              ? null
                              : contentFullPathData[
                                  page.ContentID
                                ].fullpathNames.join(" > ")}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-300 lg:table-cell">
                        {page.ContentID}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell">
                        {contentFullPathData[page.ContentID].fullpathNames.join(
                          " > "
                        )}
                      </td>
                      <td
                        className={`px-3 py-4 text-sm ${
                          page.Active === "True"
                            ? "text-green-500 dark:text-green-300"
                            : "text-red-500 dark:text-red-300"
                        }`}
                      >
                        {page.Active === "True" ? "Yes" : "No"}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm text-nowrap font-medium sm:pr-0">
                        <Link
                          href={`/${demo ? "demo" : "dashboard"}/contents/${page.ContentID}/products?page=0`}
                          className="pr-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 border-r-2 border-indigo-600 dark:border-indigo-500"
                        >
                          View
                          <span className="sr-only">, {page.ContentName}</span>
                        </Link>
                        <Link
                          href={`//${webstore}/${page.ContentURL}`}
                          target="_blank"
                          className="ml-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          <span className="sr-only">
                            View on webstore, {page.ContentName}
                          </span>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className="justify-self-end mt-4">
              {contentResponse.response.Content.length >= 10 ? (
                <Link
                  href={`/${demo ? "demo" : "dashboard"}/contents/${contentResponse.code}`}
                  className="inline-block rounded-md bg-indigo-600 dark:bg-indigo-500 mx-2 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-600"
                >
                  View All
                </Link>
              ) : (
                <button
                  type="button"
                  className="inline-block rounded-md bg-indigo-600 dark:bg-indigo-500 mx-2 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:enabled:bg-indigo-500 dark:hover:enabled:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  View All
                </button>
              )}
              <Link
                href="#"
                className="inline-block rounded-md bg-indigo-600 dark:bg-indigo-500 ml-2 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-600"
              >
                Top <FontAwesomeIcon icon={faArrowTurnUp} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>{contentResponse.name}</p>
          <p>Error - Could not load content</p>
        </div>
      )}
    </div>
  );
}
