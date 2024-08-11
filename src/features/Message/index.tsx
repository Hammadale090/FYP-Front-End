import React from 'react'
import MessageHeader from './components/MessageHeader'
import ChatArea from './components/ChatArea'

type Props = {}

const Message = (props: Props) => {
    return (
        <section>
            {/* the chats, the user, the raltors and brokers */}
            <MessageHeader />

            {/* the Chat Area */}
            <ChatArea />
        </section>
    )
}

export default Message