import React from 'react'
import MortgageButton from './MortgageButton'
import { Input } from '@/components/ui/input'
import MortgageSubHeadings from './MortgageSubHeadings'

type Props = {}

const MortgageCalculator = (props: Props) => {
    return (
        <div>
            <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Mortgage Calculator</h1>

            <div className='flex flex-wrap'>
                <MortgageButton width='w-full md:w-fit' my='my-2' text='Payment Calculator' />
                <MortgageButton width='w-full md:w-fit' my='my-2' text='Land Transfer Tax Calculator' green />
                <MortgageButton width='w-full md:w-fit' my='my-2' text='Affordability Calculator' green />
            </div>

            <div className='flex items-end mt-[10px]'>
                {/* Asking Price */}
                <div className='flex flex-col space-y-2'>
                    <h1 className='text-[#202C45] text-[14px] font-medium'>Asking Price</h1>
                    <Input placeholder='$100.00' className='w-[158px] md:w-[322px]' />
                </div>
                <MortgageButton text='Calculate' mx='mx-4' green height='max-h-[46px]' />
            </div>

            <div className='flex flex-col space-y-5 w-full'>
                <MortgageSubHeadings subHead='Provincial' amount='$725' />
                <MortgageSubHeadings subHead='Municipial' amount='$725' />
                <MortgageSubHeadings subHead='Rebate' amount='-$0' />
                <MortgageSubHeadings subHead='Land Transfer Tax' amount='$1,450' green />
            </div>
        </div>
    )
}

export default MortgageCalculator