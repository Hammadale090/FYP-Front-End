import { PlanCheckIcon } from '@/features/DashboardLayout/svgs';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Image from 'next/image'
import React from 'react'

type Props = {
    text: string;
    white?: boolean;
}

const PlanCheck = ({ text, white }: Props) => {
    return (
        <div className='flex gap-[22px] my-2 items-center justify-center w-full '>
            <IoIosCheckmarkCircleOutline className={`${white ? "text-white " : "text-[#2DC937] group-hover:text-white"}`}/>

            <h1 className={`text-[15px] font-normal ${white ? "text-white" : "text-[#034F75] group-hover:text-white"} `}>{text}</h1>
        </div>
    )
}

export default PlanCheck