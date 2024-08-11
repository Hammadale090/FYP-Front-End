"use client";

import { createContext, useState } from "react";

// @ts-ignore
export const MessageContext = createContext();

function MessageContextProvider(props: any) {
  const [openChatBox, setOpenChatBox] = useState<boolean>(false);
  const [myChatrooms, setMyChatrooms] = useState<any>([]);
  const [myChatroomsByRole, setMyChatroomsByRole] = useState<any>([]);
  const [selectedChatroom, setSelectedChatroom] = useState<any>();
  const [selectedChatRoomMessages, setSelectedChatRoomMessages] = useState<any>(
    []
  );
  const [chatFilterBy, setChatFilterBy] = useState<any>("");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <MessageContext.Provider
      value={{
        openChatBox,
        setOpenChatBox,
        myChatrooms,
        setMyChatrooms,
        selectedChatroom,
        setSelectedChatroom,
        selectedChatRoomMessages,
        setSelectedChatRoomMessages,
        chatFilterBy,
        setChatFilterBy,
        myChatroomsByRole,
        setMyChatroomsByRole,
        searchTerm,
        setSearchTerm,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}

export { MessageContextProvider };
