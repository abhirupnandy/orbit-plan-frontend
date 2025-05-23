import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/services/user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/dashboard") && !user.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
