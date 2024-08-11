import ForgetPasswordForm from "@/features/Auth/ForgetPassword/ForgetPasswordForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

const ForgetPassword = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user) {
    return null;
  }

  return (
    <div className="h-[100vh] ">
      {/* ForgetPassword form */}

      <ForgetPasswordForm />
    </div>
  );
};

export default ForgetPassword;
