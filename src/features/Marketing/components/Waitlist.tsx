import FaqAccordion from '@/features/FAQ/components/FaqAccordion'
import React from 'react'
import Businessfaq from '../shared/BusinessFaq'

type Props = {}

const Waitlist = (props: Props) => {
    return (

        <div className='max-w-[1200px] max-md:px-[5px] mx-auto mt-[40px] flex max-md:flex-col max-md:space-y-2 md:justify-between items-start px-[18px]'>

            <div className='flex flex-col space-y-6 sm:max-w-[570px] px-[18px] mt-[20px]'>

                <h1 className='text-[32px] md:text-[42px] leading-[52px] font-extrabold text-[#34495D]'>Most Asked Questions About Us</h1>
                <h1 className='text-[16px] md:text-[18px] font-normal leading-[24px] md:leading-[30px] text-[#5D5D6C]'>We have been happily serving customers for years with love and care, and we aim to continue this tradition. If you&lsquo;ve got a question about our products or delivery options, we&lsquo;ve got the answers.</h1>

                {/* join the waitlist */}
                <div  className="max-md:flex max-md:justify-center">
                    <div className='bg-[#3EB87F] mt-7 w-full flex justify-center sm:w-fit px-[36px] py-[15px] text-[16px] font-semibold text-white leading-[26px] cursor-pointer rounded-[4px] '>
                        Join the waitlist
                    </div>
                </div>



            </div>

            <div className='flex flex-col space-y-[10px] px-[18px]'>
                <Businessfaq header={"This is just placeholder text. Don’t be alarmed?"} innerText={"Most real estate agents will require a pre-approval before showing homes home buying process - this is especially true at the higher end of the real estate market; sellers of luxury homes will only allow pre-screened (and verified) buyers to view their homes."} />
                <Businessfaq header={"This is just placeholder text. Don’t be alarmed?"} innerText={"Most real estate agents will require a pre-approval before showing homes home buying process - this is especially true at the higher end of the real estate market; sellers of luxury homes will only allow pre-screened (and verified) buyers to view their homes."} />
                <Businessfaq header={"This is just placeholder text. Don’t be alarmed?"} innerText={"Most real estate agents will require a pre-approval before showing homes home buying process - this is especially true at the higher end of the real estate market; sellers of luxury homes will only allow pre-screened (and verified) buyers to view their homes."} />
            </div>


        </div>
    )
}

export default Waitlist