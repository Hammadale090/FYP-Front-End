import { Separator } from '@/components/ui/separator'
import React from 'react'

type Props = {}

const DataArea = (props: Props) => {
    return (
        <div className='w-full bg-[#C3FFE3] h-full lg:h-[300px] my-20 flex flex-col justify-center items-center'>

            <div className='flex max-lg:flex-col lg:space-x-20'>
                <div>
                    <h1 className='text-[#34495D] text-[48px] font-bold leading-[56px]'>412</h1>
                    <h1 className='text-[#34495D] text-[24px] font-medium leading-[34px]'>Square areas</h1>
                </div>
                <Separator orientation="vertical" className='h-[120px] bg-[#3EB87F] max-lg:hidden ' />
                <Separator orientation="horizontal" className='lg:h-[120px] my-5 bg-[#3EB87F] lg:hidden' />
                <div>
                    <h1 className='text-[#34495D] text-[48px] font-bold leading-[56px]'>780</h1>
                    <h1 className='text-[#34495D] text-[24px] font-medium leading-[34px]'>Car Parking</h1>
                </div>
                <Separator orientation="vertical" className='h-[120px] bg-[#3EB87F] max-lg:hidden ' />
                <Separator orientation="horizontal" className='lg:h-[120px] my-5 bg-[#3EB87F] lg:hidden' />
                <div>
                    <h1 className='text-[#34495D] text-[48px] font-bold leading-[56px]'>180</h1>
                    <h1 className='text-[#34495D] text-[24px] font-medium leading-[34px]'>Apartment</h1>
                </div>
                <Separator orientation="vertical" className='h-[120px] bg-[#3EB87F] max-lg:hidden ' />
                <Separator orientation="horizontal" className='lg:h-[120px] my-5 bg-[#3EB87F] lg:hidden' />
                <div>
                    <h1 className='text-[#34495D] text-[48px] font-bold leading-[56px]'>262</h1>
                    <h1 className='text-[#34495D] text-[24px] font-medium leading-[34px]'>Rooms</h1>
                </div>
            </div>



        </div>
    )
}

export default DataArea