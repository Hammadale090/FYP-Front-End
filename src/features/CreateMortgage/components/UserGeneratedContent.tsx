import Image from 'next/image'
import React from 'react'

type Props = {}

const UserGeneratedContent = (props: Props) => {
    return (
        <div>
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>User-Generated Content Showcase</h1>

            <div className='flex flex-wrap justify-center'>
                <Image src={"/Mortgage/Home1.png"} width={500} height={500} className="max-w-[248px] my-2 mx-2 max-h-[248px] rounded-[6px]" alt='generated content' />
                <Image src={"/Mortgage/Home2.png"} width={500} height={500} className="max-w-[248px] my-2 mx-2 max-h-[248px] rounded-[6px]" alt='generated content' />
                <Image src={"/Mortgage/Home3.png"} width={500} height={500} className="max-w-[248px] my-2 mx-2 max-h-[248px] rounded-[6px]" alt='generated content' />
                <Image src={"/Mortgage/Home1.png"} width={500} height={500} className="max-w-[248px] my-2 mx-2 max-h-[248px] rounded-[6px]" alt='generated content' />
                <Image src={"/Mortgage/Home2.png"} width={500} height={500} className="max-w-[248px] my-2 mx-2 max-h-[248px] rounded-[6px]" alt='generated content' />
                <Image src={"/Mortgage/Home4.png"} width={500} height={500} className="max-w-[248px] my-2 mx-2 max-h-[248px] rounded-[6px]" alt='generated content' />
            </div>
        </div>
    )
}

export default UserGeneratedContent