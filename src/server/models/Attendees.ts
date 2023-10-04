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

export const createIfNotExists = async (attendee: Attendee) => {
  try {
    const attendeeCreated: Attendee = await db.attendee.upsert({
      where: { nationalID: attendee.nationalId },
      create: {
        name: attendee.name,
        nationalID: attendee.nationalId,
        phone: attendee.phone,
        email: attendee.email,
      },
      update: {
        name: attendee.name,
        nationalID: attendee.nationalID,
        phone: attendee.phone,
        email: attendee.email,
      },
    });

    if (attendeeCreated) return true;
    else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
