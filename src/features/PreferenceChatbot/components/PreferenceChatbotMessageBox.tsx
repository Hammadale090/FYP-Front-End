import Image from "next/image";
import React from "react";

type Props = {
  sender?: boolean;
  text: string;
  date: string;
};

const PreferenceChatbotMessageBox = ({ sender, text, date }: Props) => {
  return (
    <div className={`${sender ? "flex flex-row-reverse" : "flex"} space-x-5`}>
      <Image
        src={"/AccountCircle.svg"}
        alt="Account Circle"
        height={500}
        width={500}
        className="w-[24px] h-[24px] "
      />

      {/* the message box */}
      <div
        className={`px-4 py-3 rounded-t-[12px] rounded-br-[12px] ${
          sender ? "bg-[#3EB87F]" : " border border-[#D9D9D9]"
        } flex flex-col space-y-2`}
      >
        <h1 className={`text-[14px] leading-[18px] ${sender && "text-white"}`}>
          {text}
        </h1>
        <h1
          className={`font-normal leading-[16px] text-[13px]  ${
            sender ? "text-white" : "text-[#706A6A]"
          }`}
        >
          {date}
        </h1>
      </div>
    </div>
  );
};

export default PreferenceChatbotMessageBox;
