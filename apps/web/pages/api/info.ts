import { NextRequest, userAgent } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      geo: req.geo,
      ip: req.ip,
      userAgent: userAgent(req),
      cf: (req as any).cf ?? null,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
