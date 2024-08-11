import Image from 'next/image'
import React from 'react'

type Props = {}

const MarketTrends = (props: Props) => {
    return (
        <div className='flex flex-col space-y-2 w-full md:w-fit xl:max-w-[370px] rounded-[12px] bg-[#FCFCFC] xl:mr-[13px] my-2 p-[20px]'>
            <Image src={"/Dashboard/Home1.png"} className='rounded-[10px] object-cover max-h-[222px]' alt='market home' width={700} height={700} />
            <h1 className='text-[#666270] text-[16px] leading-[26px] break-words'>Hasan Ahmed | 23 Sep 2022</h1>
            <h1 className='text-[26px] font-semibold leading-[36px] text-black'>The Home Buying Process: A Comprehensive Guide.</h1>
            <h1 className='text-[#666270] text-[16px] leading-[26px]'>Properties are the most budget friendly so you have are an opportunity to find are the best...</h1>
        </div>
    )
}

export default MarketTrends