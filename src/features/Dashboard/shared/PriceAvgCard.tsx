import Image from 'next/image'
import React from 'react'

type Props = {}

const PriceAvgCard = (props: Props) => {
    return (
        <div className='flex justify-between items-center my-3'>

            <div className='flex space-x-2'>
                <Image src={"/Dashboard/Home.png"} alt='agent profile' width={500} height={500} className='max-h-[55px] rounded-[10px] max-w-[60px]' />
                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[#11142D] text-[16px] font-semibold leading-[24px]'>Metro Jayakar Apartment</h1>
                    <h1 className='leading-[22px] text-[14px] text-[#808191]'>Top Agent</h1>
                </div>
            </div>

            <h1 className='text-[#414141] text-[18px] font-semibold '>+$35</h1>
        </div>
    )
}

export default PriceAvgCard