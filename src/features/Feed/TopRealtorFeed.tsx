import React, { useContext, useEffect, useMemo, useState } from "react";
import FeedBrokerRealtorCard from "./components/FeedBrokerRealtorCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllRealtors } from "@/hooks/useGetAllRealtors";
import { BiLoaderAlt } from "react-icons/bi";
import { Profile } from "@/context/types";
import { FeedContext } from "@/context/FeedContext";
type Props = {};

const TopRealtorFeed = (props: Props) => {
  const realtors = useGetAllRealtors();

  const {
    loading,
    pagination,
    getRealtors,
    paginatedData,
    currentPage,
    setCurrentPage,
  } = realtors;

  const { sortingOption } = useContext<any>(FeedContext);

  const [pages, setPages] = useState<any>([]);

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
    setPages(getPageArray(currentPage, pagination?.pageCount));
  }, [pagination?.pageCount, currentPage]);

  const [originalData, setOriginalData] = useState();

  useEffect(() => {
    if (paginatedData) {
      setOriginalData(paginatedData);
    }
  }, [paginatedData]);

  const sortData = (data: Record<string, any[]>, sortingOption: string) => {
    const sortedData = {}; // Initialize an empty object to hold sorted data for each page

    // Iterate over each page and sort its data individually
    for (const [page, pageData] of Object.entries(data)) {
      switch (sortingOption) {
        case "name_asc":
          sortedData[page] = pageData?.slice().sort((a, b) => {
            const nameA = `${a.attributes.first_name} ${a.attributes.last_name}`;
            const nameB = `${b.attributes.first_name} ${b.attributes.last_name}`;
            return nameA.localeCompare(nameB);
          });
          break;
        case "name_desc":
          sortedData[page] = pageData?.slice().sort((a, b) => {
            const nameA = `${a.attributes.first_name} ${a.attributes.last_name}`;
            const nameB = `${b.attributes.first_name} ${b.attributes.last_name}`;
            return nameB.localeCompare(nameA);
          });
          break;
        case "date_asc":
          sortedData[page] = pageData
            ?.slice()
            .sort(
              (a, b) =>
                new Date(a.attributes.createdAt).getTime() -
                new Date(b.attributes.createdAt).getTime()
            );
          break;
        case "date_desc":
          sortedData[page] = pageData
            ?.slice()
            .sort(
              (a, b) =>
                new Date(b.attributes.createdAt).getTime() -
                new Date(a.attributes.createdAt).getTime()
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
    if (sortingOption === "default") return originalData;
    return sortData(originalData, sortingOption);
  }, [originalData, sortingOption]);

  return (
    <div>
      {/* the realtor cards */}
      <div className="flex flex-wrap justify-center md:justify-start md:gap-8">
        {sortedData?.[currentPage]?.map((realtor: Profile) => {
          return (
            <FeedBrokerRealtorCard
              key={realtor.id}
              id={realtor.id}
              userId={realtor.attributes.user?.data?.id}
              realtor
              url={
                realtor.attributes.professional_profile?.data?.attributes
                  .url_link
              }
              phone={
                realtor.attributes.professional_profile?.data?.attributes?.phone
              }
              profile_pic={
                realtor.attributes.professional_profile?.data?.attributes
                  .professional_photo?.data?.attributes?.url
              }
              lastname={realtor.attributes.last_name}
              firstname={realtor.attributes.first_name}
              email={realtor.attributes.user?.data?.attributes.email}
              Agency_name={
                realtor.attributes.agency?.data?.attributes.Agency_name
              }
              favourites={realtor.attributes.favourites}
              views={realtor?.attributes?.views}
            />
          );
        })}
      </div>

      {loading && (
        <div className="w-full h-[600px]">
          <div className="flex justify-center">
            {" "}
            <BiLoaderAlt className="text-center animate-spin w-[20px] h-[20px]" />
          </div>
        </div>
      )}

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

              {pages.map((page, index) => (
                <PaginationItem
                  key={index}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (loading) return;
                    if (page < currentPage) {
                      setCurrentPage(currentPage - 1);
                    } else if (!paginatedData?.[currentPage + 1]) {
                      await getRealtors(pagination.page + 1);
                    } else {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  <PaginationLink
                    className={`border ${
                      page == currentPage && "bg-[#3EB87F] text-white"
                    }`}
                    isActive={page == currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}

              <PaginationItem
                onClick={async (e) => {
                  e.preventDefault();
                  if (currentPage + 1 > pagination?.pageCount) return;
                  if (!loading && !paginatedData?.[currentPage + 1]) {
                    await getRealtors(pagination.page + 1);
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

export default TopRealtorFeed;
