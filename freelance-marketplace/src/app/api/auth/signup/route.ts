import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { registerUser, generateToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { name, email, password, role } = await req.json();

  try {
    const user = await registerUser(name, email, password, role);
    const token = generateToken(user._id.toString());
    return NextResponse.json({ token, user }, { status: 201 });
  } catch (error) {
    const message = (error as Error).message || "An error occurred";
    return NextResponse.json({ message }, { status: 400 });
  }
}
