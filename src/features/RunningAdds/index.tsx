"use client";
import { Divider } from "@mantine/core";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SliderRange from "./components/RangeSlider";
import RunningAdsInput from "./components/RunningAdsInput";
import KeywordsInput from "../Settings/shared/KeywordsInput";
import PreferencesCheckBox from "../Preferences/components/PreferencesCheckBox";

type Props = {};

const RunningAdds = (props: Props) => {
  return (
    <section>
      <Divider my="sm" />

      <div className="container mx-auto my-7">
        {/* top section */}
        {/* running adds text and apply changes button */}
        <div className="flex max-md:flex-col max-md:space-y-2 justify-between items-start">
          {/* running adds text */}
          <div className="flex flex-col gap-[8px] text-[#34495D]">
            <h1 className="text-[32px] font-medium leading-[20px]">
              Running Adds
            </h1>
            <h1 className="text-[12px] font-medium leading-[20px]">
              You may reset your preferences to update properties on your feed
            </h1>
          </div>
          {/* apply changes button */}
          <div className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white bg-[#3EB87F] border border-white ">
            Apply Changes
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col space-y-2 mt-3">
          <h1 className="text-[18px] font-medium leading-[24px] txet-black">
            Gender
          </h1>

          <RadioGroup className="flex max-md:flex-wrap md:space-x-8 my-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label
                className="text-[16px] font-normal leading-[22px] text-[#34495D]"
                htmlFor="r1"
              >
                Male
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem checked value="comfortable" id="r2" />
              <Label
                className="text-[#3EB87F] text-[16px] font-normal leading-[22px]"
                htmlFor="r2"
              >
                Female
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label
                className="text-[16px] font-normal leading-[22px] text-[#34495D]"
                htmlFor="r3"
              >
                Others
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* the age */}
        <div className="flex flex-col space-y-2 mt-4">
          <h1 className="text-[18px] font-medium leading-[24px] txet-black mb-4">
            Age
          </h1>
          <SliderRange />
        </div>

        {/* the range */}
        <div className="flex flex-col space-y-2 mt-4">
          <h1 className="text-[18px] font-medium leading-[24px] txet-black mb-4">
            Range
          </h1>
          <SliderRange />
        </div>

        {/* city neighbourhood and zip code */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-y-10">
          <RunningAdsInput header="City" />
          <RunningAdsInput header="Neighborhood" />
          <RunningAdsInput header="ZIP Code" />
          <RunningAdsInput header="Any Specific Landmarks" />
        </div>

        {/* the input specific keyowrds or phrases */}
        <div className="flex flex-col space-y-2 mt-4">
          <h1 className="text-[18px] font-medium leading-[24px] txet-black mb-4">
            Input specific keywords or phrases
          </h1>
          <KeywordsInput
            setKeywordsPreferences={(arg) => {}}
            KeywordsPreferences={[]}
          />
        </div>

        {/* close proximities */}
        <div className="mt-7">
          {/* property Amenties text */}
          <h1 className="text-[16px] font-medium leading-[50px] text-black">
            Close Proximities
          </h1>
          {/* Property amenities */}
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 max-w-[900px]">
            <PreferencesCheckBox
              onClick={() => console.log("clicked")}
              text={"Nearby Schools"}
            />
            <PreferencesCheckBox
              onClick={() => console.log("clicked")}
              text={"Nearby Airports"}
            />
            <PreferencesCheckBox
              onClick={() => console.log("clicked")}
              text={"Nearby Gardens"}
            />
            <PreferencesCheckBox
              onClick={() => console.log("clicked")}
              text={"Nearby Hospitals"}
            />
            <PreferencesCheckBox
              onClick={() => console.log("clicked")}
              text={"Nearby University"}
            />
            <PreferencesCheckBox
              onClick={() => console.log("clicked")}
              text={"Nearby College"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RunningAdds;
