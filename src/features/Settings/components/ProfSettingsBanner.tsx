"use client";
import { AuthContext } from '@/context/AuthContext';
import { ProfSettingsContext } from '@/context/ProfSettingsContext';
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import Image from 'next/image'
import React, { useContext, useState } from 'react'

type Props = {}

const ProfSettingsBanner = (props: Props) => {
    const [imagesrc, setImagesrc] = useState<string>();
    const [loader, setLoader] = useState<boolean>(false)
    const { setBanner, bannerLoader } = useContext<any>(ProfSettingsContext)
    const { profileBanner } = useContext(AuthContext)

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {

            // File size is within the limit
            const reader = new FileReader();
            reader.onload = (event: any) => {
                setImagesrc(event.target.result as string);
            };
            reader.readAsDataURL(file);
            setBanner(file)
        }
    };


    return (
        <section className='mt-7 relative'>
            {/* <Image src={imagesrc ? imagesrc : profileBanner ? profileBanner : "/Broker/Hero.png"} className='h-[382px] w-full object-cover rounded-[8px]' width={1000} height={1000} alt='hero image' /> */}
            <Image src={imagesrc ? imagesrc : profileBanner ? profileBanner : "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"} className='h-[382px] w-full object-cover rounded-[8px]' width={1000} height={1000} alt='hero image' />
            <div className='absolute bottom-20 px-[43px] py-[12px] mx-2 max-w-[575px] max-h-[199px] right-[20px]  border border-white rounded-[16px] border-opacity-65 bg-gray-400 bg-opacity-5 backdrop-blur-lg '>
                <h1 className='text-end text-[12px] lg:text-[36px] font-bold text-[#3EB87F]'>Join Us</h1>
                <h1 className='text-white text-[24px] lg:text-[48px] font-bold text-end lg:text-nowrap'>Open House Tonight</h1>
                <h1 className='text-white text-end lg:text-nowrap text-[12px] lg:text-[20px] font-bold leading-normal'>At Location</h1>
                <h1 className='text-white text-end lg:text-nowrap text-[12px] lg:text-[20px] font-bold leading-normal'>Date - Time</h1>
            </div>

            <div className='absolute bottom-6 left-5'>
                <label htmlFor="fileInput">
                    <IconShowcaseBox px='15px' text='Change Banner Photo' textCN='text-[#11142D] text-[14px] leading-[22px]' Icon='/Realtor/Camera.svg' noBorder rounded='8px' />
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>

        </section>
    )
}

export default ProfSettingsBanner 