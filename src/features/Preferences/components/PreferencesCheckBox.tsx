import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  text: String;
  classN?: String;
  checkBoxStyles?: String;
  checked?: boolean; // Add checked prop
  onClick: () => void; // Add onClick prop
};

const PreferencesCheckBox = ({
  text,
  classN,
  checkBoxStyles,
  checked,
  onClick,
}: Props) => {
  return (
    <div className={`flex items-center mx-4 my-4 space-x-3 ${checkBoxStyles}`}>
      <Checkbox
        id={`${text}`}
        checked={checked} // Set the checked state of the checkbox
        onClick={() => onClick()} // Toggle checked state
      />
      <label
        htmlFor={`${text}`}
        className={` ${
          classN
            ? classN
            : "text-[15px] font-normal leading-[36px] text-[#34495D]"
        }`}
      >
        {text}
      </label>
    </div>
  );
};

export default PreferencesCheckBox;
