import SliderRange from "@/features/RunningAdds/components/RangeSlider";

import React from "react";

type Props = {
  text: string;
  type: string;
  preferences: any;
  setPreferences: any;
  shouldNotDebounce?: boolean;
  preference?: boolean;
};

const PreferencesRangeData = ({
  text,
  type,
  preferences,
  setPreferences,
  preference
}: Props) => {
  return (
    <div>
      <h1 className="w-[18px] font-medium text-nowrap leading-[24px] capitalize mb-[50px]">
        {text}
      </h1>

      {/* the range */}
      <SliderRange
        preference={preference}
        type={type}
        preferences={preferences}
        setPreferences={setPreferences}
      />

      {/* <div className="flex space-x-1 items-center mt-2">
        <div className="flex flex-col space-y-2">
          <h1 className="text-[14px] font-normal leading-[20px]">Min</h1>
          <div className="w-[160px] flex flex-col justify-center h-[40px] rounded-[8px] bg-white border border-[#D6D6D6] ">
            <h1 className="text-[16px] ml-2 font-normal leading-[22px]">
              {min}
            </h1>
          </div>
        </div>

        <h1 className="mt-7">-</h1>

        <div className="flex flex-col space-y-2">
          <h1 className="text-[14px] font-normal leading-[20px]">Max</h1>
          <div className="w-[160px] flex flex-col justify-center h-[40px] rounded-[8px] bg-white border border-[#D6D6D6] ">
            <h1 className="text-[16px] ml-2 font-normal leading-[22px]">
              {max}
            </h1>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PreferencesRangeData;
