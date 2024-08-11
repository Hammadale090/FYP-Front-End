"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slider, RangeSlider, rem } from "@mantine/core";
import Image from "next/image";
import { useGetPreferences } from "@/hooks/useGetPreferences";
import { debounce } from "lodash";
import { PreferencesContext } from "@/context/PreferencesContext";
type Props = {
  type?: string;
  preferences?: any;
  setPreferences?: any;
  preference? : boolean;
};

const SliderRange = ({ type, preferences, setPreferences, preference }: Props) => {
  const [sliderValue, setSliderValue] = useState<[number, number]>([
    preferences?.[`min_${type}`] ? parseInt(preferences?.[`min_${type}`]) : 0,
    preferences?.[`max_${type}`] ? parseInt(preferences?.[`max_${type}`]) : 10,
  ]);

  const { focusInputID, setFocusInputID } = useContext(PreferencesContext);

  const minRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSliderValue([
      preferences?.[`min_${type}`] ? parseInt(preferences?.[`min_${type}`]) : 0,
      preferences?.[`max_${type}`]
        ? parseInt(preferences?.[`max_${type}`])
        : 0,
    ]);
  }, [preferences, type]);
  const maxallowed =
    type?.toLowerCase()?.includes("price") ||
      type?.toLowerCase()?.includes("income")
      ? 5000000
      : type?.toLowerCase()?.includes("age")
        ? 100
        : 100000;
  const debouncedSetPreferences = useCallback(
    debounce((newPreferences, id) => {
      setFocusInputID(id);
      setPreferences(newPreferences);
    }, 300),
    [setPreferences]
  );

  const handleChange = useCallback(
    (value: [number, number], id = null) => {
      if (value[0] > maxallowed || value[1] > maxallowed) return;
      let _value = value;
      let min = _value[0];
      if (_value[1] && _value[0] > _value[1]) {
        min = _value[1] > 1 ? _value[1] - 1 : 0;
        setSliderValue([min, _value[1]]);
        return;
      }
      setSliderValue(_value);

      debouncedSetPreferences(
        {
          ...preferences,
          [`min_${type}`]: min,
          [`max_${type}`]: _value[1],
        },
        id
      );
    },
    [debouncedSetPreferences, preferences, type]
  );

  const handleBlur = useCallback(() => {
    console.log("onblur triggered");
    setPreferences({
      ...preferences,
      [`min_${type}`]: sliderValue[0],
      [`max_${type}`]: sliderValue[1],
    });
    setFocusInputID(null);
  }, [preferences, setPreferences, sliderValue, type]);

  useEffect(() => {
    function focusElementById(id) {
      const element = document.getElementById(id);
      if (element) {
        element.focus();
      } else {
        console.warn(`Element with ID "${id}" not found.`);
      }
    }

    focusInputID && focusElementById(focusInputID);
  }, [focusInputID, preferences]);

  return (
    <div>
      <div className="md:max-w-[335px] relative w-full ">
        <Image
          src={"/Realtor/bgGraph.svg"}
          alt="bgGraph"
          className="absolute bottom-1 "
          width={500}
          height={500}
        />
        <RangeSlider
          mt="xl"
          styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
          color="#3EB87F"
          label={null}
          size={5}
          min={0}
          max={
            type?.toLowerCase()?.includes("price") ||
              type?.toLowerCase()?.includes("income")
              ? 5000000
              : type?.toLowerCase()?.includes("age")
                ? 100
                : 100000
          }
          value={sliderValue}
          thumbSize={26}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className={`flex justify-between items-center mt-2  w-full ${preference && "md:max-w-[335px] space-x-1"} `}>
        <div className={`flex flex-col space-y-2 ${preference ? "w-[50%]" : "w-[40%]"}`}>
          <h1 className="text-[14px] font-normal leading-[20px]">Min</h1>
          <div className=" border border-[#D6D6D6] rounded-[8px] flex items-center  h-[40px] w-full px-2 overflow-hidden">
            {(type?.toLowerCase()?.includes("price") ||
              type?.toLowerCase()?.includes("income")) && (
                <p className="w-[18px]">$</p>
              )}
            <input
              className="text-[16px]     w-full max-w-[200px]  bg-white  outline-none "
              value={sliderValue[0]}
              type="number"
              onChange={(e) => {
                e.preventDefault();

                handleChange(
                  [parseInt(e.target.value), sliderValue[1]],
                  `min_${type}`
                );
              }}
              id={`min_${type}`}
              max={
                type?.toLowerCase()?.includes("price") ||
                  type?.toLowerCase()?.includes("income")
                  ? 5000000
                  : type?.toLowerCase()?.includes("age")
                    ? 100
                    : 100000
              }
              onBlur={handleBlur}
            />
          </div>
        </div>

        <h1 className="mt-7">-</h1>
        <div className={`flex flex-col space-y-2 ${preference ? "w-[50%]" : "w-[40%]"}`}>
          <h1 className="text-[14px] font-normal leading-[20px]">Max</h1>
          <div className=" border border-[#D6D6D6] rounded-[8px] flex items-center  h-[40px] w-full px-2 overflow-hidden">
            {(type?.toLowerCase()?.includes("price") ||
              type?.toLowerCase()?.includes("income")) && (
                <p className="w-[18px]">$</p>
              )}
            <input
              className="text-[16px]     w-full max-w-[200px]  bg-white  outline-none "
              value={sliderValue[1]}
              type="number"
              onChange={(e) => {
                e.preventDefault();

                handleChange(
                  [sliderValue[0], parseInt(e.target.value)],
                  `max_${type}`
                );
              }}
              id={`max_${type}`}
              max={
                type?.toLowerCase()?.includes("price") ||
                  type?.toLowerCase()?.includes("income")
                  ? 5000000
                  : type?.toLowerCase()?.includes("age")
                    ? 100
                    : 100000
              }
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderRange;
