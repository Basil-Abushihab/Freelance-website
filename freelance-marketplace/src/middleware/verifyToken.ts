import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function middleware(request: Request) {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token || !jwt.verify(token, JWT_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/projects/:path*"],
};
