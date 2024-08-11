import React from 'react'

type Props = {}

const ActiveListingsHeader = (props: Props) => {
    return (
        <div className='flex flex-col max-md:px-2 md:flex-row justify-between md:items-center mt-5'>
            <h1 className='text-[24px] text-black font-bold leading-[20px]'>All Active Listings</h1>

            <div className='px-[28px] py-[12px] max-md:my-2 rounded-[4px] bg-[#3EB87F] text-white text-[16px] font-semibold leading-[26px]'>
                Create new property
            </div>
        </div>
    )
}

export default ActiveListingsHeader