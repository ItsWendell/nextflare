import { NextRequest, userAgentFromString } from "next/server";

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      geo: req.geo,
      ip: req.ip,
      headers: Object.fromEntries(req.headers?.entries()),
      userAgent: userAgentFromString(req.headers?.get('user-agent') ?? ""),
      cf: (req as any).cf ?? null,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
