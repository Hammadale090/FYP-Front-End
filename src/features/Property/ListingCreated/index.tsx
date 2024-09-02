"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Divider, Modal } from "@mantine/core";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import Review from "../Review";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoCheckmarkDoneCircleSharp, IoEyeOutline } from "react-icons/io5";
import { FaLocationDot, FaTiktok } from "react-icons/fa6";
import { PiShareNetwork } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { MdOutlineReport } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { CiMap } from "react-icons/ci";
import { useGetProperty } from "@/hooks/useGetProperty";
import { ListingContext } from "@/context/ListingContext";
import Map from "@/components/Map";
import Link from "next/link";
import createChatRoom from "@/lib/chat/createChatRoom";
import { AuthContext } from "@/context/AuthContext";
import sendMessage from "@/lib/chat/sendMessage";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import NeighborhoodTabs from "../components/NeighborhoodTabs";
import { useDisclosure } from "@mantine/hooks";
import InvitedProfessionals from "./InvitedProfessionals";
import { getSafetyScore } from "@/lib/safetyscore/getSafetyScore";
import { BiLoaderAlt } from "react-icons/bi";
import Rating from "../components/Rating";
import ReactPlayer from "react-player/youtube";
// import PreferencesSelectBox from './components/PreferencesSelectBox'
// import PreferencesCheckBox from './components/PreferencesCheckBox'

type Props = {};

