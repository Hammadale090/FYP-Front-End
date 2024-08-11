import Image from 'next/image'
import React from 'react'

type Props = {}

const AgentTestimonial = (props: Props) => {
    return (
        <div className='p-[20px] mx-2 my-2 w-full flex flex-col space-y-5 md:w-[340px] rounded-[14px] border border-black bg-white'>
            <h1 className='text-[14px] leading-[18px] text-[#3B3434]'>“Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet”</h1>

            <div className='flex justify-between items-center'>
                <div className='flex space-x-2 items-center'>
                    <Image src={"/Broker/Agent2.svg"} alt='second agent' width={500} height={500} className='w-[66px] h-[66px]' />
                    <div>
                        <h1 className='text-[12px] font-semibold leading-[26px] text-[#0B0C0E]'>Mafuzul Islam Nabil</h1>
                        <h1 className='text-[12px] text-[#383838]'>September 6, 2022</h1>
                    </div>
                </div>

                <div className='flex space-x-2 items-center'>
                    <Image className='w-[16px] h-[16px]' src={"/Broker/Star.svg"} width={500} height={500} alt='star' />
                    <h1 className='text-[14px] leading-[24px] font-semibold text-[#383838]'>4.9</h1>
                </div>
            </div>
        </div>
    )
}

export default AgentTestimonial