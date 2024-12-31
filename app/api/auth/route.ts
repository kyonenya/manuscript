import { NextRequest, NextResponse } from 'next/server';

/**
 * Basic Authentication Route Handler
 *
 * @see https://github.com/vercel/examples/blob/main/edge-middleware/basic-auth-password/pages/api/auth.ts
 */
export async function GET(_req: NextRequest) {
  const headers = new Headers();
  headers.set('WWW-authenticate', 'Basic realm="Secure Area"');

  return new NextResponse('Auth Required.', {
    status: 401,
    headers,
  });
}
