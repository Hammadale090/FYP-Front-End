import React, { useContext } from "react";
import FeedNavButton from "./FeedNavButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeedContext } from "@/context/FeedContext";
// import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  options: string[];
};

const FeedNavbar = ({ options }: Props) => {
  const { tab, showFilters, handleSortingChange } =
    useContext<any>(FeedContext);
  const router = useRouter()

  return (
    <div className="flex flex-col md:flex-row pl-[22px] md:pl-0 space-y-4 md:space-y-0 max-w-[1100px] justify-between md:items-center">
      {/* the button to toggle between properties, top realtors and top brokers */}
      <div className="flex space-x-4 items-center overflow-x-auto ">
        {options?.map((i, index) => (
          <FeedNavButton
            text={i}
            tab_identifier={index}
            active={tab === index ? true : false}
            key={i}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row ml-4 space-y-4 md:space-y-0 md:space-x-4 items-start md:items-center md:mr-4 ">
        {/* sort functionality */}
        <div className="flex space-x-2 items-center">
          {/* sort by text */}
          <h1 className="text-[10px] font-medium leading-[14px] text-[#383838]">
            Sort by:
          </h1>

          {/* The sorting dropdown */}
          <Select onValueChange={handleSortingChange}>
            <SelectTrigger className="w-[180px] bg-[#F3F3F3]">
              <SelectValue placeholder="Default Sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Sorting</SelectItem>
              <SelectItem value="name_asc">{"Name (A to Z)"}</SelectItem>
              <SelectItem value="name_desc">{"Name (Z to A)"}</SelectItem>
              <SelectItem value="date_asc">{"Date (Old to New)"}</SelectItem>
              <SelectItem value="date_desc">{"Date (New to Old)"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* reset Preferences button */}
        {!showFilters && (

          <div onClick={() => {
            router.push("/dashboard/preferences")
          }} className="w-[169px] h-[32px] flex flex-col justify-center items-center cursor-pointer border border-[#34495D] rounded-[6px]">
            <h1 className="text-base text-nowrap px-2 font-normal text-[#34495D]">
              Reset Preferences
            </h1>
          </div>

        )}
      </div>
    </div>
  );
};

export default FeedNavbar;
