"use client";
import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import ChatBot from './ChatBot';

type Props = {}

const ChatPopup = (props: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <div className="fixed bottom-5 right-5 " style={{ zIndex: 1000 }}>
            <div
                onClick={open}
                className="bg-ravinnabg p-5 rounded-full text-white cursor-pointer"
            >
                Get AI property report
            </div>
            <ChatBot close={close} opened={opened} />
        </div>
    )
}

export default ChatPopup