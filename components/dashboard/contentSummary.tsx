import Link from "next/link";

import getContentsCache from "@/components/helper/getContentsCache";
import getDemoContentCache from "@/components/demo/getDemoContentCache";

/* 
interface contentResponseObject {
  ContentID: string;
  ContentName: string;
  ContentURL: string;
  ParentContentID: string;
  Active: string;
}

async function getAllContent(promises: any) {
    Promise.allSettled(promises).then((results) =>
        results.forEach((result) => {
            if(result.status === 'fulfilled') {
                if(result.value.Ack === 'Success'){
                    console.log(`Adding content`);
                    contentResponseArray.push(result.value.Content);
                } else {
                    console.log(result.value.Ack);
                    console.dir(result.value.Message, {'maxArrayLength': null});
                }
            } else {
                console.log(`${result.status}: ${result.reason}`);
            }
        }),
    );
}
*/

export default async function ContentSummary({
  hash,
  secret,
}: {
  hash: string;
  secret: string;
}) {
  if (hash.length & secret.length) {

    const categoryData = await getContentsCache(hash, secret, "category");
    const pageData = await getContentsCache(hash, secret, "page");
    const blogData = await getContentsCache(hash, secret, "blog");
    const brandData = await getContentsCache(hash, secret, "brand");

    const contentResponse = [
      { name: "Categories", response: categoryData },
      { name: "Pages", response: pageData },
      { name: "Blogs", response: blogData },
      { name: "Brands", response: brandData },
    ];

    if (contentResponse.length) {
      return (
        <div className="px-6 py-24 md:px-2 md:py-16 lg:px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 lg:mb-0 text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
              Content Synced:
            </h2>

            <div className="h-5/6 mx-auto mt-8 mb-16 grid grid-cols-1 sm:grid-cols-2 place-items-center gap-4">
              {contentResponse.map((content) => (
                <div key={content.name} className="mb-4">
                  {content.response.Ack === "Success" ? (
                    <div>
                      <p className="text-balance text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-2xl">
                        {content.name}
                      </p>
                      <p className="mt-4 text-balance text-2xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-4xl">
                        {content.response.Content.length}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-balance text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-2xl">
                        {content.name}
                      </p>
                      <p className="mt-4 text-balance text-2xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-4xl">
                        0
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex lg:flex-col xl:flex-row items-center justify-center gap-x-6">
              <Link
                href="/dashboard/contents"
                className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
              >
                View Content
              </Link>
            </div>
          </div>
        </div>
      );
    }
  } else {
    // console.log(`polling for content`);

    const demoCategoryData = await getDemoContentCache("category");
    const demoPageData = await getDemoContentCache("page");
    const demoBlogData = await getDemoContentCache("blog");
    const demoBrandData = await getDemoContentCache("brand");

    const contentResponse = [
      { name: "Categories", response: demoCategoryData },
      { name: "Pages", response: demoPageData },
      { name: "Blogs", response: demoBlogData },
      { name: "Brands", response: demoBrandData },
    ];
    // const contentResponseArray: contentResponseObject[] = [];

    // console.log(`content:`);
    // console.log(contentResponse);

    if (contentResponse.length) {
      return (
        <div className="px-6 py-24 md:px-2 md:py-16 lg:px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 lg:mb-0 text-balance text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-5xl">
              Content Synced:
            </h2>

            <div className="h-5/6 mx-auto mt-8 mb-16 grid grid-cols-1 sm:grid-cols-2 place-items-center gap-4">
              {contentResponse.map((content) => (
                <div key={content.name} className="mb-4">
                  {content.response.Ack === "Success" ? (
                    <div>
                      <p className="text-balance text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-2xl">
                        {content.name}
                      </p>
                      <p className="mt-4 text-balance text-2xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-4xl">
                        {content.response.Content.length}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-balance text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-2xl">
                        {content.name}
                      </p>
                      <p className="mt-4 text-balance text-2xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-500 sm:text-4xl">
                        0
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex lg:flex-col xl:flex-row items-center justify-center gap-x-6">
              <Link
                href="/demo/content"
                className="py-2 px-4 rounded-md text-gray-100 text-center bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 border-transparent"
              >
                View Content
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}
