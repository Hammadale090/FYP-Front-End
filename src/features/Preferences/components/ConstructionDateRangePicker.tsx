"use client";
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const ConstructionDateRangePicker = ({
  setconstructionDateRange,
  constructionDateRange,
  type,
}) => {
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
    setconstructionDateRange({
      min: ranges.selection.startDate,
      max: ranges.selection.endDate,
    });
  };

  return (
    <div>
      <DateRangePicker ranges={selectedRange} onChange={handleSelect} />
    </div>
  );
};

export default ConstructionDateRangePicker;
