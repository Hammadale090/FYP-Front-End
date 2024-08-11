import Image from 'next/image'
import React from 'react'

type Props = {}

const CreateMortgageHeader = (props: Props) => {
    return (
        <div>
            <div className='flex flex-col md:flex-row justify-between md:items-center'>
                <div className='flex space-x-3 items-center'>

                    <div className='rounded-[4px] bg-[#3EB87F] px-[10px] py-[4px] flex space-x-4 items-center'>
                        <h1 className='text-[10px] font-bold leading-[16px] text-white'>Luxury Living</h1>
                        <Image src="/Feed/InfoCircle.png" alt='InfoCircle' width={1000} height={1000} className='w-[20px] h-[20px] ' />
                    </div>

                    {/* the views */}
                    <div className='flex space-x-2 items-center'>
                        <Image src="/Feed/epView.svg" alt='InfoCircle' width={500} height={500} className='w-[12px] h-[12px] ' />
                        <h1 className='text-[10px] font-normal leading-[16px] text-[#383838]'>628 views</h1>
                    </div>

                </div>

                <div className='md:flex items-center space-x-4 hidden'>
                    <Image src={"/Feed/ReportIcon.png"} className='w-[24px] h-[24px]' width={500} height={500} alt='stop sign' />
                    <Image src={"/Feed/ShareIcon.svg"} className='w-[24px] h-[24px]' width={500} height={500} alt='stop sign' />
                    <div className='flex items-center'>
                        <Image src={"/Feed/Favorite.svg"} className='w-[24px] h-[24px]' width={500} height={500} alt='stop sign' />

                        <Image src={"/Feed/Vector.svg"} className='w-[24px] h-[24px]' width={500} height={500} alt='stop sign' />
                    </div>

                </div>
            </div>

            <div className='flex flex-col md:flex-row md:items-center justify-between'>
                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[24px] md:text-[38px] leading-[46px]'>Eagle Rock Apartments at Mineola</h1>
                    <h1 className='text-[12px] leading-[22px] font-normal text-[#383838]'>56 Forest View Dr, San Francisco, CA 94132</h1>
                </div>


                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[38px] leading-[46px]'>$97,000</h1>
                    <h1 className='text-[12px] leading-[22px] font-normal text-[#383838]'>High-end properties with premium features.</h1>
                </div>
            </div>
        </div>

    )
}

export default CreateMortgageHeader