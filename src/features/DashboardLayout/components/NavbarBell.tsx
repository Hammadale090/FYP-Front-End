import React from 'react'
import { HiOutlineBell } from 'react-icons/hi2'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Divider } from '@mantine/core';
import Image from 'next/image';

type Props = {}

const NavbarBell = (props: Props) => {
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger>
                    {/* the bell/notification icon */}
                    <HiOutlineBell className='w-[24px] h-[24px] cursor-pointer' />
                </HoverCardTrigger>

                <HoverCardContent>
                    <div className='w-[512px]'>

                        {/* first nots */}
                        <div>
                            <div className='flex space-x-16 items-center'>
                                {/* the rectabgle */}
                                <Image src="/Dashboard/RedRectangle.svg" alt='red rectangle' width={500} height={500} className='h-[93px] w-[6px] object-cover flex-shrink-0' />

                                {/* the notification, the profile and the timeago */}
                                {/* the profile image, notification */}
                                <div className='flex space-x-4 items-start max-w-[311px]'>
                                    {/* the profile Image */}
                                    <Image className='w-[46px] h-[46px] object-cover' src="/Dashboard/Prof1.svg" height={1000} width={1000} alt='profile pic' />
                                    <div className='flex flex-col'>
                                        {/* the Name */}
                                        <h1 className='text-[16px] font-medium text-black'>Carmen Parksouth</h1>
                                        <h1 className='text-[14px] font-normal text-[#7F7F7F]'>This is just placeholder text. Don’t be alarmed. This is just placeholder text.</h1>
                                    </div>
                                </div>

                                {/* the time ago */}
                                <h1 className='text-[14px] font-normal text-[#7F7F7F]'>1 day</h1>
                            </div>
                        </div>

                        {/* the divider */}
                        <Divider my="sm" />

                        {/* the second tots */}
                        <div>
                            <div className='flex space-x-16 items-center'>
                                {/* the rectabgle */}
                                <Image src="/Dashboard/RedRectangle.svg" alt='red rectangle' width={500} height={500} className='h-[93px] w-[6px] object-cover flex-shrink-0' />

                                {/* the notification, the profile and the timeago */}
                                {/* the profile image, notification */}
                                <div className='flex space-x-4 items-start max-w-[311px]'>
                                    {/* the profile Image */}
                                    <Image className='w-[46px] h-[46px] object-cover' src="/Dashboard/Prof2.svg" height={1000} width={1000} alt='profile pic' />
                                    <div className='flex flex-col'>
                                        {/* the Name */}
                                        <h1 className='text-[16px] font-medium text-black'>Heidi Turner</h1>
                                        <h1 className='text-[14px] font-normal text-[#7F7F7F]'>This is just placeholder text. Don’t be alarmed. This is just placeholder text.</h1>
                                    </div>
                                </div>

                                {/* the time ago */}
                                <h1 className='text-[14px] font-normal text-[#7F7F7F]'>1 day</h1>
                            </div>
                        </div>
                        {/* the View all button */}
                        <div className='h-[50px]  flex flex-col justify-center items-center cursor-pointer bg-[#C3FFE3]'>
                            <h1 className='text-[16px] font-semibold text-[#34495D] '>View All</h1>
                        </div>
                    </div>

                </HoverCardContent>
            </HoverCard>


        </div>
    )
}

export default NavbarBell