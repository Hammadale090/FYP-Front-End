import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

const publicPages = [
  '/',
  '/log-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/marketing',
  // (/secret requires auth)
];

const authMiddleware = withAuth(
  // This callback is only invoked for non-public pages
  (req) => {
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/log-in',
    },
  }
);

export default function middleware(req: NextRequest) {
  const isPublicPage = publicPages.some(
    (page) => page === req.nextUrl.pathname
  );

  if (isPublicPage) {

    return NextResponse.next();
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
