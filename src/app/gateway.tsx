'use client';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
type Props = {
    children?: React.ReactNode;
};

export const GatewayProvider = ({ children }: Props) => {
    const { status } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (
            pathname === '/forgot-password' ||
            pathname === '/code-verification' ||
            pathname === '/reset-password' || pathname === "/accept-invite"
        ) {
            null;
        } else if (status === "authenticated" && pathname === "/") {
            router.push("/dashboard")
        } else if (status === 'unauthenticated') {
            router.push(`${pathname === "/" ? "/" : pathname === "/marketing" ? "/marketing" : pathname === '/sign-up' ? '/sign-up' : '/log-in'}`);
        }
        // } else if (
        //   (status === 'authenticated' && pathname === '/register') ||
        //   (status === 'authenticated' && pathname === '/sign-in')
        // ) {
        //   router.push('/dashboard');
        // }
    }, [pathname, router, status]);

    return <>{children}</>;
};