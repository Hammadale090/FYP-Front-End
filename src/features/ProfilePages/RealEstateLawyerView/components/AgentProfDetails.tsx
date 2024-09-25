"use client";
import IconShowcaseBox from "@/features/Dashboard/shared/IconShowcaseBox";
import { Divider } from "@mantine/core";
import Image from "next/image";
import React, { useContext } from "react";
import AgentContact from "../shared/AgentContact";
import AgencyDetails from "../shared/AgencyDetails";
import AgentStatus from "../shared/AgentStatus";
import AgentCertifications from "./AgentCertifications";
import { AuthContext } from "@/context/AuthContext";
import {
  AgencyData,
  Profile,
  ProfileSettings,
  UserData,
} from "@/context/types";
import createChatRoom from "@/lib/chat/createChatRoom";
import { useRouter } from "next/navigation";
import { MessageContext } from "@/context/MessageContext";

type Props = {
  slug?: string | string[];
  prof?: ProfileSettings;
  agency?: AgencyData;
  user?: UserData;
  profile?: Profile;
};

const AgentProfDetails = (props: Props) => {
  const { slug, prof, agency, user } = props;

  const {
    userId,
    profile,
    user: currentuser,
    profilepic,
    userRole,
  } = useContext(AuthContext);
  const { setSelectedChatroom } = useContext<any>(MessageContext);

  const router = useRouter();
  async function handleChatCreation() {
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
        userId: props.user.data.id,
        name: props.prof.data.attributes.full_name,
        role: props.profile.attributes.role,
        image:
          props.prof?.data?.attributes?.professional_photo?.data?.attributes
            ?.url ?? "",
        chatRoomClosedforUser: false,
      },
      {
        userId: userId,
        name: name,
        role: userRole,
        image: profilepic ?? "",
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
  }

  return (
    <section className="flex flex-col md:flex-row md:space-x-10 w-full my-10">
      {/* the agent contact details */}
      <div className="bg-[#FCFCFC] flex flex-col space-y-2 rounded-[10px] w-full md:w-[30%] px-[17px] py-[16px]">
        <div className="flex justify-between w-[60%]">
          {/* the rating */}
          <div className="flex items-center ">
            <Image
              src={"/Broker/Star.svg"}
              alt="ratings"
              className="w-[10px] h-[10px]"
              width={500}
              height={500}
            />
            <h1 className="leading-[22px] font-normal text-[14px]">4.8</h1>
          </div>

          {/* the agent image */}
          <Image
            // src={"/lawyer/Agent.png"}
            src={
              prof?.data?.attributes?.professional_photo?.data
                ? prof?.data?.attributes?.professional_photo?.data?.attributes
                    ?.url ?? "/lawyer/Agent.png"
                : "/lawyer/Agent.png"
            }
            alt="profile pic"
            width={1000}
            height={1000}
            className="max-w-[100px] max-h-[100px] rounded-full"
          />
        </div>

        {/* the agent name */}
        <div className="flex space-x-2 justify-center items-center">
          <h1 className="text-[#11142D] text-[26px] font-semibold">
            {prof?.data?.attributes?.full_name ?? "Hussain Ahmed"}
          </h1>
          <Image
            src={"/Broker/Verified.svg"}
            className="w-[19px] h-[19px]"
            width={500}
            height={500}
            alt="broker verified"
          />
        </div>

        {/* /the contact and share profile */}
        <div className="flex space-x-4">
          <IconShowcaseBox
            text="Contact"
            color="#3EB87F"
            noBorder
            textColor="#FCFCFC"
            rounded="4px"
            width="w-[50%]"
            textCenter
            onClick={handleChatCreation}
          />
          <IconShowcaseBox
            text="Share Profile"
            color="#3EB87F"
            noBorder
            textColor="#FCFCFC"
            rounded="4px"
            width="w-[50%]"
            textCenter
          />
        </div>

        {/* schedule a consultation */}
        <IconShowcaseBox
          text="Schedule a consultation"
          color="#3EB87F"
          noBorder
          textColor="#FCFCFC"
          rounded="4px"
          textCenter
        />

        <Divider my={"lg"} />

        {/* the user contact , age, Experience, city, phone, and email */}
        <div className="my-7">
          <AgentContact header="Age" details="26" />
          <AgentContact
            header="Experience"
            details={prof?.data?.attributes?.Experience ?? "Over 4 years"}
          />
          <AgentContact
            header="City"
            details={prof?.data?.attributes?.city ?? "New York City"}
          />
          <AgentContact
            header="Phone"
            details={prof?.data?.attributes?.phone ?? "+021 541 236 4580"}
          />
          <AgentContact
            header="Email"
            details={user?.data?.attributes?.email ?? "hussain145@gmail.com"}
          />
        </div>

        <Divider my={"xl"} />
        {/* contact the social links */}
        <div className="flex justify-center space-x-3 items-center">
          <Image
            src={"/Broker/Facebook.svg"}
            className="w-[38px] h-[38px]"
            width={500}
            height={500}
            alt="facebook link"
          />
          <Image
            src={"/Broker/Twitter.svg"}
            className="w-[38px] h-[38px]"
            width={500}
            height={500}
            alt="twitter link"
          />
          <Image
            src={"/Broker/Instagram.svg"}
            className="w-[38px] h-[38px]"
            width={500}
            height={500}
            alt="Instagram link"
          />
        </div>
      </div>

      {/* The agent description details */}
      <div className="bg-[#FCFCFC] flex flex-col space-y-2 rounded-[10px] w-full md:w-[70%] max-md:my-2 p-[20px]">
        {/* the header */}
        <h1 className="text-[#11142D] text-[18px] font-semibold">
          Agent Details
        </h1>
        <Divider my="xl" />

        {/* information */}
        <div className="flex space-x-2 my-4 items-center">
          <Image
            src={"/Realtor/logo-1.png"}
            className="hidden md:inline-flex max-h-[120px] max-w-[100px] rounded-xl"
            alt="estate image"
            width={500}
            height={500}
          />
          <h1 className="text-[#808191] text-[16px] font-normal">
            {agency?.data?.attributes?.Agency_bio ??
              "Talent customers tend to earn a basic salary in the range of £15,000 to £35,000 per annum. However, talented customers also earn a commission for finding their client&apos;s work. Typically, agents receive around 10% of what the client is paid."}
          </h1>
        </div>

        {/* The agency details */}
        <div className="my-7">
          <AgencyDetails
            header="Agency"
            details={
              agency?.data?.attributes?.Agency_name ??
              "All American Real Estate"
            }
          />
          <AgencyDetails
            header="Expertise"
            details={
              agency?.data?.attributes?.Expertise ??
              "This is just placeholder text. Don’t be alarmed."
            }
          />
          <AgencyDetails
            header="Tax Number"
            details={
              agency?.data?.attributes?.Tax_number ?? "TX 87D0 678H PQ45"
            }
          />
          <AgencyDetails
            header="Service area"
            details={
              agency?.data?.attributes?.Service_area ??
              "Chicago, Los Angeles, New York, Miami beach"
            }
          />
        </div>

        {/* The Agent certificate */}
        <AgentCertifications slug={slug} />
      </div>
    </section>
  );
};

export default AgentProfDetails;
