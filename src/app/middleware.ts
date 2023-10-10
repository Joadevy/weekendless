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
  const origin = request.headers.get("origin") ?? "";

  if (allowedOrigins.includes(origin)) {
    corsHeaders["Access-Control-Allow-Origin"] = origin;
  }

  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsHeaders });
  }
}

export const config = {
  matcher: "/api/:path*",
};
