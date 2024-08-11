import Image from 'next/image'
import React from 'react'

type Props = {}

const TopAgentCard = (props: Props) => {
    return (
        <div className='flex justify-between items-start my-3'>

            <div className='flex space-x-2'>
                <Image src={"/Dashboard/Realtors.svg"} alt='agent profile' width={500} height={500} className='max-h-[47.8px] rounded-[10px] max-w-[51.6px]' />
                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[#11142D] text-[16px] '>Benny Chagur</h1>
                    <h1 className='leading-[22px] text-[14px] text-[#808191]'>Top Agent</h1>
                </div>
            </div>

            <Image src={"/Dashboard/menuV.svg"} alt='menu' width={500} height={500} className='w-[18px] h-[18px]' />
        </div>
    )
}

export default TopAgentCard