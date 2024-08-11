import Image from 'next/image'
import React from 'react'

type Props = {}

const TrustedBrands = (props: Props) => {
    return (
        <section className='max-w-[1400px] mx-auto my-7 md:my-32 flex max-md:flex-col max-md:space-y-2 justify-between'>

            <div className='flex max-md:flex-col max-md:items-center max-md:space-y-2 md:space-x-11'>
                <div className='flex flex-col max-md:items-center space-y-2'>
                    <h1 className='text-[#34495D] text-[38px] font-bold leading-[46px]'>975<span className='text-[#3EB87F]'>K+</span></h1>
                    <h1 className='text-[#383838] text-[16px] font-normal leading-[26px] max-w-[199px]'>Thousands of the best homes already sold</h1>
                </div>
                <div className='flex flex-col max-md:items-center space-y-2'>
                    <h1 className='text-[#34495D] text-[38px] font-bold leading-[46px]'>195<span className='text-[#3EB87F]'>K+</span></h1>
                    <h1 className='text-[#383838] text-[16px] font-normal leading-[26px] max-w-[199px]'>A wide selection of the best homes still avaliable</h1>
                </div>
            </div>

            <div className='flex flex-col space-y-7'>
                <h1 className='text-[#383838] max-md:text-center text-[24px] font-medium leading-[34px] '>Trusted by global brands</h1>
                <div className='max-md:flex max-md:flex-col max-md:items-center max-md:space-y-2 md:grid md:grid-cols-3 md:gap-10'>
                    <Image src={"/Landing/Vision.png"} className='w-[83.077px]' alt='Vision src' width={1000} height={1000} />
                    <Image src={"/Landing/Recharge.png"} className='w-[96.333px]' alt='Vision src' width={1000} height={1000} />
                    <Image src={"/Landing/Uturn.png"} className='w-[90.423px]' alt='Vision src' width={1000} height={1000} />
                    <Image src={"/Landing/Hitech.png"} className='w-[78.974px]' alt='Vision src' width={1000} height={1000} />
                    <Image src={"/Landing/NextMove.png"} className='w-[139.487px]' alt='Vision src' width={1000} height={1000} />
                    <Image src={"/Landing/Umbrella.png"} className='w-[96.782px]' alt='Vision src' width={1000} height={1000} />
                </div>
            </div>
        </section>
    )
}

export default TrustedBrands