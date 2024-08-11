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
import { IoCheckmarkCircleOutline, IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
type Props = {};

const LogInForm = (props: Props) => {
  const router = useRouter();
  const [userState, setUserState] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Disable the ability to move back to the previous screen
    window.history.pushState(null, "", window.location.href);

    // Listen for the browser's back button click
    window.onpopstate = function () {
      // Navigate to the sign-in page
      router.push("/"); // Replace with the actual route of your sign-in page
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: form.email,
            password: form.password,
          }),
        }
      );

      if (responseData?.error?.message) {
        setError("Invalid Credentials");
        toast({
          variant: "destructive",
          description: "Enter valid credentials",
        });
        setLoader(false);
      } else {
        toast({
          duration: 2000,
          description: "Logging you in, please hold on.",
          action: (
            <IoCheckmarkCircleOutline className='text-green-500' />
            // <BiLoaderAlt className="text-center text-[#3EB87F]  animate-spin" />
          ),
        });


        const res = await signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password,
          callbackUrl: "/dashboard/feed",
        });

        if (!res?.error) {
          router.push("/dashboard/feed");
        } else {
          toast({
            variant: "destructive",
            description: "Bad network",
          });
          setLoader(false);
        }
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
    <div className="flex flex-col justify-center items-center h-full md:px-32 md:py-28">
      <div className="relative">
        <form onSubmit={handleSubmit} className="absolute top-10 left-12">
          <div className="space-y-4">
            <h1 className="font-bold  text-[37px] leading-[50.54px] text-[#34495D]">
              Welcome
            </h1>
            <h1 className="font-normal text-[16px] text-[#808191] leading-[24px]">
              Welcome back! Please enter your details.  
            </h1>
          </div>
          <div className="flex flex-col space-y-2 mt-10">
            <h1 className="text-[14px] text-[#34495D] leading-[22px] font-medium">
              Email
            </h1>
            <Input
              type="email"
              onChange={handleChange}
              name="email"
              className="w-[361px] h-[46px]"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-5">
            <h1 className="text-[14px] text-[#34495D] leading-[22px] font-medium">
              Password
            </h1>
            <Input
              onChange={handleChange}
              name="password"
              className="w-[361px] h-[46px]"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center my-7">
            <div>
              <Checkbox label="Remember for 30 days" />
            </div>
            <h1
              className="text-[14px] text-[#3EB87F] font-medium cursor-pointer"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password
            </h1>
          </div>

          {/* <h1 className="text-center text-red-400">{error}</h1> */}

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={loader}
              className="h-[46px] w-[362px] bg-[#3EB87F] rounded-[10px] flex flex-col justify-center items-center text-white cursor-pointer"
            >
              {loader ? (
                <BiLoaderAlt className="text-center animate-spin h-7 w-7" />
              ) : (
                "Sign In"
              )}
            </button>

            <div
              className="h-[46px] w-[362px] bg-white rounded-[10px] flex flex-col justify-center items-center cursor-pointer"
              onClick={async () => {
                const ress = await signIn("google", {
                  redirect: false,
                  callbackUrl: "/dashboard/feed",
                });
              }}
            >
              <div className="flex space-x-2 items-center">
                <Image
                  alt="google icon"
                  src="/google.png"
                  className="h-7 w-7"
                  height={500}
                  width={500}
                />
                <h1 className=" text-[16px] font-semibold leading-[24px] text-[#34495D]">
                  Sign In with Google
                </h1>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 items-center font-normal justify-center text-[12px] leading-[19.12px] mt-10 md:mt-4">
            <h1 className="text-[#808191]">Don&apos;t have an account? </h1>
            <h1
              onClick={() => {
                router.push("/sign-up");
              }}
              className="text-[#3EB87F] cursor-pointer"
            >
              Sign up
            </h1>
          </div>
        </form>
        <Image
          alt="the auth background"
          className="w-[1300px] object-contain aboslute"
          height={1000}
          width={1000}
          src={"/AuthBackground.png"}
        />
      </div>
    </div>
  );
};

export default LogInForm;