const ListingCreated = (props: Props) => {
  const [message, setMessage] = useState("");
  const { profileId, userRole, profile, profilepic, userId } =
    useContext<any>(AuthContext);
  const { toast } = useToast();
  const [opened, { open, close }] = useDisclosure(false);
  const [chosenImage, setChosenImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const router = useRouter();
  useGetProperty("created");

  const {
    loading,
    setLoading,
    propertyData,
    currentWeather,
    hourlyWeather,
    setToInitial,
    updateSafetyScore,
    addOrRemovePropertyFromfavourites,
  }: any = useContext(ListingContext);
  const [favouritess, setFavouritess] = useState(
    propertyData?.attributes?.favourites || []
  );
  const [loader, setLoader] = useState<boolean>(false);

  console.log("this is the propertyData", propertyData)
  useEffect(() => {
    if (propertyData?.attributes) {
      setFavouritess(propertyData?.attributes?.favourites || []);
    }
  }, [propertyData?.attributes?.favourites]);

  const favouritesCount = favouritess?.length;

  const isPropertyInFavorites = favouritess?.includes(profileId);

  const isAddorRemoveFromFavouritesHandler = async () => {
    const res = await addOrRemovePropertyFromfavourites(
      propertyData?.id,
      !isPropertyInFavorites,
      favouritess,
      setLoader
    );

    if (res) {
      setFavouritess(res);
    }
  };

  const openPreview = () => {
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  async function HandleSendMessage() {
    try {
      if (!message && !message.trim()) return;
      // my details
      const myDetails = {
        userId: userId,
        name: profile?.name,
        role: userRole,
        image: profilepic,
        chatRoomClosedforUser: false,
      };

      //otheruser details
      const firstName = propertyData?.client_profile?.first_name;
      const lastName = propertyData?.client_profile?.last_name;
      const username = propertyData?.username;

      let name = "";
      if (firstName || lastName) {
        name = `${firstName || ""} ${lastName || ""}`;
      } else if (username) {
        name = username;
      }
      const otherUserDetails = {
        userId: propertyData?.userId,
        name: name,
        role: propertyData?.userRole,
        image: propertyData?.client_profile?.profilepic,
        chatRoomClosedforUser: false,
      };
      const { chatRoomId, error } = await createChatRoom(
        [myDetails, otherUserDetails],
        userId
      );
      if (!chatRoomId) {
        throw Error();
      }
      if (chatRoomId) {
        const messageDetails = {
          message,
          document: null,
          document_name: null,
          chatRoomId,
          userId,
        };
        await sendMessage(messageDetails);
      }
      toast({
        action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
        description: "Message sent!",
      });
    } catch (error) {
      console.log("error occured ", error);
      toast({
        description: `Something went wrong`,
        action: <IoCheckmarkDoneCircleSharp className="text-blue" />,
      });
    }
  }

  const [safetyScore, setSafetyScore] = useState(null);

  async function _getSafetyScore() {
    setLoading(true);
    const score = await getSafetyScore(
      `${propertyData?.attributes?.city}, ${propertyData?.attributes?.zip
        ? `zip code: ${propertyData?.attributes?.zip}`
        : ""
      },
      ${propertyData?.attributes?.area
        ? `area: ${propertyData?.attributes?.area}`
        : ""
      }
      `
    );

    await updateSafetyScore(score ? `${score}` : "");

    setSafetyScore(score);
    setLoading(false);
  }

  useEffect(() => {
    console.log("propertyData?.attributes ", propertyData?.attributes);
    if (propertyData && !propertyData?.attributes?.safetyRatings) {
      _getSafetyScore();
    } else setSafetyScore(propertyData?.attributes?.safetyRatings);
  }, [propertyData]);

  if (!propertyData?.attributes) return <></>;
  if (propertyData?.attributes)
    return (
      <section>
        <Divider my="sm" />

        <div className="container mx-auto my-7">
          {/* top section */}

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-[8px] text-[#34495D]">
              <h1 className="text-[32px] font-medium leading-[20px]">
                View Property
              </h1>
            </div>
            {/* Create Listing button */}
            {
              userRole && userRole != "user" && (
                // <Link href={"/dashboard/property/create-property"}>
                <div
                  onClick={() => {
                    setToInitial();
                    router.push("/dashboard/property/create-property");
                  }}
                  className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white bg-[#3EB87F] border border-white "
                >
                  Create Listing
                </div>
              )
              // </Link>
            }
          </div>

          <div className="flex flex-col md:flex-row md:justify-between mt-6">
            <div>
              <div className="flex  space-x-2 text-[10px]">
                <div className=" hidden md:flex items-center rounded-[6px] border-[1px] border-[#3EB87F] px-[6px] py-[4px] bg-[#C3FFE3] ">
                  <Image
                    src="/Dashboard/Property/home-trend-up.png"
                    alt="property cover image"
                    width={100}
                    height={100}
                    className="w-[20px] h-[20px] contain  rounded-md mr-2"
                  />
                  {`best time to sell (Based on Market Trends of 6 months)`}
                </div>
                <div
                  className="flex items-center  px-[6px] py-[4px] 
           rounded-[6px]
            font-normal text-white bg-[#3EB87F] border border-white
          "
                >
                  {`Luxury Living`}{" "}
                  <IoMdInformationCircleOutline className="ml-2 text-[16px]" />
                </div>
                <div className="flex items-center  px-[6px] py-[4px]">
                  <IoEyeOutline className="mr-2 text-[16px]" />{" "}
                  {`${propertyData?.attributes?.views?.length ?? 0} views`}
                </div>
              </div>
              <h1 className="text-[32px] font-medium  mt-6">
                {propertyData?.attributes?.name}
              </h1>
              <div className="w-full  mr-unset md:mr-4 overflow-hidden flex items-center space-x-2 text-[#383838] mt-6">
                <FaLocationDot />
                <p className="text-[12px]   ">
                  {propertyData?.attributes?.location}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:items-end">
              <div className="flex space-x-4 text-[24px]">
                <div className="flex items-center  ">
                  <MdOutlineReport className="" />
                </div>
                <div className="flex items-center  ">
                  <PiShareNetwork className="" />
                </div>
                <div className="flex items-center  ">
                  {loader ? (
                    <div className="flex justify-center">
                      {" "}
                      <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
                    </div>
                  ) : (
                    <>
                      <Image
                        src={
                          isPropertyInFavorites
                            ? "/Feed/FavoriteActive.svg"
                            : "/Feed/Favorite.svg"
                        }
                        className="h-[24px] w-[24px]"
                        height={500}
                        width={500}
                        alt="favorite icon"
                        onClick={() => {
                          isAddorRemoveFromFavouritesHandler();
                        }}
                      />
                      <h1 className="text-[14px] leading-[20px] font-normal text-black">
                        {favouritesCount ?? 0}
                      </h1>
                    </>
                  )}
                </div>
              </div>

              <h1 className="text-[32px] font-medium leading-[20px] mt-6">
                $ {propertyData?.attributes?.price}
              </h1>
              <div className="w-full   overflow-hidden flex items-center space-x-2 text-[#383838] mt-6">
                <p className="text-[12px]   ">{`High-end properties with premium features.`}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full pt-4">
            {/* left */}
            <div className=" flex flex-col  w-full md:w-2/3  ">
              <div className=" flex flex-col  w-full ">
                {/* left side */}
                <div className="w-full  mr-unset md:mr-4 overflow-hidden flex flex-col space-y-2">
                  {propertyData?.attributes?.coverPhoto?.data?.attributes
                    ?.url ? (
                    propertyData?.attributes?.coverPhotoFromUrl && (
                      <Image
                        src={
                          propertyData?.attributes?.coverPhoto?.data?.attributes
                            ?.url ||
                          propertyData?.attributes?.coverPhotoFromUrl ||
                          "/Dashboard/Property/house.jfif"
                        }
                        alt="property cover image"
                        width={800}
                        height={800}
                        className="w-full h-[80%] max-h-[400px] object-cover object-top  rounded-md"
                      />
                    )
                  ) : (
                    <Image
                      src={"/Dashboard/Property/house.jfif"}
                      alt="property cover image"
                      width={800}
                      height={800}
                      className="w-full h-[80%] max-h-[400px] object-cover object-top  rounded-md"
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-1">
                  {(propertyData?.attributes?.Gallery?.data?.length > 0
                    ? propertyData.attributes.Gallery.data
                    : propertyData?.attributes?.galleryWithUrls || []
                  ).map((galleryImg: any, index: any) => (
                    <Image
                      key={index}
                      src={
                        galleryImg?.attributes?.url ?? // For Gallery.data
                        galleryImg ?? // For galleryWithUrls, which is an array of URLs
                        "/Dashboard/Property/house.jfif" // Default fallback image
                      }
                      onClick={() => {
                        setChosenImage(
                          galleryImg?.attributes?.url || galleryImg
                        );
                        openPreview();
                      }}
                      alt="property cover image"
                      width={400}
                      height={400}
                      className="w-[116px] h-[80px] hover:scale-105 cursor-pointer object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
              {/* Safety Rating */}
              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Safety Rating:
              </h1>
              {safetyScore ? (
                <div className="flex items-center">
                  <FaStar className="text-[#F6B501] " />
                  <p className="text-[20px] font-bold leading-[20px] ml-2">
                    {safetyScore}
                  </p>
                </div>
              ) : (
                loading && (
                  <div className="flex ">
                    <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
                  </div>
                )
              )}

              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Property Type: <br /> <span className="font-bold">{propertyData?.attributes?.type}</span>
              </h1>
              {/* Overview */}
              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Overview
              </h1>
              <div className="grid grid-cols-2 items-center md:grid-cols-4  ">
                {[
                  {
                    name: "ID",
                    image: "/Dashboard/Property/home.png",
                    value: propertyData?.id,
                  },
                  {
                    name: "Type",
                    image: "/Dashboard/Property/type.png",
                    value: propertyData?.attributes?.overview?.type,
                  },
                  {
                    name: "Bedrooms",
                    image: "/Dashboard/Property/Bed.png",
                    value: propertyData?.attributes?.overview?.bathrooms,
                  },
                  {
                    name: "Bathrooms",
                    image: "/Dashboard/Property/basin.png",
                    value: propertyData?.attributes?.overview?.bedrooms,
                  },
                  {
                    name: "Garages",
                    image: "/Dashboard/Property/garage.png",
                    value: propertyData?.attributes?.overview?.garages,
                  },
                  {
                    name: "Size",
                    image: "/Dashboard/Property/size.png",
                    value: propertyData?.attributes?.overview?.size,
                  },
                  {
                    name: "Land Size",
                    image: "/Dashboard/Property/landsize.png",
                    value: propertyData?.attributes?.overview?.landSize,
                  },
                  {
                    name: "Year Build",
                    image: "/Dashboard/Property/yearbuild.png",
                    value: propertyData?.attributes?.overview?.yearBuild,
                  },
                ].map((i, index) => {
                  return (
                    <div
                      className="flex flex-col-2 items-center gap-2 mr-3  my-3"
                      key={index}
                    >
                      <div className="bg-[#F3F3F3] w-[50px] h-[50px] rounded-[8px] flex items-center justify-center shrink-0">
                        <Image
                          src={i.image}
                          alt="property cover image"
                          width={100}
                          height={100}
                          className="w-[24px] h-[24px] contain  rounded-md shrink-0"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h1 className="text-[#292640] text-[14px] font-medium leading-[18px] tracking-[0.5px] ">
                          {i?.name}
                        </h1>
                        <p className="text-[#0B0C0E] text-[14px] font-semibold">
                          {i?.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-2 mt-8">
                <h1 className="text-[16px] font-medium leading-[20px] ">
                  Description
                </h1>
                <p className="text-[#383838] text-[14px] text-justify ">
                  {propertyData?.attributes?.description}
                </p>
              </div>
              {/*  Additional details */}
              <div className="flex justify-between items-center mt-6">
                <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                  Additional details
                </h1>

                <div
                  className="flex items-center  px-[6px] py-[4px] 
           rounded-[6px]
            font-normal text-white bg-[#3EB87F] border border-white h-10 md:w-48
          "
                >
                  <CiMap className="mr-2 text-[24px]" />{" "}
                  <p className="hidden md:block">See all properties</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 md:space-y-6 ">
                {[
                  {
                    name: "Deposit:",
                    value:
                      propertyData?.attributes?.additional_information?.deposit,
                  },
                  {
                    name: "Last remodel year:",
                    value:
                      propertyData?.attributes?.additional_information
                        ?.lastRemodelYear,
                  },
                  {
                    name: "Equipement:",
                    value:
                      propertyData?.attributes?.additional_information
                        ?.equipment,
                  },
                  {
                    name: "Pool size:",
                    value:
                      propertyData?.attributes?.additional_information
                        ?.poolSize,
                  },
                  {
                    name: "Amenities:",
                    value:
                      propertyData?.attributes?.additional_information
                        ?.amenties,
                  },
                  {
                    name: "Additional Rooms",
                    value:
                      propertyData?.attributes?.additional_information
                        ?.additionalRooms,
                  },
                ].map((i, index) => {
                  return (
                    <div
                      className="flex flex-row border-b-[1px]  justify-between items-center border-b-[#F3F3F3] space-y-2 mr-6  mt-4"
                      key={index}
                    >
                      <h1 className="text-[#292640] text-[14px] font-[600] leading-[18px] tracking-[0.5px] ">
                        {i?.name}
                      </h1>
                      <p className="text-[#383838] text-[14px]">{i?.value}</p>
                    </div>
                  );
                })}
              </div>
              {/* Address */}
              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Address
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 md:space-y-6 ">
                {[
                  {
                    name: "Full Address:",
                    value: propertyData?.attributes?.address,
                  },
                  { name: "City:", value: propertyData?.attributes?.city },
                  {
                    name: "State/county:",
                    value: propertyData?.attributes?.state,
                  },
                  {
                    name: "Zip/Postal Code:",
                    value: propertyData?.attributes?.zip,
                  },
                  { name: "Area:", value: propertyData?.attributes?.area },
                  {
                    name: "Country:",
                    value: propertyData?.attributes?.country,
                  },
                ].map((i, index) => {
                  return (
                    <div
                      className="flex flex-row border-b-[1px]  justify-between items-center border-b-[#F3F3F3] space-y-2 mr-6  mt-4"
                      key={index}
                    >
                      <h1 className="text-[#292640] text-[14px] font-[600] leading-[18px] tracking-[0.5px] ">
                        {i.name}
                      </h1>
                      <p className="text-[#383838] text-[14px]">{i?.value}</p>
                    </div>
                  );
                })}
              </div>
              {/*   Features*/}
              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Features
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
                {
                  // [
                  //   "Air Conditioning",
                  //   "Gym",
                  //   "TV",
                  //   "Barbeque",
                  //   "Laundry",
                  //   "Washer",
                  //   "Window Coverings",
                  //   "Wifi",
                  //   "Swimming Pool",
                  // ]
                  propertyData?.attributes?.features &&
                  propertyData?.attributes?.features?.map(
                    (
                      i: string | number | boolean | null | undefined,
                      index: React.Key | null | undefined
                    ) => {
                      return (
                        <div className="flex space-x-6" key={index}>
                          <Checkbox defaultChecked />
                          <p>{i}</p>
                        </div>
                      );
                    }
                  )
                }
              </div>
              {/* the review */}
              <Review
                slug={
                  propertyData?.attributes?.professional_profile?.data
                    ?.attributes?.client_profile?.data?.attributes?.user?.data
                    ?.id
                }
              />

              {/* the review */}
              {/* Real-Time Energy Efficiency Metrics */}
              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Real-Time Energy Efficiency Metrics
              </h1>
              <div className="grid grid-cols-1  md:space-y-6 ">
                {[
                  {
                    name: "Energy Consumption",
                    value:
                      propertyData?.attributes?.energy_efficiency_metrics
                        ?.energy_consumption,
                  },
                  {
                    name: "Solar Panel Output",
                    value:
                      propertyData?.attributes?.energy_efficiency_metrics
                        ?.solar_panel_output,
                  },
                  {
                    name: "Environmental Impact",
                    value:
                      propertyData?.attributes?.energy_efficiency_metrics
                        ?.environmental_impact,
                  },
                ].map((i, index) => {
                  return (
                    <div
                      className="flex flex-row border-b-[1px]  justify-between items-center border-b-[#F3F3F3] space-y-2 mr-6  mt-4"
                      key={index}
                    >
                      <h1 className="text-[#292640] text-[14px] font-[600] leading-[18px] tracking-[0.5px] ">
                        {i.name}
                      </h1>
                      <p className="text-[#383838] text-[14px]">{i?.value}</p>
                    </div>
                  );
                })}
              </div>

              {/*   Dynamic Weather Intergration */}
              {currentWeather &&
                currentWeather?.weather &&
                currentWeather?.weather[0] && (
                  <div>
                    <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                      Dynamic Weather
                    </h1>

                    <div className="w-full flex">
                      <div className="w-[40%] flex flex-col items-center">
                        <Image
                          src={"/Property/weather_rain_icon.png"}
                          width={250}
                          height={250}
                          alt="weather_icon"
                        />

                        <h2 className="text-center font-semibold text-[64px] text-[#34495D]">
                          {/* 28º */}
                          {(currentWeather?.main?.temp - 273.15).toFixed(2) +
                            String.fromCharCode(176)}
                        </h2>
                        <p className="text-center font-normal text-[18px] text-[#34495D]">
                          {currentWeather?.weather[0]?.description?.toUpperCase()}
                        </p>

                        <div className="flex items-center">
                          <p className="text-center font-normal text-[18px] text-[#34495D] mr-[14px]">
                            Max.:{" "}
                            {(currentWeather?.main?.temp_max - 273.15).toFixed(
                              2
                            ) + String.fromCharCode(176)}
                          </p>
                          <p className="text-center font-normal text-[18px] text-[#34495D]">
                            Min.:{" "}
                            {(currentWeather?.main?.temp_min - 273.15).toFixed(
                              2
                            ) + String.fromCharCode(176)}
                          </p>
                        </div>
                      </div>

                      <div className="w-[45%]">
                        <div className="w-full flex items-center justify-between">
                          <span className="flex items-center">
                            <Image
                              src={"/Property/rain_icon.svg"}
                              alt="icon"
                              width={30}
                              height={30}
                            />{" "}
                            {/* 6% */}
                          </span>
                          <span className="flex items-center">
                            <Image
                              src={"/Property/humidity_icon.svg"}
                              alt="icon"
                              width={30}
                              height={30}
                            />
                            {currentWeather?.main?.humidity}
                          </span>
                          <span className="flex items-center">
                            <Image
                              src={"/Property/wind_icon.svg"}
                              alt="icon"
                              width={30}
                              height={30}
                            />
                            {(currentWeather?.wind?.speed * 3.6)?.toFixed(0)}{" "}
                            km/h
                          </span>
                        </div>

                        <div className="w-full flex items-center justify-between mt-[36px]">
                          <p>Today</p>
                          <p>
                            {new Date().toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-[12px]">
                          {hourlyWeather?.map((hourWeather: any, ind: any) => {
                            const temp =
                              (hourWeather?.main?.temp - 273.15).toFixed(2) +
                              String.fromCharCode(176);

                            const timestamp = hourWeather?.dt; // Assuming item.dt is the UNIX timestamp
                            // console.log("timestamp: ", ind+1, ':', timestamp);

                            const forecastTime = new Date(timestamp * 1000);

                            // Get hours and minutes
                            const hours = forecastTime
                              .getHours()
                              .toString()
                              .padStart(2, "0");
                            const minutes = forecastTime
                              .getMinutes()
                              .toString()
                              .padStart(2, "0");

                            return (
                              <div
                                key={ind}
                                className="border border-black rounded-lg w-[70px] h-[155px] shrink-0 flex flex-col items-center justify-between py-[15px]"
                              >
                                <p>{temp}</p>
                                <Image
                                  src={"/Property/weather_rain_icon.png"}
                                  alt=""
                                  width={80}
                                  height={80}
                                />
                                <p>{`${hours}:${minutes}`}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/*   User-Generated Content Showcase */}
              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                User-Generated Content Showcase
              </h1>
              <div className="grid grid-cols-1">
                <div className="flex flex-col space-y-2 mr-6  mt-4">
                  <div className="grid grid-cols-3  gap-4">
                    {propertyData?.attributes?.user_generated_showcase?.data?.map(
                      (userGeneratedImg: any, index: any) => {
                        return (
                          userGeneratedImg?.attributes?.url && (
                            <Image
                              key={index}
                              // src="/Dashboard/Property/house.jfif"
                              src={
                                userGeneratedImg?.attributes?.url
                                // ??
                                // "/Dashboard/Property/house.jfif"
                              }
                              alt="property cover image"
                              width={400}
                              height={400}
                              className="w-[248px] h-[248px] contain  rounded-md"
                            />
                          )
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              {/*   Smart Furiture Placement Suggestions*/}
              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Virtual Tour
              </h1>
              <div className="grid grid-cols-1  ">
                <div className="relative w-full max-h-[437px]">
                  <iframe
                    src="https://my.matterport.com/show/?play=1&lang=en-US&m=5zn45Lf2edz"
                    style={{ width: '100%', height: '437px' }}
                    frameBorder="0"
                    allowFullScreen
                    allow="xr-spatial-tracking"
                    title="Virtual Tour"
                  />
                  {/*       
                  <ReactPlayer
                    controls
                    width="100%"
                    height="437px"
                    url={
                      propertyData?.attributes?.furnitureSugesstions?.videoUrl
                    }
                  /> */}
                  {/* <iframe
                className="w-full h-[437px]"
                src={
                  propertyData?.attributes?.furnitureSugesstions?.videoUrl
                  // ??
                  // "https://www.youtube.com/embed/ZMV4l6sqteM"
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}
                </div>

                {/* <Image
              src="/Dashboard/Property/house.jfif"
              alt="property cover image"
              width={100}
              height={100}
              className="w-full max-h-[437px] "
            /> */}
              </div>
              {/*  Video*/}
              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Video
              </h1>

              <div className="grid grid-cols-1">
                <div className="relative w-full max-h-[437px]">
                  <ReactPlayer
                    controls
                    width="100%"
                    height="437px"
                    url={propertyData?.attributes?.videoUrl}
                  />
                  {/* <iframe
                className="w-full h-[437px]"
                src={
                  propertyData?.attributes?.videoUrl
                  // ??
                  // "https://www.youtube.com/embed/P7BNTJwqYkQ"
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}
                </div>
              </div>
              {/* map here */}

              <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
                Location
              </h1>

              <Map
                address={
                  propertyData?.attributes?.address +
                  propertyData?.attributes?.city ||
                  "1600 Amphitheatre Parkway, Mountain View, CA"
                }
              />

              {/* neighbourhood */}

              {/* propertyData?.attributes?.location */}
              <div className="w-full flex flex-col">
                <NeighborhoodTabs
                  address={
                    propertyData?.attributes?.location != "" &&
                    propertyData?.attributes?.location
                    // : "1600 Amphitheatre Parkway, Mountain View, CA"
                  }
                />
              </div>
            </div>
            {/* right */}
            <div className="bg-[#F3F3F3] rounded-[8px] w-full max-w-[370px] h-fit p-6 mt-6 md:mt-0 md:ml-4 flex flex-col items-center">
              <div className="flex flex-col items-center">
                {propertyData?.attributes?.coverPhoto?.data?.attributes
                  ?.url && (
                    <Image
                      src={
                        propertyData?.attributes?.coverPhoto?.data?.attributes
                          ?.url
                      }
                      alt="property cover image"
                      width={400}
                      height={400}
                      className="w-[142px] h-[142px] max-h-[400px] object-cover object-center  rounded-full "
                    />
                  )}
                <p
                  onClick={() => {
                    let role =
                      propertyData?.attributes?.professional_profile?.data
                        ?.attributes?.client_profile?.data?.attributes?.role;
                    let id =
                      propertyData?.attributes?.professional_profile?.data
                        ?.attributes?.client_profile?.data?.attributes?.user
                        ?.data?.id;

                    if (role === "realtor") {
                      router.push(`/realtor/${id}`);
                    } else if (role === "broker") {
                      router.push(`/mortgage-broker/${id}`);
                    } else {
                      router.push(`/realestate-lawyer/${id}`);
                    }
                  }}
                  className="text-[#292640] cursor-pointer text-[16px] font-[600] leading-[18px] tracking-[0.5px]  mt-4"
                >
                  {
                    propertyData?.attributes?.professional_profile?.data
                      ?.attributes?.full_name
                  }
                </p>
                {propertyData?.attributes?.invites?.data?.length > 0 && (
                  <p
                    onClick={open}
                    className="mt-1 text-[12px] font-semibold leading-[26px] text-ravinnabg underline cursor-pointer"
                  >
                    & {propertyData?.attributes?.invites?.data?.length} Others
                  </p>
                )}

                <p className="mt-1 text-[16px] font-[400] ">
                  {
                    propertyData?.attributes?.professional_profile?.data
                      ?.attributes?.client_profile?.data?.attributes?.role
                  }
                </p>
                <p className="mt-1 text-[16px] font-[400] ">
                  {
                    propertyData?.attributes?.professional_profile?.data
                      ?.attributes?.email
                  }
                </p>

                <Rating
                  slug={
                    propertyData?.attributes?.professional_profile?.data
                      ?.attributes?.client_profile?.data?.attributes?.user?.data
                      ?.id
                  }
                />
                {/* here now */}
              </div>
              <div className="py-2 w-[300px] border-[#CDCDCD] border-y-[1px] flex items-center justify-center mt-4 space-x-4">
                {propertyData?.attributes?.professional_profile?.data?.attributes?.social_links?.map(
                  (social: any) => {
                    if (social?.value === "tiktok") {
                      return (
                        <a
                          onClick={() => {
                            const fullUrl = social?.url.startsWith("http")
                              ? social?.url
                              : `https://${social?.url}`;
                            window.open(fullUrl, "_blank", "noopener");
                          }}
                          key={social?.value}
                          className=""
                        >
                          <FaTiktok className=" p-2 border-[1px] border-[#CDCDCD] rounded-[8px] w-[32px] h-[32px] " />
                        </a>
                      );
                    } else if (social?.value === "twitter") {
                      return (
                        <a
                          onClick={() => {
                            const fullUrl = social?.url.startsWith("http")
                              ? social?.url
                              : `https://${social?.url}`;
                            window.open(fullUrl, "_blank", "noopener");
                          }}
                          key={social?.value}
                          className=""
                        >
                          <FaTwitter className=" p-2 border-[1px] border-[#CDCDCD] rounded-[8px] w-[32px] h-[32px] " />
                        </a>
                      );
                    } else if (social?.value === "linkedin") {
                      return (
                        <a
                          onClick={() => {
                            const fullUrl = social?.url.startsWith("http")
                              ? social?.url
                              : `https://${social?.url}`;
                            window.open(fullUrl, "_blank", "noopener");
                          }}
                          key={social?.value}
                          className=""
                        >
                          <FaLinkedinIn className=" p-2 border-[1px] border-[#CDCDCD] rounded-[8px] w-[32px] h-[32px] " />
                        </a>
                      );
                    } else if (social?.value === "facebook") {
                      return (
                        <a
                          onClick={() => {
                            const fullUrl = social?.url.startsWith("http")
                              ? social?.url
                              : `https://${social?.url}`;
                            window.open(fullUrl, "_blank", "noopener");
                          }}
                          key={social?.value}
                          className=""
                        >
                          <FaFacebookF className=" p-2 border-[1px] border-[#CDCDCD] rounded-[8px] w-[32px] h-[32px] " />
                        </a>
                      );
                    }
                  }
                )}
              </div>

              <form className="w-full mt-12 flex flex-col items-center space-y-4">
                <Input
                  className="rounded-[8px] border-none  w-[300px] h-[46px]"
                  placeholder="Full Name*"
                />
                <Input
                  className="rounded-[8px] border-none  w-[300px] h-[46px]"
                  placeholder="Phone Number*"
                />
                <Input
                  className="rounded-[8px] border-none  w-[300px] h-[46px]"
                  placeholder="Email Address*"
                />
                <textarea
                  className="flex  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-[8px] border-none w-[300px] h-[200px] placeholder-gray-400"
                  placeholder="Message*"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>

                <Select>
                  <SelectTrigger className="rounded-[8px] border-none  w-[300px] h-[46px]">
                    <SelectValue placeholder="Flat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex space-x-6 ">
                  <Checkbox className="mt-2" />
                  <p>By submitting this form I agree to Terms of Use</p>
                </div>
                <div className="flex w-full space-x-4">
                  <div
                    className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white bg-[#3EB87F] border border-white w-2/3"
                    onClick={HandleSendMessage}
                  >
                    Send Message
                  </div>
                  <div className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal   border border-[#34495D] w-1/3">
                    Call
                  </div>
                </div>
                <div className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal border border-[#34495D]  w-full  ">
                  <SlCalender className="mr-2" />
                  Book a Metting
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* your gallery view image */}
        <Modal
          opened={previewOpen}
          size={"55rem"}
          onClose={() => {
            closePreview();
            setChosenImage("");
          }}
          title={`Gallery Image`}
        >
          {/* <PreferenceSugestionButton onClick={handleDownload} text='Download Asset' active /> */}
          <Image
            src={chosenImage}
            className="w-full max-h-[700px]"
            alt="Gallery Image"
            width={500}
            height={500}
          />
        </Modal>

        {/* the invited professionals */}
        <InvitedProfessionals
          opened={opened}
          close={close}
          invites={propertyData?.attributes?.invites?.data}
        />
      </section>
    );
};

export default ListingCreated;