import Image from 'next/image'
import React from 'react'

interface ImageProps {
    url: string;
    altText: string; // Optional altText property
}

interface MyComponentProps {
    header: string;
    propNumber: string;
    image: ImageProps; // Using the defined ImageProps interface
}

const OverviewCard = ({ header, propNumber, image }: MyComponentProps) => {
    return (
        <div className='flex space-x-2 my-2'>
            <div className='rounded-[8px] px-[11px] py-[11px] bg-[#F3F3F3]'>
                <Image src={image.url} alt={image.altText} className='w-[28px] h-[28px] object-cover' width={500} height={500} />
            </div>

            <div className='flex flex-col space-y-2'>
                <h1 className='text-[14px] font-normal leading-[24px] text-[#383838]'>{header}</h1>
                <h1 className='text-[14px] font-semibold leading-[24px] text-[#0B0C0E]'>{propNumber}</h1>
            </div>
        </div>
    )
}

export default OverviewCard