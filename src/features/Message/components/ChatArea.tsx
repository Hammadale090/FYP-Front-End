"use client";
import React, { useContext, useEffect, useState } from "react";
import { Divider, TextInput, rem } from "@mantine/core";
import Image from "next/image";
import ChatUsers from "./ChatUsers";
import CurrentConversationHeader from "./CurrentConversationHeader";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";

import { MessageContext } from "@/context/MessageContext";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useSession } from "next-auth/react";
import { AuthContext } from "@/context/AuthContext";
import closeChat from "@/lib/chat/closeChat";

type Props = {};

const ChatArea = (props: Props) => {
  const {
    openChatBox,
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
  } = useContext<any>(MessageContext);
  const { userId } = useContext<any>(AuthContext);
  const [loading, setLoading] = useState(false);
  const [hideCloseChatOption,setHideCloseChatOption]=useState({})
  const [isChatRoomClosed, setIsChatRoomClosed] = useState(false);

  //get chatrooms
  useEffect(() => {
    setLoading(true);

    if (!userId) return;
    console.log({ userId });
    const chatroomsQuery = query(
      collection(firestore, "chatrooms"),
      where("participantsIDs", "array-contains", userId),
      // where("chatRoomClosedforAll", "==", false),
      orderBy("timestamp", "desc")
    );
    const unsubscribeChatrooms = onSnapshot(chatroomsQuery, (snapshot) => {
      const chatrooms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);

      setMyChatrooms([...chatrooms]);
    });
    setChatFilterBy("");
    // Cleanup function for chatrooms
    return () => unsubscribeChatrooms();
  }, [userId]);

  //get messages
  useEffect(() => {
    if (!selectedChatroom?.id) return;

    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "messages"),
        where("chatRoomId", "==", selectedChatroom.id),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSelectedChatRoomMessages(messages);
        setIsChatRoomClosed(
          selectedChatroom?.participantsDetail.filter(
            (participant: any) => participant.userId == userId
          )[0].chatRoomClosedforUser
        );
      }
    );

   async function CloseChatOptionVisibility(){
    // @ts-ignore
    const shouldHide=await sessionStorage.getItem([selectedChatroom.id])
    setHideCloseChatOption(shouldHide?true:false)
   }
   CloseChatOptionVisibility()
    return unsubscribe;
  }, [selectedChatroom]);

  useEffect(() => {
    function filterChatsByRoleAndSearchTerm() {
      return myChatrooms.filter((item: any) => {
        if (item.participantsDetail) {
          return item.participantsDetail.some((participant: any) => {
            if (chatFilterBy && searchTerm) {
              return (
                participant.userId != userId &&
                participant.role === chatFilterBy &&
                participant.name
                  .toLowerCase()
                  .includes(searchTerm?.toLowerCase())
              );
            }
            if (chatFilterBy && !searchTerm) {
              return (
                participant.userId != userId &&
                participant.role === chatFilterBy
              );
            }
            if (!chatFilterBy && searchTerm) {
              return (
                participant.userId != userId &&
                participant.name
                  .toLowerCase()
                  .includes(searchTerm?.toLowerCase())
              );
            }
          });
        }
        return false;
      });
    }

    if (chatFilterBy || searchTerm) {
      setMyChatroomsByRole(filterChatsByRoleAndSearchTerm());
      return;
    } else {
      setMyChatroomsByRole(myChatrooms);
    }
  }, [chatFilterBy, myChatrooms, searchTerm]);

  return (
    <section className=" h-[100vh] md:bg-[#FCFCFC] mx-2 my-6 rounded-[15px] ">
      {/* divided into left side to pick the user and the right side for the chat picked */}
      <div className="flex h-full">
        {/* the left section to pick chats */}

        <div
          className={`w-full md:w-1/3 h-full md:border-r ${
            openChatBox ? "hidden md:flex md:flex-col" : "flex flex-col"
          } items-center py-6`}
        >
          {/* The search bar */}
          {/* <div className="w-full relative"> */}
          <TextInput
            size="lg"
            className="w-full md:w-4/5 py-2 h-[54px] rounded-[6px] "
            radius={rem(8)}
            placeholder="Search"
            height={rem(20)}
            leftSection={
              <Image
                src={"/Message/IconSearch.svg"}
                height={500}
                width={500}
                className="w-[18px] h-[18px]"
                alt="search icon"
              />
            }
            rightSection={
              <div className="absolute right-[2px] top-[2px] h-[90%]  flex items-center pr-2 bg-white z-90">
                <select
                  onChange={(e) => setChatFilterBy(e.target.value)}
                  value={chatFilterBy}
                  className="text-[14px] leading-[18px] font-normal text-[#808191] bg-transparent outline-none focus-none border-none "
                >
                  <option value="">All</option>
                  <option value="realtor">Realtor</option>
                  <option value="user">User</option>
                  <option value="broker">Broker</option>
                </select>
              </div>
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* </div> */}
          {/* the started conversations */}
          <ChatUsers
            myChatroomsByRole={myChatroomsByRole}
            userId={userId}
            setSelectedChatroom={setSelectedChatroom}
          />
        </div>

        {/* the right section chatbox to show the chat */}
        {selectedChatroom && (
          <div className="hidden md:flex md:flex-col w-3/4 h-full py-5">
            <CurrentConversationHeader
              otherUserName={
                selectedChatroom.participantsDetail.filter(
                  (participant: any) => participant.userId != userId
                )[0].name
              }
              otherUserId={
                selectedChatroom.participantsDetail.filter(
                  (participant: any) => participant.userId != userId
                )[0].id
              }
              otherUserImage={
                selectedChatroom.participantsDetail.filter(
                  (participant: any) => participant.userId != userId
                )[0].image
              }
              chatRoomId={selectedChatroom.id}
            />

            <ChatBox
              selectedChatRoomMessages={selectedChatRoomMessages}
              userId={userId}
            />
            {/*are you sure you want to close this conversation */}
            {!isChatRoomClosed &&(
              <>
                {!hideCloseChatOption &&<div className="w-[636px]  ml-10 mr-7 rounded-[11px] border border-[#34495D] py-7 mb-6">
                  <h1 className="text-center font-medium leading-[34px] text-[16px] text-[#34495D]">
                    Are sure you want to close this conversation?
                  </h1>
                  <div className="flex justify-center space-x-2">
                    <div
                      className="w-[201px] cursor-pointer h-[38px] rounded-[6px] border border-[#3EB87F] flex flex-col justify-center items-center bg-[#3EB87F] text-white text-[16px] font-normal"
                      onClick={async () => {
                        const res = await closeChat(
                          selectedChatroom.id,
                          userId
                        );
                        res.success && setIsChatRoomClosed(true);
                      }}
                    >
                      Yes, close from my side
                    </div>

                    <div className="w-[201px] cursor-pointer h-[38px] rounded-[6px] border border-[#191B1E] flex flex-col justify-center items-center  text-[#191B1E] text-[16px] font-normal" onClick={()=>{
                      // @ts-ignore
                      sessionStorage.setItem([selectedChatroom?.id], true)
                      setHideCloseChatOption(true)
                    }}>
                      No, Not yet
                    </div>
                  </div>
                </div>}

                <ChatInput
                  selectedChatroom={selectedChatroom.id}
                  userId={userId}
                />
              </>
            )}
          </div>
        )}

        {/* mobile view of the right chatbox*/}
        {selectedChatroom && (
          <div className="md:hidden flex flex-col w-full h-full py-5">
            <CurrentConversationHeader
              otherUserName={
                selectedChatroom.participantsDetail.filter(
                  (participant: any) => participant.userId != userId
                )[0].name
              }
              otherUserId={
                selectedChatroom.participantsDetail.filter(
                  (participant: any) => participant.userId != userId
                )[0].id
              }
              chatRoomId={selectedChatroom.id}
            />

            <ChatBox
              selectedChatRoomMessages={selectedChatRoomMessages}
              userId={userId}
            />
            {/*are you sure you want to close this conversation */}
            {!isChatRoomClosed && (
              <>
                {!hideCloseChatOption &&<div className="w-full md:w-[636px] md:ml-10 md:mr-7 rounded-[11px] border border-[#34495D] py-7 mb-6">
                  <h1 className="text-center font-medium leading-[34px] text-[16px] text-[#34495D]">
                    Are sure you want to close this conversation?
                  </h1>
                  <div className="flex justify-center space-x-2">
                    <div
                      className="w-fit px-2 py-2 md:w-[201px] cursor-pointer  rounded-[6px] border border-[#3EB87F] flex flex-col justify-center items-center bg-[#3EB87F] text-white text-[16px] font-normal"
                      onClick={async () => {
                        const res = await closeChat(
                          selectedChatroom.id,
                          userId
                        );
                        res.success && setIsChatRoomClosed(true);
                      }}
                    >
                      Yes, close from my side
                    </div>

                    <div className="w-fit px-2 md:w-[201px] cursor-pointer rounded-[6px] border border-[#191B1E] flex flex-col justify-center items-center  text-[#191B1E] text-[16px] font-normal" onClick={()=>{
                      // @ts-ignore
                      sessionStorage.setItem([selectedChatroom.id], true)
                      setHideCloseChatOption(true)
                    }}>
                      No, Not yet
                    </div>
                  </div>
                </div>}

                <ChatInput
                  selectedChatroom={selectedChatroom.id}
                  userId={userId}
                />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatArea;
