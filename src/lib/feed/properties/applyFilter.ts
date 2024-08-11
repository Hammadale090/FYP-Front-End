export function applyFilter(data: Record<string, any[]>, filters) {
  // Convert string number fields to numbers for comparison

  if (Object.entries(filters).length < 1) return data;
  const parseNumber = (value) => (value ? parseInt(value) : 0);

  // Check if a property meets the filter criteria
  const meetsCriteria = (property, filters) => {
    const attrs = property.attributes;

    // Price range filter
    const price = parseNumber(attrs.price);

    if (price == null || Number.isNaN(price)) return false;
    else {
      if (
        parseNumber(filters.min_priceRange) &&
        price < parseNumber(filters.min_priceRange)
      )
        return false;
      if (
        parseNumber(filters.max_priceRange) &&
        price > parseNumber(filters.max_priceRange)
      )
        return false;
    }

    // Property type filter

    if (
      filters.propertyType &&
      attrs.type?.toLowerCase() !== filters.propertyType?.toLowerCase()
    )
      return false;

    // Number of bedrooms filter
    if (
      parseNumber(filters.max_noOfBedrooms) ||
      parseNumber(filters.min_noOfBedrooms)
    ) {
      if (
        parseNumber(filters.min_noOfBedrooms) &&
        parseNumber(attrs?.overview?.bedrooms) <
          parseNumber(filters.min_noOfBedrooms)
      )
        return false;
      if (
        parseNumber(filters.max_noOfBedrooms) &&
        parseNumber(attrs?.overview?.bedrooms) >
          parseNumber(filters.max_noOfBedrooms)
      )
        return false;
    }

    // Number of bathrooms filter
    if (
      parseNumber(filters.min_noOfBathrooms) ||
      parseNumber(filters.max_noOfBathrooms)
    ) {
      if (
        parseNumber(filters.min_noOfBathrooms) &&
        parseNumber(attrs?.overview?.bathrooms) <
          parseNumber(filters.min_noOfBathrooms)
      )
        return false;
      if (
        parseNumber(filters.max_noOfBathrooms) &&
        parseNumber(attrs?.overview?.bathrooms) >
          parseNumber(filters.max_noOfBathrooms)
      )
        return false;
    }

    // Square footage filter
    if (
      parseNumber(filters.min_squareFootage) ||
      parseNumber(filters.max_squareFootage)
    ) {
      if (
        parseNumber(filters.min_squareFootage) &&
        parseNumber(attrs?.overview?.size) <
          parseNumber(filters.min_squareFootage)
      )
        return false;
      if (
        parseNumber(filters.max_squareFootage) &&
        parseNumber(attrs?.overview?.size) >
          parseNumber(filters.max_squareFootage)
      )
        return false;
    }

    // Lot size filter
    if (parseNumber(filters.min_lotSize) || parseNumber(filters.max_lotSize)) {
      if (
        parseNumber(filters.min_lotSize) &&
        parseNumber(attrs?.overview?.landSize) <
          parseNumber(filters.min_lotSize)
      )
        return false;
      if (
        parseNumber(filters.max_lotSize) &&
        parseNumber(attrs?.overview?.landSize) >
          parseNumber(filters.max_lotSize)
      )
        return false;
    }

    // Year Built filter
    if (
      parseNumber(filters.min_yearBuilt) ||
      parseNumber(filters.max_yearBuilt)
    ) {
      if (
        parseNumber(filters.min_yearBuilt) &&
        parseNumber(attrs?.overview?.yearBuild) <
          parseNumber(filters.min_yearBuilt)
      )
        return false;
      if (
        parseNumber(filters.max_yearBuilt) &&
        parseNumber(attrs?.overview?.yearBuild) >
          parseNumber(filters.max_yearBuilt)
      )
        return false;
    }
    // location filter
    if (filters.country?.name || filters.city?.name) {
      if (
        filters?.country?.name &&
        !attrs?.country
          ?.toLowerCase()
          .includes(filters.country?.name.toLowerCase())
      )
        return false;
      if (
        filters.city?.name &&
        !attrs?.city?.toLowerCase().includes(filters?.city?.name?.toLowerCase())
      )
        return false;
    }

    // Home types filter
    if (filters.homeTypes && !filters.homeTypes[attrs?.type?.toLowerCase()])
      return false;
    if (filters.homeTypes) {
      for (const [type, required] of Object.entries(filters.homeTypes)) {
        if (
          required &&
          (!attrs.type || !attrs.type.includes(type)) &&
          type != "others" &&
          type != "all"
        )
          return false;
      }
    }

    // Property amenities filter
    if (filters.propertyAmenities) {
      for (const [amenity, required] of Object.entries(
        filters.propertyAmenities
      )) {
        if (required && (!attrs.features || !attrs.features.includes(amenity)))
          return false;
      }
    }

    // Close proximities filter
    // if (filters.closeProximities) {
    //   for (const [proximity, required] of Object.entries(
    //     filters.closeProximities
    //   )) {
    //     if (
    //       required &&
    //       (!attrs.proximities || !attrs.proximities.includes(proximity))
    //     )
    //       return false;
    //   }
    // }

    // Other filters
    // if (filters.HOAFees && attrs.HOAFees !== filters.HOAFees) return false;
    // if (filters.petFriendly && attrs.petFriendly !== filters.petFriendly)
    //   return false;
    // if (filters.Furnished && attrs.Furnished !== filters.Furnished)
    //   return false;
    // if (filters.homeWarranty && attrs.homeWarranty !== filters.homeWarranty)
    //   return false;

    // Accessibility features filter
    // if (filters.accessibilityFeatures) {
    //   for (const [feature, required] of Object.entries(
    //     filters.accessibilityFeatures
    //   )) {
    //     if (
    //       required &&
    //       (!attrs.accessibility || !attrs.accessibility.includes(feature))
    //     )
    //       return false;
    //   }
    // }

    // View type filter
    // if (filters.viewType) {
    //   for (const [view, required] of Object.entries(filters.viewType)) {
    //     if (required && (!attrs.viewTypes || !attrs.viewTypes.includes(view)))
    //       return false;
    //   }
    // }

    // Listing type filter
    // if (filters.listingType) {
    //   for (const [type, required] of Object.entries(filters.listingType)) {
    //     if (required && attrs.listingType !== type) return false;
    //   }
    // }

    // Interior features filter
    // if (filters.interiorFeatures) {
    //   for (const [feature, required] of Object.entries(
    //     filters.interiorFeatures
    //   )) {
    //     if (
    //       required &&
    //       (!attrs.interiorFeatures || !attrs.interiorFeatures.includes(feature))
    //     )
    //       return false;
    //   }
    // }

    // Home style filter
    // if (filters.homeStyle) {
    //   for (const [style, required] of Object.entries(filters.homeStyle)) {
    //     if (
    //       required &&
    //       (!attrs.homeStyles || !attrs.homeStyles.includes(style))
    //     )
    //       return false;
    //   }
    // }

    // Security features filter
    // if (filters.securityFeatures) {
    //   for (const [feature, required] of Object.entries(
    //     filters.securityFeatures
    //   )) {
    //     if (
    //       required &&
    //       (!attrs.securityFeatures || !attrs.securityFeatures.includes(feature))
    //     )
    //       return false;
    //   }
    // }

    return true;
  };

  // Filter properties based on criteria
  let filteredData = {};
  for (const [key, properties] of Object.entries(data)) {
    filteredData[key] = properties.filter((property) =>
      meetsCriteria(property, filters)
    );
  }

  return filteredData;
}
