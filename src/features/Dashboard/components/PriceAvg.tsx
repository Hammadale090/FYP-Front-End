import Image from 'next/image'
import React from 'react'
import PriceAvgCard from '../shared/PriceAvgCard'

type Props = {}

const PriceAvg = (props: Props) => {
    return (
        <div className='w-full md:w-[416px] p-[20px] flex flex-col rounded-[10px] bg-[#FCFCFC] xl:mr-[13px] my-2'>
            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[18px] font-semibold'>Price Avg. per location</h1>

                <Image src={"/Dashboard/ArrowLine.svg"} className='w-[13px] h-[10px] cursor-pointer' alt='arrow life' width={500} height={500} />
            </div>

            <PriceAvgCard />
            <PriceAvgCard />
            <PriceAvgCard />
            <PriceAvgCard />
        </div>
    )
}

export default PriceAvg