import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "@/context/AuthContext";
import { updateProfileAccount } from "@/features/Settings/functions";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { MessageContext } from "@/context/MessageContext";
import createChatRoom from "@/lib/chat/createChatRoom";
import { useDisclosure } from "@mantine/hooks";
import Rating from "@/features/Property/components/Rating";
import FeedRating from "@/features/Property/components/FeedRating";
import PropertyViewed from "./PropertyViewed";

type Props = {
  id?: number;
  userId?: number;
  realtor?: boolean;
  firstname?: string | null;
  lastname?: string | null;
  phone?: string | null;
  email?: string | null;
  url?: string | null;
  profile_pic?: string | null;
  Agency_name?: string | null;
  favourites?: any[] | null | undefined;
  views?: any[] | null | undefined;
  role?: any;
};

const FeedBrokerRealtorCard = ({
  id,
  userId,
  realtor,
  firstname,
  lastname,
  phone,
  email,
  url,
  profile_pic,
  Agency_name,
  favourites: initialFavourites,
  views,
  role,
}: Props) => {
  const router = useRouter();
  const {
    profileId,
    jwt,
    userId: currentUserId,
    profile,
    user: currentuser,
    profilepic,
    userRole,
  } = useContext(AuthContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [chatloader, setChatLoader] = useState<boolean>(false);
  const { toast } = useToast();
  const [opened, { open, close }] = useDisclosure(false);
  const { setSelectedChatroom } = useContext<any>(MessageContext);

  // Initialize favouritess with an empty array if initialFavourites is null
  const [favouritess, setFavouritess] = useState(initialFavourites || []);

  useEffect(() => {
    // Update favouritess only if initialFavourites is not null
    if (initialFavourites !== null) {
      setFavouritess(initialFavourites);
    }
  }, [id, initialFavourites]);

  // Count of favourites
  const favouritesCount = favouritess?.length;

  const isUserInFavorites = favouritess?.includes(profileId);

  const addOrRemoveUserFromfavourites = async (
    id: number,
    isAdd: boolean,
    favouritess: any[],
    setLoader: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoader(true);
    try {
      let updatedFavourites: any[];

      if (isAdd) {
        updatedFavourites = [...favouritess, profileId];
      } else {
        updatedFavourites = favouritess.filter((favId) => favId !== profileId);
      }

      const data = { favourites: updatedFavourites };

      const res = await updateProfileAccount(id, data, jwt);

      console.log("Res of Add or Remove User from Favourites: ", res?.data);

      if (res?.data?.data?.id) {
        toast({
          description: "Favourites updated successfully",
          action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
        });
        return res?.data?.data?.attributes?.favourites || [];
      }

      if (res?.data?.error) {
        toast({
          variant: "destructive",
          description: res?.data?.error?.message,
        });

        return null;
      }
    } catch (error) {
      console.error("Error Add or Remove List from Favourites:", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
      return null;
    } finally {
      setLoader(false);
    }
  };

  const isAddorRemoveFromFavouritesHandler = async () => {
    const res = await addOrRemoveUserFromfavourites(
      id,
      !isUserInFavorites,
      favouritess,
      setLoader
    );
    if (res) {
      setFavouritess(res);
    }
  };

  async function handleChatCreation() {
    try {
      if (chatloader) return;
      setChatLoader(true);
      const firstName = profile.attributes.first_name;
      const lastName = profile.attributes.last_name;
      const username = currentuser.data.attributes.username;

      let name = "";
      if (firstName || lastName) {
        name = `${firstName || ""} ${lastName || ""}`;
      } else if (username) {
        name = username;
      }

      const participants = [
        {
          userId: currentUserId,
          name: name,
          role: userRole,
          image: profilepic ?? "",
          chatRoomClosedforUser: false,
        },
        {
          userId: userId,
          name: `${firstname || ""} ${lastname || ""}`,
          role: role,
          image: profile_pic ?? "",
          chatRoomClosedforUser: false,
        },
      ];

      const createRoom = await createChatRoom(participants, userId);
      if (createRoom.chatRoomId) {
        setSelectedChatroom({
          id: createRoom.chatRoomId,
          ...createRoom,
        });
        router.push("/dashboard/message");
      }
    } catch (error) {
      console.log("error ", error);
      setChatLoader(false);
    }
  }

  return (
    <div className="cursor-pointer  my-2 flex-shrink-0 border border-black rounded-xl w-[338px]  h-[547px] relative">
      {/* the realtor or broker Image/profile Image */}
      <Image
        height={1000}
        width={1000}
        className="h-[40%] rounded-t-xl object-cover"
        alt="property Image"
        src={
          profile_pic
            ? profile_pic
            : realtor
              ? "/Dashboard/Brokers.png"
              : "/Dashboard/Brokers.png"
        }
      />
      {/* The lower div */}
      <div className="h-[60%] py-5 px-5 space-y-3">
        {/* The views and likes */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2  items-center">
            <Image
              src={"/Feed/view.svg"}
              className="h-[16px] w-[16px]"
              height={500}
              width={500}
              alt="view"
            />
            <h1 className="text-[14px] leading-[20px] font-normal text-[#34495D]">
              {views && `${views} Views`}
            </h1>
          </div>

          <div className="flex space-x-1 items-center h-[28px]">
            {loader ? (
              <div className="flex justify-center">
                {" "}
                <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
              </div>
            ) : (
              <>
                <Image
                  src={
                    isUserInFavorites
                      ? "/Feed/FavoriteActive.svg"
                      : "/Feed/Favorite.svg"
                  }
                  className="h-[24px] w-[24px]"
                  height={500}
                  width={500}
                  alt="favorite icon"
                  onClick={isAddorRemoveFromFavouritesHandler}
                />
                <h1 className="text-[14px] leading-[20px] font-normal text-black">
                  {favouritesCount ?? 0}
                </h1>
              </>
            )}
          </div>
        </div>

        {/* the Title  and rating*/}
        {role != "user" && (
          <>
            <div className="flex justify-between items-center">
              {/* the title */}
              <h1 className="text-[20px] font-medium text-[#34495D]">
                {(firstname + " " + lastname)?.slice(0, 15) +
                  ((firstname + " " + lastname)?.length > 15 ? "..." : "")}
              </h1>

              {/* the rating */}
              <FeedRating
                slug={`${userId}`}
              />
              {/* <div className="flex items-center space-x-1">
                <Image
                  src={"/Feed/Star.svg"}
                  className="h-[16px] w-[16px]"
                  height={500}
                  width={500}
                  alt="rating"
                />
                <h1 className="text-black font-normal leading-[22px] text-[16px] ">
                  4.8(12)
                </h1>
              </div> */}
            </div>

            {/* the description of the profile */}
            {/* <h1 className='text-[12px] font-normal text-black mt-2'>Company Agent at <br /> Modern House Real Estate</h1> */}
            <div className="mt-2 h-[40px]">
              <h1 className="text-[12px] font-normal text-black">
                Company Agent at <br /> {Agency_name ?? ""}
              </h1>
            </div>

            {/* reach the profile via phone, email and website */}
            <div className="flex flex-col space-y-2 mt-2 gap-[4px] ml-3 h-[90px]">
              {/* via phone */}
              <div className="flex space-x-5 items-center">
                <Image
                  src={"/Dashboard/Call.svg"}
                  height={500}
                  width={500}
                  className="w-[16px] h-[16px] object-cover"
                  alt="phone"
                />
                <h1 className="text-[14px] leading-[24px] font-normal">
                  {phone ?? ""}
                </h1>
              </div>

              {/* via mail */}
              <div className="flex space-x-5 items-center">
                <Image
                  src={"/Dashboard/Profilemail.svg"}
                  height={500}
                  width={500}
                  className="w-[16px] h-[16px] object-cover"
                  alt="phone"
                />
                {/* <h1 className='text-[14px] leading-[24px] font-normal'>gmail.1234@gmail.com</h1> */}
                <h1 className="text-[14px] leading-[24px] font-normal ">
                  {email ?? ""}
                </h1>
              </div>

              {/* via web */}
              <div className="flex space-x-5 items-center">
                <Image
                  src={"/Dashboard/World.svg"}
                  height={500}
                  width={500}
                  className="w-[16px] h-[16px] object-cover"
                  alt="phone"
                />
                {/* <h1 className='text-[14px] leading-[24px] font-normal'>www.website.com</h1> */}
                <h1 className="text-[14px] leading-[24px] font-normal text-black">
                  {(url ?? "").slice(0, 20) +
                    ((url ?? "").length > 20 ? "..." : "")}
                </h1>
              </div>
            </div>

            {/* view details button */}
            <div
              onClick={() =>
                router.push(
                  realtor ? `/realtor/${userId}` : `/mortgage-broker/${userId}`
                )
              }
              className="w-full h-[38px] text-white text-[16px] font-normal bg-[#3EB87F] rounded-[6px] flex flex-col justify-center items-center"
            >
              {realtor ? "View Services" : "Contact Realtor"}
            </div>
          </>
        )}

        {role == "user" && (
          <>
            <div className="mt-2 ">
              <h1 className="text-[20px] font-medium text-[#34495D] mb-4">
                {`${firstname || ""} ${lastname || ""}`.trim().length > 15
                  ? `${firstname || ""} ${lastname || ""}`.trim().slice(0, 15) +
                  "..."
                  : `${firstname || ""} ${lastname || ""}`.trim()}
              </h1>
              <h1 className="text-[12px] font-normal text-black mb-4">
                Complex filtering is combining multiple filters using advanced
                methods such as combining and or. This allows for more
                flexibility to request exactly the data needed.
              </h1>
            </div>
            <div className="w-full absolute bottom-4 max-w-[300px]">
              <div className="flex flex-col md:flex-row justify-between w-full">
                <div
                  // onClick={() => router.push(`/contact/${userId}`)}
                  className=" w-full md:w-[48%]  mb-2 h-[38px] border-[1px] border-black text-[16px] font-normal  rounded-[6px] flex flex-col justify-center items-center"
                  onClick={handleChatCreation}
                >
                  Contact
                </div>
                <div
                  onClick={() => router.push(`/dashboard/preferences`)}
                  className=" w-full md:w-[48%] mb-2 h-[38px] border-[1px] border-black text-[16px] font-normal  rounded-[6px] flex flex-col justify-center items-center"
                >
                  Preferences
                </div>
              </div>

              {/* view details button */}
              <div
                onClick={() =>
                  open()
                }
                className="w-full  h-[38px] text-white text-[16px] font-normal bg-[#3EB87F] rounded-[6px] flex flex-col justify-center items-center"
              >
                Properties viewed recently
              </div>
            </div>
          </>
        )}


        <PropertyViewed close={close} opened={opened} />

      </div>
    </div>
  );
};

export default FeedBrokerRealtorCard;
