import { TextInput } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import IconShowcaseBox from '../shared/IconShowcaseBox'

type Props = {}

const ClientProfileDetails = (props: Props) => {
    return (
        <div className='rounded-[15px] bg-white md:h-[307.2px] px-2 py-[20px] flex flex-col md:flex-row md:items-center'>
            {/* the image and change profile */}
            <div className='relative  w-full  md:w-[360.533px]'>
                <Image className=' object-cover flex-shrink-0 h-full md:max-w-[360.5px]' src="/Dashboard/Realtors.svg" height={1000} width={1000} alt='profile pic' />

                {/* the change photo container */}
                <div className='absolute bottom-4 left-5 gap-[10px] cursor-pointer bg-white rounded-[8px] px-[15px] py-[10px]'>
                    <div className='flex space-x-2 items-center'>
                        {/* the camera */}
                        <Image className='w-[18px] h-[18px]' src={"/Dashboard/filled.svg"} height={500} width={500} alt='camera' />

                        <h1 className='text-[14px] leading-[22px] font-medium '>Change Photo</h1>
                    </div>
                </div>
            </div>

            {/* the container for the user details */}

            <div className='flex flex-col space-y-3 w-full md:mx-7'>
                {/* the name */}
                <div className='flex justify-between items-center'>
                    <h1 className='text-[22px] font-medium text-[#11142D]'>Mr. Alvert Flore</h1>
                    <Image src={"/Dashboard/menu.svg"} alt='menu' width={500} height={500} className='w-[18px] h-[18px]' />
                </div>

                {/* the role */}
                <h1 className='text-[#808191] text-[16px] leading-[24px]'>Admin</h1>

                {/* the Address */}
                <div className='w-full md:w-[70%]'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Address</h1>
                    <IconShowcaseBox Icon='/Dashboard/Location.svg' text='4517 Washington Ave. Manchaster, Kentucky 39495' />
                </div>

                {/* the phone and email */}
                <div className='flex flex-col w-full md:w-[70%] md:flex-row md:space-x-6'>
                    <div className='w-full md:w-1/2'>
                        <h1 className='text-[#808191] text-[14px] leading-[22px]'>Phone Number</h1>
                        <IconShowcaseBox Icon='/Dashboard/phone.svg' text='+0123 456 7890' />
                    </div>

                    <div className='w-full md:w-1/2'>
                        <h1 className='text-[#808191] text-[14px] leading-[22px]'>Email</h1>
                        <IconShowcaseBox Icon='/Dashboard/mail.svg' text='albart4578@gmail.com' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ClientProfileDetails