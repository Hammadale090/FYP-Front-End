"use client";
import { AuthContext } from "@/context/AuthContext";
import { MessageContext } from "@/context/MessageContext";
import React, { useContext, useEffect } from "react";

type Props = {};

const MessageHeader = (props: Props) => {
  const { chatFilterBy, setChatFilterBy } = useContext<any>(MessageContext);

  return (
    <div className="mx-2 mt-6 flex flex-col md:flex-row justify-between md:items-center">
      <h1 className="text-[25px] font-bold text-[#11142D]">Chats</h1>

      <div className="flex space-x-3 items-center">
        <div
          className={`text-[16px] cursor-pointer w-[100px] gap-[4px]  h-[38px] flex flex-col justify-center items-center rounded-[6px] border  font-normal  ${
            chatFilterBy == "user"
              ? "border-[#3EB87F] bg-[#3EB87F] text-white"
              : "border-[#191B1E]  text-[#191B1E] "
          }`}
          onClick={() => setChatFilterBy("user")}
        >
          Users
        </div>
        <div
          className={`text-[16px] cursor-pointer w-[100px] gap-[4px]  h-[38px] flex flex-col justify-center items-center rounded-[6px] border  font-normal  ${
            chatFilterBy == "realtor"
              ? "border-[#3EB87F] bg-[#3EB87F] text-white"
              : "border-[#191B1E]  text-[#191B1E] "
          }`}
          onClick={() => setChatFilterBy("realtor")}
        >
          Realtors
        </div>
        <div
          className={`text-[16px] cursor-pointer w-[100px] gap-[4px]  h-[38px] flex flex-col justify-center items-center rounded-[6px] border  font-normal  ${
            chatFilterBy == "broker"
              ? "border-[#3EB87F] bg-[#3EB87F] text-white"
              : "border-[#191B1E]  text-[#191B1E] "
          }`}
          onClick={() => setChatFilterBy("broker")}
        >
          Brokers
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
