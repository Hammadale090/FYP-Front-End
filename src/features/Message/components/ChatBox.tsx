import React, { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import convertFirebaseTimestampToTimeString, {
  formatTimestamp,
} from "@/lib/convertFirebaseTimestampToTimeString";

type Props = {
  selectedChatRoomMessages: any;
  userId: any;
};

const ChatBox = (props: Props) => {
  const { selectedChatRoomMessages, userId } = props;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when component updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedChatRoomMessages]);
  const dates = [];
  return (
    <div
      className="mt-5 ml-10 mr-7 flex flex-col h-full overflow-y-auto px-6"
      ref={chatContainerRef}
    >
      {selectedChatRoomMessages?.map((message: any) => {
        let show_message_date = false;
        const message_date =
          message?.timestamp && formatTimestamp(message?.timestamp);
        if (!dates.includes(message_date)) {
          dates.push(message_date);
          show_message_date = true;
        }
        return (
          <>
            {show_message_date && (
              <div className="flex space-x-2 items-center">
                <div className="h-[1px] bg-[#E4E4E4] w-1/2 " />
                <h1 className="text-[12px] leading-[18px] font-normal text-[#11142D] w-[100px] flex justify-center">
                  {message_date}
                </h1>
                <div className="h-[1px] bg-[#E4E4E4] w-1/2" />
              </div>
            )}
            <MessageBox
              key={message.id}
              date={
                message?.timestamp &&
                convertFirebaseTimestampToTimeString(message?.timestamp)
              }
              text={message?.content}
              document={message?.document}
              document_name={message?.document_name}
              sender={message?.sender_userId && message.sender_userId == userId}
            />
          </>
        );
      })}
    </div>
  );
};

export default ChatBox;
