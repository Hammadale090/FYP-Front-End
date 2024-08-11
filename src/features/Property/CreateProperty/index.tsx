'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Listing } from "@/context/types";
import IconShowcaseBox from "@/features/Dashboard/shared/IconShowcaseBox";
import { Divider, Modal } from "@mantine/core";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import { CiMap } from "react-icons/ci";
import { ListingContext } from "@/context/ListingContext";
import Map from "@/components/Map";
import { BiLoaderAlt } from "react-icons/bi";
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import NeighborhoodTabs from "../components/NeighborhoodTabs";
import { useDisclosure } from "@mantine/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import KeywordsInput from "@/features/Settings/shared/KeywordsInput";
import InviteProfessional from "../components/InviteProfessional";

// import PreferencesSelectBox from './components/PreferencesSelectBox'
// import PreferencesCheckBox from './components/PreferencesCheckBox'

type Props = {};

const CreateProperty = (props: Props) => {

  const {
    loading,
    setLoading,
    coverPhotoLoader,
    setCoverPhotoLoader,
    propertyData,
    setPropertyData,
    gallery,
    setGallery,
    userGeneratedShowcase,
    setUserGeneratedShowcase,
    energyEfficiencyMetrics,
    setEnergyEfficiencyMetrics,
    features,
    setFeatures,
    furnitureSuggestions,
    setFurnitureSuggestions,
    interactiveFloorPlans,
    setInteractiveFloorPlans,
    overview,
    setOverview,
    additionalInformation,
    setAdditionalInformation,
    coverPhoto,
    setCoverPhoto,
    propertyFields,
    galleryLoading,
    setPropertyFields,
    fileInputRef,
    handleFileChange,
    handleClickImage,
    handleUserGeneratedContentImageUpload,
    handleGalleryImageUpload,
    deleteUserGeneratedImage,
    deleteGalleryImage,
    createPropertyHandler,
    weatherUrl, setWeatherUrl,
    urlValue, setUrlValue
  }: any = useContext(ListingContext)
  const [opened, { open, close }] = useDisclosure(false);
  const [aiLoader, setAILoader] = useState<boolean>(false)
  const [response, setResponse] = useState("")
  const [coverPhotoo, setCoverPhotoo] = useState(false)
  const [done, setDone] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ["places"]
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // console.log("this is tre bgalltery", gallery)
 

  const handleAiDescriptionSuggestion = async () => {
    setAILoader(true);
    open();
    const formData = new FormData();

    formData.append("propertyFields", JSON.stringify(propertyFields));
    formData.append("overview", JSON.stringify(overview))
    formData.append("additionalInformation", JSON.stringify(additionalInformation))
    formData.append("energyEfficiencyMetrics", JSON.stringify(energyEfficiencyMetrics));
    formData.append("interactiveFloorPlans", JSON.stringify(interactiveFloorPlans));
    if (gallery?.length > 0) {
      formData.append("gallery", gallery[0]?.url);
    }

    if (coverPhoto?.url) {
      formData.append("coverPhoto", coverPhoto?.url)
    }


    fetch("/api/ai-property", {

      method: "POST",

      body: formData,

    }).then((res) => {

      // create a stream from the response

      const reader = res.body?.getReader();

      return new ReadableStream({

        start(controller) {

          return pump();

          function pump(): any {

            return reader?.read().then(({ done, value }) => {

              // no more data - exit our loop

              if (done) {

                controller.close();
                setAILoader(false)
                setDone(true)
                return;

              }
              // decode the current chunk and append to our response value

              const decoded = new TextDecoder("utf-8").decode(value);

              let trimmedResponse = decoded.trim().replace(/0:"/g, '').replace(/"/g, '').replace(/\\n/g, '');
              setResponse((prev) => `${prev}${trimmedResponse}`);

              return pump();

            });

          }

        },

      });

    });

  }


  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div>Loading...</div>;



  return (
    <section>
      <Divider my="sm" />

      <form onSubmit={(e) => {
        e.preventDefault();
        if (!coverPhoto?.url) {
          setCoverPhotoo(true)
          return
        }
        createPropertyHandler();
      }} className="container mx-auto my-7">
        {/* top section */}

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-[8px] text-[#000000]">
            <h1 className="text-[24px] font-bold leading-[20px]">
              Create Listing
            </h1>
          </div>
          {/* Create Listing button */}
          <button
            type="submit"
            className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white bg-[#3EB87F] border border-white"

          >
            {
              loading ? (
                <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
              ) : (
                <span>Create Listing</span>
              )}
          </button>
        </div>

        <div className="flex flex-col h-full  md:flex-row w-full">
          {/* left side */}
          <div className="w-full   md:w-1/4 mr-unset md:mr-4 overflow-hidden flex flex-col flex-1 space-y-2">
            <IconShowcaseBox loading={coverPhotoLoader} onClick={handleClickImage} text={"Add Cover Photo"} color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />

            <div className="relative h-full">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { setCoverPhotoo(false); handleFileChange(e) }}
              />

              <Image
                src={coverPhoto?.url ?? '/Dashboard/Property/house.jfif'}
                alt="property cover image"
                width={800}
                height={800}
                className="w-full h-full object-cover rounded-md cursor-pointer "
              // onClick={(handleClickImage)}
              />

              {/* loader for upload cover photo  */}
              {
                coverPhotoLoader &&
                <div className="flex justify-center rounded-md items-center absolute top-0 right-0 z-10 w-[313px] h-[313px] bg-gray-400 bg-opacity-5 backdrop-blur-lg cursor-pointer">
                  <BiLoaderAlt className='text-center animate-spin w-[30px] h-[30px]' />
                </div>
              }

            </div>
            {
              coverPhotoo && (
                <h1 className="text-red-500 font-manrope">Input a Cover Photo</h1>
              )
            }

          </div>

          {/* left side */}
          <div className="w-full md:w-3/4 flex flex-col md:space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-[#292640] text-[16px] font-semibold leading-[27.32px]  ">
                Property title
              </h1>

              <Input
                className="rounded-[4px] border-none  bg-[#F8F8F8] w-full h-[46px] placeholder:text-slate-300"
                placeholder="Your campaign title goes here"
                required
                value={propertyFields?.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // Remove numeric characters from the input value
                  let nonNumericValue = e.target.value.replace(/[0-9]/g, '');

                  if (nonNumericValue?.trim() === '') {
                    nonNumericValue = ""
                  }
                  // Update the state with the modified value
                  setPropertyFields((prevPropertyFields: any) => ({
                    ...prevPropertyFields,
                    name: nonNumericValue,
                  }));
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row w-full md:space-x-6">
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <h1 className="text-[#292640] text-[16px] font-semibold leading-[27.32px]  ">
                  Type
                </h1>
                <Select
                  required
                  value={propertyFields?.type}
                  onValueChange={(e: any) => {
                    setPropertyFields((prevPropertyFields: any) => ({
                      ...prevPropertyFields,
                      type: e as string,
                    }));
                  }}
                >
                  <SelectTrigger className="w-full mr-6 h-[46px] border-none bg-[#F8F8F8]">
                    <SelectValue className="text-slate-400" placeholder="Residential" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                  </SelectContent>
                </Select>


              </div>
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <h1 className="text-[#292640] text-[16px] font-semibold leading-[27.32px]  ">
                  Price
                </h1>
                <Input
                  required
                  className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px] placeholder:text-slate-300"
                  placeholder="$ 50000"
                  value={propertyFields?.price ? `$ ${propertyFields.price}` : ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // Remove non-numeric characters from the input value
                    const numericValue = e.target.value.replace(/[^0-9]/g, '');

                    // Update the state with the numeric value only
                    setPropertyFields((prevPropertyFields: any) => ({
                      ...prevPropertyFields,
                      price: numericValue,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full md:space-x-6">
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <h1 className="text-[#292640] text-[16px] font-semibold leading-[27.32px] ">
                  Safety Ratings
                </h1>
                <Select
                  required
                  value={propertyFields?.safetyRatings}
                  onValueChange={(e: any) => {
                    setPropertyFields((prevPropertyFields: any) => ({
                      ...prevPropertyFields,
                      safetyRatings: e as string,
                    }));
                  }}
                >
                  <SelectTrigger className={`w-full mr-6 h-[46px] ${propertyFields?.safetyRatings === "" && "text-slate-300"} border-none bg-[#F8F8F8]`}>
                    <SelectValue className="text-slate-400" placeholder="Select Rating" />
                    <Input
                      className="rounded-[4px] border-none -z-[10] bg-white w-[0px] h-[-10px] placeholder:text-slate-300"
                      // disabled={true}
                      required
                      value={propertyFields?.safetyRatings}

                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5+">5+</SelectItem>
                    <SelectItem value="7+">7+</SelectItem>
                    <SelectItem value="9+">9+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <h1 className="text-[#292640] text-[16px] font-semibold leading-[27.32px]  ">
                  Location
                </h1>
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
                    onPlaceChanged={() => {

                      const place = autocompleteRef.current?.getPlace();
                      if (place && place.geometry) {
                        console.log("Selected Place:", place?.formatted_address);
                        setPropertyFields((prevPropertyFields: any) => ({
                          ...prevPropertyFields,
                          location: place?.formatted_address,
                        }));
                      }
                    }}
                  >
                    <Input
                      required
                      className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
                      placeholder="Enter location"
                      value={propertyFields?.location ? propertyFields.location.formatted_address : ""}
                      onChange={(e: any) => {
                        let loc = e.target.value?.trim()

                        setPropertyFields((prevPropertyFields: any) => ({
                          ...prevPropertyFields,
                          location: loc as string,
                        }));
                      }}
                    />

                  </Autocomplete>
                )}
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-[#292640] text-[16px] font-semibold leading-[27.32px] mt-8 mb-4">
          Upload Other Images
        </h1>

        {/* Gallery Content  */}
        <div className="flex items-center">
          <div className={`flex items-center gap-4 my-4 ${gallery?.length > 0 && "mr-[14px]"}`}>
            {gallery && gallery?.map((galleryImg: any, index: any) => {
              return (
                <div className="relative" key={index}>
                  <Image
                    key={index}
                    src={galleryImg?.url ? galleryImg.url : "/Dashboard/Property/house.jfif"}
                    alt="property cover image"
                    width={116}
                    height={116}
                    className="w-[116px] h-[116px] object-cover  rounded-md"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      if (target) {
                        target.onerror = null;
                        target.src = "/Dashboard/Property/house.jfif";
                      }
                    }}
                  />
                  <div
                    className="absolute top-2 right-2 inline-flex p-2 justify-center items-center gap-10 rounded-full bg-white bg-opacity-42 cursor-pointer"
                    onClick={() => deleteGalleryImage(galleryImg?.id)}
                  >
                    <Image src={"/trash.svg"} width={20} height={20} alt="trash" />
                  </div>
                </div>
              );
            })}
          </div>


          <div className='h-[116px] w-[116px] md:w-[116px] rounded-xl left-0 bg-gray-400 bg-opacity-5 backdrop-blur-lg  mt-[10px]'>
            <div className='flex flex-col w-full h-full justify-center items-center'>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                multiple
                onChange={handleGalleryImageUpload}
              />
              <IconShowcaseBox loading={galleryLoading} text={"Add Image"} color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />
            </div>
          </div>
        </div>


        {/* Overview */}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[34px]">
          Overview
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 md:space-y-6 ">
          {[
            { label: "ID", fieldName: "id" },
            { label: "Type", fieldName: "type" },
            { label: "Bedrooms", fieldName: "bedrooms" },
            { label: "Bathrooms", fieldName: "bathrooms" },
            { label: "Garages", fieldName: "garages" },
            { label: "Size", fieldName: "size" },
            { label: "Land Size", fieldName: "landSize" },
            { label: "Year Build", fieldName: "yearBuild" },
          ].map(({ label, fieldName }, index) => {
            return (
              <div className="flex flex-col space-y-2 mr-6  mt-4" key={index}>
                <h1 className="text-[#292640] text-[16px] font-semibold leading-[27.32px]  ">
                  {label}
                </h1>
                {
                  label === "Type" ?
                    <Select
                      required
                      value={overview?.[fieldName]}
                      onValueChange={(e: any) => {
                        let over = e
                        if (over?.trim() === '') {
                          over = ""
                        }
                        setOverview((prevOverview: any) => ({
                          ...prevOverview,
                          [fieldName]: over as String,
                        }));
                      }}
                    >
                      <SelectTrigger className={`w-full mr-6 h-[46px] ${overview?.[fieldName] === "" && "text-slate-300"} border-none bg-[#F8F8F8]`}>
                        <SelectValue className="text-slate-400" placeholder="Enter Overview Type" />
                        <Input
                          className="rounded-[4px] border-none -z-[10] bg-white w-[0px] h-[-10px] placeholder:text-slate-300"
                          // disabled={true}
                          required
                          value={overview?.[fieldName]}

                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="singleFamilyHomes">Single-Family Homes</SelectItem>
                        <SelectItem value="condos">Condos</SelectItem>
                        <SelectItem value="officeSpaces">Office Spaces</SelectItem>
                        <SelectItem value="retailSpaces">Retail Spaces</SelectItem>
                        <SelectItem value="industrialProperties">Industrial Properties</SelectItem>

                      </SelectContent>
                    </Select>
                    :
                    <Input
                      required
                      className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
                      placeholder={`Enter ${label}`}
                      value={overview?.[fieldName]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let over = e.target.value
                        if (over?.trim() === '') {
                          over = ""
                        }
                        setOverview((prevOverview: any) => ({
                          ...prevOverview,
                          [fieldName]: over as String,
                        }));
                      }}
                    />
                }
              </div>
            );
          })}
        </div>
        {/* Description */}
        <div className="flex flex-col space-y-2 mt-8">
          <div className="flex items-center justify-between">
            <h1  className="text-[18px] font-semibold leading-[20px] text-[#0B0C0E] ">
              Description
            </h1>

            <IconShowcaseBox onClick={handleAiDescriptionSuggestion} text="AI enhance" color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />
          </div>

          <Textarea
            required
            className="rounded-[4px] placeholder:text-slate-300 whitespace-nowrap resize-none border-none bg-[#F8F8F8] w-full h-[100px] text-wrap"
            placeholder="Centrally situated in Mineola, New York, Eagle Rock Apartments at Mineola places you within walking distance of parks, restaurants, and Mineola Station. Our inviting community offers a welcome retreat with newly updated studio, one, and two bedroom apartments to choose from. Come home to desirable features like modern kitchens, hardwood flooring and manicured landscapes. Onsite management is available to assist you and our maintenance team will provide you with peace of mind. All of this and more awaits you at our attractive Long Island community."
            value={propertyFields?.description}
            onChange={(e: any) => {
              let over = e.target.value
              if (over?.trim() === '') {
                over = ""
              }
              setPropertyFields((prevPropertyFields: any) => ({
                ...prevPropertyFields,
                description: over,
              }));
            }}
          />
        </div>
        {/*  Additional details */}
        <h1 className="text-[18px] font-semibold leading-[20px] text-[#0B0C0E] mt-8 mb-4">
          Additional details
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 md:space-y-6 ">
          {[
            { label: "Deposit:", fieldName: "deposit" },
            { label: "Last remodel year:", fieldName: "lastRemodelYear" },
            { label: "Equipment:", fieldName: "equipment" },
            { label: "Pool size:", fieldName: "poolSize" },
            { label: "Amenities:", fieldName: "amenties" },
            { label: "Additional Rooms", fieldName: "additionalRooms" },
          ].map(({ label, fieldName }, index) => {
            return (
              <div className="flex flex-col space-y-2 mr-6  mt-4" key={index}>
                <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px] ">
                  {label}
                </h1>
                <Input
                  required
                  className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
                  placeholder={`Enter ${label}`}
                  value={additionalInformation?.[fieldName]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let over = e.target.value
                    if (over?.trim() === '') {
                      over = ""
                    }
                    setAdditionalInformation((prevAdditionalInformation: any) => ({
                      ...prevAdditionalInformation,
                      [fieldName]: over,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Address */}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
          Address
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 md:space-y-6 ">
          {[
            { label: "Full Address:", fieldName: "address" },
            { label: "City:", fieldName: "city" },
            { label: "State/county:", fieldName: "state" },
            { label: "Zip/Postal Code:", fieldName: "zip" },
            { label: "Area:", fieldName: "area" },
            { label: "Country:", fieldName: "country" },
          ].map(({ label, fieldName }, index) => (
            <div className="flex flex-col space-y-2 mr-6 mt-4" key={index}>
              <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px]  ">
                {label}
              </h1>
              <Input
                required
                className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
                placeholder={`Enter ${label}`}
                value={propertyFields?.[fieldName]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let over = e.target.value
                  if (over?.trim() === '') {
                    over = ""
                  }
                  setPropertyFields((prevPropertyFields: any) => ({
                    ...prevPropertyFields,
                    [fieldName]: over,
                  }));
                }}
              />
            </div>
          ))}
        </div>

        {/* Invite professional */}
        <h1 className="text-[18px] font-semibold text-[#0B0C0E]  leading-[20px] mt-8 mb-4">
          Invite Professional
        </h1>


        {/* invite professional */}
        <InviteProfessional />



        {/* Real-Time Energy Efficiency Metrics */}
        <h1 className="text-[18px] font-semibold text-[#0B0C0E]  leading-[20px] mt-8 mb-4">
          Real-Time Energy Efficiency Metrics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 md:space-y-6 ">
          {[
            { label: "Energy Consumption", fieldName: "energy_consumption" },
            { label: "Solar Panel Output", fieldName: "solar_panel_output" },
            { label: "Environmental Impact", fieldName: "environmental_impact" },
          ].map(({ label, fieldName }, index) => {
            return (
              <div className="flex flex-col space-y-2 mr-6  mt-4" key={index}>
                <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px]  ">
                  {label}
                </h1>
                <Input
                  required
                  className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
                  placeholder={`Enter ${label}`}
                  value={energyEfficiencyMetrics?.[fieldName]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let over = e.target.value
                    if (over?.trim() === '') {
                      over = ""
                    }
                    setEnergyEfficiencyMetrics((prevEnergyEfficiencyMetrics: any) => ({
                      ...prevEnergyEfficiencyMetrics,
                      [fieldName]: over,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>

        {/*   Interactive Floor Plans */}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
          Interactive Floor Plans
        </h1>
        <div className="grid grid-cols-1 md:space-y-6 ">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px]  ">
              Virtual Tour URL
            </h1>
            <Input
              required
              className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={interactiveFloorPlans?.videoUrl}
              onChange={(e) => {
                let over = e.target.value
                if (over?.trim() === '') {
                  over = ""
                }
                setInteractiveFloorPlans((prevInteractiveFloorPlans: any) => ({
                  ...prevInteractiveFloorPlans,
                  videoUrl: over,
                }));
              }}
            />
          </div>
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px]  ">
              Description about Floor Plans
            </h1>
            <Input
              required
              className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={interactiveFloorPlans?.description}
              onChange={(e) => {
                let over = e.target.value
                if (over?.trim() === '') {
                  over = ""
                }
                setInteractiveFloorPlans((prevFurnitureSuggestions: any) => ({
                  ...prevFurnitureSuggestions,
                  description: over,
                }));
              }}
            />
          </div>
        </div>

        {/*   Dynamic Weather Intergration */}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
          Dynamic Weather Intergration
        </h1>
        <div className="grid grid-cols-1 md:space-y-6 ">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px]  ">
              Link to real tie weather forecast in that location
            </h1>
            <Input
              required
              className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Url here"
              value={weatherUrl}
              onChange={(e) => {
                let over = e.target.value
                if (over?.trim() === '') {
                  over = ""
                }
                setWeatherUrl(over)
              }}
            />

          </div>
        </div>

        {/*   User-Generated Content Showcase */}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
          User-Generated Content Showcase
        </h1>
        <div className="grid grid-cols-1">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px]  ">
              Upload Images or share post URL
            </h1>
            <Input
              required
              className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Url here"
              value={urlValue}
              onChange={(e) => {
                let over = e.target.value
                if (over?.trim() === '') {
                  over = ""
                }
                setUrlValue(over)
              }}
            />
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {userGeneratedShowcase?.map((image: any, index: any) => (
                <div className="relative mx-2 my-2" key={index}>
                  <Image
                    key={index || "/Dashboard/Property/house.jfif"}
                    src={image?.url || "/Dashboard/Property/house.jfif"}
                    alt={`Image ${index}`}
                    width={700}
                    height={700}
                    className="w-[248px] h-[248px] object-contain  rounded-lg"
                  />
                  <div
                    className="absolute top-2 right-2 inline-flex p-2 justify-center items-center gap-10 rounded-full bg-white bg-opacity-42 cursor-pointer"
                    onClick={() => deleteUserGeneratedImage(image?.id)}
                  >
                    <Image src={"/trash.svg"} width={20} height={20} alt="trash" />
                  </div>
                </div>
              ))}

              {/* Loader for Adding Showcase Images  */}
              {
                loading &&
                <div className="w-[240px] h-[248px] mx-5 my-2 flex items-center justify-center rounded-md bg-gray-400 bg-opacity-5 backdrop-blur-lg cursor-pointer">
                  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' />
                </div>
              }

              <div className="w-[200px] h-[248px] mx-2 my-2 flex items-center justify-center rounded-md bg-gray-400 bg-opacity-5 backdrop-blur-lg cursor-pointer">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  multiple
                  onChange={handleUserGeneratedContentImageUpload}
                />
                <IconShowcaseBox text={"Add Showcase"} color='#3EB87F' width='w-fit' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />
              </div>
            </div>
          </div>
        </div>

        {/*   Smart Furiture Placement Suggestions*/}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
          Smart Furiture Placement Suggestions
        </h1>
        <div className="grid grid-cols-1 md:space-y-6 ">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px] ">
              Virtual Tour URL
            </h1>
            <Input
              required
              className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={furnitureSuggestions?.videoUrl}
              onChange={(e) => {

                let over = e.target.value
                if (over?.trim() === '') {
                  over = ""
                }

                setFurnitureSuggestions((prevFurnitureSuggestions: any) => ({
                  ...prevFurnitureSuggestions,
                  videoUrl: over,
                }));
              }}
            />
          </div>
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px] ">
              Description about Floor Plans
            </h1>
            <Input
              required
              className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={furnitureSuggestions?.description}
              onChange={(e) => {
                let over = e.target.value
                if (over?.trim() === '') {
                  over = ""
                }
                setFurnitureSuggestions((prevFurnitureSuggestions: any) => ({
                  ...prevFurnitureSuggestions,
                  description: over,
                }));
              }}
            />
          </div>
        </div>

        {/*   Features*/}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
          Features
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
          {[
            "Air Conditioning",
            "Gym",
            "TV",
            "Barbeque",
            "Laundry",
            "Washer",
            "Window Coverings",
            "Wifi",
            "Swimming Pool",
          ].map((feature, index) => (
            <div className="flex space-x-6" key={index}>
              <input

                type="checkbox"
                checked={features.includes(feature)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    setFeatures((prevFeatures: any[]) => [...prevFeatures, feature]);
                  } else {
                    setFeatures((prevFeatures: any[]) =>
                      prevFeatures.filter((item: string) => item !== feature)
                    );
                  }
                }}
              />
              <p>{feature}</p>
            </div>
          ))}
        </div>

        {/* Video Url for Property  */}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
          Virtual Tour
        </h1>
        <div className="grid grid-cols-1 md:space-y-6 ">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[16px] font-semibold leading-[18px]  ">
              Virtual Tour URL
            </h1>
            <Input
              required
              className="rounded-[4px] placeholder:text-slate-300 border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={propertyFields?.videoUrl}
              onChange={(e) => {
                let over = e.target.value
                if (over?.trim() === '') {
                  over = ""
                }
                setPropertyFields((prevPropertyFields: any) => ({
                  ...prevPropertyFields,
                  videoUrl: over,
                }));
              }}
            />
          </div>
        </div>

        {/* map here */}
        <h1 className="text-[18px] text-[#0B0C0E] font-semibold leading-[20px] mt-8 mb-4">
          Location
        </h1>

        <Map address={propertyFields?.location !== '' ? propertyFields?.location : "1600 Amphitheatre Parkway, Mountain View, CA"} />

        {
          propertyFields?.location && (
            <div className="w-full flex flex-col">
              <NeighborhoodTabs
                address={
                  propertyFields?.location != ""
                  && propertyFields?.location
                  // : "1600 Amphitheatre Parkway, Mountain View, CA"
                }
              />
            </div>
          )
        }

        {/* neighbourhood */}

        {/* <div className="flex justify-between items-center mt-6">
          <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
            Neighborhood Highlights
          </h1>

          <div
            className="flex items-center justify-center px-[6px] py-[4px] 
             rounded-[6px]
              font-normal text-white bg-[#3EB87F] border border-white h-12 md:w-48
            "
          >
            <CiMap className="mr-2 text-[24px]" />{" "}
            <p className="hidden md:block">View on Map</p>
          </div>
        </div> */}

        {/* <div className="w-full flex flex-col">
          <NeighborhoodTabs address="1600 Amphitheatre Parkway, Mountain View, CA" />
        </div> */}

      </form>

      <Modal closeOnClickOutside={false} closeOnEscape={false} opened={opened} size={"55rem"} onClose={() => {
        close()
        setDone(false)
        setResponse("")
      }} title={`Ai Enhanced Property Description`}>

        {
          aiLoader && (
            <div className="flex flex-col space-y-3 mt-7">
              <Skeleton className="h-[50px] w-[80%] bg-ravinnabg rounded-xl" />
            </div>
          )
        }

        {
          response?.trim() !== "" && (
            <div className={"flex justify-start my-5"} >
              <div className={`py-4 px-4 text-white ${"bg-slate-800 max-w-[100%]"} ${"rounded-b-[6px] rounded-tr-[6px]"}`}>
                <div>
                  <h1> {response}</h1>
                </div>
              </div>
            </div>
          )
        }

        {
          done && (
            <IconShowcaseBox onClick={() => {
              setPropertyFields((prevPropertyFields: any) => ({
                ...prevPropertyFields,
                description: response?.replace(/\s+/g, ' ').trim(),
              }));
              close()
              setDone(false)
              setResponse("")
            }} text="Use AI description" color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />
          )
        }

      </Modal>
    </section >
  );
};

export default CreateProperty;
