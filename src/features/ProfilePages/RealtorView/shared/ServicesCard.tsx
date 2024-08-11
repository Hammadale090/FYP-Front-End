import Image from 'next/image'
import React from 'react'

type Props = {
    featuredClassName?: boolean;
}

const ServicesCard = ({ featuredClassName }: Props) => {
    return (
        <div className={`w-5/6 ${featuredClassName ? "md:w-[338px]" : "md:w-[290px]"} h-full cursor-pointer md:mx-2 my-2 flex-shrink-0 border border-black rounded-xl`}>
            {/* the property Image */}
            <Image height={1000} width={1000} className='h-[240px] rounded-t-xl object-cover' alt='property Image' src={"/Broker/Services.png"} />
            {/* The lower div */}
            <div className='py-5 px-5 space-y-3'>
                {/* The views and likes */}
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2  items-center'>
                        <Image src={"/Feed/view.svg"} className='h-[16px] w-[16px]' height={500} width={500} alt='view' />
                        <h1 className='text-[14px] leading-[20px] font-normal text-[#34495D]'>12 Views</h1>
                    </div>

                    <div className='flex space-x-1 items-center'>
                        <Image src={"/Feed/Favorite.svg"} className='h-[24px] w-[24px]' height={500} width={500} alt='favorite icon' />
                        <h1 className='text-[14px] leading-[20px] font-normal text-black'>12</h1>
                    </div>
                </div>
                {/* the Title */}
                <h1 className='text-[16px] font-normal text-[#34495D]'>Property Title</h1>
                {/* the description */}
                <h1 className='text-[12px] font-normal text-black'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</h1>
                <div className='flex space-x-2 items-center my-4'>
                    {/* the location icon */}
                    <Image alt='the location png' height={500} width={500} className='w-5 h-5' src={"/Dashboard/Feedlocation.png"} />
                    <h1 className='text-[12px] font-normal text-[#34495D]'>Location</h1>
                </div>

                <div>
                    <h1 className='text-black text-[10px] '>Sold!!!</h1>
                    <h1 className='text-[#34495D] text-[20px] font-extrabold'>$50.000 over asking price!!!</h1>
                </div>



                {/* view details button */}
                <div className='w-full h-[38px] text-white text-[16px] font-normal bg-[#3EB87F] rounded-[6px] flex flex-col justify-center items-center'>
                    View Details
                </div>
            </div>
        </div>
    )
}

export default ServicesCard