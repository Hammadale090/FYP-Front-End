import ResetPasswordForm from "@/features/Auth/ResetPassword/ResetPasswordForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

const ResetPassword = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user) {
    return null;
  }

  return (
    <div className="h-[100vh] ">
      {/* ResetPassword form */}

      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
