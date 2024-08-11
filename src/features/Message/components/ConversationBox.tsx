import { MessageContext } from "@/context/MessageContext";
import { StatusSvg } from "@/features/DashboardLayout/svgs";
import convertFirebaseTimestampToTimeString from "@/lib/convertFirebaseTimestampToTimeString";
import { getOnlinePresence } from "@/lib/onlinePresence";
import Image from "next/image";
import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type Props = {
  otherUserId?: any;
  active?: boolean;
  otherUserName: string;
  otherUserImage: string;
  lastMessage: any;
  lastMessageTimestamp: any;
  chatroom: any;
  setSelectedChatroom: Dispatch<SetStateAction<any>>;
};

const ConversationBox = ({
  otherUserId,
  active,
  otherUserName,
  otherUserImage,
  lastMessage,
  lastMessageTimestamp,
  setSelectedChatroom,
  chatroom,
}: Props) => {
  const { setOpenChatBox, openChatBox } = useContext<any>(MessageContext);
  const [userOnlineStatus, setUserOnlineStatus] = useState<boolean>(false);
  useEffect(() => {
    otherUserId && getOnlinePresence(otherUserId, setUserOnlineStatus);
  }, [otherUserId]);
  return (
    <div
      onClick={() => {
        setOpenChatBox(!openChatBox);
        setSelectedChatroom(chatroom);
      }}
      className={`w-full ${
        active ? "bg-[#C3FFE3]" : "#FCFCFC"
      }  flex  justify-between rounded-[6px] px-[15px] py-[12px] cursor-pointer`}
    >
      <div className="flex space-x-3">
        <div className="relative ">
          <div className="rounded-full w-[46px] h-[46px] overflow-hidden border-slate-100 border-2">
            <Image
              src={otherUserImage ? otherUserImage : "/Message/User.png"}
              alt="User Image"
              height={500}
              width={500}
              className="w-[46px] h-[46px] object-cover overflow-hidden"
            />
          </div>
          <div className="absolute bottom-1 right-0">
            <StatusSvg online={userOnlineStatus} />
          </div>
        </div>

        <div>
          {/* the user name */}
          <h1 className="text-[16px] leading-[24px] font-semibold text-[#34495D]">
            {otherUserName}
          </h1>
          <h1 className="text-[14px] leading-[22px] text-[#34495D]">
            {lastMessage && lastMessage.length > 15
              ? lastMessage.slice(0, 15) + "..."
              : lastMessage}
          </h1>
        </div>
      </div>

      <h1>
        {lastMessageTimestamp &&
          convertFirebaseTimestampToTimeString(lastMessageTimestamp)}
      </h1>
    </div>
  );
};

export default ConversationBox;
