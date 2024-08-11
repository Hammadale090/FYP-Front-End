"use client";
import { Divider } from "@mantine/core";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { FeedContext } from "@/context/FeedContext";

import camelCase from "camelcase";
import { filters } from "@/features/Preferences/defaultPreferences";
import PreferencesCheckBox from "@/features/Preferences/components/PreferencesCheckBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Country, City } from "country-state-city";

type Props = {};

const FeedFilters = (props: Props) => {
  const { setShowFilters, myFilters, setMyFilters } =
    useContext<any>(FeedContext);

  return (
    <section className="px-2 md:px-0">
      <div
        onClick={() => {
          setShowFilters(false);
        }}
        className="fixed md:hidden inset-0 bg-black opacity-50"
      ></div>

      <div className="max-[768px]:fixed max-[768px]:inset-y-0 max-[768px]:p-5 max-[768px]:overflow-y-auto max-[768px]:right-0 max-[768px]:w-[80vw] max-[768px]:rounded-tl-[20px] max-[768px]:bg-white max-[768px]:shadow max-[768px]:z-50 max-[768px]:transform max-[768px]:translate-x-0  max-[768px]:transition max-[768px]:duration-300 max-[768px]:ease-in-out min-[768px]:w-[255px] pl-4">
        {/* the feed header */}
        <div className="flex justify-between items-center">
          {/* the filter and arrow back Icon */}
          <div className="flex items-center space-x-2">
            <Image
              onClick={() => {
                setShowFilters(false);
              }}
              src={"/Feed/ArrowCircle.svg"}
              alt="Arrow circle"
              className="w-[24px] h-[24px] cursor-pointer"
              height={500}
              width={500}
            />
            <h1 className="text-[24px] font-medium text-black">Filters</h1>
          </div>

          {/* the Reset text */}
          {Object.entries(myFilters).length > 0 && (
            <h1
              className="text-[16px] font-medium text-[#3EB87F] cursor-pointer"
              onClick={() => {
                setMyFilters({});
                setShowFilters(false);
              }}
            >
              Reset
            </h1>
          )}
        </div>

        <div className="overflow-y-auto">
          {/* filter by location */}
          <div>
            <Divider my={"sm"} />
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-[18px] font-medium leading-[24px]">
                  Location
                </AccordionTrigger>
                <AccordionContent>
                  <h1 className="text-[14px] font-normal leading-[20px] text-[#7B7B7B]">
                    Enter City, neighborhood, ZIP code, or specific location
                  </h1>
                  <div className="w-[190px] h-[40px] my-3 text-[16px] leading-[22px] cursor-pointer font-normal rounded-[8px] border border-#D6D6D6 bg-white px-[16px] py-[9px] gap-[10px] flex-shrink-0">
                    <select
                      className="w-full"
                      onChange={(e) => {
                        setMyFilters({
                          ...myFilters,
                          country: JSON.parse(e.target.value),
                        });
                      }}
                    >
                      {Country.getAllCountries().map((i) => (
                        <option
                          key={i.name}
                          className="w-full"
                          value={JSON.stringify({
                            isoCode: i.isoCode,
                            name: i.name,
                          })}
                        >
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {myFilters?.country?.isoCode && (
                    <div className="w-[190px] h-[40px] my-3 text-[16px] leading-[22px] cursor-pointer font-normal rounded-[8px] border border-#D6D6D6 bg-white px-[16px] py-[9px] gap-[10px] flex-shrink-0">
                      <select
                        className="w-full"
                        onChange={(e) => {
                          setMyFilters({
                            ...myFilters,
                            city: JSON.parse(e.target.value),
                          });
                        }}
                      >
                        {City.getCitiesOfCountry(
                          myFilters?.country?.isoCode
                        ).map((i) => (
                          <option
                            key={i?.name}
                            className="w-full"
                            value={JSON.stringify({
                              stateCode: i.stateCode,
                              name: i.name,
                            })}
                          >
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {RenderFilters()}
      </div>
    </section>
  );
};

export default FeedFilters;

function RenderFilters() {
  const { myFilters, setMyFilters } = useContext<any>(FeedContext);

  useEffect(() => {
    console.log("my filters are ", myFilters);
  }, [myFilters]);

  return (
    <>
      {filters?.map((i, index) => {
        if (i.type == "checkbox")
          return (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[18px] font-medium leading-[24px] capitalize">
                    {i?.text}
                  </AccordionTrigger>
                  <AccordionContent>
                    <h1 className="text-[14px] font-normal leading-[20px] text-[#7B7B7B]">
                      {i?.desc}
                    </h1>
                    {i?.options?.map((j) => {
                      return (
                        <PreferencesCheckBox
                          text={j}
                          key={j}
                          checked={myFilters?.[i.key]?.[camelCase(j)]}
                          onClick={() => {
                            setMyFilters({
                              ...myFilters,
                              [i.key]: {
                                ...myFilters[i.key],
                                [camelCase(j)]:
                                  !myFilters?.[i.key]?.[camelCase(j)],
                              },
                            });
                          }}
                        />
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        if (i.type == "radio")
          return (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[18px] font-medium leading-[24px]">
                    {i?.text}
                  </AccordionTrigger>
                  <AccordionContent>
                    <h1 className="text-[14px] font-normal leading-[20px] text-[#7B7B7B]">
                      {i?.desc}
                    </h1>
                    <RadioGroup className="">
                      {i?.options?.map((j) => {
                        return (
                          <div
                            className="flex items-center space-x-2"
                            key={j}
                            onClick={() => {
                              let _myFilters = myFilters;
                              if (_myFilters?.[i.key] == j) {
                                delete _myFilters?.[i.key];
                              } else {
                                _myFilters[i.key] = j;
                              }

                              setMyFilters({
                                ..._myFilters,
                              });
                            }}
                          >
                            <RadioGroupItem
                              checked={myFilters?.[i.key] == j}
                              value={j}
                              id={j}
                            />
                            <Label
                              className={`text-[16px] font-normal leading-[22px] ${myFilters?.[i.key] != j
                                ? "text-[#34495D]"
                                : "text-[#3EB87F]"
                                } `}
                              htmlFor={j}
                            >
                              {j}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        if (i.type == "range")
          return (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[18px] font-medium leading-[24px] capitalize">
                    {i?.text}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-3">
                    <h1 className="text-[14px] font-normal leading-[20px] text-[#7B7B7B]">
                      Min
                    </h1>
                    <input
                      className="w-[190px] h-[40px] my-3 text-[16px] leading-[22px] cursor-pointer font-normal rounded-[8px] border border-#D6D6D6 bg-white px-[16px] py-[9px] gap-[10px] flex-shrink-0"
                      value={myFilters?.[`min_${i.key}`]}
                      min={i.min}
                      max={i.max}
                      type="number"
                      onChange={(e) => {
                        // console.log("i is ", i);
                        if (
                          parseInt(e?.target?.value) < i?.min ||
                          parseInt(e?.target?.value) > i?.max
                        )
                          return;
                        setMyFilters({
                          ...myFilters,
                          [`min_${i.key}`]: e.target.value,
                        });
                      }}
                    />

                    <h1 className="text-[14px] font-normal leading-[20px] text-[#7B7B7B]">
                      Max
                    </h1>
                    <input
                      className="w-[190px] h-[40px] my-3 text-[16px] leading-[22px] cursor-pointer font-normal rounded-[8px] border border-#D6D6D6 bg-white px-[16px] py-[9px] gap-[10px] flex-shrink-0"
                      value={myFilters?.[`max_${i.key}`]}
                      min={i.min}
                      max={i.max}
                      type="number"
                      onChange={(e) => {
                        // console.log("i is ", i);
                        if (
                          parseInt(e?.target?.value) < i?.min ||
                          parseInt(e?.target?.value) > i?.max
                        )
                          return;
                        setMyFilters({
                          ...myFilters,
                          [`max_${i.key}`]: e.target.value,
                        });
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        if (i.type == "date")
          return (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[18px] font-medium leading-[24px] capitalize">
                    {i?.text}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-3">
                    <h1 className="text-[14px] font-normal leading-[20px] text-[#7B7B7B]">
                      Min
                    </h1>
                    <div className="w-[190px] h-[40px] my-3 text-[16px] leading-[22px] cursor-pointer font-normal rounded-[8px] border border-#D6D6D6 bg-white px-[16px] py-[9px] gap-[10px] flex-shrink-0">
                      <DatePicker
                        selected={
                          myFilters?.[`min_${i.key}`]
                            ? new Date(myFilters?.[`min_${i.key}`])
                            : null
                        }
                        onChange={(date: Date) => {
                          setMyFilters({
                            ...myFilters,
                            [`min_${i.key}`]: date.getFullYear().toString(),
                          });
                        }}
                        showYearPicker
                        dateFormat="yyyy"
                        minDate={new Date("1900")}
                        maxDate={
                          myFilters?.[`max_${i.key}`]
                            ? new Date(myFilters?.[`max_${i.key}`])
                            : new Date()
                        }
                        className="w-full h-full text-[16px] leading-[22px] font-normal bg-white border-none"
                      />
                    </div>
                    <h1 className="text-[14px] font-normal leading-[20px] text-[#7B7B7B]">
                      Max
                    </h1>
                    <div className="w-[190px] h-[40px] my-3 text-[16px] leading-[22px] cursor-pointer font-normal rounded-[8px] border border-#D6D6D6 bg-white px-[16px] py-[9px] gap-[10px] flex-shrink-0">
                      <DatePicker
                        selected={
                          myFilters?.[`max_${i.key}`]
                            ? new Date(myFilters?.[`max_${i.key}`])
                            : null
                        }
                        onChange={(date: Date) => {
                          setMyFilters({
                            ...myFilters,
                            [`max_${i.key}`]: date.getFullYear().toString(),
                          });
                        }}
                        showYearPicker
                        dateFormat="yyyy"
                        maxDate={new Date()}
                        minDate={
                          myFilters?.[`min_${i.key}`]
                            ? new Date(myFilters?.[`min_${i.key}`])
                            : new Date("1900")
                        }
                        className="w-full h-full text-[16px] leading-[22px] font-normal bg-white border-none"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        if (i.type == "keyword_input")
          return (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[18px] font-medium leading-[24px] capitalize">
                    {i?.text}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-3">
                    <h1 className="text-[14px] text-[#7B7B7B] leading-[20px]">
                      {i?.desc}
                    </h1>
                    <Input className="rounded-[8px] border border-[#D6D6D6] bg-white max-w-[190px]" />

                    <div className="h-[40px] w-[114.2px] rounded-[6px] border border-[#34495D] bg-white flex flex-col justify-center items-center">
                      <div className="flex space-x-1 items-center">
                        <h1 className="text-[14px] font-medium leading-[20px] text-[#34495D] text-nowrap">
                          Keyword 1
                        </h1>
                        <Image
                          src={"/Feed/charmCross.svg"}
                          className="h-4 w-4 cursor-pointer"
                          height={500}
                          width={500}
                          alt="RemoveKeyword"
                        />
                      </div>
                    </div>

                    <div className="h-[40px] w-[114.2px] rounded-[6px] border border-[#34495D] bg-white flex flex-col justify-center items-center">
                      <div className="flex space-x-1 items-center">
                        <h1 className="text-[14px] font-medium leading-[20px] text-[#34495D] text-nowrap">
                          Keyword 2
                        </h1>
                        <Image
                          src={"/Feed/charmCross.svg"}
                          className="h-4 w-4 cursor-pointer"
                          height={500}
                          width={500}
                          alt="RemoveKeyword"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        if (i.type == "number_input")
          return (
            <div key={index}>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[18px] font-medium leading-[24px]">
                    {i?.text}
                  </AccordionTrigger>
                  <AccordionContent>
                    <h1 className="text-[14px] font-normal leading-[20px] text-[#7B7B7B]">
                      {i?.desc}
                    </h1>
                    <input
                      className="w-[190px] h-[40px] my-3 text-[16px] leading-[22px] cursor-pointer font-normal rounded-[8px] border border-#D6D6D6 bg-white px-[16px] py-[9px] gap-[10px] flex-shrink-0"
                      value={myFilters?.[`min_${i.key}`]}
                      min={i.min}
                      max={i.max}
                      type="number"
                      onChange={(e) => {
                        // console.log("i is ", i);
                        if (
                          parseInt(e?.target?.value) < i?.min ||
                          parseInt(e?.target?.value) > i?.max
                        )
                          return;
                        setMyFilters({
                          ...myFilters,
                          [`min_${i.key}`]: e.target.value,
                        });
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
      })}
    </>
  );
}
