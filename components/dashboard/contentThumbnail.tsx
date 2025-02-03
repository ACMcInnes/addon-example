import Link from "next/link";
import Image from "next/image";

import getThumbnailCache from "@/components/helper/getThumbnailCache";

interface itemSpecificsObject {
  Value: string;
  Name: string;
}

export default async function ContentThumbnail({
  hash,
  secret,
  sku,
  webstore,
  demo,
}: {
  hash: string;
  secret: string;
  sku: string;
  webstore: string;
  demo: boolean;
}) {
  const webstoreProduct = await getThumbnailCache(hash, secret, sku, demo);
  const results = webstoreProduct.Item;
  return (
    <>
      {results.map(
        (product: {
          InventoryID: string;
          SKU: string;
          Model: string;
          Brand: string;
          DefaultPrice: string;
          ShortDescription: string;
          ItemURL: string;
          Images: [
            {
                URL: string;
                Timestamp: string;
                ThumbURL: string;
                MediumThumbURL: string;
                Name: string;
            }
          ];
          ItemSpecifics: [
            {
              ItemSpecific: Array<itemSpecificsObject> | itemSpecificsObject;
            }
          ];
          ParentSKU: string;
          VariantInventoryIDs: string[];
        }) => (
            <div key={product.InventoryID} className="group relative">
              <Image
                src={product.Images[0] ? `${product.Images[0].URL}?${new Date(product.Images[0].Timestamp).getTime()}` : "/thumb_fallback.jpg"}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 250px"
                alt={`${product.SKU} product image`}
                width={999}
                height={1500}
                className="aspect-square w-full rounded-md bg-[#F6F6F6] object-contain group-hover:opacity-75"
              />
              <div className="mt-4 flex flex-col">
                <div className="flex flex-row justify-between">
                  <h3 className="text-sm text-gray-700 dark:text-gray-400">
                    <Link href={`/${demo ? "demo" : "dashboard"}/products/${product.SKU}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.SKU}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">AUD ${product.DefaultPrice}</p>
                </div>
                <p className="text-sm mt-1 font-medium text-gray-900 dark:text-gray-100">{product.Model}</p>
              </div>
            </div>
        )
      )}
    </>
  );
}
