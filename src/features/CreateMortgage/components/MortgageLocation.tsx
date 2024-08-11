import Image from 'next/image'
import React from 'react'
import MortgageButton from './MortgageButton'
import { Divider } from '@mantine/core'

type Props = {}

const MortgageLocation = (props: Props) => {
    return (
        <div className='w-full'>
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Location</h1>

            <div className='relative'>
                <Image src={"/Mortgage/Location.png"} alt='location' className='w-full max-h-[400px]' height={500} width={500} />

                <div className='absolute bottom-3 left-3 cursor-pointer'>
                    <MortgageButton width='w-fit' black>
                        <div className='flex space-x-2 items-center'>
                            <Image src={"/Mortgage/SendLocation.svg"} className='w-[24px] h-[24px]' alt='send location' width={500} height={500} />
                            <h1>Get Directions</h1>
                        </div>
                    </MortgageButton>
                </div>

                <div className='absolute right-3 bottom-6'>
                    < div className='flex flex-col space-y-2'>

                        <div className='w-fit flex flex-col items-center px-[10px] py-[6px] rounded-[4px] border border-[#B1B1B1] bg-[#FCFCFD] shadow-md'>
                            <h1 className='text-ravinna text-lg'>+</h1>
                            <Divider />
                            <h1 className='text-ravinna text-lg'>-</h1>
                        </div>

                        <div className='w-fit flex flex-col items-center px-[6px] py-[6px] rounded-[4px] border border-[#B1B1B1] bg-[#FCFCFD] shadow-md'>
                            <Image src={"/Mortgage/StreetView.svg"} className='w-[24px] h-[24px]' alt='profile' width={500} height={500} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MortgageLocation