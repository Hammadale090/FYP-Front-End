import { Divider } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import PlanCheck from '../Settings/components/PlanCheck'
import Plan from '../Settings/components/Plan'

type Props = {}

const ChatbotPaymentTiers = (props: Props) => {
    let white = false;
    return (
        <section className='max-md:px-3'>
            <Divider my="sm" />

            <div className='max-w-[1000px] mx-auto my-10 flex flex-col space-y-8'>
                <Divider />
                <h1 className='text-[#222529] text-[24px] font-normal leading-[30px] text-center'>Chatbot payment tiers</h1>

                <div className='xl:w-[1004px] h-[404px] bg-[#3EB87F] rounded-[10px] items-center flex max-md:flex-col max-md:space-y-2 md:justify-around'>
                    <div>
                        <div className=' flex  justify-center'>
                            <div className={`flex flex-col justify-center ${white && "border-1 border-[#34495D]"} items-center py-[10px] w-[151px]  bg-white rounded-[10px] gap-[10px]`}>
                                <h1 className={`${white ? "text-[#034F75]" : "text-[#3EB87F]"} text-[24px] font-medium `}>Trial Plan</h1>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <h1 className={`text-[60px] font-semibold text-center ${white ? "text-[#3EB87F]" : "text-white"} h-[70px]`}>Free</h1>
                            <h1 className={`text-[15px] font-semibold text-center ${white ? "text-[#34495D]" : "text-white"} `}>user/month</h1>
                        </div>

                        {/* the plan details */}
                        <div className='mt-7'>
                            <PlanCheck white={!white} text='This is just placeholder text' />
                            <PlanCheck white={!white} text='This is just placeholder text' />
                            <PlanCheck white={!white} text='This is just placeholder text' />
                            <PlanCheck white={!white} text='This is just placeholder text' />

                        </div>

                        {/* choose the plan */}
                        <div className='flex justify-center mt-5'>
                            <div className={` ${white ? "bg-[#C3FFE3]" : "bg-[#34495D]"} rounded-[10px] h-[55px] w-[231px] flex flex-col justify-center items-center`}>
                                <h1 className={`text-[20px] font-medium ${white ? "text-[#34495D]" : "text-white"} `}>Choose Plan</h1>
                            </div>
                        </div>
                    </div>
                    
                    <Image src={
                        "/Dashboard/TierFree.svg"
                    } className="h-[390px] w-[373px] max-md:hidden mix-blend-luminosity" height={1000} width={1000} alt='tier free' />
                </div>

                <div className=' max-md:flex max-md:flex-col max-md:items-center md:grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    <Plan header='Premium' price='£12' white />
                    <Plan header='Premium' price='£12' white />
                    <Plan header='Premium' price='£12' white />
                </div>

                <h1 className='text-[11px] font-medium leading-[18px] tracking-[0.5px] uppercase text-center text-[#222529] mt-9'>You will be asked to log in again with your new Subscription after you save your changes.</h1>
            </div>
        </section>
    )
}

export default ChatbotPaymentTiers