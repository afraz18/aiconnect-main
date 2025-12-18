"use server";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

<<<<<<< HEAD
const isProtectedRoute = createRouteMatcher([])

export default clerkMiddleware(async (auth, req) => {
   if (isProtectedRoute(req)) {
=======
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
        const url = new URL('/auth/sign-in', req.url);
        await auth.protect({
            unauthenticatedUrl: url.toString(),
            unauthorizedUrl: url.toString(),
        });
    }
})
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}