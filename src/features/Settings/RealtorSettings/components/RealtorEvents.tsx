"use client";
import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import KeywordsInput from "../../shared/KeywordsInput";
import ProfSettingsHighlitEvents from "../../components/ProfSettingsHighlitEvents";
import { ProfSettingsContext } from "@/context/ProfSettingsContext";
import KeywordDateInput from "../../shared/KeywordDateInput";

type Props = {};

const RealtorEvents = (props: Props) => {
  const { setSelectedListing, selectedListing, setEventDetails, eventDetails } =
    useContext(ProfSettingsContext);

  return (
    <section className="bg-[#FCFCFC] flex flex-col space-y-3 mt-10 rounded-[10px] w-full  p-[20px]">
      {/* the header */}
      <div>
        <h1 className="text-[#11142D] text-[20px] font-bold leading-normal">
          Events
        </h1>
      </div>

      {/* the location and type */}
      <div className="flex max-md:flex-col mt-5 max-md:space-y-2 md:flex-row md:space-x-5 md:items-center">
        <div className="flex flex-col space-y-2 w-full md:w-[50%]">
          <h1 className="text-[#808191] text-[14px] leading-[22px]">
            Select a Location for Event
          </h1>
          {/* the select location event */}
          <Select
            onValueChange={(e) => {
              if (setEventDetails && eventDetails) {
                setEventDetails({
                  ...eventDetails,
                  location: e,
                });
              }
            }}
          >
            <SelectTrigger
              className={`bg-white text-[14px] ${
                eventDetails?.location ? "text-[#11142D]" : "text-[#808191]"
              }   leading-[18px] font-normal`}
            >
              <SelectValue
                placeholder={eventDetails?.location || "Location Here"}
              />
            </SelectTrigger>
            <SelectContent className="text-[#11142D] font-normal">
              <SelectItem value={`Canada`}>Canada</SelectItem>
              <SelectItem value={`London`}>London</SelectItem>
              <SelectItem value={`Australia`}>Australia</SelectItem>
              <SelectItem value={`Netherlands`}>Netherlands</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2 w-full md:w-[50%]">
          <h1 className="text-[#808191] text-[14px] leading-[22px]">
            Type Of Event
          </h1>
          {/* the select location event */}
          <Select
            onValueChange={(e) => {
              if (setEventDetails && eventDetails) {
                setEventDetails({
                  ...eventDetails,
                  event_type: e,
                });
              }
            }}
          >
            <SelectTrigger
              className={`bg-white text-[14px] ${
                selectedListing?.event?.attributes?.event_type
                  ? ""
                  : " opacity-30"
              }  text-[#1A1A1A] leading-[18px] font-normal`}
            >
              <SelectValue
                placeholder={
                  selectedListing?.event?.attributes?.event_type ??
                  "Physical events map"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={`Physical`}>Physical</SelectItem>
              <SelectItem value={`Virtual`}>Virtual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Add dates for Opeen houses */}
      <div className="mt-7">
        <h1 className="text-[#808191] text-[14px] leading-[22px] ">
          {" "}
          Add Dates for Openhouses
        </h1>

        <KeywordDateInput />
      </div>

      {/* the calendar and dates */}
      <ProfSettingsHighlitEvents />
    </section>
  );
};

export default RealtorEvents;
