import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type Props = {}

const FindAgent = (props: Props) => {
    return (
        <section className='w-full md:w-[370px] py-4 h-[354px] flex-shrink-0 rounded-[8px] px-5 bg-[#f3f3f3] '>
            <h1 className='text-black text-[24px] font-semibold leading-[34px] mt-4'>Find Agent</h1>

            {/* The sorting dropdown */}
            <Select>
                <SelectTrigger className="w-full bg-white mt-4">
                    <SelectValue className='text-[14px] font-normal leading-[24px] ' placeholder="All Agency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Default Sorting</SelectItem>
                    <SelectItem value="dark">Default Sorting</SelectItem>
                    <SelectItem value="system">Default Sorting</SelectItem>
                </SelectContent>
            </Select>

            {/* All categories */}
            <Select>
                <SelectTrigger className="w-full bg-white mt-3">
                    <SelectValue className='text-[14px] font-normal leading-[24px] ' placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Default Sorting</SelectItem>
                    <SelectItem value="dark">Default Sorting</SelectItem>
                    <SelectItem value="system">Default Sorting</SelectItem>
                </SelectContent>
            </Select>

            {/* all locations */}
            <Select>
                <SelectTrigger className="w-full bg-white mt-3">
                    <SelectValue className='text-[14px] font-normal leading-[24px] ' placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Default Sorting</SelectItem>
                    <SelectItem value="dark">Default Sorting</SelectItem>
                    <SelectItem value="system">Default Sorting</SelectItem>
                </SelectContent>
            </Select>


            {/* the button */}
            <div className='w-full my-7 h-[50px] cursor-pointer rounded-[4px] gap-[10px] flex bg-[#3EB87F] flex-col justify-center items-center'>
                <h1 className='text-[16px] font-semibold leading-[26px] text-white'>Search</h1>
            </div>
        </section>

    )
}

export default FindAgent