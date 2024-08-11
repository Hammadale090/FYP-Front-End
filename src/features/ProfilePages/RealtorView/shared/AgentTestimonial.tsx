"use client";
import Image from 'next/image'
import React from 'react'
import { Avatar, Input, rem } from '@mantine/core';

type Props = {
    description?: string;
    firstname?: string;
    lastname?: string;
    date?: string;
    rating?: string;
    profilepic?: string;
    user?: string;
}

const AgentTestimonial = ({ description, firstname, lastname, date, rating, profilepic, user }: Props) => {
    return (
        <div className='p-[20px] mx-2 my-2 w-full flex flex-col space-y-5 md:w-[340px] rounded-[14px] border border-black bg-white'>
            <h1 className='text-[14px] leading-[18px] text-[#3B3434]'>{description ?? ""}</h1>

            <div className='flex justify-between items-center'>
                <div className='flex space-x-2 items-center'>
                    <Avatar className='rounded-[31px] w-[66px] h-[66px]' src={profilepic} alt="Profile Image" />
                    {/* <Image src={"/Broker/Agent2.svg"} alt='second agent' width={500} height={500} className='w-[66px] h-[66px]' /> */}
                    <div>
                        <h1 className='text-[12px] font-semibold leading-[26px] text-[#0B0C0E]'>  {firstname || lastname
                            ? `${firstname} ${lastname}`
                            : user}</h1>
                        <h1 className='text-[12px] text-[#383838]'>{date}</h1>
                    </div>
                </div>

                <div className='flex space-x-2 items-center'>
                    <Image className='w-[16px] h-[16px]' src={"/Broker/Star.svg"} width={500} height={500} alt='star' />
                    <h1 className='text-[14px] leading-[24px] font-semibold text-[#383838]'>{rating}</h1>
                </div>
            </div>
        </div>
    )
}

export default AgentTestimonial