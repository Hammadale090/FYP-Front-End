"use client";
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';

type Props = {}

const UserPreferences = (props: Props) => {
    const [loader, setLoader] = useState<boolean>(false)
    return (

        <div className='max-w-[1500px] mx-auto my-[40px] md:my-[80px] px-[18px]'>


            <div className='flex justify-center'>
                <h1 className='text-[33px] md:text-[64px] text-center leading-[34.72px]  md:leading-[67.33px] font-semibold sm:max-w-[338px] md:max-w-[986px] font-manrope text-[#34495D]'>
                    Set Your Preferences To Get The Best Properties
                </h1>
            </div>




            {/* what areas are you interested in? */}
            <div className='flex justify-center mt-[20px]'>
                <div className='flex flex-col'>

                    {/* the progress */}
                    <div className='flex justify-center w-full mt-[40px]'>
                        <div className='flex flex-wrap space-x-[10px] items-center'>
                            <div className='w-[60.64px] mx-2 my-2 border-[3px] rounded-[4px] border-[#3EB87F]' />
                            <div className='w-[60.64px] mx-2 my-2 border-[3px] rounded-[4px] border-[#E1E1E1]' />
                            <div className='w-[60.64px] mx-2 my-2 border-[3px] rounded-[4px] border-[#E1E1E1]' />
                            <div className='w-[60.64px] mx-2 my-2 border-[3px] rounded-[4px] border-[#E1E1E1]' />
                            <div className='w-[60.64px] mx-2 my-2 border-[3px] rounded-[4px] border-[#E1E1E1]' />
                        </div>
                    </div>

                    {/* Enter the zip code */}
                    <div className='flex flex-col space-y-[32px] sm:max-w-[514px] w-full  my-[50px]'>
                        <h1 className='text-[24px] max-md:text-center font-semibold leading-[26px] text-[#383838]'>What area or areas are you interested in?</h1>


                        <form className="w-[100%] h-[52px] flex items-center bg-white border border-[#34495D] pl-7 rounded-[4px]">
                            <div className="flex items-center space-x-2 flex-1 w-[70%]">
                                <Input required placeholder='Enter a specific ZIP code or address' className='flex-1 border-none bg-white flex h-10 w-full rounded-md  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-500 placeholder-opacity-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-inset focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50' />
                            </div>


                            <button type='submit' className='flex space-x-1 w-[30%] bg-[#3EB87F] items-center justify-center px-2 h-full rounded-[4px] cursor-pointer'>
                                <div className='flex space-x-5 items-center justify-center px-3'>
                                    <h1 className='text-white text-[12px] sm:text-[16px] text-center font-semibold max-sm:line-clamp-3 sm:whitespace-nowrap font-manrope  text'>
                                        {loader ? (<BiLoaderAlt className='text-center animate-spin' />) : "Search"}
                                    </h1>
                                </div>
                            </button>

                        </form>
                    </div>

                    {/* next and back */}
                    <div className='hidden md:flex space-x-6 items-center justify-center'>
                        {/* the back */}
                        <div className='border border-[#A5A5A5] px-[52px] py-[10px] text-[16px] font-semibold text-[#A5A5A5] leading-[26px] cursor-pointer rounded-[4px] '>
                            Back
                        </div>

                        {/* the next*/}
                        <div className='bg-[#3EB87F] px-[52px] py-[10px] text-[16px] font-semibold text-white leading-[26px] cursor-pointer rounded-[4px] '>
                            Next
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default UserPreferences