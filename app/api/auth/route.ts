import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  const headers = new Headers();
  headers.set('WWW-authenticate', 'Basic realm="Secure Area"');

  return new NextResponse('Auth Required.', {
    status: 401,
    headers,
  });
}
