import { CallSvg, ProfileMail, WorldSvg } from '@/features/DashboardLayout/svgs'
import { Rating } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

type Props = {
    realtor?: string;
    firstname?: string | null;
    lastname?: string | null;
    phone?: string | null;
    email?: string | null;
    url?: string | null;
    profile_pic?: string | null;
    Agency_name?: string | null;
}

const RealtorCard = ({ realtor, firstname, lastname, phone, email, url, profile_pic, Agency_name }: Props) => {
    return (
        <div className='w-full md:w-[370px] h-full md:h-[449px] cursor-pointer md:mx-2 my-2 flex-shrink-0  rounded-xl'>
            {/* the realtor or broker Image/profile Image */}
            <Image height={1000} width={1000} className='h-[240px] rounded-t-xl object-cover' alt='property Image' src={profile_pic ? profile_pic : `${realtor ? { realtor } : "/Dashboard/Brokers.png"}`} />
            {/* The lower div */}
            <div className='py-5 px-5'>
                {/* the Title  and rating*/}
                <div className='flex space-x-6 items-center'>
                    {/* the title */}
                    <h1 className='text-[20px] font-medium text-[#34495D]'>{firstname ?? ""} {lastname ?? ""}</h1>
                    {/* the rating */}
                    <Rating defaultValue={5} />
                </div>

                {/* the description of the profile */}
                <h1 className='text-[12px] font-normal text-black mt-2'>Company Agent at <br /> {Agency_name ?? ""}</h1>

                {/* reach the profile via phone, email and website */}
                <div className='flex flex-col space-y-2 mt-2'>
                    {/* via phone */}
                    <div className='flex space-x-5 items-center'>
                        <CallSvg black />
                        <h1 className='text-[14px] leading-[24px] font-normal'>{phone ?? ""}</h1>
                    </div>

                    {/* via mail */}
                    <div className='flex space-x-5 items-center'>
                        <ProfileMail black />
                        <h1 className='text-[14px] leading-[24px] font-normal '>{email ?? ""}</h1>
                    </div>

                    {/* via web */}
                    <div className='flex space-x-5 items-center'>
                        <WorldSvg black />
                        <h1 className='text-[14px] leading-[24px] font-normal text-black'>{url ?? ""}</h1>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RealtorCard