import { StatusSvg } from "@/features/DashboardLayout/svgs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Divider, TextInput, rem } from "@mantine/core";
import inviteToChatRoom from "@/lib/chat/inviteToChatRoom";
import { useSession } from "next-auth/react";
import { IoCheckmarkDoneCircleSharp, IoLockClosed } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
import { getOnlinePresence } from "@/lib/onlinePresence";

type Props = {
  otherUserId?: any;
  otherUserName?: string;
  otherUserImage?: string;
  chatRoomId?: any;
  ShowCloseChatModal: any;
  setShowCloseChatModal: any;
  isChatRoomClosed: any;
};

const CurrentConversationHeader = ({
  otherUserId,
  otherUserName,
  otherUserImage,
  chatRoomId,
  ShowCloseChatModal,
  setShowCloseChatModal,
  isChatRoomClosed,
}: Props) => {
  const [showAddUserModel, setShowAddUserModel] = useState<boolean>(false);
  const [userToBeInvite, setUserToBeInvite] = useState<string>("");
  const [userOnlineStatus, setUserOnlineStatus] = useState<boolean>(false);
  const { data } = useSession();
  const { toast } = useToast();

  async function handleInviteUserToChatRoom(e: Event) {
    e.preventDefault();
    const invite_res = await inviteToChatRoom(
      chatRoomId,
      userToBeInvite,
      data?.user?.data?.jwt
    );
    // console.log(invite_res);
    if (invite_res?.status) {
      setShowAddUserModel(false);
    }

    toast({
      description: `${invite_res?.message}`,
      action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
    });
  }
  useEffect(() => {
    otherUserId && getOnlinePresence(otherUserId, setUserOnlineStatus);
  }, [otherUserId]);

  return (
    <div className="flex justify-between px-3 py-3">
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
          {userOnlineStatus && (
            <h1 className="text-[14px] leading-[22px] text-[#34495D]">
              Active Now
            </h1>
          )}
        </div>
      </div>

      {!isChatRoomClosed && (
        <div className="flex space-x-5 items-center">
          {showAddUserModel && (
            <form
              className="flex items-center"
              onSubmit={(e: any) => handleInviteUserToChatRoom(e)}
            >
              <input
                className="w-full md:w-4/5  py-2 px-2 h-[38px] rounded-[6px] border-slate-200 border-[2px] "
                placeholder="Enter User Email"
                type="email"
                required={true}
                value={userToBeInvite}
                onChange={(e) => setUserToBeInvite(e.target.value)}
              />
              <button
                type="submit"
                className="text-[12px] cursor-pointer w-[100px] gap-[4px] bg-[#3EB87F] h-[38px] flex flex-col justify-center items-center rounded-[6px] border border-[#3EB87F] font-normal text-white ml-2"
              >
                Add
              </button>
            </form>
          )}
          <div className="flex space-x-2 items-center">
            {!showAddUserModel && (
              <Image
                src={"/Message/UserAdd.svg"}
                alt="User Add"
                height={500}
                width={500}
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={() => setShowAddUserModel(true)}
              />
            )}
            <IoLockClosed
              className="w-[24px] h-[24px] cursor-pointer text-[#3EB87F]"
              onClick={() => {
                !isChatRoomClosed && setShowCloseChatModal(true);
              }}
            />
            <Image
              src={"/Message/calendar.svg"}
              alt="User Add"
              height={500}
              width={500}
              className="w-[24px] h-[24px] cursor-pointer"
            />
            <Image
              src={"/Message/PhoneFilled.svg"}
              alt="User Add"
              height={500}
              width={500}
              className="w-[24px] h-[24px] cursor-pointer"
            />
            <Image
              src={"/Message/Recorder.svg"}
              alt="User Add"
              height={500}
              width={500}
              className="w-[24px] h-[24px] cursor-pointer"
            />
          </div>

          <Image
            src={"/Message/menu.svg"}
            alt="User Add"
            height={500}
            width={500}
            className="w-[24px] h-[24px] cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default CurrentConversationHeader;
