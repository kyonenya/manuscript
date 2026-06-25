import { NextRequest, NextResponse } from 'next/server';

/**
 * Exclude routes that should not require Basic Auth.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy#negative-matching
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

/**
 * Basic Authentication Proxy
 *
 * @see https://github.com/vercel/examples/blob/main/edge-middleware/basic-auth-password/middleware.ts
 * @see https://qiita.com/yuuki-h/items/340a296e0b9b3b5753e1#%E8%A7%A3%E8%AA%AC-1
 */
export async function proxy(req: NextRequest) {
  if (process.env.VERCEL_ENV !== 'production') return NextResponse.next();
  if (req.nextUrl.pathname.startsWith('/demo')) {
    return NextResponse.next();
  }

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
