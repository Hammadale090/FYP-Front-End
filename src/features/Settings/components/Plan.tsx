"use client";
import React, { useContext, useState } from "react";
import PlanCheck from "./PlanCheck";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/AuthContext";

type Props = {
  id?: number;
  header: string;
  price: string;
  white?: boolean;
  benifits?: any[] | undefined | null;
};

const Plan = ({ id, header, price, white, benifits }: Props) => {
  const { profileId, profile, profileEmail } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(false);

  const { toast } = useToast();

  const handleSubscribe = async () => {
    setIsPending(true);

    try {
      const { data } = await axios.post("/api/stripe-subscription", {
        profileId: profileId,
        amount: (parseInt(price) * 100).toFixed(2),
        productName: header,
        customerEmail: profileEmail,
        planId: id,
        success_url: `${window.location.origin}/dashboard/feed`,
        cancel_url: `${window.location.href}`,
      });
      setIsPending(false);
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.log(error);
      setIsPending(false);
      if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          description:
            error.response?.data?.error?.message ||
            "Something went wrong. Please try again",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again",
        });
      }
    }
  };
  console.log("profile is ", profile);

  return (
    <div
      className={`h-[525px] py-7 w-[90vw] md:w-[320px] border relative group  ${
        white
          ? "bg-white border-[#34495D] hover:bg-[#3EB87F] hover:border-white"
          : "bg-[#3EB87F] border-white"
      }   rounded-[10px]`}
    >
      {/* Tril button */}
      <div className=" flex  justify-center">
        <div
          className={`flex flex-col justify-center ${
            white && "border-1 border-[#34495D]"
          } items-center py-[10px] w-[151px]  bg-white rounded-[10px] gap-[10px]`}
        >
          <h1
            className={`${
              white ? "text-[#034F75]" : "text-[#3EB87F]"
            } text-[24px] font-medium `}
          >
            {header}
          </h1>
        </div>
      </div>

      <div className="flex flex-col">
        <h1
          className={`text-[60px] font-semibold text-center ${
            white ? "text-[#3EB87F] group-hover:text-white" : "text-white"
          } h-[70px]`}
        >
          {parseInt(price) == 0 ? `Free` : `£${price}`}
        </h1>
        <h1
          className={`text-[15px] font-semibold text-center mt-2 ${
            white ? "text-[#34495D] group-hover:text-white" : "text-white"
          } `}
        >
          user/month
        </h1>
      </div>

      {/* the plan details */}
      <div className="mt-10">
        {benifits?.map((benifit, index) => (
          <PlanCheck key={index} white={!white} text={benifit} />
        ))}
      </div>

      {/* choose the plan */}
      <div
        className="flex justify-center mt-10 cursor-pointer absolute bottom-12 left-1/2 transform -translate-x-1/2"
        onClick={handleSubscribe}
      >
        <div
          className={` ${
            white ? "bg-[#C3FFE3] group-hover:bg-[#34495D]" : "bg-[#34495D] "
          } rounded-[10px] h-[55px] w-[231px] flex flex-col justify-center items-center `}
        >
          <h1
            className={`text-[20px] font-medium ${
              white ? "text-[#34495D] group-hover:text-[#FFF]" : "text-white"
            } `}
          >
            Choose Plan
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Plan;
