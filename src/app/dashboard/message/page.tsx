import Message from '@/features/Message'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='md:bg-[#f4f4f4] py-4'>
            <Message />
        </div>
    )
}

export default page