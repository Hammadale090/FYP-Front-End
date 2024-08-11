import React from 'react'
import MortgageButton from './MortgageButton'
import Image from 'next/image'
import MortgageSubHeadings from './MortgageSubHeadings'

type Props = {}

const MortgageNeighborhoodHighlights = (props: Props) => {
    return (
        <div className='my-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Neighborhood Highlights</h1>

                <MortgageButton green>
                    <div className='flex space-x-2 items-center'>
                        <Image src={"/Mortgage/Book.png"} width={500} height={500} alt='book png' className='w-[24px] h-[24px]' />
                        <h1 className='hidden md:inline-flex'>View on Map</h1>
                    </div>
                </MortgageButton>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                <MortgageSubHeadings divider subHead='School Name' amount='2 kms away' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Airport' amount='x kms away' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Famous Hotel' amount='X kms away' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Famous Restaurant' amount='x kms away' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Amusement Park' amount='x kms away' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Shopping Mall' amount='x kms away' width='w-[90%]' />
            </div>
        </div>
    )
}

export default MortgageNeighborhoodHighlights