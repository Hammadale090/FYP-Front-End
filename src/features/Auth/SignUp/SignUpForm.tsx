"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Checkbox } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/fetchers";
import { signIn } from "next-auth/react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultPreferences } from "@/features/Preferences/defaultPreferences";

type Props = {};
const SignUpForm = (props: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const searchParams = useSearchParams();

  const referral_code = searchParams.get("referral_code");
  const referrer_id = searchParams.get("referrer_id");

  const [referralCode, setReferralCode] = useState("");
  const [referrerId, setReferrerId] = useState("");

  useEffect(() => {
    if (referral_code) {
      setReferralCode(referral_code);
    }
    if (referrer_id) {
      setReferrerId(referrer_id);
    }
  }, [referral_code, referrer_id]);

  const handleChange = (e: any) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit and create the user
  const handleSubmit = async () => {
    setError("");
    setLoader(true);

    // create the user in strapi
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            username: form.email.split("@")[0],
          }),
          method: "POST",
        }
      );

      // if email exists show this
      if (responseData.error) {
        const message = responseData?.error?.message
          ? responseData?.error?.message.replace(
              "Email or Username are already taken",
              "Email is already registered"
            )
          : "Something went wrong please retry.";
        setError(message);
        setLoader(false);
        toast({
          variant: "destructive",
          description:
            "Your email has already been registered, please use another.",
        });
        return;
      } else {
        const profile = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/client-profiles`,
          {
            data: {
              user: responseData.user.id,
              role: form.role,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${responseData.jwt}`,
            },
          }
        );
        const user_preferences = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/preferences`,
          {
            data: {
              client_profile: profile.data.data.id,
              ...defaultPreferences,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${responseData.jwt}`,
            },
          }
        );

        if (form.role != "user") {
          const profProf = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/professional-profiles`,
            {
              data: {
                client_profile: profile.data.data.id,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${responseData.jwt}`,
              },
            }
          );
        }

        if (referralCode && referrerId) {
          const refId = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/referrals?filters[$and][0][referrer_id][$eq]=${referrerId}&filters[$and][1][referral_code][$eq]=${referralCode}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${responseData.jwt}`,
              },
            }
          );

          if (refId?.data?.data) {
            const apiData = refId?.data?.data?.[0];

            if (apiData.attributes?.status === "Accepted") {
              toast({
                description: "This referral has already been accepted!",
                action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
              });
              return;
            }

            const updateRefferals = await axios.put(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/referrals/${apiData?.id}`,
              {
                data: {
                  status: "Accepted",
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${responseData.jwt}`,
                },
              }
            );
          }
        }

        // message of a successful account creation
        toast({
          description: "Account Created Successfully, Logging you in",
          action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
        });
        // sign into the app after creating the user
        const ress = await signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password,
          callbackUrl: "/dashboard/preference-chatbot",
        });

        if (!ress?.error) {
          router.push("/dashboard/preference-chatbot");
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
    <div className="flex flex-col justify-center items-center h-full md:px-32 md:py-28 ">
      <div className="relative">
        {/* sign up form */}
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="absolute top-10 left-12"
        >
          <div className="space-y-2">
            <h1 className="font-bold  text-[37px] leading-[50.54px] text-[#34495D]">
              Welcome
            </h1>
            <h1 className="font-normal text-[16px] text-[#808191] leading-[24px]">
              Welcome! Please enter your details.
            </h1>
          </div>

          <div className="flex flex-col mt-3">
            <h1 className="text-[14px] text-[#34495D] leading0-[22px] font-medium">
              Sign up as*
            </h1>
            {/* The sorting dropdown */}
            <Select
              onValueChange={(e) => {
                setForm({
                  ...form,
                  role: e,
                });
              }}
            >
              <SelectTrigger className="w-[361px] h-[46px] bg-white rounded-[8px] ">
                <SelectValue placeholder="user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="broker">Broker</SelectItem>
                <SelectItem value="realtor">Realtor</SelectItem>
                <SelectItem value="real estate laywer">
                  Real Estate Lawyer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col  mt-3">
            <h1 className="text-[14px] text-[#34495D] leading0-[22px] font-medium">
              Email
            </h1>
            <Input
              name="email"
              type="email"
              onChange={handleChange}
              required
              className="w-[361px] h-[46px]"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col  mt-3">
            <h1 className="text-[14px] text-[#34495D] leading-[22px] font-medium">
              Password
            </h1>
            <Input
              name="password"
              onChange={handleChange}
              minLength={6}
              required
              className="w-[361px] h-[46px]"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center my-5">
            <div>
              <Checkbox label="Remember for 30 days" />
            </div>
            <h1 className="text-[14px] text-[#3EB87F] font-medium">
              Forgot Password
            </h1>
          </div>

          {/* error message */}
          {/* <h1 className="text-center text-red-400">{error}</h1> */}

          <div className="flex flex-col space-y-3">
            <button
              disabled={loader}
              type="submit"
              className="h-[46px] w-[362px] bg-[#3EB87F] rounded-[10px] flex flex-col justify-center items-center cursor-pointer text-white"
            >
              {loader ? (
                <BiLoaderAlt className="text-center animate-spin h-7 w-7" />
              ) : (
                "Sign Up"
              )}
            </button>

            <div
              className="h-[46px] w-[362px] bg-white rounded-[10px] flex flex-col justify-center items-center cursor-pointer"
              onClick={async () => {
                const ress = await signIn("google", {
                  redirect: false,
                  callbackUrl: "/dashboard/preference-chatbot",
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
                <h1 className=" text-[16px] font-semibold leading-[24px] text-[#34495D] cursor-pointer">
                  Sign up with Google
                </h1>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 items-center font-normal justify-center text-[12px] leading-[19.12px] mt-4">
            <h1 className="text-[#808191]">Already have an account? </h1>
            <h1
              onClick={() => {
                router.push("/log-in");
              }}
              className="text-[#3EB87F] cursor-pointer"
            >
              Login
            </h1>
          </div>
        </form>

        <Image
          alt="the auth background"
          className="w-[1300px] h-full object-cover"
          height={1000}
          width={1000}
          src={"/AuthBackground.png"}
        />
      </div>
    </div>
  );
};

export default SignUpForm;
