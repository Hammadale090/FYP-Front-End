import Image from 'next/image';
import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';

type Props = {
    Icon?: string;
    text?: string;
    width?: string;
    height?: string;
    color?: string;
    textCN?: string;
    px?: string;
    py?: string;
    noBorder?: boolean;
    mx?: string;
    my?: string;
    rounded?: string;
    textColor?: string;
    textCenter?: boolean;
    borderColor?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    RealIcon?: IconType;
    loading?: boolean;
}

const IconShowcaseBox = ({ Icon, text, loading, width, height, borderColor, py, color, textCN, px, noBorder, mx, my, rounded, textColor, textCenter, onClick, RealIcon }: Props) => {
    return (
        <div onClick={onClick} className={`flex cursor-pointer ${mx} space-x-2 ${textCenter && "justify-center"} items-center ${px ? `px-[${px}]` : "px-[10px]"}  ${width} ${color ? `bg-[${color}]` : "bg-white"}  ${height} ${py ? `py-[${py}]` : "py-[10px]"} ${rounded ? `rounded-[${rounded}]` : "rounded-[6px]"}  ${noBorder ? "" : `border ${borderColor ? `border-[${borderColor}]` : "border-[#E4E4E4]"} `}  `}>

            {loading ? (
                <BiLoaderAlt className='text-center animate-spin' />
            ) : (
                <>  {
                    Icon && (
                        <Image src={Icon} alt='box icon' className='w-[18px] h-[18px]' width={500} height={500} />
                    )
                }

                    {
                        text && (
                            <h1 className={textCN ? textCN : `${textColor ? `text-[${textColor}]` : "text-[#11142D]"}  text-[14px] font-normal leading-[22px]`}>{text}</h1>
                        )
                    }

                    {
                        RealIcon && (
                            <RealIcon className='w-[18px] h-[18px]' />
                        )
                    }</>
            )}


        </div>
    )
}

export default IconShowcaseBox