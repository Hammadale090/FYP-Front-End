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

const ForgetPasswordForm = (props: Props) => {
  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: "",
  });

  useEffect(() => {
    // Disable the ability to move back to the previous screen
    window.history.pushState(null, "", window.location.href);

    // Listen for the browser's back button click
    window.onpopstate = function () {
      // Navigate to the sign-in page
      router.push("/forgot-password"); // Replace with the actual route of your sign-in page
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
    try {
      // /logIn

      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
          }),
        }
      );
      console.log("-------responseData---------- ", responseData);
      if (responseData?.error?.message) {
        setError("Invalid Credentials");
        toast({
          variant: "destructive",
          description: "Enter valid credentials",
        });
        setLoader(false);
      } else {
        toast({
          description: `Password reset Link has been sent to ${form.email}`,
          action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
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
        <h1 className="font-normal text-[16px] text-[#808191] leading-[24px] mb-6">
          Please enter your email to get the reset link.
        </h1>
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col space-y-2 ">
            <h1 className="text-[14px] text-[#34495D] leading-[22px] font-medium">
              Email
            </h1>
            <Input
              type="email"
              onChange={handleChange}
              name="email"
              required={true}
              className="w-[361px] h-[46px]"
              placeholder="Enter your email"
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

export default ForgetPasswordForm;
