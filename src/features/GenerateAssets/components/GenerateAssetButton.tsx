import React, { MouseEventHandler } from 'react'

type Props = {
    text: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const GenerateAssetButton = ({ text, onClick }: Props) => {
    return (
        <div onClick={onClick} className='rounded-[8px] cursor-pointer border border-[#000] px-[10px] py-[10px] text-[14px] leading-[18px] text-black '>
            {text}
        </div>
    )
}

export default GenerateAssetButton