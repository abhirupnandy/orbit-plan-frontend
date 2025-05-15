import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const config = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url);
  const token = searchParams.get("access_token");
  const provider = pathname.split("/")[2]; // Extract provider from URL

  if (!token || !provider) {
    console.error("Missing token or provider");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";
  const path = `/api/auth/${provider}/callback`;

  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  try {
    const res = await fetch(url.href);
    if (!res.ok) {
      console.error(`Fetch failed: ${res.status} ${res.statusText}`);
      return NextResponse.redirect(new URL("/", request.url));
    }
    const data = await res.json();

    if (!data.jwt) {
      console.error("No JWT in response", data);
      return NextResponse.redirect(new URL("/", request.url));
    }

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.headers.set(
      "Set-Cookie",
      `jwt=${data.jwt}; Max-Age=${config.maxAge}; Path=${config.path}; Domain=${config.domain}; HttpOnly; Secure=${config.secure}`,
    );

    return response;
  } catch (error) {
    console.error("Error in route:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
