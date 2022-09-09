// middleware.ts
import { NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";

declare global {
  var isWarm: boolean;
}

globalThis.isWarm = false;

export const middleware: NextMiddleware = async (request, event) => {
  const isCold = !globalThis.isWarm;
  globalThis.isWarm = true;

  const { geo, ip } = request;

  const url = new URL(request.url);

  if (url.pathname === "/redirect") {
    return NextResponse.redirect(new URL("/", url), {
      headers: {
        "x-edge-redirected": "1",
      },
    });
  }
  const country = geo?.country || "US";
  const city = geo?.city || "San Francisco";
  const region = geo?.region || "CA";
  const ipAddress = ip ?? "127.0.0.1";

  url.searchParams.set("country", country);
  url.searchParams.set("city", city);
  url.searchParams.set("region", region);
  url.searchParams.set("ip", ipAddress);
  url.searchParams.set("isCold", isCold ? "1" : "0");

  return NextResponse.rewrite(url.toString());
};

export const config = {
  matcher: ["/", "/redirect"],
};

export default middleware;
