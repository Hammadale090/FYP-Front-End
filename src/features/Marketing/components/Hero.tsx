"use client";
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

type Props = {}

const Hero = (props: Props) => {
    const [loader, setLoader] = useState<boolean>(false)
    return (

        <div className='bg-[#DAFFEE] py-7 flex flex-col items-center px-[18px]'>

            {/* the header */}
            <div className='relative '>
                <div className='flex justify-center mb-5'>
                    <div className=''>
                        <h1 className='text-[20px] md:text-[48px] md:leading-[26px] text-black font-extrabold'>Find Your</h1>
                        <h1 className='text-[36px] md:text-[128px] font-extrabold leading-[49.18px] md:leading-[174.85px]'>Dream Property</h1>
                    </div>
                </div>
                <Image src={"/Landing/Star.png"} className='absolute top-3 -left-7 sm:-left-12 w-[40px] h-[40px] xl:w-[69px] xl:h-[69px] ' alt='star' width={500} height={500} />
                <Image src={"/Landing/Star2.png"} className='absolute -bottom-3 -right-[7%] md:-right-5 xl:-right-12 w-[40px] h-[40px] xl:w-[69px] xl:h-[69px] ' alt='star' width={500} height={500} />

            </div>

            {/* enter your email */}
            <div className='flex space-x-2 max-w-[514px] w-full my-6 '>

                <form className="w-[100%] h-[52px] flex items-center bg-white border border-[#34495D] pl-7 rounded-[4px]">
                    <div className="flex items-center space-x-2 flex-1 w-[60%]">
                        <Input required placeholder='Enter your email....' className='flex-1 border-none bg-white placeholder: flex h-10 w-full rounded-md  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-500 placeholder-opacity-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-inset focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50' />
                    </div>


                    <button type='submit' className='flex space-x-1 w-[40%] bg-[#3EB87F] items-center justify-center px-2 h-full rounded-[4px] cursor-pointer'>
                        <div className='flex space-x-5 items-center justify-center px-3'>
                            <h1 className='text-white text-[12px] sm:text-[16px] text-center font-semibold max-sm:line-clamp-3 sm:whitespace-nowrap font-manrope  text'>
                                {loader ? (<BiLoaderAlt className='text-center animate-spin' />) : "Join the waitlist"}
                            </h1>
                        </div>
                    </button>

                </form>

            </div>


            <Image className="max-h-[807px] w-full h-full max-w-[1449px] object-cover" alt='ravinna marketing' src={"/ui/Marketing.png"} width={1500} height={1500} />

        </div>
    )
}

export default Hero