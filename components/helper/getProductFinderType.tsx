interface contentTypePayload {
  messages: string[];
  errors: string[];
  result_info: {
    per_page: number;
    total_count: number;
    next: string;
    previous: string;
  };
  result: {
    id: number;
    code: string;
    name: string;
    internal_description: string;
    sort_order: number;
    system: string;
    default: string;
  }[];
}

export default async function getProductFinderType(contentTypes: contentTypePayload) {
  let productFinderType: string = "";

  for (const contentType of contentTypes.result) {
    if (contentType.code === "part-finder") {
      console.log(`Product Finder default code match`);
      productFinderType = contentType.code;
      break;
    } else if (
      contentType.code.includes("part") ||
      contentType.code.includes("parts") ||
      contentType.code.includes("finder")
    ) {
      console.log(`Product Finder type might have a match`);
      productFinderType = contentType.code;
      break;
    }
  }

  return productFinderType;
}
