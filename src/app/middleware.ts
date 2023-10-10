import { NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://weekendless.vercel.app/",
  "https://weekendless.vercel.app",
];

export const corsHeaders = {
  "Access-Control-Allow-Origin": "",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: Request) {
  // const origin = request.headers.get("origin") ?? "";
  const response = NextResponse.next();

  // if (allowedOrigins.includes(origin) || origin.includes("weekendless")) {
  //   response.headers.set("Access-Control-Allow-Origin", origin);
  // }

  if (request.method === "OPTIONS") {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
