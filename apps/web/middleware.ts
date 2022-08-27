// middleware.ts
import { NextResponse } from 'next/server'
import type { NextMiddleware } from 'next/server'

export const middleware: NextMiddleware = async (request, event) => {
  const response = NextResponse.next();
  response.headers.append("User-Agent", globalThis.navigator?.userAgent ?? "unknown");
  return response;
}
