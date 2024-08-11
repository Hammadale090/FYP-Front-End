import DashboardLayout from "@/features/DashboardLayout";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const layout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // console.log("the user is here", user)

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-[1500px]  mx-auto">
      <DashboardLayout>

        {children}</DashboardLayout>;
    </div>
  )
};

export default layout;