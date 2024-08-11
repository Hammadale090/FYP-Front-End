import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetReviews } from "@/hooks/useGetReviews";
import { Avatar } from "@mantine/core";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {
  slug?: string
}

const Review = ({ slug }: Props) => {

  const [sort, setSort] = useState<string>("DESC")
  const { data, loading } = useGetReviews(slug, sort)

  const formatDate = (dateString: any) => {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const returnRating = (rating: string) => {
    if (rating === "Star 1 - Poor") {
      return [1]
    } else if (rating === "Star 2 - Fair") {
      return [1, 2]
    } else if (rating === "Star 3 - Average") {
      return [1, 2, 3]
    } else if (rating === "Star 4 - Good") {
      return [1, 2, 3, 4]
    } else if (rating === "Star 5 - Excellent") {
      return [1, 2, 3, 4, 5]
    }
  }

  console.log("the data", data)


  const UserReview = ({ stars, description, date, profilePic, firstname, lastname, user }) => {
    return (
      <div>
        <div className="flex space-x-6">
          {/* <Image
            src="/Dashboard/Property/house.jfif"
            alt="property cover image"
            width={100}
            height={100}
            className="w-[66px] h-[66px] max-h-[400px] contain  rounded-full "
          /> */}
          <Avatar className='w-[66px] h-[66px] max-h-[400px] rounded-full object-cover ' src={profilePic} alt="Profile Image" />
          <div className="flex flex-col">
            <div className="flex space-x-2 items-center mt-2">
              <p className="text-[#292640] text-[16px] font-[600] leading-[18px] tracking-[0.5px]  ">

                {firstname || lastname
                  ? `${firstname} ${lastname}`
                  : user}
              </p>
              {stars?.map((i, index) => (
                <FaStar key={index} className="text-[#F6B501] " />
              ))}
            </div>

            <p className="mt-2 text-[16px] font-[400] ">{date}</p>
            <div className="hidden md:block">
              <p className="mt-2 text-[16px] font-[400] my-2 text-justify ">
                {description}
              </p>
              {/* 
              <div className="flex space-x-2 items-center mt-12">
                <p className="text-[#292640] text-[16px] font-[600] leading-[18px] tracking-[0.5px]  ">
                  Helpfull?
                </p>

                <div className="flex  items-center ">
                  <AiOutlineLike className="text-[#F6B501] mr-2 " /> Yes
                </div>
                <div className="flex  items-center">
                  <AiOutlineDislike className="text-[#F6B501] mr-2 " />
                  No
                </div>
              </div>
              <RealtorResponse /> */}
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <p className="mt-2 text-[16px] font-[400] my-2 text-justify ">
            {description}
          </p>

          {/* <div className="flex space-x-2 items-center mt-12">
            <p className="text-[#292640] text-[16px] font-[600] leading-[18px] tracking-[0.5px]  ">
              Helpfull?
            </p>

            <div className="flex  items-center ">
              <AiOutlineLike className="text-[#F6B501] mr-2 " /> Yes
            </div>
            <div className="flex  items-center">
              <AiOutlineDislike className="text-[#F6B501] mr-2 " />
              No
            </div>
          </div>
          <RealtorResponse /> */}
        </div>
      </div>
    );
  };
  const RealtorResponse = () => {
    return (
      <div className="flex space-x-4 mt-8">
        <Image
          src="/Dashboard/Property/house.jfif"
          alt="property cover image"
          width={100}
          height={100}
          className="w-[32px] h-[32px] max-h-[400px] contain  rounded-full "
        />
        <div className="flex flex-col">
          <div className="flex space-x-2 items-center mt-2">
            <p className="text-[#292640] text-[16px] font-[600] leading-[18px] tracking-[0.5px]  ">
              {`Realtor's  Response`}
            </p>
          </div>

          <p className="mt-2 text-[16px] font-[400] ">September 6, 2022</p>
          <p className="mt-2 text-[16px] font-[400] my-2 text-justify ">
            Thnak you for your review
          </p>
        </div>
      </div>
    );
  };
  return (
    <>
      <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
        Rating & Reviews
      </h1>
      <div className="w-full p-4 border-[1px] border-[#CDCDCD] rounded-[8px] ">
        <div className="flex justify-between mb-6">
          <p>{data?.length} Review</p>
          {/* sort functionality */}
          <div className="flex space-x-2 items-center">
            {/* sort by text */}
            <h1 className="text-[10px] font-medium leading-[14px] text-[#383838]">
              Sort by:
            </h1>

            {/* The sorting dropdown */}
            <Select onValueChange={(e) => {
              setSort(e)
            }}>
              <SelectTrigger className="w-[180px] bg-[#F3F3F3]">
                <SelectValue placeholder="New First" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DESC">New First</SelectItem>
                <SelectItem value="ASC">Old First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {
          loading && (
            <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
          )
        }

        {
          data?.map((testimonial: any) => (
            <UserReview key={testimonial?.id} stars={returnRating(testimonial?.attributes?.rating)} profilePic={testimonial?.attributes?.client_profile?.data?.attributes?.profile_pic?.data?.attributes?.url} firstname={testimonial?.attributes?.client_profile?.data?.attributes?.first_name} user={testimonial?.attributes?.client_profile?.data?.attributes?.user?.data?.attributes?.username} lastname={testimonial?.attributes?.client_profile?.data?.attributes?.last_name} description={testimonial?.attributes?.review} date={formatDate(testimonial?.attributes?.publishedAt)} />
          ))
        }
      </div>
    </>
  );
};

export default Review;
