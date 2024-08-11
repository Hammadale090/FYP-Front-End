import Image from 'next/image'
import React from 'react'

type Props = {}

const StylistNews = (props: Props) => {
    return (
        <section className='max-w-[1400px] mx-auto my-20'>
            <h1 className='text-[#34495D] text-[26px] lg:text-[48px] font-bold leading-[56px] text-center mb-5 lg:mb-20'>Stylish News from Our Blog Read, Enjoy & Learn</h1>

            <div className='flex max-lg:flex-col max-lg:space-y-10 justify-center lg:space-x-20'>
                <div className='flex flex-col space-y-3 max-w-[565px]'>
                    {/* the image */}
                    <Image src={"/Landing/Home.jpg"} alt='home' className=' w-full max-h-[376px] object-cover' width={1000} height={1000} />
                    {/* the header text */}
                    <h1 className='text-[#34495D] text-[38px] font-semibold leading-[48px]'>7 Reasons to Buy a New Construction Home</h1>
                    {/* the sub header text  */}
                    <h1 className='text-[#383838] text-[16px] font-normal leading-[26px]'>
                        If you are in the market for a new home, you might be weighing whether to buy a resale home or a new construction home. Buying a new construction home may be well within your reach today....
                    </h1>
                </div>
                <div className='flex flex-col space-y-3 max-w-[565px]'>
                    {/* the image */}
                    <Image src={"/Landing/Home.jpg"} alt='home' className=' w-full max-h-[376px] object-cover' width={1000} height={1000} />
                    {/* the header text */}
                    <h1 className='text-[#34495D] text-[38px] font-semibold leading-[48px]'>7 Reasons to Buy a New Construction Home</h1>
                    {/* the sub header text  */}
                    <h1 className='text-[#383838] text-[16px] font-normal leading-[26px]'>
                        If you are in the market for a new home, you might be weighing whether to buy a resale home or a new construction home. Buying a new construction home may be well within your reach today....
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default StylistNews