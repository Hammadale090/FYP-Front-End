import React from 'react'
import MortgageSelectBox from './MortgageSelectBox'
import Image from 'next/image'
import { Rating } from '@mantine/core'

type Props = {}

const MortgageRatingsAndReviews = (props: Props) => {
    return (
        <div className='w-full'>
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Ratings $ Reviews</h1>

            {/* Ratings and Review box */}
            <div className='rounded-[8px] border border-[#CDCDCD] bg-white py-[30px] px-[30px] w-full'>
                {/* Reviews and sorting */}
                <div className='flex items-center justify-between'>
                    <h1 className='text-[16px] leading-[26px] text-[#0B0C0E]'>1 Reviews</h1>
                    <div className='flex space-x-2 items-center'>
                        <h1 className='text-[10px] font-medium leading-[14px] text-[#383838] text-nowrap'>Sort by:</h1>
                        <MortgageSelectBox data={["Default Order", "Date Old to New", "Date New to Old"]} header='' defaultText='Rating (low to High)' />
                    </div>
                </div>

                {/* the broker chat */}
                <div className='flex space-x-5 items-start mt-10'>
                    {/* the image */}
                    <Image src={"/Mortgage/Man2.svg"} alt='mortgage' width={1000} height={1000} className="w-[66px] h-[66px]" />

                    <div className='flex flex-col space-y-5'>
                        <div className='flex space-x-4 items-center'>
                            <h1 className='text-[#0B0C0E] text-[16px] font-semibold leading-[26px]'>Mafuzul Islam Nabil</h1>
                            <Rating defaultValue={5} />
                        </div>
                        {/* date */}
                        <h1 className='text-[14px] leading-[24px] font-normal text-[#383838]'>September 6, 2022</h1>
                        {/* message/review */}
                        <h1 className='text-[16px] leading-[26px] text-[#383838]'>
                            Parissa has been listing and selling new construction for my firm in the last 4 years. Her dedication and hard work is outstanding. She is extremely knowledgeable in the real estate field and highly recommended. Always available pleasure to work with.
                        </h1>

                        {/* helpful, yes or no */}
                        <div className='flex space-x-4 mt-16 items-center'>
                            <h1 className='text-[13px] font-semibold leading-[25px] text-[#404145]'>Helpful?</h1>

                            {/* yes */}
                            <div className='flex space-x-2 items-center'>
                                <Image src={"/Mortgage/Yes.svg"} className='w-[14px] h-[14px] cursor-pointer' alt='yes' width={500} height={500} />
                                <h1 className='text-[13px] font-semibold leading-[21px] text-[#404145]'>Yes</h1>
                            </div>
                            {/* NO */}
                            <div className='flex space-x-2 items-center'>
                                <Image src={"/Mortgage/No.svg"} className='w-[14px] h-[14px] cursor-pointer' alt='yes' width={500} height={500} />
                                <h1 className='text-[13px] font-semibold leading-[21px] text-[#404145]'>No</h1>
                            </div>
                        </div>

                        {/* Realtor's Response */}
                        <div className='flex space-x-4 items-start mt-10'>
                            <Image src={"/Mortgage/Man.jpg"} alt='mortgage' width={500} height={500} className="w-[32px] h-[32px]" />
                            <div className='flex flex-col space-y-5'>
                                <h1 className='text-[#404145] text-[15px] font-bold leading-[24px]'>Realtor&apos;s Response</h1>
                                <h1 className='text-[14px] leading-[24px] text-[#404145]'>Thank you so much 😊</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MortgageRatingsAndReviews