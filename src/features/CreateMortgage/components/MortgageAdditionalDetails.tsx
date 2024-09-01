import React from 'react'
import MortgageButton from './MortgageButton'
import Image from 'next/image'
import MortgageSubHeadings from './MortgageSubHeadings'

type Props = {}

const MortgageAdditionalDetails = (props: Props) => {
    return (
        <div className='my-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Additional details</h1>

                <MortgageButton green>
                    <div className='flex space-x-2 items-center'>
                        <Image src={"/Mortgage/Book.png"} width={500} height={500} alt='book png' className='w-[24px] h-[24px]' />
                        <h1 className='hidden md:inline-flex'>See all properties</h1>
                    </div>
                </MortgageButton>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2'>
                <MortgageSubHeadings divider subHead='Deposit' amount='20%' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Amenities' amount='Clubhouse' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Pool Size' amount='300 Sqft' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Additional Rooms' amount='Guest Bath' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Last remodel year' amount='1987' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Equipment' amount='Grill - Gas' width='w-[90%]' />
            </div>


            {/* Address */}
            <div className='flex justify-between items-center'>
                <h1 className='text-[#0B0C0E] text-[24px] font-semibold leading-[34px] my-5'>Address</h1>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2'>
                <MortgageSubHeadings divider subHead='Address' amount='4936 N Broadway St' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Zip/Postal Code' amount='60640' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='City' amount='Chicago' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Area' amount='Andersonville' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='State/county' amount='Illinois, New York' width='w-[90%]' />
                <MortgageSubHeadings divider subHead='Country' amount='United States' width='w-[90%]' />
            </div>


        </div>
    )
}

export default MortgageAdditionalDetails