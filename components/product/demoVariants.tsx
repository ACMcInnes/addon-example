import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export default function DemoVariants({
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

  // <div className="grid grid-cols-subgrid gap-4 col-span-3">

  return (
    <div className="grid grid-cols-3 gap-4 col-span-3 pb-8 border-b-2 border-indigo-600 dark:border-indigo-500">
      <h2 className="text-2xl font-semibold col-span-3">Related Products</h2>
        {variants.map((variant, index) => (
          <div key={index} className="col-span-3 md:col-span-1">
            <Link href={`/demo/products/${variant.SKU}`}>
                <Image
                src={variant.Images[0] ? variant.Images[0].URL : "/thumb_fallback.jpg"}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 500px"
                alt={`${sku} product variant - ${variant.SKU}`}
                width={999}
                height={1500}
                className="h-auto max-w-full"
                />
            </Link>
            <p>{variant.Model}</p>
            <p>SKU: {variant.SKU}</p>
            <p>
              <Link
                href={`/demo/products/${variant.SKU}`}
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
              >
                Go to variant product{" "}<FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </p>
          </div>
        ))}
    </div>
  );
}
