import { Divider } from '@mantine/core';
import React from 'react'

type Props = {
    subHead: string;
    amount: string;
    width?: string;
    my?: string;
    mb?: string;
    green?: boolean;
    divider?: boolean;
}

const MortgageSubHeadings = ({ subHead, amount, width, my, mb, green, divider }: Props) => {
    return (
        <div className='w-full'>
            <div className={`flex items-center justify-between ${green && "rounded-[5px] pl-[5px] bg-[#C3FFE3]"} ${width ? width : "w-[50%]"} ${my} ${mb ? mb : "my-[19px]"}`}>
                <h1 className={`text-[14px] font-medium text-[#202C45]`}>
                    {subHead}:
                </h1>

                <h1 className={`text-[14px] leading-[18px] text-[#1A1A1A]`}>
                    {amount}
                </h1>
            </div>

            {
                divider && (
                    <div className='pl-[5px]'> <Divider my="sm" /> </div>

                )
            }
        </div>
    )
}

export default MortgageSubHeadings