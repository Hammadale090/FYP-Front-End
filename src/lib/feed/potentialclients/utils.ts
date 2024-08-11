export function getKeysWithNonDefaultValues(data) {
  if (!data || typeof data !== 'object') {
    return []; // or throw an error, depending on your needs
  }
  return Object.keys(data).filter((key) => data[key]);
}

// export function finalizeSearchQuery(searchQueryObject) {
//   let finalQuery = "";
//   let orCount = 0;
//   const keys = Object.keys(searchQueryObject);

//   keys.forEach((i) => {
//     const currentDataType = searchQueryObject[i];

//     if (Array.isArray(currentDataType) && currentDataType.length) {
//       console.log(".....currentDataType.......", currentDataType);
//       if (currentDataType.length > 1) {
//         currentDataType.forEach((element, index) => {
//           finalQuery += `filters[$or][${orCount}]${element}`;
//           if (index !== currentDataType.length - 1) {
//             finalQuery += "&";
//           }
//           orCount++;
//         });
//       }
//       if (currentDataType.length == 1) {
//         finalQuery += currentDataType[0];
//       }
//     }
//   });

//   return finalQuery;
// }

export function finalizeSearchQuery(searchQueryObject) {
  let finalQueryParts = [];

  for (const key in searchQueryObject) {
    if (searchQueryObject.hasOwnProperty(key)) {
      const currentDataType = searchQueryObject[key];
      if (Array.isArray(currentDataType) && currentDataType.length) {
        if (currentDataType.length > 1) {
          const orQueryParts = currentDataType.map((query, index) => {
            return `filters[$or][${index}]${query}`;
          });
          finalQueryParts.push(orQueryParts.join("&"));
        } else {
          finalQueryParts.push(currentDataType[0]);
        }
      }
    }
  }

  return finalQueryParts.join("&");
}
