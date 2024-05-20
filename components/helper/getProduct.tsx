import { redirect } from "next/navigation";
import getAuthenticated from "@/components/helper/getAuthenticated";

const API_ENDPOINT = "https://api.netodev.com/v1/stores/";

export default async function getProduct(sku: string) {
  console.log(`SKU: ${sku}`);
  const oauth = await getAuthenticated();

  if (oauth.api_id) {
    let needsRedirect = false;
    let webstoreProduct;

    try {
      const res = await fetch(`${API_ENDPOINT}${oauth.api_id}/do/WS/NetoAPI`, {
        method: "POST",
        headers: {
          Authorization: `${oauth.token_type} ${oauth.access_token}`,
          "Content-Type": "application/json",
          NETOAPI_ACTION: "GetItem",
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
      console.log(`${res.status} - ${res.statusText}`);

      if (!res.ok || res.status !== 200) {
        console.log(`issue with API call`);

        if (res.statusText === "Unauthorized") {
          needsRedirect = true;
        } else {
          // This will activate the closest `error.js` Error Boundary
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
      }

      webstoreProduct = await res.json();
      // console.log(`FETCH DATA:`);
      // console.log(webstoreProduct);
    } catch (e) {
      return `Could not get webstore products. ${e}`;
    }

    if (needsRedirect) {
      console.log(`token refreshing...`);
      redirect(`/refresh?referrer=products%2F${sku}`);
    } else {
      return webstoreProduct;
    }
  } else {
    console.log(`oauth error - redirecting to login`);
    redirect(`/neto/login?type=webstore`);
  }
}
