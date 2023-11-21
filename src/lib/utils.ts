import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseURL = () => {
  if (process.env.MODE === "production") {
    return process.env.PROD_URL ?? "https://weekendless.vercel.app";
  }

  return process.env.DEV_URL ?? "http://localhost:3000";
};

const countryNameAndFlag = {
  argentina: "🇦🇷",
  australia: "🇦🇺",
  austria: "🇦🇹",
  belgium: "🇧🇪",
  brazil: "🇧🇷",
  bulgaria: "🇧🇬",
  canada: "🇨🇦",
  chile: "🇨🇱",
  china: "🇨🇳",
  colombia: "🇨🇴",
  croatia: "🇭🇷",
  "czech republic": "🇨🇿",
  denmark: "🇩🇰",
  egypt: "🇪🇬",
  estonia: "🇪🇪",
  finland: "🇫🇮",
  france: "🇫🇷",
  germany: "🇩🇪",
  greece: "🇬🇷",
  "hong kong": "🇭🇰",
  hungary: "🇭🇺",
  iceland: "🇮🇸",
  india: "🇮🇳",
  indonesia: "🇮🇩",
  ireland: "🇮🇪",
  "united kingdom": "🇬🇧",
  "united states": "🇺🇸",
  "south korea": "🇰🇷",
  latvia: "🇱🇻",
  lithuania: "🇱🇹",
  malaysia: "🇲🇾",
  mexico: "🇲🇽",
  morocco: "🇲🇦",
  netherlands: "🇳🇱",
  "new zealand": "🇳🇿",
  norway: "🇳🇴",
  peru: "🇵🇪",
  philippines: "🇵🇭",
  spain: "🇪🇸",
  poland: "🇵🇱",
};

export const getCountryFlag = (country: string) => {
  return countryNameAndFlag[country.toLowerCase() as "argentina"] ?? "🏳️";
};
