"use client";
import { AuthContext } from "@/context/AuthContext";
import IconShowcaseBox from "@/features/Dashboard/shared/IconShowcaseBox";
import Image from "next/image";
import React, { useContext } from "react";
import { format } from "date-fns";
import { MdOutlineEdit } from "react-icons/md";

type Props = {
  id?: string | number;
  Add?: boolean;
  AddOnclick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  title?: string;
  description?: string;
  dateCreated?: string;
  banner?: string | null;
  isEditEduArticles?: boolean | null;
  deleteEducationalArticles?: (id: string | number | undefined) => void;
  updateEducationalArticles?: (id: string | number | undefined) => void;
};

const AgentArticle = ({
  id,
  Add,
  AddOnclick,
  title,
  description,
  dateCreated,
  banner,
  isEditEduArticles,
  deleteEducationalArticles,
  updateEducationalArticles,
}: Props) => {
  const { profile } = useContext(AuthContext);
  return (
    <div className="my- relative">
      <div className="relative flex flex-col w-full cursor-pointer md:w-[100%] space-y-2  md:space-y-0 rounded-[12px] bg-white border border-black my-5 px-4 md:px-3 py-3 max-h-[484px] h-full min-h-[484px]">
        {/* Edit Section  */}
        {isEditEduArticles && (
          <div className="flex items-center absolute top-[20px] right-4">
            <div
              className="inline-flex p-2 justify-center items-center gap-10 rounded-full bg-white bg-opacity-42 cursor-pointer mr-[16px]"
              onClick={() =>
                deleteEducationalArticles && deleteEducationalArticles(id)
              }
            >
              <Image src={"/trash.svg"} width={20} height={20} alt="trash" />
            </div>

            <div
              className=" inline-flex p-2 justify-center items-center gap-10 rounded-full bg-white bg-opacity-42 cursor-pointer"
              onClick={() =>
                updateEducationalArticles && updateEducationalArticles(id)
              }
            >
              <MdOutlineEdit width={36} height={36} />
            </div>
          </div>
        )}

        <Image
          src={banner ?? "/House.png"}
          alt="House png"
          className="w-full h-[222px] object-cover rounded-[12px]"
          height={1000}
          width={1000}
        />
        <div className="flex flex-col space-y-5 w-full ">
          <h1 className="text-[16px] font-normal leading-[26px] text-[#666270] my-2">
            {profile?.attributes?.first_name} {profile?.attributes?.last_name} |
            {dateCreated
              ? format(new Date(dateCreated), "dd LLL y")
              : "21 Sep 2022"}
          </h1>
          <h1 className="text-[26px] line-clamp-2 text-black font-semibold leading-[36px]">
            {title ? title : "This is the Article Title"}
          </h1>
          <h1 className="text-[#666270] line-clamp-2 font-normal leading-[26px] text-[16px]">
            {description
              ? description
              : "This is the description of the article"}
          </h1>
        </div>
      </div>

      {Add && (
        <div className="absolute top-0 w-full md:w-[100%] my-5  rounded-xl left-0 h-full bg-gray-400 bg-opacity-5 backdrop-blur-lg max-h-[484px] h-full min-h-[484px]">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <IconShowcaseBox
              onClick={AddOnclick}
              text={"Add New Article"}
              color="#3EB87F"
              width="w-fit"
              textCN="text-[16px] font-semibold leading-[26px] text-white mx-[19px]"
              px="19px"
              py="9px"
              rounded={"4px"}
              noBorder
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentArticle;
