"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FeedPropertyCard from "@/features/Feed/components/FeedPropertyCard";
import { Listing } from "@/context/types";
import { ListingContext } from "@/context/ListingContext";
import { FeedContext } from "@/context/FeedContext";
import { useGetListings } from "@/hooks/useGetListings";

const PropertyArea = () => {
  const { sort } = useContext<any>(ListingContext);

  const { properties, sortingOption } = useContext<any>(FeedContext);

  let data,
    loading,
    pagination,
    getListings,
    paginatedData,
    currentPage,
    setCurrentPage;

  if (properties) {
    ({
      data,
      loading,
      pagination,
      getListings,
      paginatedData,
      currentPage,
      setCurrentPage,
    } = properties);
  } else {
    // Uncomment if you want to fetch listings when properties are not provided
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data, loading, pagination, getListings, paginatedData, currentPage, setCurrentPage } = useGetListings(true));
  }



  const [originalData, setOriginalData] = useState();
  const [pages, setPages] = useState<any>([]);

  useEffect(() => {
    if (paginatedData) {
      setOriginalData(paginatedData);
    }
  }, [paginatedData]);

  useEffect(() => {
    setPages(getPageArray(currentPage, pagination?.pageCount));
  }, [pagination?.pageCount, currentPage]);

  const getPageArray = (currentPage, pageCount) => {
    if (
      typeof currentPage !== "number" ||
      typeof pageCount !== "number" ||
      currentPage < 1 ||
      currentPage > pageCount
    ) {
      return [];
    }

    const pages = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(pageCount, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(pageCount, startPage + 2);
    } else if (currentPage === pageCount) {
      startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const sortData = (data: Record<string, any[]>, sortingOption: string) => {
    const sortedData = {}; // Initialize an empty object to hold sorted data for each page

    // Iterate over each page and sort its data individually
    for (const [page, pageData] of Object.entries(data)) {
      switch (sortingOption) {
        case "recent":
          sortedData[page] = pageData
            ?.slice()
            .sort((a: any, b: any) => b.id - a.id);
          break;
        case "popular":
          sortedData[page] = pageData?.slice().sort((a: any, b: any) => {
            const aTotal =
              (a?.attributes?.favourites
                ? a?.attributes?.favourites.length
                : 0) + (a?.attributes?.views ? a?.attributes?.views.length : 0);
            const bTotal =
              (b?.attributes?.favourites
                ? b?.attributes?.favourites.length
                : 0) + (b?.attributes?.views ? b?.attributes?.views.length : 0);
            return bTotal - aTotal;
          });
          break;
        case "pricing":
          sortedData[page] = pageData
            ?.slice()
            .sort(
              (a: any, b: any) =>
                parseFloat(a?.attributes?.price) -
                parseFloat(b?.attributes?.price)
            );
          break;
        default:
          sortedData[page] = pageData?.slice();
      }
    }

    return sortedData; // Return the sorted data in the same format as sortedData
  };

  const sortedData = useMemo(() => {
    if (!originalData) return [];

    return sortData(originalData, sort);
  }, [originalData, sort]);

  //==============================end

  return (
    <div>
      <div className="flex flex-wrap justify-center  md:gap-8">
        {sortedData?.[currentPage]?.map((listing: Listing) => (
          <div className="" key={listing?.id}>
            <FeedPropertyCard
              id={listing?.id}
              title={listing?.attributes?.name}
              price={listing?.attributes?.price}
              currency={listing?.attributes?.currency}
              description={listing?.attributes?.description}
              // banner={listing?.attributes?.coverPhoto}
              banner={
                !Array.isArray(listing?.attributes?.coverPhoto)
                  ? (listing?.attributes?.coverPhoto?.data ?? listing?.attributes?.coverPhotoFromUrl)
                  : listing?.attributes?.coverPhotoFromUrl
              }
              location={listing?.attributes?.location}
              views={listing?.attributes?.views}
              favourites={listing?.attributes?.favourites}
              featuredClassName
            />
          </div>
        ))}
        {loading && (
          <div className="w-full h-[600px] z-10">
            <div className="flex justify-center">
              {" "}
              <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
            </div>
          </div>
        )}
      </div>

      {/* the pagination */}
      <div className="flex justify-center">
        {pagination?.pageCount > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={async (e) => {
                  e.preventDefault();
                  if (!loading && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <PaginationPrevious />
              </PaginationItem>
              {pages[0] > 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {pages.map((page, index) => (
                <PaginationItem
                  key={index}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (loading) return;
                    if (page < currentPage) {
                      setCurrentPage(currentPage - 1);
                    } else if (!paginatedData?.[currentPage + 1]) {
                      await getListings(pagination.page + 1);
                    } else {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  <PaginationLink
                    className={`border ${page == currentPage && "bg-[#3EB87F] text-white"
                      }`}
                    isActive={page == currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {pages[pages.length - 1] < pagination?.pageCount && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem
                onClick={async (e) => {
                  e.preventDefault();
                  if (currentPage + 1 > pagination?.pageCount) return;
                  if (!loading && !paginatedData?.[currentPage + 1]) {
                    await getListings(pagination.page + 1);
                  } else {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default PropertyArea;
