import { type Attendee } from "@prisma/client";
import { db } from "../db";

export const getAttendeeByNationalId = async (nationalID: string) => {
  try {
    const attendee: Attendee | null = await db.attendee.findUnique({
      where: { nationalID },
    });

    return attendee;
  } catch (error) {
    console.error(error);
    return null;
  }
};
