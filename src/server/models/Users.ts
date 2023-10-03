import { type User } from "@prisma/client";
import { db } from "../db";

export const getUserByEmail = async (email: string) => {
  try {
    const user: User | null = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
