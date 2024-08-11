import PreferenceChatbotArea from '@/features/PreferenceChatbot/components/PreferenceChatbotArea'
import { Divider } from '@mantine/core'
import React from 'react'

type Props = {}

const BrokersPreferenceChatBot = (props: Props) => {
    return (
        <section className='px-2'>
            <Divider className='hidden md:flex' my="sm" />
            <h1 className='text-[25px] font-bold text-[#11142D]'>Mortgage Broker Matching</h1>

            {/* the chatbot Area */}
            <PreferenceChatbotArea />
        </section>
    )
}

export default BrokersPreferenceChatBot