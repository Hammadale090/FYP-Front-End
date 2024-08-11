import { Divider } from '@mantine/core'
import React from 'react'
import PropertyNavbar from './components/PropertyNavbar'
import PropertyArea from './components/PropertyArea'

type Props = {}

const Property = (props: Props) => {
    return (
        <section>
            <Divider my="sm" />

            {/* Properties Navbar , text, dropdown and reset preferences*/}
            <PropertyNavbar />

            {/* the property Area to show the properties */}
            <PropertyArea />

        </section>
    )
}

export default Property