import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // Check if the route should be protected
  const protectedPaths = ['/dashboard', '/campaign', '/api/fundraisers']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      verify(token, process.env.JWT_SECRET!)
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/campaign/:path*', '/api/fundraisers/:path*'],
}

