import React, { HTMLAttributes } from 'react'

type Props = {
    green?: boolean;
    black?: boolean;
    text?: string;
    width?: string;
    height?: string;
    classN?: string;
    px?: string;
    mx?: string;
    mr?: string;
    my?: string;
    children?: React.ReactNode;
    
}

const MortgageButton = ({ green, text, width, height, classN, px, mx, my, mr, children, black }: Props) => {
    return (
        <div className={`${classN ? classN : `rounded-[6px] ${px ? px : "px-[16px]"} text-[16px] ${mr ? mr : "mr-[28px]"} ${mx} ${my} ${width} ${height} py-[8px] font-medium ${black ? "bg-[#383838] text-white " : green ? "bg-[#3EB87F] text-white " : "border bg-white border-[#34495D] text-ravinna"}`} `}>
            {text}
            {children}
        </div>
    )
}

export default MortgageButton