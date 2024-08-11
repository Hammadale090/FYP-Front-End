"use client";
import React, { useState } from 'react'
import Configuration from "openai"
import { OpenAI } from "openai";
import { TextInput, rem } from '@mantine/core';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { BiLoaderAlt } from 'react-icons/bi';
type Props = {
    generateAssets?: (e: any) => Promise<void>;
    prompt?: string;
    handleChange?: (e: any) => void;
    loader?: boolean;
}


const PreferenceChatBoxInputText = ({ generateAssets, prompt, handleChange, loader }: Props) => {




    return (
        <div className='flex space-x-2 w-full mt-6 '>

            <form onSubmit={generateAssets} className="w-[100%] h-[52px] flex items-center bg-[#F4F3F3] px-[20px] rounded-[8px]">
                <div className="flex items-center space-x-2 flex-1">
                    <div>
                        <Image src={"/Smily.svg"} className='w-[15px] h-[15px] ' alt='emoji' height={500} width={500} />
                    </div>

                    <Input disabled={loader} required value={prompt} onChange={handleChange} placeholder='Type your message...' className='flex-1 border-none bg-[#F4F3F3] flex h-10 w-full rounded-md  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-500 placeholder-opacity-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-inset focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50' />
                </div>


                <button disabled={loader} type='submit' className='flex space-x-1 bg-[#3EB87F] items-center px-2 py-3 rounded-[10px] cursor-pointer'>
                    <div className='flex space-x-5 items-center px-3'>
                        <h1 className='text-white text-[14px] font-normal leading-[18px] text'>
                            {loader ? (<BiLoaderAlt className='text-center animate-spin' />) : "Generate"}
                        </h1>
                        <Image src={"/send.svg"} className='w-[18px] h-[18px]' alt='emoji' height={500} width={500} />
                    </div>
                </button>

            </form>
            {/* <TextInput
                className='w-[100%] bg-[#F4F3F3] rounded-[8px]'
                placeholder='Write a message...'b
                size='lg'
                leftSection={
                    <div>
                        <Image src={"/Smily.svg"} className='w-[15px] h-[15px]' alt='emoji' height={500} width={500} />
                    </div>
                }
                rightSection={
                    <div className='flex space-x-2 bg-[#3EB87F] items-center mr-7 px-4 py-4 rounded-[10px] cursor-pointer'>
                        <div className='flex space-x-5 items-center px-3'>
                            <h1 className='text-white text-[14px] font-normal leading-[18px] text'>Generate</h1>
                            <Image src={"/send.svg"} className='w-[18px] h-[18px]' alt='emoji' height={500} width={500} />
                        </div>
                    </div>
                } /> */}

        </div>
    )
}

export default PreferenceChatBoxInputText