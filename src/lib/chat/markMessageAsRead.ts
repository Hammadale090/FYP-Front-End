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

// Function to mark a message as read
const markMessageAsRead = async (messageId: string, userId: any) => {
  try {
    const messageRef = doc(firestore, "messages", messageId);
    await updateDoc(messageRef, {
      [`readBy.${userId}`]: true, // Mark the message as read by the user
    });
  } catch (error: any) {
    console.error("Error marking message as read:", error.message);
  }
};

export default markMessageAsRead;
