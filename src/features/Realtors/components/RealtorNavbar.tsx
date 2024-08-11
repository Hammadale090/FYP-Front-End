import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FeedContext } from '@/context/FeedContext'
type Props = {}

const RealtorNavbar = (props: Props) => {
    return (
        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between px-4 md:px-0'>
            <div className='flex flex-col'>
                <h1 className='text-black text-[24px] font-semibold leading-[34px]'>All Realtors</h1>
                <h1 className='text-[#504e4e] text-[16px] leading-[26px] font-normal'>Showing 1 – 3 of 12 results</h1>
            </div>

            {/* sort functionality */}
            <div className='flex space-x-2 items-center'>
                {/* sort by text */}
                <h1 className='text-[10px] font-medium leading-[14px] text-[#383838]'>
                    Sort by:
                </h1>

                {/* The sorting dropdown */}
                <Select>
                    <SelectTrigger className="w-[180px] bg-[#F3F3F3]">
                        <SelectValue placeholder="Default Sorting" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Default Sorting</SelectItem>
                        <SelectItem value="dark">Default Sorting</SelectItem>
                        <SelectItem value="system">Default Sorting</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </div>
    )
}

export default RealtorNavbar