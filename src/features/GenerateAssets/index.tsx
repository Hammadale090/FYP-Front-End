import { Divider } from '@mantine/core'
import React from 'react'
import GenerateAssetsArea from './components/GenerateAssetsArea'

type Props = {}

const GenerateAssets = (props: Props) => {
    return (
        <section className='px-2'>
            <Divider className='hidden md:flex' my="sm" />
            <h1 className='text-[25px]  font-bold text-[#11142D]'>Generate AI Assets for marketing</h1>

            {/* Generate Assets area */}
            <GenerateAssetsArea />

        </section>
    )
}

export default GenerateAssets