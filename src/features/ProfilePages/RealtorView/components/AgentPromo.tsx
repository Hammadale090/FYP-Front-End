import Image from 'next/image'
import React from 'react'

type Props = {
    slug: string | string[]
}

const AgentPromo = (props: Props) => {

    const { slug } = props;

    return (
        <div className='my-2 rounded-[5px] bg-black py-[15px]'>
            <div className='flex justify-center space-x-6 items-center'>
                <Image src={"/Broker/tag.svg"} className='w-[24px] h-[24px]' width={500} height={500} alt='tag' />
                <h1 className='text-[16px] font-bold text-white'>Get 15% OFF, user promo code</h1>
                <div className='px-4 py-2 border border-dashed border-white rounded-[4px] text-[16px] font-bold text-white'>
                    REAL15
                </div>
            </div>
        </div>
    )
}

export default AgentPromo