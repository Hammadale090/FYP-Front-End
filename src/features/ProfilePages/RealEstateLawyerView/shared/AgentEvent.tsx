import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox';
import Image from 'next/image';
import React from 'react'

type Props = {
    height?: string;
}

const AgentEvent = ({ height }: Props) => {
    return (
        <div className={`flex space-x-3 items-center ${height ? height : "h-[125px]"}  `}>
            {/* the image */}
            <Image src={"/Broker/Event.png"} className='w-[35%] rounded-lg' width={500} height={500} alt='event image' />

            {/* the event description */}
            <div className='flex flex-col space-y-1 justify-between w-[55%]'>
                <div>
                    <IconShowcaseBox text='$4800' height='h-[16px]' width='w-fit' textCN='text-[#1F1F1F] text-[0.6rem] lg:text-[12px] font-semibold' textCenter color='#C3FFE3' rounded='5px' />
                </div>

                <h1 className='text-[0.6rem] lg:text-[16px] text-[#11142D] leading-[24px] font-semibold'>Metro Jayakarta Hotel & Spa</h1>

                <div className='flex space-x-2 items-center'>
                    <Image src={"/Broker/Location.svg"} alt='location' width={500} height={500} className='h-[18px] w-[18px]' />
                    <h1 className='text-[#808191] text-[0.6rem] lg:text-[14px] leading-[22px]'>North Carolina, USA</h1>
                </div>

                <div className='flex items-center space-x-4'>
                    <div className='flex space-x-2 items-center'>
                        <Image src={"/Broker/Bed.svg"} alt='location' width={500} height={500} className='h-[18px] w-[18px]' />
                        <h1 className='text-[#808191] text-[0.6rem] lg:text-[12px] leading-[18px]'>4 Beds</h1>
                    </div>

                    <div className='flex space-x-2 items-center'>
                        <Image src={"/Broker/Cross.svg"} alt='location' width={500} height={500} className='h-[18px] w-[18px]' />
                        <h1 className='text-[#808191] text-[0.6rem] lg:text-[12px] leading-[18px]'>28M</h1>
                    </div>
                </div>
            </div>

            <div className='lg:hidden w-[5%]'>
                <Image src={"/Broker/ArrowDown.svg"} alt='arrow down' width={500} height={500} className='h-[32px] w-[32px]' />
            </div>
        </div>
    )
}

export default AgentEvent