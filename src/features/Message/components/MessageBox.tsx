import Image from "next/image";
import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import DocumentSigner from "./DocumentSigner";
type Props = {
  sender?: boolean;
  text: string;
  date: string;
  document: string;
  document_name: string;
};

const MessageBox = ({ sender, text, date, document, document_name }: Props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={`w-full  my-10   ${sender && "flex justify-end"}`}>
      <div>
        <div
          className={`flex ${
            sender ? "flex-row-reverse" : "flex-row"
          } space-x-2 items-center`}
        >
          <div className="">
            {text && text?.length > 0 && (
              <div
                className={`py-[10px] px-[15px] mb-[10px] ${
                  sender
                    ? "rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[10px] bg-[#F2F2F2]"
                    : " border border-[#E4E4E4] bg-[#FCFCFC] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px]"
                } rounded-[]`}
              >
                {text}
              </div>
            )}
            {document && (
              // <DocViewer
              //   pluginRenderers={DocViewerRenderers}
              //   documents={[{ uri: image  }]}
              // />
              // <iframe
              //   src={image}
              //   width="100%"
              //   height="600px"
              //   title="Document Preview"
              // ></iframe>

              <div
                onClick={() => setShowModal(true)}
                className={`py-[10px] px-[15px] ${
                  sender
                    ? "rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[10px] bg-[#F2F2F2]"
                    : " border border-[#E4E4E4] bg-[#FCFCFC] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[10px]"
                } rounded-[]`}
              >
                <IoDocumentTextOutline className="text-[50px]" />
                {document_name}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/Message/menu.svg"}
              alt="menu icon"
              height={500}
              width={500}
              className="w-[18px] h-[18px] cursor-pointer mb-6"
            />
            {/* {document && (
              <p
                onClick={() => setShowModal(true)}
                className="px-[1px] cursor-pointer"
              >
                <FaSignature />
              </p>
            )} */}
          </div>
        </div>
        {/* date */}
        <div className={`w-full mt-2  ${sender && "flex justify-end"}`}>
          <h1 className="text-[12px] leading-[18px] font-normal text-[#808191]">
            {date}
          </h1>
        </div>
      </div>
      <DocumentSigner
        document_link={document}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default MessageBox;
