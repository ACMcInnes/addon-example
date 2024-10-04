import Link from "next/link";
import parse from "html-react-parser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import Images from "@/components/product/images";
import DemoVariants from "@/components/product/demoVariants";

// consider generating these pages at build time using https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// generateStaticParams() has issues with current cookie setup being out of global scope (https://nextjs.org/docs/messages/next-dynamic-api-wrong-context)

const WEBSTORE = "https://keylime.neto.com.au";

export async function generateStaticParams() {
    const products = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
        method: "POST",
        headers: {
          NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
          NETOAPI_ACTION: "GetItem",      
          "Accept": "application/json",
        },
        body: `{
            "Filter": {
                "CategoryID": 468
            }
        }`,
      }).then((res) => res.json())
 
    return products.Item.map((p: { SKU: string; }) => ({
        product: p.SKU,
    }))
}



async function getDemoProduct(sku: string) {
  console.log(`DEMO SKU: ${sku}`);
  // webstore and secret passed from AuthJS
  const res = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
    method: "POST",
    headers: {
      NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
      NETOAPI_ACTION: "GetItem",      
      "Accept": "application/json",
    },
    body: `{
      "Filter": {
          "SKU": [
              "${sku}"
          ],
          "OutputSelector": [
              "ParentSKU",
              "ID",
              "Brand",
              "Model",
              "Virtual",
              "Name",
              "PrimarySupplier",
              "Approved",
              "IsActive",
              "IsNetoUtility",
              "AuGstExempt",
              "NzGstExempt",
              "IsGiftVoucher",
              "FreeGifts",
              "CrossSellProducts",
              "UpsellProducts",
              "PriceGroups",
              "ItemLength",
              "ItemWidth",
              "ItemHeight",
              "ShippingLength",
              "ShippingWidth",
              "ShippingHeight",
              "ShippingWeight",
              "CubicWeight",
              "HandlingTime",
              "WarehouseQuantity",
              "WarehouseLocations",
              "CommittedQuantity",
              "AvailableSellQuantity",
              "ItemSpecifics",
              "Categories",
              "AccountingCode",
              "SortOrder1",
              "SortOrder2",
              "RRP",
              "DefaultPrice",
              "PromotionPrice",
              "PromotionStartDate",
              "PromotionStartDateLocal",
              "PromotionStartDateUTC",
              "PromotionExpiryDate",
              "PromotionExpiryDateLocal",
              "PromotionExpiryDateUTC",
              "DateArrival",
              "DateArrivalUTC",
              "CostPrice",
              "UnitOfMeasure",
              "BaseUnitOfMeasure",
              "BaseUnitPerQuantity",
              "QuantityPerScan",
              "BuyUnitQuantity",
              "SellUnitQuantity",
              "PreOrderQuantity",
              "PickPriority",
              "PickZone",
              "eBayProductIDs",
              "TaxCategory",
              "TaxFreeItem",
              "TaxInclusive",
              "SearchKeywords",
              "ShortDescription",
              "Description",
              "Features",
              "Specifications",
              "Warranty",
              "eBayDescription",
              "TermsAndConditions",
              "ArtistOrAuthor",
              "Format",
              "ModelNumber",
              "Subtitle",
              "AvailabilityDescription",
              "Images",
              "ImageURL",
              "BrochureURL",
              "ProductURL",
              "DateAdded",
              "DateAddedLocal",
              "DateAddedUTC",
              "DateCreatedLocal",
              "DateCreatedUTC",
              "DateUpdated",
              "DateUpdatedLocal",
              "DateUpdatedUTC",
              "UPC",
              "UPC1",
              "UPC2",
              "UPC3",
              "Type",
              "SubType",
              "NumbersOfLabelsToPrint",
              "ReferenceNumber",
              "InternalNotes",
              "BarcodeHeight",
              "SupplierItemCode",
              "SplitForWarehousePicking",
              "DisplayTemplate",
              "EditableKitBundle",
              "RequiresPackaging",
              "IsAsset",
              "WhenToRepeatOnStandingOrders",
              "SerialTracking",
              "Group",
              "ShippingCategory",
              "MonthlySpendRequirement",
              "RestrictedToUserGroup",
              "IsInventoried",
              "IsBought",
              "IsSold",
              "ExpenseAccount",
              "PurchaseTaxCode",
              "CostOfSalesAccount",
              "IncomeAccount",
              "AssetAccount",
              "KitComponents",
              "SEOPageTitle",
              "SEOMetaKeywords",
              "SEOPageHeading",
              "SEOMetaDescription",
              "SEOCanonicalURL",
              "ItemURL",
              "AutomaticURL",
              "Job",
              "RelatedContents",
              "SalesChannels",
              "VariantInventoryIDs",
              "Misc01",
              "Misc02",
              "Misc03",
              "Misc04",
              "Misc05",
              "Misc06",
              "Misc07",
              "Misc08",
              "Misc09",
              "Misc10",
              "Misc11",
              "Misc12",
              "Misc13",
              "Misc14",
              "Misc15",
              "Misc16",
              "Misc17",
              "Misc18",
              "Misc19",
              "Misc20",
              "Misc21",
              "Misc22",
              "Misc23",
              "Misc24",
              "Misc25",
              "Misc26",
              "Misc27",
              "Misc28",
              "Misc29",
              "Misc30",
              "Misc31",
              "Misc32",
              "Misc33",
              "Misc34",
              "Misc35",
              "Misc36",
              "Misc37",
              "Misc38",
              "Misc39",
              "Misc40",
              "Misc41",
              "Misc42",
              "Misc43",
              "Misc44",
              "Misc45",
              "Misc46",
              "Misc47",
              "Misc48",
              "Misc49",
              "Misc50",
              "Misc51",
              "Misc52"
          ]
      }
  }`,
  });
 
  console.log(`GET PRODUCT RESPONSE:`);
  console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);

  if (!res.ok || res.status !== 200) {
    console.log('Failed to fetch product data for SKU: ${sku}')
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json()
}

