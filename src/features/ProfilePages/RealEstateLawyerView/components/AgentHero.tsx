'use client'
import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'

type Props = {
    profileBanner: string | undefined | null
}

const AgentHero = (props: Props) => {
    const { profileBanner } = props;

    return (
        <section className='mt-7 relative'>
            {/* <Image src={"/Broker/Hero.png"} className='h-[382px] w-full object-cover rounded-[8px]' width={1000} height={1000} alt='hero image' /> */}
            <Image src={profileBanner ? profileBanner : "/Broker/Hero.png"} className='h-[382px] w-full object-cover rounded-[8px]' width={1000} height={1000} alt='hero image' />

            <div className='absolute bottom-20 px-[43px] py-[12px] mx-2 max-w-[575px] max-h-[199px] right-[20px]  border border-white rounded-[16px] border-opacity-65 bg-gray-400 bg-opacity-5 backdrop-blur-lg '>
                <h1 className='text-end text-[12px] lg:text-[36px] font-bold text-[#3EB87F]'>Join Us</h1>
                <h1 className='text-white text-[24px] lg:text-[48px] font-bold text-end lg:text-nowrap'>Open House Tonight</h1>
                <h1 className='text-white text-end lg:text-nowrap text-[12px] lg:text-[20px] font-bold leading-normal'>At Location</h1>
                <h1 className='text-white text-end lg:text-nowrap text-[12px] lg:text-[20px] font-bold leading-normal'>Date - Time</h1>
            </div>
        </section>
    )
}

export default AgentHero