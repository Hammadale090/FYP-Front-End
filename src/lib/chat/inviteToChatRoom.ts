import { firestore } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { fetcher } from "../fetchers";

const inviteToChatRoom = async (
  chatRoomId: string,
  userToBeInvite: string,
  jwt: any
) => {
  try {
    // Get the chatroom document
    const chatroomRef = doc(firestore, "chatrooms", chatRoomId);
    const chatroomSnapshot = await getDoc(chatroomRef);

    if (!chatroomSnapshot.exists()) {
      throw new Error("Chatroom not found");
    }

    //Get user my email
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?filters[email][$eq]=${userToBeInvite}&populate[0]=client_profile.profile_pic`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (responseData.length != 1 || !responseData[0]?.email) {
      return {
        status: false,
        message: "User not found",
      };
    }
    console.log(responseData[0].client_profile);
    const firstName = responseData[0].client_profile?.first_name;
    const lastName = responseData[0].client_profile?.last_name;
    const username = responseData[0].username;

    let name = "";
    if (firstName || lastName) {
      name = `${firstName || ""} ${lastName || ""}`;
    } else if (username) {
      name = username;
    }
    console.log("response data is ", responseData);
    const newParticipant = {
      userId: responseData[0]?.id,
      name: name,
      image: responseData[0].client_profile?.profile_pic?.url || "",
      role: responseData[0].client_profile?.role || "",
    };

    // Extract and update participantsIDs array
    let participantsIDs = chatroomSnapshot.data().participantsIDs;
    if (participantsIDs.includes(newParticipant.userId)) {
      return {
        status: false,
        message: "This user is already part of this ChatRoom",
      };
    }
    participantsIDs.push(newParticipant.userId);
    participantsIDs = participantsIDs.sort();

    // Update the chatroom document to add new participants
    await updateDoc(chatroomRef, {
      participantsIDs,
      participantsDetail: [
        ...chatroomSnapshot.data().participantsDetail,
        newParticipant,
      ], // Change here
    });

    return {
      status: true,
      message: "Participant invited successfully.",
    };
  } catch (error) {
    console.error("Error inviting participant to chatroom:", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export default inviteToChatRoom;
