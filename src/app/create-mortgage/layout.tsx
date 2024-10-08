import DashboardLayout from '@/features/DashboardLayout';
import React, { ReactNode } from 'react';



interface Props {
    children: ReactNode;
}
const layout = async ({ children }: Props) => {
    return (
        <div className="w-full max-w-[1500px]  mx-auto">
            <DashboardLayout>

                {children}</DashboardLayout>;
        </div>
    )
};

export default layout;