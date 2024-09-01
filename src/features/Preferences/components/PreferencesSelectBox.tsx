import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
  header: string;
  data: string[];
  onValueChange?: any;
  seledtedValue?:string
};

const PreferencesSelectBox = ({ header, data, onValueChange, seledtedValue }: Props) => {
  return (
    <div className="flex mx-2 my-2 flex-col w-full md:max-w-[263.25px] gap-[8px] ">
      {/* the text */}
      <h1 className="text-[14px] font-medium  text-[#202C45]">{header}</h1>
      {/* the selection box */}
      <Select onValueChange={onValueChange}>
        <SelectTrigger className=" bg-white text-[14px] text-[#1A1A1A] leading-[18px] font-normal">
          <SelectValue placeholder={seledtedValue} />
        </SelectTrigger>
        <SelectContent>
          {data?.map((option, index) => (
            <SelectItem key={`${option}- ${index}`} value={`${option}`}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PreferencesSelectBox;
