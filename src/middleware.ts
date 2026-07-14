import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_API_ROUTES = [
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/logout',
];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_API_ROUTES.some((route) => pathname === route);
}

function addCorsHeaders(response: NextResponse, origin: string | null): NextResponse {
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');

  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    return addCorsHeaders(response, origin);
  }

  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) {
    const response = NextResponse.next();
    return addCorsHeaders(response, origin);
  }

  const token =
    request.cookies.get('xdesign_token')?.value ??
    (request.headers.get('authorization')?.startsWith('Bearer ')
      ? request.headers.get('authorization')!.slice(7)
      : null);

  if (!token && pathname.startsWith('/api/')) {
    const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return addCorsHeaders(response, origin);
  }

  const response = NextResponse.next();
  return addCorsHeaders(response, origin);
}

export const config = {
  matcher: ['/api/:path*'],
};
