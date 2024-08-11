import Image from 'next/image'
import React from 'react'

type Props = {}

const ModernSpace = (props: Props) => {
    return (
        <div className='flex  max-xl:flex-col max-xl:space-y-2 xl:justify-between max-w-[1400px] mx-auto my-20'>

            <div className='flex flex-col space-y-2 md:space-y-4'>
                <h1 className='text-[#34495D] md:w-[520px] text-[26px] md:text-[48px] font-bold leading-[56px]'>Modern Spaces and Premium Apartment Complexes</h1>
                <h1 className='text-[#383838] text-[16px] md:text-[24px] font-medium leading-[34px] md:w-[440px]'>Welcome to Nesti Residence Showcase</h1>
                <h1 className='text-[#383838] text-[14px] md:text-[16px] font-normal leading-[26px] md:w-[409px]'>When you invest, you’ll have an equity stake in a collection of properties without the hassle of purchasing and managing it yourself.</h1>
            </div>


            <div className='max-xl:flex max-xl:flex-col max-xl:space-y-2 xl:relative xl:ml-32'>
                <Image src={"/Landing/Image1.png"} className='w-full xl:max-w-[317px] max-h-[211px] object-cover xl:absolute md:bottom-[10%] xl:-left-48 ' alt='image 1' height={1000} width={1000} />
                <div>
                    <Image src={"/Landing/Dining.png"} className='w-full xl:max-w-[356px] max-h-[442px] object-cover ' alt='image 1' height={1000} width={1000} />
                </div>

            </div>
        </div>
    )
}

export default ModernSpace