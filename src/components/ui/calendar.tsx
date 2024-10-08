"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { enGB } from 'date-fns/locale';
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { buttonVariants } from "@/components/ui/button"
import IconShowcaseBox from "@/features/Dashboard/shared/IconShowcaseBox";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {

  const today = new Date();

  const isDisabled = (day: any) => day.isBefore(today);
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={enGB}

      // captionLayout="dropdown" fromYear={2010} toYear={2024}
      className={cn("p-3 z-50", className)}
      classNames={{
        months: "flex flex-col  space-y-4 ",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full",
        head_cell:
          " w-full rounded-md w-9 font-bold text-black md:text-[16px] uppercase max-md:text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-full text-black text-center md:text-[24px] max-md:text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-50",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-full  p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{

        CaptionLabel: ({ displayMonth }) => <IconShowcaseBox text={format(displayMonth, "LLLL yy")} textCN='text-[20px] text-black' textCenter borderColor='#000' rounded='4px' py='6px' px='11px' />,
        IconLeft: ({ ...props }) => <IconShowcaseBox px='6px' py='6px' textCenter RealIcon={IoIosArrowBack} borderColor='#000' rounded='8px' width='w-fit' />,
        IconRight: ({ ...props }) => <IconShowcaseBox px='6px' py='6px' textCenter RealIcon={IoIosArrowForward} borderColor='#000' rounded='8px' width='w-fit' />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
