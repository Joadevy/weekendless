// import { NextResponse } from "next/server";

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "https://weekendless.vercel.app/",
//   "https://weekendless.vercel.app",
// ];

// export const corsHeaders = {
//   "Access-Control-Allow-Origin": "",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export function middleware(request: Request) {
//   // const origin = request.headers.get("origin") ?? "";
//   const response = NextResponse.next();

//   // if (allowedOrigins.includes(origin) || origin.includes("weekendless")) {
//   //   response.headers.set("Access-Control-Allow-Origin", origin);
//   // }

//   if (request.method === "OPTIONS") {
//     response.headers.set("Access-Control-Allow-Origin", "*");
//     response.headers.set(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, DELETE, OPTIONS",
//     );
//     response.headers.set(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization",
//     );
//   }

//   return response;
// }
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-hello-from-middleware1", "hello");
  requestHeaders.set("Access-Control-Allow-Origin", "*");
  requestHeaders.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  requestHeaders.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set("x-hello-from-middleware2", "hello");

  return response;
}
