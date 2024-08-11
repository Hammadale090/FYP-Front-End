import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function capitalizeFirstLetterOfEachWord(str) {
  try {
    // return _.startCase(_.toLower(str));
    return str;
  } catch {
    return str;
  }
}

export const getPriceWithSymbol = (currencyKey: string) => {
  switch (currencyKey) {
    case "CAD":
      return `C$`;
    case "USD":
    default:
      return `$`;
  }
};

export function camelCaseToSpaces(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Handle cases where two capital letters are followed by a lowercase letter
    .replace(/^./, function (match) {
      return match.toUpperCase();
    }); // Capitalize the first letter
}
