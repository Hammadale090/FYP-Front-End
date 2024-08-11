import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
type Props = {
    header: string;
}

const RunningAdsInput = ({ header }: Props) => {
    return (
        <div className='flex flex-col w-full md:w-[263.25px] gap-[8px] '>
            {/* the text */}
            <h1 className='text-[14px] font-medium  text-[#202C45]'>{header}</h1>
            {/* the selection box */}
            <Input placeholder='Toronto, ON' className='bg-white text-[14px] text-[#1A1A1A] leading-[18px] font-normal' />

        </div>
    )
}

export default RunningAdsInput