import { TextInput } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

type Props = {}

const PropertyPreference = (props: Props) => {
    return (
        <section className='flex max-xl:flex-col xl:justify-between max-w-[1400px] mx-auto'>
            <div className=' max-xl:flex max-xl:flex-col max-xl:space-y-2 max-xl:items-center  xl:relative xl:ml-32'>
                <Image src={"/Landing/Image1.png"} className='max-w-[317px] max-h-[211px] object-cover xl:absolute xl:bottom-[30%] xl:-left-48 ' alt='image 1' height={1000} width={1000} />
                <div className='flex flex-col space-y-2 xl:space-y-10'>
                    <Image src={"/Landing/Image2.png"} className='max-w-[317px] max-h-[211px] object-cover ' alt='image 1' height={1000} width={1000} />
                    <Image src={"/Landing/Image3.png"} className='max-w-[317px] max-h-[211px] ml-[10px] object-cover ' alt='image 1' height={1000} width={1000} />
                </div>

            </div>

            <div className='flex flex-col space-y-4 w-full xl:w-1/3'>
                <h1 className='text-[#34495D] text-[38px] font-semibold leading-[48px]'>Nesti Better. Access Diversification, Passive Income, and Potential Tax Savings.</h1>
                <h1 className='text-[#383838] text-[16px] font-normal leading-[26px]'>This is just placeholder text. Don’t be alarmed. This is just placeholder text. This is just placeholder text. Don’t be alarmed. This is just placeholder text.</h1>
                {/* the text input */}
                <TextInput
                    className='bg-[#F4F3F3] rounded-[8px]'
                    placeholder='Write your property preferences...'
                    size='lg'
                    leftSection={
                        <div>
                            <Image src={"/Landing/Stars.svg"} className='w-[15px] h-[15px]' alt='emoji' height={500} width={500} />
                        </div>
                    }
                />
                <div className='flex space-x-2 w-fit bg-[#3EB87F] items-center mr-7 px-4 py-4 rounded-[10px] cursor-pointer'>
                    <div className='flex space-x-5 items-center px-3'>
                        <h1 className='text-white text-[14px] font-normal leading-[18px]'>Search with A.I.</h1>
                        <Image src={"/send.svg"} className='w-[18px] h-[18px]' alt='emoji' height={500} width={500} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PropertyPreference