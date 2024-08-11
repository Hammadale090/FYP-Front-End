import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

//put messages in db
interface Message {
  message: string | number;
  document_name: string | null;
  document: string | null;
  chatRoomId: string;
  userId: string | number;
}
const sendMessage = async (messageDetails: Message) => {
  const { message, document, document_name, chatRoomId, userId } =
    messageDetails;
  const messagesCollection = collection(firestore, "messages");
  // Check if the message is not empty
  if (message == "" && document == "") {
    return;
  }

  try {
    // Add a new message to the Firestore collection
    const newMessage = {
      chatRoomId: chatRoomId,
      sender_userId: userId,
      content: message,
      timestamp: serverTimestamp(),
      document: document,
      document_name: document_name,
      readBy: { [userId]: true },
    };

    await addDoc(messagesCollection, newMessage);

    //send to chatroom by chatroom id and update last message
    const chatroomRef = doc(firestore, "chatrooms", chatRoomId);
    await updateDoc(chatroomRef, {
      lastMessage: {
        sender_userId: userId,
        content: message,
        timestamp: serverTimestamp(),
        document: document,
        document_name: document_name,
      },
      timestamp: serverTimestamp(),
    });

    // Clear the input field after sending the message
    return false;
  } catch (error: any) {
    console.error("Error sending message:", error.message);
    return false;
  }
};

export default sendMessage;
