import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import React from 'react'

type Props = {}

const RequestAVisit = (props: Props) => {
    return (
        <section className='max-w-[1400px] mx-auto my-20'>

            <div className='flex max-xl:flex-col max-xl:space-y-6 justify-center w-full xl:space-x-20'>
                {/* the request visit form */}
                <div className='bg-[#C3FFE3] w-full xl:w-[60%] py-[60px] px-[50px]'>
                    <h1 className='text-[#34495D] font-bold leading-[46px] text-[38px] text-center'>Request a Visit</h1>
                    <form className='w-full mt-10 flex flex-col space-y-4'>
                        <Input placeholder='First Name*' className='w-full bg-white h-[52px]' />
                        <Input placeholder='Email' className='w-full bg-white h-[52px]' />
                        <div className='flex space-x-7'>
                            <Input placeholder='DD/MM/YYYY' className='w-[50%] bg-white h-[52px]' />
                            <Input placeholder='Time' className='w-[50%] bg-white h-[52px]' />
                        </div>
                        <Textarea placeholder='Message' />
                        <div className='w-full py-[14px] rounded-[4px] border border-[#3EB87F] bg-[#3EB87F] text-center text-white text-[16px] font-semibold leading-[26px]'>
                            Contact
                        </div>
                    </form>
                </div>
                {/* the image */}
                <Image src={"/Landing/RequestAVisit.jpg"} width={1000} height={1000} className='object-cover h-[400px] xl:h-[560px]' alt='Request A width' />
            </div>
        </section>
    )
}

export default RequestAVisit