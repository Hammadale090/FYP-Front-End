import { Divider } from '@mantine/core'
import React from 'react'
import ExplorePropertyArea from './components/ExplorePropertyArea'

type Props = {}

const PropertyExplorePage = (props: Props) => {
    return (
        <section className='px-2'>
            <Divider className='hidden md:flex' my="sm" />

            {/* explore property area here */}
            <ExplorePropertyArea />

        </section>
    )
}

export default PropertyExplorePage