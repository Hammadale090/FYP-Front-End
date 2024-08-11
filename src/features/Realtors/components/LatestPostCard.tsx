import Image from 'next/image'
import React from 'react'

type Props = {
    header: string;
    date: string;
    PostImage: string;
}

const LatestPostCard = ({ header, date, PostImage }: Props) => {
    return (
        <div className='flex space-x-7 items-center my-5'>
            {/* the image */}
            <Image className='w-[102px] h-[94px] rounded-[8px] ' src={PostImage} width={1000} height={1000} objectFit="cover" alt="The post image" />
            <div className='flex flex-col space-y-2'>
                {/* the post header */}
                <h1 className='text-[16px] font-semibold leading-[26px] text-[#0B0C0E]'>{header}</h1>

                {/* the date  */}
                <h1 className='text-[14px] font-normal leading-[24px]'>{date}</h1>
            </div>
        </div>
    )
}

export default LatestPostCard