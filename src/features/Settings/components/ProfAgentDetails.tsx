"use client";
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AuthContext } from '@/context/AuthContext';
import { ProfSettingsContext } from '@/context/ProfSettingsContext';
import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox'
import React, { useContext } from 'react'

type Props = {}

const ProfAgentDetails = (props: Props) => {
    const { profAgentDetails, setProfAgentDetails } = useContext(ProfSettingsContext)
    const { agency } = useContext(AuthContext)

    const handleChange = (e: any) => {
        if (setProfAgentDetails && profAgentDetails) {
            setProfAgentDetails({
                ...profAgentDetails,
                [e.target.name]: e.target.value,
            });
        }
    };


    return (
        <section className='bg-[#FCFCFC] flex flex-col space-y-3 mt-10 rounded-[10px] w-full  p-[20px]'>

            {/* the header */}
            <div>
                <h1 className='text-[#11142D] text-[20px] font-bold leading-normal'>Agent Details</h1>
            </div>

            {/* the bio */}
            <div className='mt-4 flex flex-col space-y-1'>
                <h1 className='text-[#808191] text-[14px] leading-[22px]'>Bio</h1>
                <Textarea name='Agency_bio' onChange={handleChange}
                    value={profAgentDetails?.Agency_bio} className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50' placeholder='Talent customers tend to earn a basic salary in the range of £15,000 to £35,000 per annum. However, talented customers also earn a commission for finding their clients work. Typically, agents receive around 10% of what the client is paid.' />

            </div>

            {/* the agency and expertise */}
            <div className='flex max-md:flex-col md:space-x-5 mt-4 md:items-center'>
                <div className='mt-4 w-full md:w-1/2 flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Agency</h1>
                    <Input name='Agency_name' onChange={handleChange}
                        value={profAgentDetails?.Agency_name} className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50' placeholder='All American Real Estate' />
                </div>

                <div className='mt-4 w-full md:w-1/2 flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Expertise</h1>
                    <Input name='Expertise' onChange={handleChange}
                        value={profAgentDetails?.Expertise} className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50' placeholder='This is just placeholder text. Do not be alarmed.' />
                </div>
            </div>

            {/* the tax number and service area*/}
            <div className='flex max-md:flex-col md:space-x-5 mt-4 md:items-center'>
                <div className='mt-4 w-full md:w-1/2 flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Tax Number</h1>
                    <Input name='Tax_number' onChange={handleChange}
                        value={profAgentDetails?.Tax_number} className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50 ' placeholder='All American Real Estate' />
                </div>

                <div className='mt-4 w-full md:w-1/2 flex flex-col space-y-1'>
                    <h1 className='text-[#808191] text-[14px] leading-[22px]'>Service area</h1>

                    <Input name='Service_area' onChange={handleChange}
                        value={profAgentDetails?.Service_area} className='bg-[#FCFCFC] border border-[#E4E4E4] px-[10px] rounded-[6px] py-[10px] placeholder-gray-500 placeholder-opacity-50' placeholder='This is just placeholder text. Do not be alarmed.' />
                </div>
            </div>
        </section>
    )
}

export default ProfAgentDetails