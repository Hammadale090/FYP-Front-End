

import RealEstateLawyerView from '@/features/ProfilePages/RealEstateLawyerView'
import React, { Suspense } from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <Suspense>
            <div className='bg-[#f4f4f4] px-2'>
                <RealEstateLawyerView />
            </div>
        </Suspense>
    )
}

export default page