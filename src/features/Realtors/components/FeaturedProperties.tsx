"use client";
import React from 'react'
import FeaturedCarousel from './FeaturedCarousel';

type Props = {}

const FeaturedProperties = (props: Props) => {

    return (

        <section className='w-full md:w-[370px] h-[354px] flex-shrink-0 rounded-[8px] px-5 bg-[#f3f3f3] '>
            <h1 className='text-black text-[24px] font-semibold leading-[34px] mt-4'>Featured Properties</h1>


   
            <FeaturedCarousel />
            {/* the button */}
            <div className='w-full my-2 h-[50px] cursor-pointer rounded-[4px] gap-[10px] flex bg-[#3EB87F] flex-col justify-center items-center'>
                <h1 className='text-[16px] font-semibold leading-[26px] text-white'>Search</h1>
            </div>
        </section>
    )
}

export default FeaturedProperties