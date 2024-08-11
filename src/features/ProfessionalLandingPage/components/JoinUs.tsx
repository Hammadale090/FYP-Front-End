"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
type Props = {}

const JoinUs = (props: Props) => {
    const router = useRouter()
    return (
        <section className='w-full bg-[#C3FFE3] h-full md:h-[300px] my-20 py-10 flex flex-col justify-center items-center'>
            <div className='max-w-[1400px] max-md:px-[5px] mx-auto flex max-md:flex-col max-md:space-y-2 md:justify-between items-center'>
                <div className='flex flex-col space-y-4 max-w-[622px]'>
                    <h1 className='text-[#34495D] text-[26px] md:text-[48px] font-bold leading-[56px]'>Would you like to join us as Broker/Realtor?</h1>
                    <h1 className='text-[24px] leading-[34px] font-medium text-[#34495D]'>This is just placeholder text. Don’t be alarmed. This is just placeholder text.</h1>
                </div>

                <div onClick={() => {
                    router.push("/sign-up")
                }} className='w-[264px] h-[70px] bg-[#3EB87F] flex flex-col justify-center items-center text-white text-[24px] font-semibold leading-[34px]'>
                    Create Listings Free
                </div>
            </div>
        </section>
    )
}

export default JoinUs