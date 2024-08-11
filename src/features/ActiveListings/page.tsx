import { Divider } from '@mantine/core'
import React from 'react'
import ActiveListingsHeader from './components/ActiveListingsHeader'
import ActiveListingsArea from './components/ActiveListingsArea'

type Props = {}

const ActiveListings = (props: Props) => {
    return (
        <div>
            {/* the divider */}
            <Divider my="sm" />

            {/* the header */}
            <ActiveListingsHeader />

            {/* the ActiveListingsArea */}
            <ActiveListingsArea />
        </div>
    )
}

export default ActiveListings