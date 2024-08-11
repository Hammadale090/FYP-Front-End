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
import { Divider } from "@mantine/core";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import { CiMap } from "react-icons/ci";
import { ListingContext } from "@/context/ListingContext";
import { useGetProperty } from "@/hooks/useGetProperty";
import Map from "@/components/Map";
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { BiLoaderAlt } from "react-icons/bi";
import NeighborhoodTabs from "../components/NeighborhoodTabs";
// import PreferencesSelectBox from './components/PreferencesSelectBox'
// import PreferencesCheckBox from './components/PreferencesCheckBox'

type Props = {};

const EditProperty = (props: Props) => {

  useGetProperty('edit');

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
    setPropertyFields,
    fileInputRef,
    handleFileChange,
    handleClickImage,
    handleUserGeneratedContentImageUpload,
    handleGalleryImageUpload,
    deleteUserGeneratedImage,
    deleteGalleryImage,
    createPropertyHandler,
    updatePropertyHandler,
  }: any = useContext(ListingContext)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ["places"]
  });
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);


  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div>Loading...</div>;



  return (
    <section>
      <Divider my="sm" />

      <div className="container mx-auto my-7">
        {/* top section */}

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-[8px] text-[#34495D]">
            <h1 className="text-[32px] font-medium leading-[20px]">
              Edit Listing
            </h1>
          </div>
          {/* Create Listing button */}
          <div
            className="px-[16px] cursor-pointer hover:scale-105 py-[8px] flex justify-center items-center gap-[4px] rounded-[6px] text-[16px] font-normal text-white bg-[#3EB87F] border border-white"
            onClick={updatePropertyHandler}
          >
            {
              loading ? (
                <div className="flex justify-center">  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' /></div>
              ) : (
                <span>Update Listing</span>
              )}
          </div>
        </div>

        <div className=" flex flex-col md:flex-row w-full ">
          {/* left side */}
          <div className="w-full md:w-1/4 mr-unset md:mr-4 overflow-hidden flex flex-col space-y-2">
            <h1 className="text-[16px] font-medium leading-[20px] ">
              Upload Property cover photo
            </h1>

            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <Image
                src={coverPhoto?.url ?? '/Dashboard/Property/house.jfif'}
                alt="property cover image"
                width={100}
                height={100}
                className="w-full h-full contain rounded-md cursor-pointer w-[313px] h-[313px]"
                onClick={(handleClickImage)}
              />

              {/* loader for upload cover photo  */}
              {
                coverPhotoLoader &&
                <div className="flex justify-center items-center absolute top-0 right-0 z-10 w-[313px] h-[313px] bg-gray-400 bg-opacity-5 backdrop-blur-lg cursor-pointer">
                  <BiLoaderAlt className='text-center animate-spin w-[30px] h-[30px]' />
                </div>
              }

            </div>
          </div>

          {/* left side */}
          <div className="w-full md:w-3/4 flex flex-col md:space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
                Property title
              </h1>
              <Input
                className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
                placeholder="Your campaign title goes here"
                value={propertyFields?.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPropertyFields((prevPropertyFields: any) => ({
                    ...prevPropertyFields,
                    name: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row w-full md:space-x-6">
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <h1 className="text-[#222529] text-[11px] font-medium leading-[18px] tracking-[0.5px] ">
                  Type
                </h1>
                <Select
                  value={propertyFields.type}
                  onValueChange={(e: any) => {
                    setPropertyFields((prevPropertyFields: any) => ({
                      ...prevPropertyFields,
                      type: e as string,
                    }));
                  }}
                >
                  <SelectTrigger className="w-full mr-6 h-[46px] border-none bg-[#F8F8F8]">
                    <SelectValue placeholder="Flat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
                  Price
                </h1>
                <Input
                  className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
                  placeholder="$ 50000"
                  value={propertyFields?.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPropertyFields((prevPropertyFields: any) => ({
                      ...prevPropertyFields,
                      price: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full md:space-x-6">
              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
                  Safety Ratings
                </h1>
                <Select
                  value={propertyFields.safetyRatings}
                  onValueChange={(e: any) => {
                    setPropertyFields((prevPropertyFields: any) => ({
                      ...prevPropertyFields,
                      safetyRatings: e as string,
                    }));
                  }}
                >
                  <SelectTrigger className="w-full mr-6 h-[46px] border-none bg-[#F8F8F8]">
                    <SelectValue placeholder="5+" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5+">5+</SelectItem>
                    <SelectItem value="7+">7+</SelectItem>
                    <SelectItem value="9+">9+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2 w-full md:w-1/2">
                <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
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
                      className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
                      placeholder="Enter location"
                      value={propertyFields.location ? propertyFields.location.formatted_address : ""}
                      onChange={(e: any) => {
                        setPropertyFields((prevPropertyFields: any) => ({
                          ...prevPropertyFields,
                          location: e.target.value as string,
                        }));
                      }}
                    />

                  </Autocomplete>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Content  */}
        <div className="flex items-center">
          <div className={`flex items-center gap-4 my-4 ${gallery?.length > 0 && "mr-[14px]"}`}>
            {gallery?.map((galleryImg: any, index: any) => {
              return (
                <div className="relative" key={index}>
                  <Image
                    key={index}
                    src={galleryImg.attributes ? galleryImg.attributes?.url : galleryImg?.url || "/Dashboard/Property/house.jfif"}
                    alt="property cover image"
                    width={116}
                    height={116}
                    className="w-[116px] h-[116px] contain  rounded-md"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      if (target) {
                        target.onerror = null;
                        target.src = "/Dashboard/Property/house.jfif";
                      }
                    }}
                  />
                  <div
                    className="absolute top-1 right-1 inline-flex p-1 justify-center items-center gap-10 rounded-full bg-white bg-opacity-42 cursor-pointer"
                    onClick={() => deleteGalleryImage(galleryImg?.id)}
                  >
                    <Image src={"/trash.svg"} width={10} height={10} alt="trash" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className='h-[116px] w-[116px] md:w-[116px] rounded-xl left-0 bg-gray-400 bg-opacity-5 backdrop-blur-lg mt-[10px]'>
            <div className='flex flex-col w-full h-full justify-center items-center'>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                multiple
                onChange={handleGalleryImageUpload}
              />
              <IconShowcaseBox text={"Add New"} color='#3EB87F' width='w-fit' textCN='text-[12px] font-semibold leading-[26px] text-white' px='10px' py='2px' rounded={"4px"} noBorder />
            </div>
          </div>
        </div>


        {/* Overview */}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
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
                <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
                  {label}
                </h1>
                <Input
                  className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
                  placeholder={`Enter ${label}`}
                  value={overview[fieldName]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setOverview((prevOverview: any) => ({
                      ...prevOverview,
                      [fieldName]: e.target.value,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Description */}
        <div className="flex flex-col space-y-2 mt-8">
          <h1 className="text-[16px] font-medium leading-[20px] ">
            Description
          </h1>
          <Input
            className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[100px] text-wrap"
            placeholder="Centrally situated in Mineola, New York, Eagle Rock Apartments at Mineola places you within walking distance of parks, restaurants, and Mineola Station. Our inviting community offers a welcome retreat with newly updated studio, one, and two bedroom apartments to choose from. Come home to desirable features like modern kitchens, hardwood flooring and manicured landscapes. Onsite management is available to assist you and our maintenance team will provide you with peace of mind. All of this and more awaits you at our attractive Long Island community."
            value={propertyFields?.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPropertyFields((prevPropertyFields: any) => ({
                ...prevPropertyFields,
                description: e.target.value,
              }));
            }}
          />
        </div>
        {/*  Additional details */}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
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
                <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
                  {label}
                </h1>
                <Input
                  className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
                  placeholder={`Enter ${label}`}
                  value={additionalInformation[fieldName]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAdditionalInformation((prevAdditionalInformation: any) => ({
                      ...prevAdditionalInformation,
                      [fieldName]: e.target.value,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Address */}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
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
              <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
                {label}
              </h1>
              <Input
                className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
                placeholder={`Enter ${label}`}
                value={propertyFields[fieldName]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPropertyFields((prevPropertyFields: any) => ({
                    ...prevPropertyFields,
                    [fieldName]: e.target.value,
                  }));
                }}
              />
            </div>
          ))}


        </div>
        {/* Real-Time Energy Efficiency Metrics */}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
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
                <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
                  {label}
                </h1>
                <Input
                  className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
                  placeholder={`Enter ${label}`}
                  value={energyEfficiencyMetrics[fieldName]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEnergyEfficiencyMetrics((prevEnergyEfficiencyMetrics: any) => ({
                      ...prevEnergyEfficiencyMetrics,
                      [fieldName]: e.target.value,
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>

        {/*   Interactive Floor Plans */}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
          Interactive Floor Plans
        </h1>
        <div className="grid grid-cols-1 md:space-y-6 ">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
              Video URL
            </h1>
            <Input
              className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={interactiveFloorPlans.videoUrl}
              onChange={(e) => {
                setInteractiveFloorPlans((prevInteractiveFloorPlans: any) => ({
                  ...prevInteractiveFloorPlans,
                  videoUrl: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
              Description about Floor Plans
            </h1>
            <Input
              className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={interactiveFloorPlans.description}
              onChange={(e) => {
                setInteractiveFloorPlans((prevFurnitureSuggestions: any) => ({
                  ...prevFurnitureSuggestions,
                  description: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        {/*   Dynamic Weather Intergration */}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
          Dynamic Weather Intergration
        </h1>
        <div className="grid grid-cols-1 md:space-y-6 ">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
              Link to real tie weather forecast in that location
            </h1>
            <Input
              className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Url here"
            />
          </div>
        </div>

        {/*   User-Generated Content Showcase */}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
          User-Generated Content Showcase
        </h1>
        <div className="grid grid-cols-1">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
              Upload Images or share post URL
            </h1>
            <Input
              className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Url here"
            />
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {userGeneratedShowcase?.map((image: any, index: any) => (
                <div className="relative" key={index}>
                  <Image
                    key={index || "/Dashboard/Property/house.jfif"}
                    src={image.attributes ? image.attributes?.url : image?.url || "/Dashboard/Property/house.jfif"}
                    alt={`Image ${index}`}
                    width={100}
                    height={100}
                    className="w-[248px] h-[248px] contain  rounded-md" />
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
                <div className="w-[240px] h-[248px] flex items-center justify-center rounded-md bg-gray-400 bg-opacity-5 backdrop-blur-lg cursor-pointer">
                  <BiLoaderAlt className='text-center animate-spin w-[20px] h-[20px]' />
                </div>
              }

              <div className="w-[200px] h-[248px] flex items-center justify-center rounded-md bg-gray-400 bg-opacity-5 backdrop-blur-lg cursor-pointer">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleUserGeneratedContentImageUpload}
                />
                <IconShowcaseBox text={"Add Showcase"} color='#3EB87F' width='w-fit' textCN='text-[16px] font-semibold leading-[26px] text-white mx-[19px]' px='19px' py='9px' rounded={"4px"} noBorder />
              </div>
            </div>
          </div>
        </div>

        {/*   Smart Furiture Placement Suggestions*/}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
          Smart Furiture Placement Suggestions
        </h1>
        <div className="grid grid-cols-1 md:space-y-6 ">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
              Video URL
            </h1>
            <Input
              className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={furnitureSuggestions.videoUrl}
              onChange={(e) => {
                setFurnitureSuggestions((prevFurnitureSuggestions: any) => ({
                  ...prevFurnitureSuggestions,
                  videoUrl: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
              Description about Floor Plans
            </h1>
            <Input
              className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={furnitureSuggestions.description}
              onChange={(e) => {
                setFurnitureSuggestions((prevFurnitureSuggestions: any) => ({
                  ...prevFurnitureSuggestions,
                  description: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        {/*   Features*/}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
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
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
          Video
        </h1>
        <div className="grid grid-cols-1 md:space-y-6 ">
          <div className="flex flex-col space-y-2 mr-6  mt-4">
            <h1 className="text-[#292640] text-[13px] font-medium leading-[18px] tracking-[0.5px] ">
              Video URL
            </h1>
            <Input
              className="rounded-[4px] border-none bg-[#F8F8F8] w-full h-[46px]"
              placeholder="Your campaign title goes here"
              value={propertyFields.videoUrl}
              onChange={(e) => {
                setPropertyFields((prevPropertyFields: any) => ({
                  ...prevPropertyFields,
                  videoUrl: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        {/* map here */}
        <h1 className="text-[16px] font-medium leading-[20px] mt-8 mb-4">
          Location
        </h1>

        <Map address="1600 Amphitheatre Parkway, Mountain View, CA" />

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
        {/* neighbourhood */}
        {/* <div className="w-full flex flex-col">
          <NeighborhoodTabs address="1600 Amphitheatre Parkway, Mountain View, CA" />
        </div> */}

      </div>
    </section>
  );
};

export default EditProperty;

