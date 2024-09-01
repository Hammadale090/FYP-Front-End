"use client";

import { AuthContext } from "@/context/AuthContext";
import { ListingContext } from "@/context/ListingContext";
import { ProfSettingsContext } from "@/context/ProfSettingsContext";
import IconShowcaseBox from "@/features/Dashboard/shared/IconShowcaseBox";
import { getPriceWithSymbol } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {
  id?: number | string;
  featuredClassName?: boolean;
  Add?: boolean;
  Addtext?: string;
  title?: string;
  description?: string;
  location?: string;
  price?: string;
  currency?: string;
  banner?: any;
  bannerTrue?: boolean;
  views?: any;
  favourites?: any;
  portfolio?: boolean;
  updatePort?: (id: string | number | undefined) => void;
  portfolioClick?: any;
  AddOnclick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  service?: boolean;
  disabled?: boolean;
  serviceFunc?: any;
};

const FeedPropertyCard = ({
  id,
  featuredClassName,
  bannerTrue,
  portfolio,
  Add,
  updatePort,
  AddOnclick,
  serviceFunc,
  portfolioClick,
  Addtext,
  title,
  description,
  disabled,
  location,
  price,
  currency,
  service,
  banner,
  views,
  favourites: initialFavourites,
}: Props) => {
  const router = useRouter();

  // console.log("banner: type: ", typeof banner, banner, title);

  const { addOrRemovePropertyFromfavourites, setPropertyData }: any =
    useContext(ListingContext);
  const { profileId } = useContext(AuthContext);
  const { data, setData } = useContext(ProfSettingsContext);
  const [loader, setLoader] = useState<boolean>(false);

  // Initialize favouritess with an empty array if initialFavourites is null
  const [favouritess, setFavouritess] = useState(initialFavourites || []);


  useEffect(() => {
    // Update favouritess only if initialFavourites is not null
    if (initialFavourites !== null) {
      setFavouritess(initialFavourites);
    }
  }, [id, initialFavourites]);

  // Count of favourites
  const favouritesCount = favouritess?.length;

  const isPropertyInFavorites = favouritess?.includes(profileId);

  const isAddorRemoveFromFavouritesHandler = async () => {
    const res = await addOrRemovePropertyFromfavourites(
      id,
      !isPropertyInFavorites,
      favouritess,
      setLoader
    );

    if (res) {
      setFavouritess(res);
    }
  };

  function bannerSRC(banner: any) {

    if (banner && banner?.data) {
      if (Array.isArray(banner)) {
        return banner[0]?.data?.attributes?.url || "/Dashboard/PropertyImage.png";
      }


      if (banner.data.attributes) {
        return banner.data.attributes.url || "/Dashboard/PropertyImage.png";
      }
    }

    if (banner?.attributes) {
      return banner.attributes.url || "/Dashboard/PropertyImage.png";
    }

    if (typeof banner === "string") {
      return banner
    }

    return "/Dashboard/PropertyImage.png";
  }

  return (
    <div className={`  my-2 w-[338px]  h-[547px]  relative`}>
      <div
        className={` cursor-pointer  h-full flex-shrink-0 border border-black rounded-xl  `}
      >
        {/* the property Image */}
        <Image
          height={800}
          width={800}
          className="h-[40%] rounded-t-xl object-cover "
          alt="property Image"
          src={bannerSRC(banner)}
        />
        {/* The lower div */}
        <div className="py-5 px-5 h-[60%] space-y-3 flex  flex-col  justify-between">
          {/* The views and likes */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2  items-center">
              <Image
                src={"/Feed/view.svg"}
                className="h-[16px] w-[16px]"
                height={500}
                width={500}
                alt="view"
              />
              <h1 className="text-[14px] leading-[20px] font-normal text-[#34495D]">
                {views?.length ?? 0} Views
              </h1>
            </div>

            <div className="flex space-x-1 items-center h-[28px]">
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
                      if (!disabled) {
                        isAddorRemoveFromFavouritesHandler();
                      }
                    }}
                  />
                  <h1 className="text-[14px] leading-[20px] font-normal text-black">
                    {favouritesCount ?? 0}
                  </h1>
                </>
              )}
            </div>
          </div>
          {/* the Title */}
          <h1 className="text-[16px] font-normal text-[#34495D] line-clamp-1">
            {title ? title : "Property Title"}
          </h1>
          {/* the description */}
          <h1 className="text-[12px] font-normal text-black line-clamp-2  p-0 m-0">
            {description
              ? description.length > 70
                ? description.slice(0, 70).concat("...")
                : description
              : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."}
          </h1>
          <div className="flex space-x-2 items-center my-4">
            {/* the location icon */}
            <Image
              alt="the location png"
              height={500}
              width={500}
              className="w-5 h-5"
              src={"/Dashboard/Feedlocation.png"}
            />
            <h1 className="text-[12px] font-normal text-[#34495D] line-clamp-1">
              {location}
            </h1>
          </div>

          {/* the price and predicted price */}
          <div className="flex flex-wrap items-center justify-between">
            {/* the price */}
            <div className="flex flex-col ">
              <h1 className="text-[10px] font-normal text-black">Price :</h1>

              <h1 className="text-[16px] font-medium text-black line-clamp-1">
                {`${getPriceWithSymbol(currency)} ${price?.substring(0, 10)}`}
              </h1>
            </div>

            {/* predicted price */}
            <div className="flex flex-col ">
              <h1 className="text-[10px] font-normal text-black">
                Predicted Price :
              </h1>
              <h1 className="text-[16px] font-medium text-black blur-sm line-clamp-1">
                $123,0009
              </h1>
            </div>
          </div>

          {/* view details button */}

          {
            service ? (
              <div
                className="w-full h-[38px] text-white text-[16px] font-normal bg-[#3EB87F] rounded-[6px] flex flex-col justify-center items-center"
                onClick={
                  () => {
                    serviceFunc(id)
                  }}
              >
                Edit or Remove
              </div>
            ) : (
              <div
                className="w-full h-[38px] text-white text-[16px] font-normal bg-[#3EB87F] rounded-[6px] flex flex-col justify-center items-center"
                onClick={
                  () => {
                    if (portfolio) {
                      updatePort && updatePort(id);
                    } else {
                      setPropertyData(null);
                      router.push(`/dashboard/property/listing-created/${id}`);
                    }
                  }}
              >
                {portfolio ? "Edit or Remove" : "View Details"}
              </div>
            )
          }


        </div>
      </div>

      {
        Add && (
          <div className="absolute top-0 w-full md:w-[338px]  flex-shrink-0 rounded-xl left-0 h-full  bg-gray-400 bg-opacity-5 backdrop-blur-lg  h-[600px]">
            <div className="flex flex-col w-full h-full justify-center items-center">
              <IconShowcaseBox
                onClick={AddOnclick}
                text={`${Addtext ? Addtext : "Add Portfolio"}`}
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
        )
      }
    </div >
  );
};

export default FeedPropertyCard;
