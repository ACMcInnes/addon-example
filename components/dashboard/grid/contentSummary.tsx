import Link from "next/link";

import getContentsCache from "@/components/helper/getContentsCache";

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
  demo,
}: {
  hash: string;
  secret: string;
  demo: boolean;
}) {

    const categoryData = await getContentsCache(hash, secret, demo, "category");
    const pageData = await getContentsCache(hash, secret, demo, "page");
    const blogData = await getContentsCache(hash, secret, demo, "blog");
    const brandData = await getContentsCache(hash, secret, demo, "brand");

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
                href={`/${demo ? "demo" : "dashboard"}/contents`}
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
