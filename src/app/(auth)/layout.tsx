import DashboardLayout from '@/features/DashboardLayout';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';



interface Props {
    children: ReactNode;
}
const layout = async ({ children }: Props) => {

    const session: any = await getServerSession(authOptions);
    if (session?.user?.id) {
        redirect('/dashboard');
    }

    return <div className="w-full max-w-[1500px]  mx-auto">{children}</div>;
};


export default layout;

