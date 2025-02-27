import Link from "next/link";
import { notFound } from "next/navigation";

import {
  faArrowLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getContentsCache from "@/components/helper/getContentsCache";
import { auth } from "@/auth";

const WEBSTORE = "https://keylime.neto.com.au";

const contentTypes = [
  {
    name: "Categories",
    code: "category",
    description:
      "The primary content type for most webstores, helps customers find like products",
  },
  {
    name: "Pages",
    code: "page",
    description:
      "Information is king, get it to your customers with a good old fashioned web page",
  },
  {
    name: "Blogs",
    code: "blog",
    description:
      "Wordpress is so 2001, why not keep customers updated via your Neto Blog instead",
  },
  {
    name: "Brands",
    code: "brand",
    description: "Make sure your customers are brand loyal, with some brands",
  },
];

export default async function DemoContentsContent({
  params,
}: {
  params: Promise<{ content: string }>;
}) {
  const { content } = await params;

  const session = await auth();

  if (session) {
    console.log(`DEMO CONTENTS CONTENT PARAMS`);
    console.log(content);

    // properly type 'response' at some point
    const contentResponse: {
      name: string;
      code: string;
      description: string;
      response: any;
    }[] = [];
    const contentFullPathData: {
      [key: string]: { fullpathIDs: string[]; fullpathNames: string[] };
    } = {};

    const contentType = contentTypes.find((type) => type.code === content);

    if (!contentType) {
      notFound()
    }

    const contentData = await getContentsCache("", "", true, content);

    contentData.Content.map(
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
          const parentObject = contentData.Content.find(
            (x: { ContentID: string; ParentContentID: string }) =>
              x.ContentID === c.ParentContentID
          );

          // 2 content levels
          contentFullPathData[`${c.ContentID}`] = {
            fullpathIDs: [`${parentObject.ContentID}`, `${c.ContentID}`],
            fullpathNames: [`${parentObject.ContentName}`, `${c.ContentName}`],
          };

          if (+parentObject.ParentContentID > 0) {
            const parentsParentObject = contentData.Content.find(
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
    // console.log(contentFullPathData);
    contentResponse.push({
      name: contentType!.name,
      code: contentType!.code,
      description: contentType!.description,
      response: contentData,
    });

    if (contentResponse.length) {
      return (
        <section className="mx-auto sm:px-6 lg:px-8">
          <h2 className="my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Content
          </h2>
          <p>
            <Link
              href="/demo"
              className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-500"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
            </Link>
            <Link
              href="/demo/contents"
              className="ml-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Content
            </Link>
          </p>

          {contentResponse.map((content) => (
            <div key={content.name} className="mx-auto max-w-(--breakpoint-lg) py-12">
              <div>
                <div className="w-full text-center">
                  <p className="mt-6 text-xl/8 text-balance font-semibold text-gray-900 dark:text-gray-100">
                    {content.name}
                  </p>
                  <p className="mt-6 text-lg/8 text-balance text-gray-700 dark:text-gray-200">
                    {content.description}
                  </p>
                </div>

                <div className="mt-8 mb-16">
                  <div className="mb-4">
                    {content.response.Ack === "Success" ? (
                      <div className="py-12 px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                          <div className="sm:flex-auto">
                            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
                              Page Count: {content.response.Content.length}
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
                                <th
                                  scope="col"
                                  className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                >
                                  <span className="sr-only">View</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                              {content.response.Content.map(
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
                                        <dt className="sr-only sm:hidden">
                                          Content Path
                                        </dt>
                                        <dd className="mt-1 text-gray-500 dark:text-gray-300 sm:hidden">
                                          {contentFullPathData[
                                            page.ContentID
                                          ].fullpathNames.join(" > ") ===
                                          page.ContentName
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
                                      {contentFullPathData[
                                        page.ContentID
                                      ].fullpathNames.join(" > ")}
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
                                        href={`/demo/contents/${page.ContentID}/products?page=0`}
                                        className="pr-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 border-r-2 border-indigo-600 dark:border-indigo-500"
                                      >
                                        View
                                        <span className="sr-only">
                                          , {page.ContentName}
                                        </span>
                                      </Link>
                                      <Link
                                        href={`//${WEBSTORE}/${page.ContentURL}`}
                                        target="_blank"
                                        className="ml-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                      >
                                        <span className="sr-only">
                                          View on webstore, {page.ContentName}
                                        </span>
                                        <FontAwesomeIcon
                                          icon={faArrowUpRightFromSquare}
                                        />
                                      </Link>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>{content.name}</p>
                        <p>0</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mb-8">
            <p>
              Return to{" "}
              <Link
                href="/demo"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Demo Dashboard
              </Link>
            </p>
          </div>
        </section>
      );
    } else {
      return (
        <div>
          <p className="mt-6">No content</p>
          <p>
            <Link
              href={`/demo`}
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Go back
            </Link>{" "}
            or return to{" "}
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Home
            </Link>
          </p>
        </div>
      );
    }
  } else {
    return (
      <>
        <div className="mt-6">
          <p>You are not logged in</p>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p>
            Return to{" "}
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              Home
            </Link>
          </p>
          <p className="m-2">or</p>
          <Link
            href={`/neto/login?type=webstore`}
            className="block ml-1 py-2 px-4 rounded-md text-gray-100 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-transparent"
          >
            Log In
          </Link>
        </div>
      </>
    );
  }
}
