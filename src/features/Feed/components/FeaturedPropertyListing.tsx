import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import FeedPropertyCard from "./FeedPropertyCard";
import { useGetListings } from "@/hooks/useGetListings";
import { Listing } from "@/context/types";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {
  isFeatured: boolean;
};

const FeaturedPropertyListing = ({ isFeatured }: Props) => {
  const { data, loading, allData, allIds, getListings, shouldHideViewAll } =
    useGetListings(false, null, isFeatured);



  return (
    <div className="w-full max-w-[1100px]">
      {/* the header, featured property listing and view all */}
      <div className="flex justify-between items-center">
        {/* the header text */}
        <h1 className="text-base md:text-[32px] font-semibold leading-[22.31px] text-black">
          {isFeatured ? "Featured Property Listings" : "My Property Listings"}
        </h1>
        {/* the view all text */}
        {!shouldHideViewAll && (
          <h1
            className="text-base md:text-[20px] font-semibold leading-[22.31px] underline text-[#3EB87F] cursor-pointer md:mr-4 "
            onClick={async () => {
              if (!loading) {
                await getListings(undefined, undefined, true);
              }
            }}
          >
            View All
          </h1>
        )}
      </div>

      {/* the featured property listing cards */}
      <ScrollArea className=" rounded-md overflow-y-hidden py-4 p-0 mt-4 w-full">
        <div className="flex  justify-center md:justify-start md:gap-8">
          {data?.map((listing: Listing) => (
            <FeedPropertyCard
              key={listing?.id}
              id={listing?.id}
              title={listing?.attributes?.name}
              price={listing?.attributes?.price}
              currency={listing?.attributes?.currency}
              description={listing?.attributes?.description}
              banner={
                !Array.isArray(listing?.attributes?.coverPhoto)
                  ? (listing?.attributes?.coverPhoto ?? listing?.attributes?.coverPhotoFromUrl)
                  : listing?.attributes?.coverPhotoFromUrl
              }
              location={listing?.attributes?.location}
              views={listing?.attributes?.views}
              favourites={listing?.attributes?.favourites}
              featuredClassName
            />
          ))}

          {loading && (
            <div className="w-full h-[600px] z-10 opacity-20 absolute">
              <div className="flex justify-center">
                {" "}
                <BiLoaderAlt className="text-center animate-spin w-[200px] h-[200px]" />
              </div>
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default FeaturedPropertyListing;
