import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
type Props = {
    header: string;
    data: string[];
    defaultText?: string;
}

const MortgageSelectBox = ({ header, data, defaultText }: Props) => {
    return (
        <div className='flex flex-col w-[80%] gap-[8px] '>
            {/* the text */}
            <h1 className='text-[14px] font-medium  text-[#202C45]'>{header}</h1>
            {/* the selection box */}
            <Select >
                <SelectTrigger className=" bg-white text-[14px] text-[#1A1A1A] leading-[18px] font-normal">
                    <SelectValue placeholder={defaultText ? defaultText : "Select"} />
                </SelectTrigger>
                <SelectContent >
                    {
                        data?.map((option, index) => (
                            <SelectItem key={`${option}- ${index}`} value={`${option} - ${index}`}>{option}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default MortgageSelectBox