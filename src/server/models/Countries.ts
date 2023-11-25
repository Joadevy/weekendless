import { db } from "../db";

export const getAllCountryNames = async () => {
  const countries = await db.country.findMany({
    select: {
      name: true,
    },
  });

  return countries.map((country) => country.name);
};
