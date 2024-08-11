import Image from 'next/image'
import React from 'react'

type Props = {}

const TopRelevantArticle = (props: Props) => {
    return (
        <div className='flex flex-col md:flex-row w-full space-y-2 md:space-x-10 md:space-y-0 rounded-[12px] bg-white shadow-md md:mx-5 my-5 px-4 md:px-3 py-3 md:items-center'>
            <Image src={"/House.png"} alt='House png' className=' md:w-1/2 h-[344px] object-cover rounded-[12px]' height={1000} width={1000} />
            <div className='flex flex-col space-y-5 md:w-[49%]'>
                <h1 className='text-[18px] font-normal leading-[28px] text-[#666270]'>Hasan Ahmed | 21 Sep 2022</h1>
                <h1 className='text-[40px] text-[#191623] font-semibold leading-[50px]'>Ontario Pension Hunts Real Estate, Infrastructure Investments on Inflation View</h1>
                <h1 className='text-[#666270] font-normal leading-[28px] text-[18px]'>Properties are the most budget friendly so you have are an opportunity to find are the best...</h1>
            </div>
        </div>
    )
}

export default TopRelevantArticle