import camelcase from "camelcase";
import { finalizeSearchQuery, getKeysWithNonDefaultValues } from "./utils";

export function constructSearchQuery(professionalsPreferences) {
  if (!professionalsPreferences) {
    return "";
  }
  //   const key = "pool";
  //   let start = `filters[preference][propertyAmenities][$containsi]=${`"${key}": ${true}`}`;

  let searchQueryObject = {
    propertyCategory: [],
    priceRange: [],
  };

  // for propertySpecialization
  getByPropertyCatogory(professionalsPreferences, searchQueryObject);
  getByPriceRange(professionalsPreferences, searchQueryObject);
  //   console.log("searchQueryObject is ", searchQueryObject);
  const finalquery = finalizeSearchQuery(searchQueryObject);
  //   console.log("----finalquery-----", finalquery);
  return finalquery;
}

function getByPropertyCatogory(professionalsPreferences, searchQueryObject) {
  const propertySpecializations = getKeysWithNonDefaultValues(
    professionalsPreferences.propertySpecialization
  );
  if (propertySpecializations.length) {
    const propertyByCategory = {
      residential: ["House", "Apartment", "Condo", "Townhouse"],
      commercial: ["Commercial"],
      luxury: [],
      mixedUse: [],
    };

    propertySpecializations.forEach((i) => {
      propertyByCategory[i].forEach((j) => {
        searchQueryObject.propertyCategory.push(
          `[preference][propertyCategory][$containsi]=${j}`
        );
      });
    });
  }
}

function getByPriceRange(professionalsPreferences, searchQueryObject) {
  const min_priceRange = professionalsPreferences?.["min_priceRange"];

  const max_priceRange = professionalsPreferences?.["max_priceRange"];

  if (min_priceRange == 0 && max_priceRange == 0) return;

  if (min_priceRange > 0) {
    searchQueryObject.priceRange.push(
      `[preference][min_priceRange][$gte]=${min_priceRange}`
    );
  }
  if (max_priceRange > 0) {
    searchQueryObject.priceRange.push(
      `[preference][max_priceRange][$lte]=${max_priceRange}`
    );
  }
}
