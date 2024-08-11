import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Rating } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import MortgageSelectBox from './MortgageSelectBox'
import MortgageCheckBox from './MortgageCheckbox'

type Props = {}

const MortgageRightSection = (props: Props) => {
    return (
        <div className='w-full bg-[#F3F3F3] rounded-[8px] h-fit py-10'>

            {/* profile pic */}
            <div className='flex justify-center'>
                <Image src={"/Dashboard/Realtors.svg"} className='w-[142px] h-full rounded-full' alt='Mortgage man profile' width={1000} height={1000} />
            </div>

            {/* the name */}
            <h1 className='text-[24px] font-semibold leading-[26px] text-[#0B0C0E] text-center my-2'>Adom Shafi</h1>
            {/* 4 others */}
            <h1 className='text-[16px] font-semibold leading-[26px] text-[#3EB87F] text-center my-2 underline'>& 4 Others</h1>
            {/* position */}
            <h1 className='text-[16px] font-normal leading-[26px] text-[#383838] text-center my-2'>Sales Excutive</h1>
            {/* gmail */}
            <h1 className='text-[16px] font-normal leading-[26px] text-[#383838] text-center my-2'>gmail.1234@gmail.com</h1>
            {/* rating */}
            <div className='flex justify-center'>
                <Rating defaultValue={5} />
            </div>

            {/* socials */}
            <div className='flex justify-center mt-10'>
                <div className='flex space-x-3 items-center'>
                    {/* facebook */}
                    <div className='rounded-[8px] border px-[7px] py-[7px] border-[#CDCDCD]'>
                        <Image src={"/Landing/Facebookk.svg"} className='w-[18px] h-[18px]' alt='facebook' width={500} height={500} />
                    </div>
                    {/* twitter */}
                    <div className='rounded-[8px] border px-[7px] py-[7px] border-[#CDCDCD]'>
                        <Image src={"/Landing/Twitter.svg"} className='w-[18px] h-[18px]' alt='facebook' width={500} height={500} />
                    </div>

                    {/* linkedin */}
                    <div className='rounded-[8px] border px-[7px] py-[7px] border-[#CDCDCD]'>
                        <Image src={"/Landing/Linkedin.svg"} className='w-[18px] h-[18px]' alt='facebook' width={500} height={500} />
                    </div>

                    {/* instagram */}
                    <div className='rounded-[8px] border px-[7px] py-[7px] border-[#CDCDCD]'>
                        <Image src={"/Landing/Instagram.svg"} className='w-[18px] h-[18px]' alt='facebook' width={500} height={500} />
                    </div>
                </div>
            </div>


            {/* form */}
            <form className='w-full mt-5'>
                {/* full name */}
                <div className='flex justify-center'>
                    <Input placeholder='Full Name*' className='my-1 w-[80%]' />
                </div>

                {/* phone number */}
                <div className='flex justify-center'>
                    <Input placeholder='Phone Number*' className='my-1 w-[80%]' />
                </div>

                {/* email address */}
                <div className='flex justify-center'>
                    <Input placeholder='Email Address*' className='my-1 w-[80%]' />
                </div>

                {/* message */}
                <div className='flex justify-center'>
                    <Textarea placeholder='Message to the broker' className='my-1 w-[80%]' />
                </div>
                {/* select */}
                <div className='flex justify-center'>
                    <MortgageSelectBox data={["default Select"]} header='' />
                </div>


                {/* terms of use */}
                <div className='flex justify-center'>
                    <MortgageCheckBox text={"By submitting this form I agree to Terms of Use"} />
                </div>

                {/* send message and call */}
                <div className='flex space-x-3 items-center justify-center my-2'>
                    <div className='px-[28px] py-[12px] cursor-pointer rounded-[4px] gap-[10px] bg-[#3EB87F] text-[16px] font-semibold leading-[26px] text-white'>
                        Send Message
                    </div>

                    <div className='px-[28px] py-[12px] cursor-pointer rounded-[4px] gap-[10px] border border-ravinna text-[16px] font-semibold leading-[26px] text-ravinna'>
                        Call
                    </div>
                </div>
            </form>


            {/* block a meeting */}
            <div className='flex justify-center my-2 w-full'>
                <div className='w-[80%] py-[12px] rounded-[4px] flex justify-center border-[1.5px] border-ravinna'>
                    <div className='flex space-x-2 items-center'>
                        <Image src={"/Mortgage/Calendar.svg"} alt='calendar' className='w-[16px] h-[16px]' width={500} height={500} />
                        <h1 className='text-ravinna text-[16px] font-semibold leading-[26px]'>Book a meeting</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MortgageRightSection