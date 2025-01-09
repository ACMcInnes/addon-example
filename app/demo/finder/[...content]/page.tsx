import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Avatar from "boring-avatars";
import getDemoContentCache from "@/components/demo/getDemoContentCache";
import delay from "@/components/helper/delay";

const WEBSTORE = "https://keylime.neto.com.au";
const CONTENT_CODE = "part-finder";

// Generating Static Params for content quickly hits Neto API rate limit, removing for now

/*
export async function generateStaticParams() {
  const contentResults = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
      NETOAPI_ACTION: "GetContent",
      Accept: "application/json",
    },
    body: `{
            "Filter": {
                "ContentType": "${CONTENT_CODE}",
                "OutputSelector": [
                    "ParentContentID"
                ]
            }
        }`,
  }).then((res) => res.json());

  const mappedContent = contentResults.Content.map(
    (c: { ContentID: string; ParentContentID: string }) => {
      if (+c.ParentContentID > 0) {
        const parentObject = contentResults.Content.find(
          (x: { ContentID: string; ParentContentID: string }) =>
            x.ContentID === c.ParentContentID
        );

        if (+parentObject.ParentContentID > 0) {
          const parentsParentObject = contentResults.Content.find(
            (x: { ContentID: string; ParentContentID: string }) =>
              x.ContentID === parentObject.ParentContentID
          );
          // 3 content levels
          return { content: [`${parentsParentObject.ContentID}`, `${parentObject.ContentID}`, `${c.ContentID}`] };
        }
        // 2 content levels
        return { content: [`${parentObject.ContentID}`, `${c.ContentID}`] };
      }
      // 1 content level
      return { content: [`${c.ContentID}`] };
    }
  );
  return mappedContent;
}
*/  

async function getPageContents(id: string[]) {
  console.log(`DEMO CONTENT: ${id}`);
  const res = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
      NETOAPI_ACTION: "GetContent",
      Accept: "application/json",
    },
    body: `{
        "Filter": {
            "ContentID": [
                ${id}
            ],
            "OutputSelector": [
                "ContentID",
                "ContentName",
                "ContentType",
                "ParentContentID",
                "Active",
                "ContentReference",
                "ShortDescription1",
                "ShortDescription2",
                "ShortDescription3",
                "Description1",
                "Description2",
                "Description3",
                "Author",
                "ContentURL",
                "RelatedContents",
                "ExternalSource",
                "ExternalReference1",
                "ExternalReference2",
                "ExternalReference3",
                "DatePosted",
                "DatePostedLocal",
                "DatePostedUTC",
                "DateUpdated",
                "DateUpdatedLocal",
                "DateUpdatedUTC"
            ]
        }
    }`,
  });

  console.log(`GET CONTENT RESPONSE:`);
  console.log(`${res.status == 200 ? "OK" : "ERROR"}`);

  if (!res.ok || res.status !== 200) {
    console.log(`Failed to fetch content data for ID: ${id}`);
    if(res.status === 429) {
        // to many requests, rate limited by Neto
        console.log(`${res.status} Response - Max API requests made, pausing and retrying...`);
        await delay(5000).then(() => getPageContents(id));
      }
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
}

export default async function DemochildContent({
  params,
}: {
  params: Promise<{ content: string[] }>;
}) {
  const { content } = await params;

  // console.log(`CONTENT:`);
  // console.log(content)

  // const currentContent = content.at(-1);
  // console.log(currentContent)

  const pageContents = await getPageContents(content);

  // console.log(getContent.Content)

  if (pageContents.Content.length) {
    const fullContentPathName = pageContents.Content.map((content: { ContentName: string }) => content.ContentName).join(" ");
    const results = pageContents.Content.at(-1);

    const contentData = await getDemoContentCache(results.ContentType);

    const childContents = contentData.Content.filter((page: { ParentContentID: string; }) => page.ParentContentID === results.ContentID)

    if (childContents.length) {
      return (
        <section>
          <p className="mt-2 mb-8">
            <Link
              href="/demo"
              className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
            </Link>
            <Link
              href="/demo/finder"
              className="pl-2 mr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-500"
            >
              Finder
            </Link>

            {content.map((id: string, index: number) => (
              <Link
                key={id}
                href={`/demo/finder/${content.slice(0, index + 1).join("/")}`}
                className="pl-2 mr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-500"
              >
                {id}
              </Link>
            ))}
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold my-4 text-center">
            {fullContentPathName}
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
            {results.Description1}
          </p>

          <div className="pb-12">
            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
              <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
              >
                {childContents.map(
                  (
                    childContent: {
                      ContentID: string;
                      ContentName: string;
                      ParentContentID: string;
                      Active: string;
                      ContentURL: string;
                    },
                    index: number
                  ) => (
                    <li key={childContent.ContentID}>
                      <Link href={`/demo/finder/${content.join("/")}/${childContent.ContentID}`}>
                        <Avatar
                          name={`${childContent.ContentName}`}
                          variant="marble"
                          colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
                          className="mx-auto size-24"
                        />
                        <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                          {childContent.ContentName}
                        </h3>
                        <p className="text-sm/6 text-gray-600 dark:text-gray-400">
                          Active: {childContent.Active}
                        </p>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <p className="mt-2 mb-8">
            <Link
              href="/demo"
              className="pr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Demo Dashboard
            </Link>
            <Link
              href="/demo/finder"
              className="pl-2 mr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-500"
            >
              Finder
            </Link>

            {content.map((id: string, index: number) => (
              <Link
                key={id}
                href={`/demo/finder/${content.slice(0, index + 1).join("/")}`}
                className="pl-2 mr-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 border-l-2 border-indigo-600 dark:border-indigo-500"
              >
                {id}
              </Link>
            ))}
          </p>

          <Avatar
            name={`${fullContentPathName}`}
            variant="marble"
            colors={["#FFBF00", "#F53BAD", "#03B6FC", "#18D256"]}
            className="mx-auto size-56"
          />
          <h2 className="text-2xl font-semibold my-4 text-center">
            {fullContentPathName}
          </h2>

          <div className="py-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-base/7 font-semibold text-gray-900 dark:text-gray-100">
                Content Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-300">
                Demo Data
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {fullContentPathName}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Content ID
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.ContentID}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Type ID
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.ContentType}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Has Parent Content
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {+results.ParentContentID > 0 ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Active
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.Active}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Author
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.Author}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.Description1}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    Date Created
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                    {results.DatePostedLocal}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-4">
            <p>
              <Link
                href={`/demo/finder`}
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Go back to finder
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
        </section>
      );
    }
  } else {
    return (
      <div>
        <p className="mt-6">Could not load content</p>
        <p>
          <Link
            href={`/demo/finder`}
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            Go back to finder
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
}
