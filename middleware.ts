import { NextRequest, NextResponse } from 'next/server';
import { readEntriesCount } from './infra/entryRepository';

/**
 * Exclude `_next` internals
 *
 * @see https://github.com/vercel/next.js/discussions/41047#discussioncomment-3769637
 */
export const config = {
  matcher: ['/((?!api|static|favicon.ico|_next).*)'],
};

/**
 * Basic Authentication Middleware
 *
 * @see https://github.com/vercel/examples/blob/main/edge-middleware/basic-auth-password/middleware.ts
 * @see https://qiita.com/yuuki-h/items/340a296e0b9b3b5753e1#%E8%A7%A3%E8%AA%AC-1
 */
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/demo')) {
    return NextResponse.next();
  }

  const _count = await readEntriesCount(); // cold starts db

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

    if (
      user === process.env.BASIC_AUTH_NAME &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }
  const url = req.nextUrl;
  url.pathname = '/api/auth';

  return NextResponse.rewrite(url);
}
