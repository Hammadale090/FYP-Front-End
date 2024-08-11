import Image from 'next/image'
import React from 'react'

type Props = {
    header: string;
    details: string;
}

const AgencyDetails = ({ header, details }: Props) => {
    return (
        <div className='flex max-md:flex-col  w-full my-3 md:items-center'>
            <div className='w-full md:w-[30%] flex items-center space-x-3'>
                <Image src={"/Broker/Verified.svg"} className='w-[17px] h-[17px]' width={500} height={500} alt='Agency details' />
                <h1 className='text-[#11142D] text-[18px] font-semibold'>{header}</h1>
            </div>

            {/* the double menu */}
            <div className='w-[5%] hidden md:inline-flex'>
                <h1 className='text-[#11142D] text-[16px] leading-[24px]'>:</h1>
            </div>

            {/* the details */}
            <h1 className='text-[16px] w-full md:w-[60%] leading-[24px] text-[#11142D]'>{details}</h1>
        </div>
    )
}

export default AgencyDetails