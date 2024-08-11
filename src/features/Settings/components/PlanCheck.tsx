import { PlanCheckIcon } from '@/features/DashboardLayout/svgs';
import Image from 'next/image'
import React from 'react'

type Props = {
    text: string;
    white?: boolean;
}

const PlanCheck = ({ text, white }: Props) => {
    return (
        <div className='flex gap-[22px] my-2 items-center justify-center w-full '>
            <PlanCheckIcon white={white} />

            <h1 className={`text-[15px] font-normal ${white ? "text-white" : "text-[#034F75]"} `}>{text}</h1>
        </div>
    )
}

export default PlanCheck