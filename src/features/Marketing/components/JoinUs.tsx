import Image from 'next/image'
import React from 'react'

type Props = {}

const JoinUs = (props: Props) => {
    return (

        <div className='max-w-[1200px] max-md:px-[5px] mx-auto flex max-md:flex-col max-md:space-y-2 md:justify-between items-center px-[18px]'>

            <div className='w-full px-[18px]'>
                <Image src={"/ui/cards.png"} alt='Cards' className='h-full max-sm:w-full md:max-w-[506px]  object-cover ' width={1000} height={1000} />
            </div>





            <div className='flex flex-col w-full px-[18px]'>
                <h1 className='text-[#34495D] text-[24px] md:text-[48px] leading-[56px] font-bold md:mb-[7px]'>Join us as a</h1>
                <h1 className=' text-[48px] md:text-[96px] leading-[56px] font-bold text-[#34495D]'>REALTOR</h1>

                <h1 className='text-[20px] md:text-[24px] max-md:max-w-[338px] leading-[26px] text-[#383838] font-semibold my-10'>As a professional you will have access to:</h1>


                {/* the lead icons and text */}
                <div className='grid gap-[18px] grid-cols-1 md:grid-cols-2'>

                    <div className="flex flex-col max-md:space-y-2">
                        <div className='flex space-x-2 items-center text-[20px] leading-[26px] tracking-[2%] font-medium'>
                            <Image alt='icon landing' src={"/ui/card.png"} className='h-[24px] w-[24px] object-cover' width={500} height={500} />
                            <h1>Lead Generation tools</h1>
                        </div>
                        <h1 className="text-[12px] text-black leading-[17px] max-w-[338px] md:max-w-[242px]">Unlock high-quality leads effortlessly with our AI-driven lead generation tools. Targeted precision, guaranteed results.</h1>
                    </div>

                    <div className="flex flex-col max-md:space-y-2">
                        <div className='flex space-x-2 items-center text-[20px] leading-[26px] tracking-[2%] font-medium'>
                            <Image alt='icon landing' src={"/Landing/teacher.png"} className='h-[24px] w-[24px] object-cover' width={500} height={500} />
                            <h1>AI learning chatbot</h1>
                        </div>
                        <h1 className="text-[12px] text-black leading-[17px] max-w-[338px] md:max-w-[242px]">Get real-time, expert real estate advice tailored to you. Our AI learning chatbot is your personal property guru.</h1>
                    </div>

                    <div className="flex flex-col max-md:space-y-2">
                        <div className='flex space-x-2 items-center text-[20px] leading-[26px] tracking-[2%] font-medium'>
                            <Image alt='icon landing' src={"/Landing/status.png"} className='h-[24px] w-[24px] object-cover' width={500} height={500} />
                            <h1>Marketing Insights</h1>
                        </div>
                        <h1 className="text-[12px] text-black leading-[17px] max-w-[338px] md:max-w-[242px]">Transform data into strategy with our AI-powered marketing insights. Stay ahead with predictive analytics and trends.</h1>
                    </div>

                    <div className="flex flex-col max-md:space-y-2">
                        <div className='flex space-x-2 items-center text-[20px] leading-[26px] tracking-[2%] font-medium'>
                            <Image alt='icon landing' src={"/Landing/headphone.png"} className='h-[24px] w-[24px] object-cover' width={500} height={500} />
                            <h1>AI Assistant</h1>
                        </div>
                        <h1 className="text-[12px] text-black leading-[17px] max-w-[338px] md:max-w-[242px]">Streamline your workflow with our AI chatbot assistant. From scheduling to client queries, it&apos;s your 24/7 digital aide.</h1>
                    </div>

                </div>

                <div className="flex flex-col max-md:space-y-2 mt-[24px]">
                    <div className='flex space-x-2 items-center text-[20px] leading-[26px] tracking-[2%] font-medium'>
                        <Image alt='icon landing' src={"/Landing/profileAdd.png"} className='h-[24px] w-[24px] object-cover' width={500} height={500} />
                        <h1>Digitized referral programs</h1>
                    </div>
                    <h1 className="text-[12px] text-black leading-[17px] max-w-[338px] md:max-w-[440px]">Close deals faster by giving clients exclusive discounts with our AI-enhanced referral program. Let your client assist you in closing sales through refer a friend program! Grow your network while saving money.</h1>
                </div>

                <div className=' mt-4 w-full sm:w-fit flex space-x-2 items-center justify-center text-[16px] font-semibold text-[#3EB87F] leading-[26px] cursor-pointer rounded-[4px] '>
                    <h1>Sign Up for Beta Testing</h1>
                    <Image src="/Landing/Ar.png" alt="ar" width={500} height={500} className="w-7 h-7 object-cover" />
                </div>

            </div>
        </div>
    )
}

export default JoinUs