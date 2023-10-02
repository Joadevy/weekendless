import { db } from "../db";

export const getSeatsByEventID = async (id: number) => {
  try {
    const Seats = await db.seat.findMany({
      where: { eventId: id },
    });
    return Seats;
  } catch (error) {
    console.error(error);
    return null;
  }
};
