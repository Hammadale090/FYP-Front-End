import { firestore, app } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Close chat for a participant
const closeChat = async (
  chatroom_id: string,
  participant_userId: string | number
) => {
  try {
    // Find the specific chatroom by ID
    const chatroomRef = doc(firestore, "chatrooms", chatroom_id);
    const chatroomDoc = await getDoc(chatroomRef);

    if (!chatroomDoc.exists()) {
      console.error("Chatroom not found:", chatroom_id);
      return;
    }

    const chatroomData = chatroomDoc.data();

    // Update the chatroom to mark the participant as closed
    const updatedParticipantsDetail = chatroomData.participantsDetail.map(
      (participant: any) => {
        if (participant.userId === participant_userId) {
          return { ...participant, chatRoomClosedforUser: true };
        }
        return participant;
      }
    );

    await updateDoc(chatroomRef, {
      participantsDetail: updatedParticipantsDetail,
    });

    // Check if all other participants have closed the chat
    const allParticipantsClosed = updatedParticipantsDetail.every(
      (participant: any) => participant.chatRoomClosedforUser
    );

    // If all other participants have closed the chat, update the chatroom
    if (allParticipantsClosed) {
      await updateDoc(chatroomRef, {
        chatRoomClosedforAll: true,
      });
      console.log("Chatroom closed for all");
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error closing chat for participant:", error);
    return {
      success: false,
    };
  }
};

export default closeChat;
