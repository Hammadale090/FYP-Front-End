import React, { useContext } from "react";
import ConversationBox from "./ConversationBox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction } from "react";
import { MessageContext } from "@/context/MessageContext";

type Props = {
  myChatroomsByRole: any;
  userId: any;
  setSelectedChatroom: Dispatch<SetStateAction<any>>;
};

const ChatUsers = (props: Props) => {
  const { myChatroomsByRole, userId, setSelectedChatroom } = props;
  const { selectedChatroom } = useContext<any>(MessageContext);

  return (
    <ScrollArea className="w-full h-full md:w-4/5 mt-7 ">
      {myChatroomsByRole?.map((chatroom: any) => {
        return (
          <ConversationBox
            active={chatroom.id == selectedChatroom?.id}
            key={chatroom.id}
            otherUserName={
              chatroom.participantsDetail.filter(
                (participant: any) => participant.userId != userId
              )[0].name
            }
            otherUserId={
              chatroom.participantsDetail.filter(
                (participant: any) => participant.userId != userId
              )[0].id
            }
            otherUserImage={
              chatroom.participantsDetail.filter(
                (participant: any) => participant.userId != userId
              )[0].image
            }
            lastMessage={chatroom.lastMessage?.content}
            lastMessageTimestamp={chatroom?.lastMessage?.timestamp}
            chatroom={chatroom}
            setSelectedChatroom={setSelectedChatroom}
          />
        );
      })}
    </ScrollArea>
  );
};

export default ChatUsers;
