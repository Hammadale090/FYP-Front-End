"use client";
import { Input } from '@/components/ui/input'
import { ProfSettingsContext } from '@/context/ProfSettingsContext';
import Image from 'next/image'
import React, { useContext, useRef, useState } from 'react'
import { format } from "date-fns"

type Keywords = Array<string>
type Props = {
    placeholder?: string;
}

const KeywordDateInput = ({ placeholder }: Props) => {
    // const [days, setDays] = useState<Keywords>([])
    const { days, setDays } = useContext(ProfSettingsContext)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDeleteKeyword = (index: number) => {
        // Guard clause to prevent out-of-bounds errors
        if (setDays && days) {
            if (index < 0 || index >= days.length) {
                return; // Silently handle invalid index
            }

            const newKeywords = [...days]; // Create a copy to avoid mutation
            newKeywords.splice(index, 1); // Remove the element at the specified index
            setDays(newKeywords);
        }

    };

    // const hasText = () => {
    //     return days.some(keyword => keyword.trim() !== '');
    // };


    return (
        <div className='rounded-[4px] flex mt-1 flex-wrap  items-center    border border-ravinna  w-full '>
            {
                days?.map((keyword: any, index: any) => (
                    <div key={`${keyword} ${index}`} className='px-[14px] mx-2  max-w-[100%] my-2 py-[10px] rounded-[6px] border border-ravinna bg-white flex items-center space-x-3'>
                        <h1 className='text-ravinna text-[14px] font-medium leading-[20px] break-all'>{format(keyword, "dd/LL/Y")}</h1>
                        <Image onClick={() => handleDeleteKeyword(index)} src={"/Realtor/Cross.svg"} className='w-[16.5px] border-none mr-3 h-[16.5px] cursor-pointer' width={500} height={500} alt='cross realor' />
                    </div>
                ))
            }

            <Input disabled maxLength={10} ref={inputRef} className='flex-1 min-w-[100px] h-[40px] mx-2 my-2 border-none' placeholder={placeholder ? placeholder : "dd/mm/yyyy"} />


        </div>
    )
}

export default KeywordDateInput