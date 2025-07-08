import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get("token")?.value


    const isPublicPath = path === "/" || path === "/login" || path === "/register"

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}


export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)'],
}