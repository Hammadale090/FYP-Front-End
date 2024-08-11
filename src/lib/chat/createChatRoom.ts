import { firestore, app } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
  where,
  and,
  getDocs,
} from "firebase/firestore";

// Create a chatroom
interface Participant {
  userId: string | number;
  name: string;
  role: string;
  image: string;
  chatRoomClosedforUser: boolean;
}

const createChatRoom = async (
  participants: Participant[],
  createdBy: string | number
) => {
  try {
    // Check if a chatroom already exists for these participants
    const participantsIDs = participants
      .map((participant: any) => participant.userId)
      .sort();
    if (participantsIDs.length != 2) {
      throw Error("There must be two participants");
    }
    const existingChatroomsQuery = query(
      collection(firestore, "chatrooms"),
      and(
        where("participantsIDs", "==", participantsIDs),
        where("chatRoomClosedforAll", "==", false)
      )
    );
    const existingChatroomsSnapshot = await getDocs(existingChatroomsQuery);

    if (existingChatroomsSnapshot.docs.length > 0) {
      // Chatroom already exists, handle it accordingly (e.g., show a message)
      console.log(
        "Chatroom already exists for these participants.",
        existingChatroomsSnapshot.docs[0]?.id
      );

      return {
        chatRoomId: existingChatroomsSnapshot.docs[0]?.id,
        ...existingChatroomsSnapshot.docs[0]?.data(),
      };
    }

    // Chatroom doesn't exist, proceed to create a new one

    const chatroomData = {
      participantsIDs,
      participantsDetail: participants,
      timestamp: serverTimestamp(),
      lastMessage: {},
      chatRoomClosedforAll: false,
      status: "",
      createdBy,
    };

    const chatroomRef = await addDoc(
      collection(firestore, "chatrooms"),
      chatroomData
    );
    console.log("Chatroom created with ID:", chatroomRef.id);
    return {
      chatRoomId: chatroomRef.id,
      ...chatroomData,
    };
  } catch (error) {
    console.error("Error creating or checking chatroom:", error);
    return {
      chatRoomId: null,
      error: error,
    };
  }
};

export default createChatRoom;