async function getDemoChildProducts(parent: string, ids: Array<Number>) {
    console.log(`Demo Variant IDs: ${ids}`);
    // webstore and secret passed from AuthJS
    const res = await fetch(`${WEBSTORE}/do/WS/NetoAPI`, {
      method: "POST",
      headers: {
          NETOAPI_KEY: `${process.env.KEYLIME_GLOBAL_KEY}`,
          NETOAPI_ACTION: "GetItem",      
          "Accept": "application/json",
      },
      body: `{
          "Filter": {
              "InventoryID": [
                  ${ids}
              ],
              "OutputSelector": [
                  "Model",
                  "DefaultPrice",
                  "Images",
                  "ItemURL"
              ]
          }
      }`,
    });
   
    console.log(`GET DEMO VARIANTS RESPONSE:`);
    console.log(`${res.status == 200 ? 'OK' : 'ERROR'}`);
  
    if (!res.ok || res.status !== 200) {
      console.log('Failed to fetch product variants for SKU: ${parent}')
      // This will activate the closest `error.js` Error Boundary
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return res.json()
}

export default async function DemoProduct({
  params,
}: {
  params: { product: string };
}) {

    const product = await getDemoProduct(params.product);
    if (product.Item.length) {
      const results = product.Item[0];
      let childProducts = await getDemoChildProducts(
        results.SKU,
        results.VariantInventoryIDs
      );
      
      return (
        <section className="grid gap-4 grid-cols-3 max-w-screen-xl mx-3">
          <h2 className="col-span-3 text-2xl font-semibold mt-4 mb-2">
            Viewing Product SKU: {params.product}
          </h2>
          <Link href={`/demo/products`} className="col-span-3 text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
            Go back to all products
          </Link>
          <div className="col-span-3 md:col-span-2">
            <Images sku={results.SKU} images={results.Images} />
          </div>
          <div className="col-span-3 md:col-span-1">
            <p className="text-4xl font-semibold">{results.Model}</p>
            <p>SKU: {results.SKU}</p>
            {results.ParentSKU && (
              <Link
                href={`/demo/products/${results.ParentSKU}`}
                className="text-sky-500"
              >
                Go to parent product
              </Link>
            )}
            <h2 className="mt-4 mb-2 text-2xl font-semibold">Information</h2>
            <p>Inventory ID: {results.ID}</p>
            <p>Active: {results.IsActive}</p>
            <p>Approved: {results.Approved}</p>
            <p>Brand: {results.Brand}</p>
            <p>Barcode: {results.UPC}</p>
            <p>Store Price: {results.DefaultPrice}</p>
            <p>QTY On Hand: {results.AvailableSellQuantity}</p>
          </div>
          <div className="col-span-3 mt-4 mb-2">
            <h2 className="mt-4 mb-2 text-2xl font-semibold">Description</h2>
            <div className="prose prose-slate dark:prose-invert">
              {parse(results.Description)}
            </div>
          </div>
          {childProducts.Item.length > 0 && (
            <DemoVariants sku={results.SKU} variants={childProducts.Item} />
          )}
          <div className="col-span-3 md:col-span-2 mt-4">
            <p>
              <Link href={`/demo/products`} className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">
                Go back to all products
              </Link>{" "}
              or return to{" "}
              <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">
                Home
              </Link>
            </p>
          </div>
          <div className="col-span-3 md:col-span-1 md:mt-4 md:text-right">
            <p>
              <Link
                href={`//${WEBSTORE}/${results.ItemURL}`}
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400"
              >
                View On Webstore{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </p>
          </div>
        </section>
      );
    } else {
      return (
        <div>
          <p className="mt-6">Could not load SKU</p>
          <p>
            <Link href={`/demo/products`} className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">
              Go back to all products
            </Link>{" "}
            or return to{" "}
            <Link href="/" className="text-indigo-600 hover:text-indigo-500 dark:text-sky-500 dark:hover:text-sky-400">
              Home
            </Link>
          </p>
        </div>
      );
    }

}
