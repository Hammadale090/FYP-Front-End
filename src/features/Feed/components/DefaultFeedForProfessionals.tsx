"use client";
import { useContext, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { shuffleArray } from "@/lib/utils";
import { BiLoaderAlt } from "react-icons/bi";
import FeedPropertyCard from "./FeedPropertyCard";
import FeedBrokerRealtorCard from "./FeedBrokerRealtorCard";
import { FeedContext } from "@/context/FeedContext";
import { useGetListings } from "@/hooks/useGetListings";
import { useGetPotentialClient } from "@/hooks/useGetPotentialClient";

const DefaultFeedForProfessionals = () => {

  const properties = useGetListings(true, '', false, false);
  const potentialClients = useGetPotentialClient()

  const [currentPage, setCurrentPage] = useState<any>();
  const [data, setData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<any>();
  const [pages, setPages] = useState<any>([]);

  useEffect(() => {
    const updatedPage = Math.max(
      potentialClients.currentPage,
      properties.currentPage
    );
    setCurrentPage(updatedPage);
    setPageCount(
      Math.max(
        potentialClients.pagination?.pageCount,
        properties.pagination?.pageCount
      )
    );

    const potentialClientsData =
      potentialClients?.paginatedData?.[updatedPage]?.map((item) => ({
        ...item,
        type: "client",
      })) || [];

    const propertiesData =
      properties?.paginatedData?.[updatedPage]?.map((item) => ({
        ...item,
        type: "property",
      })) || [];

    const newData = shuffleArray([...potentialClientsData, ...propertiesData]);
    setData(newData);
  }, [
    potentialClients.currentPage,
    properties.currentPage,
    potentialClients.pagination?.pageCount,
    properties.pagination?.pageCount,
    potentialClients.paginatedData,
    properties.paginatedData
  ]);


  function handleGoToPage(updatedPage) {
    const potentialClientsData =
      potentialClients?.paginatedData?.[updatedPage]?.map((item) => ({
        ...item,
        type: "client",
      })) || [];

    const propertiesData =
      properties?.paginatedData?.[updatedPage]?.map((item) => ({
        ...item,
        type: "property",
      })) || [];

    const newData = shuffleArray([...potentialClientsData, ...propertiesData]);
    setData(newData);
    setCurrentPage(updatedPage);
  }
  async function handleNextPage(e) {
    e.preventDefault();
    if (
      (properties.loading || potentialClients.loading) &&
      currentPage + 1 > pageCount
    )
      return;
    if (
      !potentialClients.paginatedData?.[currentPage + 1] &&
      !properties.paginatedData?.[currentPage + 1]
    ) {
      currentPage < properties?.pagination?.pageCount &&
        (await properties.getListings(currentPage + 1, false));
      currentPage < potentialClients?.pagination?.pageCount &&
        (await potentialClients.getPotentialsClients(currentPage + 1, false));
    } else {
      handleGoToPage(currentPage + 1);
    }
  }

  function getPageArray(currentPage, pageCount) {
    // Ensure the inputs are valid numbers and within range
    if (
      typeof currentPage !== "number" ||
      typeof pageCount !== "number" ||
      currentPage < 1 ||
      currentPage > pageCount
    ) {
      return [];
    }

    // Initialize an empty array to hold the page numbers
    const pages = [];

    // Determine the start and end of the range
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(pageCount, currentPage + 1);

    // Adjust if we're near the beginning or end of the page range
    if (currentPage === 1) {
      endPage = Math.min(pageCount, startPage + 2);
    } else if (currentPage === pageCount) {
      startPage = Math.max(1, endPage - 2);
    }

    // Populate the array with the page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
  useEffect(() => {
    setPages(getPageArray(currentPage, pageCount));
  }, [pageCount, currentPage]);

  return (
    <div>
      {/* the Default feed showing them all  */}
      <div className="flex flex-wrap justify-center md:justify-start md:gap-8">
        {data.map((i, index) => {
          return i?.type === "property" ? (
            <FeedPropertyCard
              key={index}
              id={i?.id}
              title={i?.attributes?.name}
              price={i?.attributes?.price}
              currency={i?.attributes?.currency}
              description={i?.attributes?.description}
              banner={
                !Array.isArray(i?.attributes?.coverPhoto)
                  ? (i?.attributes?.coverPhoto?.data ?? i?.attributes?.coverPhotoFromUrl)
                  : i?.attributes?.coverPhotoFromUrl
              }
              location={i?.attributes?.location}
              views={i?.attributes?.views}
              favourites={i?.attributes?.favourites}
              featuredClassName
            />
          ) : i?.type === "client" ? (
            <FeedBrokerRealtorCard
              key={index}
              id={i?.id}
              userId={i?.attributes.user?.data?.id}
              url={
                i?.attributes.professional_profile?.data?.attributes.url_link
              }
              phone={
                i?.attributes.professional_profile?.data?.attributes?.phone
              }
              profile_pic={i?.attributes.profile_pic?.data?.attributes?.url}
              lastname={i?.attributes.last_name}
              firstname={i?.attributes.first_name}
              email={i?.attributes.user?.data?.attributes.email}
              Agency_name={i?.attributes.agency?.data?.attributes.Agency_name}
              favourites={i?.attributes.favourites}
              views={i?.attributes?.views}
              role={i?.attributes?.role}
            />
          ) : null; // Add null for cases where neither "property" nor "client" type is matched
        })}

        {(properties.loading || potentialClients.loading) && (
          <div className="w-full h-[600px]">
            <div className="flex justify-center">
              {" "}
              <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
            </div>
          </div>
        )}
      </div>

      {/* the pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={async (e) => {
                  e.preventDefault();
                  if (
                    !(properties.loading || potentialClients.loading) &&
                    currentPage > 1
                  ) {
                    handleGoToPage(currentPage - 1);
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
                    if (properties.loading || potentialClients.loading) return;
                    page < currentPage
                      ? handleGoToPage(page)
                      : handleNextPage(e);
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
              {pages[pages.length - 1] < pageCount && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem onClick={handleNextPage}>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DefaultFeedForProfessionals;
