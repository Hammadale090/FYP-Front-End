"use client";
import Image from 'next/image';
import React, { useState } from 'react'

type Props = {
    header: String;
    innerText: String;
}

const Businessfaq = ({ header, innerText }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    return (

        <div className='relative w-full h-full'>

            <div className={`w-full px-[20px] md:px-[30px] py-[37px] my-4 rounded-[12px] ${open ? "bg-white border border-[#14141C]" : "border border-[#14141C] bg-white"}`}>
                {/* if it is not opened */}
                {
                    !open && (
                        <div className='flex items-center space-x-[20px] '>
                            <Image onClick={() => {
                                setOpen(true)
                            }} className='w-[36px] h-[36px] cursor-pointer' height={500} width={500} alt='open' src="/Plus.svg" />
                            <h1 className='text-[#34495D] text-[20px] font-bold leading-[30px] '>{header}</h1>
                        </div>
                    )
                }

                {/* if it is opened */}
                {
                    open && (
                        <div className='flex items-start space-x-[20px] '>
                            <Image onClick={() => {
                                setOpen(false)
                            }} className='w-[44px] h-[44px] cursor-pointer' height={500} width={500} alt='open' src="/Landing/Minus.svg" />


                            <div className='flex flex-col space-y-3'>
                                <h1 className='text-[20px] font-bold leading-[30px] text-[#34495D]'>
                                    {header}
                                </h1>

                                <h1 className='max-w-[792px] text-[#5D5D6C] text-[18px] font-normal leading-[30px]'>
                                    {innerText}
                                </h1>
                            </div>


                        </div>
                    )
                }
            </div>
            {
                open && (
                    <Image src={"/Landing/Rectangle.png"} alt='rectangle' width={600} height={600} className='absolute  h-[90%] w-full -z-30 top-6 -right-3 ' />
                )
            }


        </div>
    )
}

export default Businessfaq