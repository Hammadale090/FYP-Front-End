import { camelCaseToSpaces } from "@/lib/utils";

export function constructSearchQuery(preferences) {
  if (!preferences) {
    return "";
  }

  let searchQueryObject = {
    propertyCategory: [],
    propertyType: [],
    priceRange: [],
    SizeRange: [],
    YearBuiltRange: [],
    location: [],
    propertyAmenities: [],
    Keyword: [],
  };

  // for propertySpecialization
  getByPropertyCatogory(preferences, searchQueryObject);
  getByPropertyType(preferences, searchQueryObject);
  getByPriceRange(preferences, searchQueryObject);
  getBySizeRange(preferences, searchQueryObject);
  getByYearBuiltRange(preferences, searchQueryObject);
  getByLocation(preferences, searchQueryObject);
  getByFeatures(preferences, searchQueryObject);
  getByKeywords(preferences, searchQueryObject);

  const finalquery = finalizeSearchQuery(searchQueryObject);

  return finalquery;
}

function getByPropertyCatogory(preferences, searchQueryObject) {
  const propertyCategory = preferences?.["propertyCategory"];

  if (!propertyCategory) return;

  searchQueryObject.propertyCategory.push(
    `[overview][type][$containsi]=${propertyCategory}`
  );
}
function getByPropertyType(preferences, searchQueryObject) {
  const propertyType = preferences?.["propertyType"];

  if (!propertyType) return;

  searchQueryObject.propertyType.push(
    `[overview][homeStatus][$containsi]=${propertyType.replace(/ /g, "_")}`
  );
}

function getByPriceRange(preferences, searchQueryObject) {
  const min_priceRange = preferences?.["min_priceRange"];

  const max_priceRange = preferences?.["max_priceRange"];

  if (min_priceRange == 0 && max_priceRange == 0) return;

  if (min_priceRange > 0) {
    searchQueryObject.priceRange.push(`[price][$gte]=${min_priceRange}`);
  }
  if (max_priceRange > 0) {
    searchQueryObject.priceRange.push(`[price][$lte]=${max_priceRange}`);
  }
}
function getBySizeRange(preferences, searchQueryObject) {
  const min_sizeConsiderationsRange =
    preferences?.["min_sizeConsiderationsRange"];

  const max_sizeConsiderationsRange =
    preferences?.["max_sizeConsiderationsRange"];

  if (!min_sizeConsiderationsRange && !max_sizeConsiderationsRange) return;

  if (min_sizeConsiderationsRange) {
    searchQueryObject.SizeRange.push(
      `[overview][size][$gte]=${min_sizeConsiderationsRange}`
    );
  }
  if (max_sizeConsiderationsRange && max_sizeConsiderationsRange > 0) {
    searchQueryObject.SizeRange.push(
      `[overview][size][$lte]=${max_sizeConsiderationsRange}`
    );
  }
}
function getByYearBuiltRange(preferences, searchQueryObject) {
  const min_constructionDateRange = preferences?.["min_constructionDateRange"];

  const max_constructionDateRange = preferences?.["max_constructionDateRange"];

  if (!min_constructionDateRange && !max_constructionDateRange) return;

  if (min_constructionDateRange) {
    const date = new Date(min_constructionDateRange);
    const year = date.getFullYear();
    searchQueryObject.YearBuiltRange.push(
      `[overview][yearBuild][$gte]=${year}`
    );
  }
  if (max_constructionDateRange) {
    const date = new Date(max_constructionDateRange);
    const year = date.getFullYear();
    searchQueryObject.YearBuiltRange.push(
      `[overview][yearBuild][$lte]=${year}`
    );
  }
}
function getByLocation(preferences, searchQueryObject) {
  const location = preferences?.["location"];

  if (!location) return;
  const city = location?.city;
  const zip = location?.zipCode;
  //   const city = location?.city;
  //   const city = location?.city;

  if (!city && !zip) return;

  if (city) {
    searchQueryObject.location.push(`[city][$containsi]=${city}`);
  }
  if (zip) {
    searchQueryObject.location.push(`[zip][$containsi]=${zip}`);
  }
}
function getByFeatures(preferences, searchQueryObject) {
  const propertyAmenities = preferences?.["propertyAmenities"];

  if (!propertyAmenities) return;
  Object.keys(propertyAmenities).map((key, index) => {
    if (propertyAmenities[key] === true) {
      searchQueryObject.propertyAmenities.push(
        `[$or][${index}][features][$containsi]=${camelCaseToSpaces(key)}`
      );
    }
  });
}
function getByKeywords(preferences, searchQueryObject) {
  const keywords = preferences?.["specific_keywords_or_phrases"];

  if (!keywords || !keywords?.length || keywords?.length == 0) return;
  keywords.map((key, index) => {
    searchQueryObject.Keyword.push(
      `[$or][${index}][description][$containsi]=${camelCaseToSpaces(key)}`
    );
  });
}

// function finalizeSearchQuery(filters: Record<string, string[]>) {
//   const queryParts = [];
//   let orIndex = 2;

//   for (const [category, conditions] of Object.entries(filters)) {
//     if (conditions.length > 1) {
//       const andConditions = conditions
//         .map((condition, index) => `filters${condition}`)
//         .join("&");
//       queryParts.push(andConditions);
//     } else {
//       conditions.forEach((condition) => {
//         queryParts.push(`filters${condition}`);
//       });
//     }
//   }

//   const finalQuery = `${
//     queryParts.length > 0 ? "&" + queryParts.join("&") : ""
//   }`;
//   return finalQuery;
// }

function finalizeSearchQuery(filters: Record<string, string[]>): string {
  const queryParts = Object.values(filters)
    .flatMap((conditions) =>
      conditions.map((condition) => `filters${condition}`)
    )
    .join("&");

  return queryParts ? `&${queryParts}` : "";
}
