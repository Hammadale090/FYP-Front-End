import Image from 'next/image'
import React from 'react'

type Props = {}

const ExploreFeatures = (props: Props) => {
    return (

        <div className='max-w-[1400px] mx-auto mt-[40px] px-[18px]'>
            <div className='flex flex-col flex-wrap md:flex-row max-md:items-center max-md:space-y-7 justify-center w-full'>
                <div className='hidden md:flex flex-col md:space-y-20'>

                    <div className='flex flex-col space-y-2 md:space-y-5 items-center'>
                        <h1 className='text-[#34495D] text-[20px] md:text-[30px] font-bold leading-[48px]'>AI Pricing Estimations</h1>
                        <h1 className='text-[#383838] text-[14px] md:text-[16px] leading-[26px] font-normal w-[360px] text-center'>Understanding the cost is crucial and A.I. technology can revolutionize your business using factors that impact the final price tag.</h1>
                    </div>

                    <div className='flex flex-col space-y-2 md:space-y-5 items-center'>
                        <h1 className='text-[#34495D] text-[20px] md:text-[30px] font-bold leading-[48px]'>AI Onboarding process</h1>
                        <h1 className='text-[#383838] text-[14px] md:text-[16px] leading-[26px] font-normal w-[360px] text-center'>Let our intelligent assistant guide you through a smooth and personalized journey matched with the perfect property faster than ever before.</h1>
                    </div>

                    <div className='flex flex-col space-y-2 md:space-y-5 items-center'>
                        <h1 className='text-[#34495D] text-[20px] md:text-[30px] font-bold leading-[48px]'>Tailored Preferences</h1>
                        <h1 className='text-[#383838] text-[14px] md:text-[16px] leading-[26px] font-normal w-[360px] text-center'>Discover your dream home faster. We&rsquo;ll match you with listings that align with your must-haves and lifestyle preferences.</h1>

                    </div>

                </div>


                {/* phone png */}
                <Image src="/ui/phone.png" alt="phone png" width={1000} height={1000} className='md:max-w-[400px] h-full object-cover' />


                <div className='flex flex-col md:space-y-20'>

                    <div className='hidden md:flex flex-col space-y-2 md:space-y-5 items-center'>

                        <h1 className='text-[#34495D] text-[20px] md:text-[30px] font-bold leading-[48px]'>In house Chat Support</h1>
                        <h1 className='text-[#383838] text-[14px] md:text-[16px] leading-[26px] font-normal w-[360px] text-center'>Our friendly chat support team is here to answer your questions in real-time, helping you navigate your home search with ease.</h1>
                    </div>

                    <div className='hidden md:flex flex-col space-y-2 md:space-y-5 items-center'>
                        <h1 className='text-[#34495D] text-[20px] md:text-[30px] font-bold leading-[48px]'>AI generated branding</h1>
                        <h1 className='text-[#383838] text-[14px] md:text-[16px] leading-[26px] font-normal w-[360px] text-center'>Skip the design fees and long turnaround times. Get an instant brand package, built by AI, that makes your listing stand out from the crowd.</h1>
                    </div>

                    <div className='hidden md:flex flex-col space-y-2 md:space-y-5 items-center'>
                        <h1 className='text-[#34495D] text-[20px] md:text-[30px] font-bold leading-[48px]'>Customized Pro Profile</h1>
                        <h1 className='text-[#383838] text-[14px] md:text-[16px] leading-[26px] font-normal w-[360px] text-center'>Stand out from the crowd. Craft a profile that showcases your expertise and achievements, attracting the right clients and deals.</h1>

                    </div>

                    <div className='flex flex-col md:hidden space-y-2 md:space-y-5 items-center '>
                        <h1 className='text-[#34495D] text-[20px] md:text-[30px] font-bold leading-[48px]'>AI Pricing Estimations</h1>
                        <h1 className='text-[#383838] text-[14px] md:text-[16px] leading-[26px] font-normal sm:w-[360px] text-center'>Understanding the cost is crucial and A.I. technology can revolutionize your business using factors that impact the final price tag.</h1>
                    </div>

                </div>
            </div>

            <div className='flex justify-center mt-[20px]'>
                <div className='bg-[#3EB87F] flex justify-center max-sm:w-full px-[36px] py-[10px] text-[16px] font-semibold text-white leading-[26px] cursor-pointer rounded-[4px] '>
                    Explore App Features
                </div>
            </div>
        </div>
    )
}

export default ExploreFeatures