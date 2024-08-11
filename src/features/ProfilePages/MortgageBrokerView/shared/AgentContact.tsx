import React from 'react'

type Props = {
    header: string;
    details: string;
}

const AgentContact
    = ({ header, details }: Props) => {
        return (
            <div className='flex my-2 w-full items-center space-x-[14px] '>
                <h1 className='w-[30%] text-[#808191] text-[14px] font-normal leading-[22px]'>{header}:</h1>
                <h1 className='w-[70%] text-[#11142D] text-[16px] font-normal leading-normal'>{details}</h1>
            </div>
        )
    }

export default AgentContact
