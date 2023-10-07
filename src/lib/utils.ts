import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseURL = () => {
  if (process.env.MODE === "production") {
    return process.env.PROD_URL ?? "https://example.com";
  }

  return process.env.DEV_URL ?? "http://localhost:3000";
};
