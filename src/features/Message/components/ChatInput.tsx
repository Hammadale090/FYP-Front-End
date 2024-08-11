// import React, { useState } from "react";
// import { TextInput, rem } from "@mantine/core";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { app } from "@/lib/firebase";
// import Image from "next/image";
// import { v4 as uuidv4 } from "uuid";
// import sendMessage from "@/lib/chat/sendMessage";
// type Props = {
//   selectedChatroom: any;
//   userId: any;
// };

// const ChatInput = (props: Props) => {
//   const { selectedChatroom, userId } = props;
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState<any>([]);
//   const [uploadProgress, setUploadProgress] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   // Initialize storage object
//   const storage = getStorage(app);

//   const handleFileChange = (e: any) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     // Display image preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       // setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       console.error("No file selected.");
//       return;
//     }

//     const storageRef = ref(storage, `documents/${uuidv4()}/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         // setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Error uploading file:", error.message);
//       },
//       () => {
//         // Upload complete, get download URL and log it
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           if (downloadURL) {
//             HandleSendMessage({
//               document: downloadURL,
//               document_name: file.name,
//               message,
//             });
//           }

//           // Reset file state and update message with download URL
//           setFile(null);
//           // setImage(downloadURL);
//           // Clear image preview
//           setImagePreview(null);

//           // document.getElementById('my_modal_3').close()
//         });
//       }
//     );
//   };

//   const HandleSendMessage = async (messageData: any) => {
//     // Check if the message is not empty
//     const { document, document_name, message } = messageData;

//     if (!userId || (!message && !document)) {
//       return;
//     }

//     try {
//       // Add a new message to the Firestore collection
//       const newMessage = {
//         chatRoomId: selectedChatroom,
//         userId,
//         message: message,
//         document: document,
//         document_name: document_name,
//       };

//       await sendMessage(newMessage);
//       setMessage("");
//       // setImage("");

//       // Clear the input field after sending the message
//     } catch (error: any) {
//       console.error("Error sending message:", error.message);
//     }
//   };

//   return (
//     <div className="flex space-x-2 w-full px-3">
//       <TextInput
//         className="w-[90%] bg-[#F2F2F2]"
//         placeholder="Write a message down here..."
//         size="lg"
//         onChange={(e: any) => setMessage(e.target.value)}
//         value={message}
//         rightSection={
//           <div className="flex space-x-2 items-center mr-7 ">
//             <Image
//               src={"/Message/Frown.svg"}
//               className="w-[18px] h-[18px]"
//               alt="emoji"
//               height={500}
//               width={500}
//             />
//             <div className=" min-w-[18px]">
//               <label htmlFor="filePicker">
//                 <Image
//                   src={"/Message/Link.svg"}
//                   className="w-[18px] h-[18px]"
//                   alt="emoji"
//                   height={500}
//                   width={500}
//                 />
//               </label>
//               <input
//                 type="file"
//                 id="filePicker"
//                 accept=".pdf" // Specify accepted file formats if needed
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//         }
//       />

//       <div
//         className="p-[15px] cursor-pointer gap-[10px] bg-[#3EB87F] rounded-[5px]"
//         onClick={async () => {
//           if (file) await handleUpload();
//           else HandleSendMessage({ document: "", document_name: "", message });
//         }}
//       >
//         <Image
//           src={"/Message/Send.svg"}
//           className="w-[18px] h-[18px]"
//           alt="emoji"
//           height={500}
//           width={500}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatInput;

import React, { useRef, useState } from "react";
import { TextInput } from "@mantine/core";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import sendMessage from "@/lib/chat/sendMessage";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { IoCloseCircle, IoDocumentTextOutline } from "react-icons/io5";
// import "emoji-mart/css/emoji-mart.css";

type Props = {
  selectedChatroom: any;
  userId: any;
};

const ChatInput = (props: Props) => {
  const { selectedChatroom, userId } = props;
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize storage object
  const storage = getStorage(app);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);

    // Display image preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleUpload = async () => {
    console.log(file);
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const storageRef = ref(storage, `documents/${uuidv4()}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error.message);
      },
      () => {
        // Upload complete, get download URL and log it
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (downloadURL) {
            HandleSendMessage({
              document: downloadURL,
              document_name: file.name,
              message,
            });
          }

          // Reset file state and update message with download URL
          setFile(null);
          setImagePreview(null);
          setUploadProgress(null);
        });
      }
    );
  };

  const HandleSendMessage = async (messageData: any) => {
    // Check if the message is not empty
    const { document, document_name, message } = messageData;

    if (!userId || (!message && !document)) {
      return;
    }

    try {
      // Add a new message to the Firestore collection
      const newMessage = {
        chatRoomId: selectedChatroom,
        userId,
        message: message,
        document: document,
        document_name: document_name,
      };

      await sendMessage(newMessage);
      setMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error.message);
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (file) await handleUpload();
    else await HandleSendMessage({ document: "", document_name: "", message });
  }

  return (
    <div className="w-full">
      {file && (
        <div className="flex justify-end ">
          <div className="p-2 border border-[#E4E4E4] bg-[#FCFCFC] rounded-tl-[5px] rounded-br-[5px] rounded-tr-[5px] mr-20 relative flex flex-col">
            {!uploadProgress && (
              <IoCloseCircle
                className="absolute top-[-10px] text-[20px] right-[-6px] hover:text-gray-700  text-red-500"
                onClick={() => setFile(null)} // You can handle click functionality here
              />
            )}

            <IoDocumentTextOutline className="text-[24px] self-end" />
            <p className="text-[10px]">{file.name}</p>
            {file &&
              uploadProgress &&
              uploadProgress > 1 &&
              uploadProgress < 100 && (
                <div className="w-full h-full flex items-center justify-center z-90">
                  <div className="bg-gray-200 w-full h-4 rounded-full">
                    <div
                      className="bg-green-500 h-full rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="ml-2">{uploadProgress.toFixed(0)}%</span>
                </div>
              )}
          </div>
        </div>
      )}
      <form className="flex space-x-2 w-full px-3" onSubmit={handleSubmit}>
        <TextInput
          className="w-[90%] bg-[#F2F2F2]"
          placeholder="Write a message down here..."
          size="lg"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          ref={inputRef}
          value={message}
          rightSection={
            <div className="flex space-x-2 items-center mr-7 ">
              <Image
                src={"/Message/Frown.svg"}
                className="w-[18px] h-[18px]"
                alt="emoji"
                height={500}
                width={500}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
              {showEmojiPicker && (
                <div className=" ">
                  <Picker
                    onEmojiSelect={(emoji: any) => {
                      setMessage((prevMessage) => prevMessage + emoji.native);
                      setShowEmojiPicker(false);
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }}
                    data={data}
                    onClickOutside={() => {
                      setShowEmojiPicker(false);
                    }}
                    categories={[
                      // "frequent",
                      "people",
                      // "nature",
                      // "foods",
                      "activity",
                      // "places",
                      "objects",
                      // "symbols",
                      // "flags",
                    ]}
                  />
                </div>
              )}
              <div className=" min-w-[18px]">
                <label htmlFor="filePicker">
                  <Image
                    src={"/Message/Link.svg"}
                    className="w-[18px] h-[18px]"
                    alt="emoji"
                    height={500}
                    width={500}
                  />
                </label>
                <input
                  type="file"
                  id="filePicker"
                  accept=".pdf" // Specify accepted file formats if needed
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          }
        />

        <button
          type="submit"
          className="p-[15px] cursor-pointer gap-[10px] bg-[#3EB87F] rounded-[5px]"
        >
          <Image
            src={"/Message/Send.svg"}
            className="w-[18px] h-[18px]"
            alt="emoji"
            height={500}
            width={500}
          />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
