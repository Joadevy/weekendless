import { db } from "../db";

export const getAllTypeEventNames = async () => {
  const typeEvents = await db.typeEvent.findMany({
    select: {
      name: true,
    },
  });

  return typeEvents.map((typeEvent) => typeEvent.name);
};
