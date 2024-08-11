import DashboardLayout from '@/features/DashboardLayout';
import React, { ReactNode } from 'react';



interface Props {
    children: ReactNode;
}
const layout = async ({ children }: Props) => {
    return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
