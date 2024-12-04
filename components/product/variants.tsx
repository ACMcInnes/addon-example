import Image from "next/image";
import Link from "next/link";

interface variantObject {
  InventoryID: string;
  ItemURL: string;
  DefaultPrice: string;
  Images: any;
  Model: string;
  SKU: string;
}

export default function Variants({
  sku,
  variants,
}: {
  sku: string;
  variants: Array<variantObject>;
}) {
  // console.log(`VARIANT TEST`);
  // console.log(variants);
  // console.log(mainImage.URL);
  // console.log(altImages);

  return (
    <div className="grid grid-cols-subgrid gap-4 col-span-3">
      <h2 className="text-2xl font-semibold col-span-3">Related Products</h2>
        {variants.map((variant, index) => (
          <div key={index} className="col-span-3 md:col-span-1">
            <p>Name: {variant.Model}</p>
            <p>SKU: {variant.SKU}</p>
            <Image
              src={variant.Images[0] ? variant.Images[0].URL : "/am_logo.svg"}
              alt={`${sku} product variant - ${variant.SKU}`}
              width={533}
              height={800}
              className="h-auto max-w-full"
            />
            <p>
              <Link
                href={`/dashboard/products/${variant.SKU}`}
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Go to variant product
              </Link>
            </p>
          </div>
        ))}
    </div>
  );
}
