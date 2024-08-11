import React, { MouseEventHandler } from 'react'

type Props = {
    text: string;
    active?: boolean
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const PreferenceSugestionButton = ({ text, active, onClick }: Props) => {
    return (
        <div onClick={onClick} className={`px-[12px] mr-4 my-2  cursor-pointer w-fit py-[6px] text-[14px] leading-[18px] rounded-[6px] ${active ? "bg-[#3EB87F] text-white " : "border border-[#D9D9D9] text-[#3B3434]"} `}>
            {text}
        </div>
    )
}

export default PreferenceSugestionButton