"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Checkbox } from "@mantine/core";
import { useToast } from "@/components/ui/use-toast";
import { fetcher } from "@/lib/fetchers";
import { signIn } from "next-auth/react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {};

const ResetPasswordForm = (props: Props) => {
  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [form, setForm] = useState({
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    // Disable the ability to move back to the previous screen
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get("code")) {
      router.replace("/");
    }
    window.history.pushState(null, "", window.location.href);

    // Listen for the browser's back button click
    window.onpopstate = function () {
      // Navigate to the sign-in page
      router.push("/reset-password"); // Replace with the actual route of your sign-in page
    };

    // Clean up the event listelet callbackUrl: string;ner when the component unmounts
    return () => {
      window.onpopstate = null;
    };
  }, [router]);

  const handleChange = (e: any) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // login form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const urlParams = new URLSearchParams(window.location.search);

    try {
      // /logIn

      if (form.password != form.confirmpassword) {
        setError("Password must match");
        setLoader(false);
        return;
      }

      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: form.password,
            passwordConfirmation: form.confirmpassword,
            code: urlParams.get("code"),
          }),
        }
      );

      if (responseData?.error?.message) {
        setError(responseData?.error?.message);
        toast({
          variant: "destructive",
          description: "Enter valid credentials",
        });
        setLoader(false);
      } else {
        router.replace("/log-in");
        toast({
          variant: "default",
          description: "Password reset successful",
        });
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      setError("Something went wrong");
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <div className="border-2 border-slate-200 rounded-[8px] p-6">
        <form onSubmit={handleSubmit} className="">
          <div className="space-y-4 flex justify-center w-full mb-6">
            <h1 className="font-bold  text-[18px]  text-[#34495D]">
              Reset Password
            </h1>
          </div>
          <div className="flex flex-col space-y-2 ">
            <h1 className="text-[14px] text-[#34495D] leading-[22px] font-medium">
              Password
            </h1>
            <Input
              type="password"
              onChange={handleChange}
              name="password"
              minLength={8}
              required={true}
              className="w-[361px] h-[46px]"
              placeholder="Enter your new password"
            />
          </div>

          <div className="flex flex-col space-y-2 ">
            <h1 className="text-[14px] text-[#34495D] leading-[22px] font-medium">
              Confirm Password
            </h1>
            <Input
              type="password"
              onChange={handleChange}
              name="confirmpassword"
              minLength={8}
              required={true}
              className="w-[361px] h-[46px]"
              placeholder="Confirm your new password"
            />
          </div>

          {/* <h1 className="text-center text-red-400">{error}</h1> */}

          <div className="flex flex-col space-y-3 mt-6">
            <button
              type="submit"
              disabled={loader}
              className="h-[46px] w-[362px] bg-[#3EB87F] rounded-[10px] flex flex-col justify-center items-center text-white cursor-pointer"
            >
              {loader ? (
                <BiLoaderAlt className="text-center animate-spin h-7 w-7" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        {/* <Image
          alt="the auth background"
          className="w-[1300px] object-contain aboslute"
          height={1000}
          width={1000}
          src={"/AuthBackground.png"}
        /> */}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
