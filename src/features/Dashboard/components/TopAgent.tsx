import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TopAgentCard from '../shared/TopAgentCard'

type Props = {}

const TopAgent = (props: Props) => {
    return (
        <div className='w-full md:w-[366px] p-[20px] rounded-[10px] bg-[#FCFCFC] xl:mr-[13px] my-2'>
            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[18px] font-semibold'>Top Agent</h1>

                {/* select */}
                <Select>
                    <SelectTrigger className=" bg-white text-[14px] w-fit max-md:mx-2 max-md:my-2 text-[#1A1A1A] leading-[18px] font-normal">
                        <SelectValue className='text-[12px] font-semibold text-[#808191] mr-2' placeholder={"Most Recent"} />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value={`Default value`}>Default value</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* the top agent cards */}
            <div className='flex flex-col '>
                <TopAgentCard />
                <TopAgentCard />
                <TopAgentCard />
                <TopAgentCard />
            </div>
        </div>
    )
}

export default TopAgent