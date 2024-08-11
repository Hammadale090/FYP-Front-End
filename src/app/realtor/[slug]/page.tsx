

import RealtorView from '@/features/ProfilePages/RealtorView'
import React, { Suspense } from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <Suspense>
            <div className='bg-[#f4f4f4] px-2'>
                <RealtorView />
            </div>
        </Suspense>
    )
}

export default page