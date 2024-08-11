import IconShowcaseBox from '@/features/Dashboard/shared/IconShowcaseBox';
import Image from 'next/image'
import React from 'react'



const RelevantCard = () => {
    return (
        <div className='my-5 relative'>


            <div className='flex flex-col w-full cursor-pointer md:w-[370px] space-y-2  md:space-y-0 rounded-[12px] bg-white shadow-md md:mx-5 my-5 px-4 md:px-3 py-3'>
                <Image src={"/House.png"} alt='House png' className='w-full h-[222px] object-cover rounded-[12px]' height={1000} width={1000} />
                <div className='flex flex-col space-y-5 w-full'>
                    <h1 className='text-[16px] font-normal leading-[26px] text-[#666270]'>Hasan Ahmed | 21 Sep 2022</h1>
                    <h1 className='text-[26px] text-black font-semibold leading-[36px]'>Importance of Build quality of modern Real Estate</h1>
                    <h1 className='text-[#666270] font-normal leading-[26px] text-[16px]'>Properties are the most budget friendly so you have are an opportunity to find are the best...</h1>
                </div>
            </div>



        </div>
    )
}

export default RelevantCard