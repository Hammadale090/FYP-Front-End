"use client";
import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FeedContext } from '@/context/FeedContext';
import { ListingContext } from '@/context/ListingContext';
// import Link from 'next/link';
import { useRouter } from "next/navigation";
type Props = {}

const PropertyNavbar = (props: Props) => {
    const { showFilters } = useContext<any>(FeedContext)
    const { setSort } = useContext<any>(ListingContext)
    const router = useRouter();

    return (
        <div className='flex flex-col md:flex-row pl-[22px] md:pl-0 space-y-4 md:space-y-0 max-w-[100vw] justify-between md:items-center'>
            {/* the button to toggle between properties, top realtors and top brokers */}
            <div className=' ml-3'>
                <h1 className='text-[16px] font-medium leading-[20px] text-black'>These are all the available properties.</h1>
            </div>

            <div className='flex flex-col md:flex-row ml-4 space-y-4 md:space-y-0 md:space-x-4 items-start md:items-center md:mr-10'>
                {/* sort functionality */}
                <div className='flex space-x-2 items-center'>
                    {/* sort by text */}
                    <h1 className='text-[10px] font-medium leading-[14px] text-[#383838]'>
                        Sort by:
                    </h1>

                    {/* The sorting dropdown */}
                    <Select onValueChange={(e: any) => {
                        setSort(e)
                    }}>
                        <SelectTrigger className="w-[180px] bg-[#F3F3F3]">
                            <SelectValue placeholder="Most Recent" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="pricing">Pricing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* reset Preferences button */}
                {
                    !showFilters && (

                        <div onClick={() => {
                            router.push("/dashboard/preferences")
                        }} className='w-[169px] h-[32px] flex flex-col justify-center items-center cursor-pointer border border-[#3EB87F] rounded-[6px]'>
                            <h1 className='text-base text-nowrap px-2 font-normal text-[#3EB87F]'>Reset Preferences</h1>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default PropertyNavbar