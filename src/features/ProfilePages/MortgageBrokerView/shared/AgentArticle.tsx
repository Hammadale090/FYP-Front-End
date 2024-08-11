"use client";
import { AuthContext } from "@/context/AuthContext";
import IconShowcaseBox from "@/features/Dashboard/shared/IconShowcaseBox";
import Image from "next/image";
import React, { useContext } from "react";
import { format } from "date-fns";

type Props = {
  Add?: boolean;
  AddOnclick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  title?: string;
  banner?: string | null;
  description?: string;
  dateCreated?: string;
};

const AgentArticle = ({
  Add,
  AddOnclick,
  title,
  description,
  dateCreated,
  banner,
}: Props) => {
  const { profile } = useContext(AuthContext);
  return (
    <div className="my-5 relative">
      <div className="flex flex-col w-full cursor-pointer md:w-[370px] space-y-2  md:space-y-0 rounded-[12px] bg-white border border-black md:mx-5 my-5 px-4 md:px-3 py-3">
        <Image
          src={banner ?? "/House.png"}
          alt="House png"
          className="w-full h-[222px] object-cover rounded-[12px]"
          height={1000}
          width={1000}
        />
        <div className="flex flex-col space-y-5 w-full ">
          <h1 className="text-[16px] font-normal leading-[26px] text-[#666270] my-2">
            {profile?.attributes?.first_name} {profile?.attributes?.last_name} |
            {dateCreated
              ? format(new Date(dateCreated), "dd LLL y")
              : "21 Sep 2022"}
          </h1>
          <h1 className="text-[26px] text-black font-semibold leading-[36px]">
            {title ? title : "This is the Article Title"}
          </h1>
          <h1 className="text-[#666270] font-normal leading-[26px] text-[16px]">
            {description
              ? description
              : "This is the description of the article"}
          </h1>
        </div>
      </div>

      {Add && (
        <div className="absolute top-0 w-full md:w-[370px] md:mx-5 my-5  rounded-xl left-0 h-full bg-gray-400 bg-opacity-5 backdrop-blur-lg">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <IconShowcaseBox
              onClick={AddOnclick}
              text={"Add New Article"}
              color="#3EB87F"
              width="w-fit"
              textCN="text-[16px] font-semibold leading-[26px] text-white mx-[19px]"
              px="19px"
              py="9px"
              rounded={"4px"}
              noBorder
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentArticle;
