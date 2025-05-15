// src/app/api/logout/route.ts
import { NextResponse } from "next/server";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function POST() {
  const response = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"),
  );
  response.headers.set(
    "Set-Cookie",
    `jwt=; Max-Age=0; Path=${config.path}; Domain=${config.domain}; HttpOnly; Secure=${config.secure}`,
  );
  return response;
}
