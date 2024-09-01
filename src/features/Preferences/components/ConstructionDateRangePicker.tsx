"use client";
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file


type Props = {
  setconstructionDateRange: any;
  constructionDateRange: any;
  type: any;
  preferences?: any;
  setPreferences?: any;
}
const ConstructionDateRangePicker = ({
  setconstructionDateRange,
  constructionDateRange,
  type,
  preferences,
  setPreferences
}: Props) => {
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: constructionDateRange?.[`min_${type}`]
        ? new Date(constructionDateRange?.[`min_${type}`])
        : new Date("1-1-1990"),
      endDate: constructionDateRange?.[`max_${type}`]
        ? new Date(constructionDateRange?.[`max_${type}`])
        : new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges: any) => {
    setSelectedRange([ranges.selection]);
    if (setPreferences) {
      setPreferences({
        ...preferences,
        [`min_${type}`]: ranges.selection.startDate,
        [`max_${type}`]: ranges.selection.endDate,
      });
    } else {
      setconstructionDateRange({
        min: ranges.selection.startDate,
        max: ranges.selection.endDate,
      });
    }

  };



  return (
    <div>
      <DateRangePicker ranges={selectedRange} onChange={handleSelect} />
    </div>
  );
};

export default ConstructionDateRangePicker;
