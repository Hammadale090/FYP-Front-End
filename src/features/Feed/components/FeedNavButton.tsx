import { FeedContext } from '@/context/FeedContext';
import React, { useContext } from 'react'

type Props = {
    active?: boolean;
    text: string;
    tab_identifier: number
}

const FeedNavButton = ({ active, text, tab_identifier }: Props) => {
    const { setTab } = useContext<any>(FeedContext)
    return (
        <div onClick={() => { setTab(tab_identifier) }} className={`gap-[4px] w-fit text-nowrap cursor-pointer px-[16px] capitalize py-[8px] flex rounded-[6px] ${active ? "bg-[#3EB87F] text-white" : "border border-[#34495D]"}  items-center text-[16px] font-normal `}>
            {text}
        </div>
    )
}

export default FeedNavButton