"use client";
import Image from 'next/image';
import React, { useState } from 'react'

type Props = {
    header: String;
    innerText: String;
}

const FaqAccordion = ({ header, innerText }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className={`w-full px-7 py-5 my-4 rounded-[12px] ${open ? "bg-[#3EB87F] border border-white" : "border border-[#3EB87F] bg-white"}`}>
            {/* if it is not opened */}
            {
                !open && (
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[#191623] text-[26px] font-semibold leading-[36px] '>{header}</h1>
                        <Image onClick={() => {
                            setOpen(true)
                        }} className='w-[36px] h-[36px] cursor-pointer' height={500} width={500} alt='open' src="/Plus.svg" />
                    </div>
                )
            }

            {/* if it is opened */}
            {
                open && (
                    <div className='flex items-start justify-between'>
                        <div className='flex flex-col space-y-3'>
                            <h1 className='text-white text-[26px] font-semibold leading-[36px]'>
                                {header}
                            </h1>

                            <h1 className='max-w-[792px] text-white text-[18px] font-normal leading-[28px]'>
                                {innerText}
                            </h1>
                        </div>

                        <Image onClick={() => {
                            setOpen(false)
                        }} className='w-[36px] h-[36px] cursor-pointer' height={500} width={500} alt='open' src="/Minus.svg" />
                    </div>
                )
            }
        </div>
    )
}

export default FaqAccordion