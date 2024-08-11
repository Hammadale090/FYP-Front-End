import PreferenceChatBoxInputText from '@/features/PreferenceChatbot/components/PreferenceChatBoxInputText'
import PreferenceChatbotMessageBox from '@/features/PreferenceChatbot/components/PreferenceChatbotMessageBox'
import PreferenceSugestionButton from '@/features/PreferenceChatbot/components/PreferenceSugestionButton'
import React from 'react'

type Props = {}

const ExplorePropertyArea = (props: Props) => {
    return (
        <div className='md:w-[90%] relative h-full rounded-[12px] border border-[#D9D9D9] py-7 px-10'>
            <h1 className='text-[16px] font-medium leading-[20px] text-black'>
                Talk to me what type of properties do you want to see?
            </h1>

            {/* the question suggestions */}
            <div className='flex flex-wrap mt-5'>
                <PreferenceSugestionButton text='What budget range should I have?' />
                <PreferenceSugestionButton text='Can you suggest me some properties based on my lifestyle?' />
                <PreferenceSugestionButton text='Lorem ipsum dolor sit amet,' />
                <PreferenceSugestionButton text='Lorem ipsum dolor sit amet,' active />
                <PreferenceSugestionButton text='Lorem ipsum dolor sit amet,' />
                <PreferenceSugestionButton text='Lorem ipsum dolor sit amet,' />
            </div>

            {/* the chat box area */}
            <div>
                <PreferenceChatbotMessageBox text='Lorem ipsum dolor sit amet,' date='09:20 am' />
                <PreferenceChatbotMessageBox sender text='Lorem ipsum dolor sit amet,' date='09:20 am' />
                <PreferenceChatbotMessageBox text='Lorem ipsum dolor sit amet,' date='09:20 am' />
                <PreferenceChatbotMessageBox sender text='Lorem ipsum dolor sit amet,' date='09:20 am' />
            </div>

            {/*  send message input field */}
            <div className=''>
                <PreferenceChatBoxInputText />
            </div>

        </div>
    )
}

export default ExplorePropertyArea