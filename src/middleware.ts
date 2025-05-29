import { validateSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/login"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const session = (await cookies()).get("session")?.value ?? "";
    const isValidSession = validateSession(session);
    console.log(isPublicRoute, isValidSession);
    if (isPublicRoute && isValidSession) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    if (!isPublicRoute && !isValidSession) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
