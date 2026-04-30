import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths to protect
  const protectedPaths = ['/admin', '/api/invitations', '/api/upload'];
  
  // Check if current path starts with any of the protected paths
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Token invalid
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - invite (public invitations)
     * - login (login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/rsvp (public RSVP submissions)
     */
    '/((?!invite|login|api/rsvp|_next/static|_next/image|favicon.ico|wedding_nasheed.mp3).*)',
  ],
};
