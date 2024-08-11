import { Divider } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import CustomerData from '../shared/CustomerData'

type Props = {}

const Customers = (props: Props) => {
    return (
        <div className='w-full md:w-[366px] p-[20px] flex flex-col justify-between rounded-[10px] bg-[#FCFCFC] xl:mr-[13px] my-2'>

            {/* the header */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#11142D] text-[18px] font-semibold'>Customer</h1>

                {/* menu */}
                <Image src={"/Dashboard/menuV.svg"} alt='menu' width={500} height={500} className='w-[18px] h-[18px]' />
            </div>

            <h1 className='text-[#808191] text-[12px] font-semibold'>Total Customers</h1>

            <CustomerData />
            <Divider my={"sm"} />
            <CustomerData />
        </div>
    )
}

export default Customers