import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { loginUser } from "@/utils/auth";

export async function POST(request: Request) {
  await dbConnect();

  const { email, password } = await request.json();

  try {
    const { token, user } = await loginUser(email, password);
    const response = NextResponse.json({ token, user });

    return response;
  } catch (error) {
    const message = (error as Error).message || "An error occurred";
    return NextResponse.json({ message }, { status: 401 });
  }
}
