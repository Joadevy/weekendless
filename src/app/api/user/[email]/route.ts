import { NextResponse } from "next/server";
import { getUserByEmail } from "~/server/models/Users";

export async function GET(
  request: Request,
  { params }: { params: { email: string } },
) {
  const userEmail = params.email;
  const user = await getUserByEmail(userEmail);
  return NextResponse.json(user);
}
