"use client";
import { Input } from '@/components/ui/input'
import Image from 'next/image';
import React, { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';

type Props = {}

const Subscribe = (props: Props) => {
    const [loader, setLoader] = useState<boolean>(false)

    return (
        <div className='bg-[#3EB87F] py-7 relative px-[18px]'>

            <div className='bg-white w-full flex flex-col items-center max-w-[1200px] mx-auto rounded-[14px] py-[70px]'>
                <h1 className='text-[#34495D] text-[16px] md:text-[34px] font-bold leading-[24px] md:leading-[46px] text-center max-w-[586px]'>
                    Subscribe and be a part of the Real Estate Revolution!
                </h1>


                {/* subscribe here */}
                <div className='flex space-x-2 max-w-[610px] w-full my-6 '>
                    <form className="w-[100%] h-[50px] md:h-[80px] flex items-center bg-white border border-[#34495D] pl-7 rounded-[5px] mx-4">
                        <div className="flex items-center space-x-2 flex-1 w-[60%]">
                            <Input required placeholder='Enter your email here' className='flex-1 border-none bg-white flex h-4 w-full rounded-md  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-500 placeholder-opacity-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-inset focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50' />
                        </div>

                        <button type='submit' className='flex space-x-1 mx-1 w-[40%] bg-[#3EB87F] items-center justify-center px-2 h-[90%] rounded-[4px] cursor-pointer'>
                            <div className='flex space-x-5 items-center justify-center px-3'>
                                <h1 className='text-white text-[12px] sm:text-[16px] text-center font-semibold  max-sm:line-clamp-3 sm:whitespace-nowrap font-manrope sm:leading-[26px] text'>
                                    {loader ? (<BiLoaderAlt className='text-center animate-spin' />) : "Join the waitlist"}
                                </h1>
                            </div>
                        </button>

                    </form>
                </div>

            </div>
            <Image src={"/Landing/Star3.png"} width={500} alt='star' height={500} className='xl:w-[261px] xl:h-[261px] w-[48px] h-[48px]  absolute top-5 xl:top-3 left-[1%] lg:left-[1%] xl:left-[10%]' />
            <Image src={"/Landing/Star4.png"} width={500} alt='star' height={500} className='xl:w-[99px] xl:h-[99px] w-[32px] h-[32px]  absolute top-[35%] right-[5%] lg:right-[5%] xl:right-[25%]' />
        </div>
    )
}

export default Subscribe