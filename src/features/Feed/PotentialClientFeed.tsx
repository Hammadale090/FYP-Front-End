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

import { BiLoaderAlt } from "react-icons/bi";
import { Profile } from "@/context/types";
import { FeedContext } from "@/context/FeedContext";

const PotentailClientFeed = () => {
  const { potentialClients, sortingOption } = useContext<any>(FeedContext);
  const {
    data,
    loading,
    pagination,
    getPotentialsClients,
    paginatedData,
    currentPage,
    setCurrentPage,
  } = potentialClients;

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

  const sortedCombinedData = useMemo(() => {
    const array = [...paginatedData[currentPage]];

    const safeLocaleCompare = (a: any, b: any) => {
      if (a.attributes?.name && b.attributes?.name) {
        // Compare by name if both have a name attribute
        const nameA = a.attributes.name;
        const nameB = b.attributes.name;
        return nameA.localeCompare(nameB);
      } else if (a.attributes?.first_name && a.attributes?.last_name && b.attributes?.first_name && b.attributes?.last_name) {
        // Compare by full name if both have first_name and last_name
        const fullNameA = `${a.attributes.first_name} ${a.attributes.last_name}`.trim();
        const fullNameB = `${b.attributes.first_name} ${b.attributes.last_name}`.trim();
        return fullNameA.localeCompare(fullNameB);
      } else {
        // Handle cases where one or both entries lack the necessary attributes
        const nameA = a.attributes?.name ?? `${a.attributes?.first_name ?? ''} ${a.attributes?.last_name}`.trim();
        const nameB = b.attributes?.name ?? `${b.attributes.first_name} ${b.attributes.last_name}`.trim();
        return nameA.localeCompare(nameB);
      }
    };

    const getTimeSafe = (date) => (date ? new Date(date).getTime() : 0);

    switch (sortingOption) {
      case "name_asc":
        console.log('Sorting by name ascending', array.sort((a, b) => safeLocaleCompare(a, b)));
        return array.sort((a, b) => safeLocaleCompare(a, b));
      case "name_desc":
        console.log('Sorting by name descending');
        return array.sort((a, b) => safeLocaleCompare(b, a));
      case "date_asc":
        console.log('Sorting by date ascending');
        return array.sort((a, b) =>
          getTimeSafe(a.attributes?.createdAt) - getTimeSafe(b.attributes?.createdAt)
        );
      case "date_desc":
        console.log('Sorting by date descending');
        return array.sort((a, b) =>
          getTimeSafe(b.attributes?.createdAt) - getTimeSafe(a.attributes?.createdAt)
        );
      default:
        console.log('No sorting applied');
        return array;
    }
  }, [sortingOption, data]);

  return (
    <div>
      {/* the client cards */}
      <div className="flex flex-wrap justify-center md:justify-start md:gap-8">
        {sortedCombinedData.map((client: Profile) => {
          console.log(client);
          return (
            <FeedBrokerRealtorCard
              key={client?.id}
              id={client?.id}
              userId={client?.attributes.user?.data?.id}
              url={
                client?.attributes.professional_profile?.data?.attributes
                  .url_link
              }
              phone={
                client?.attributes.professional_profile?.data?.attributes?.phone
              }
              profile_pic={
                client?.attributes.profile_pic?.data?.attributes?.url
              }
              lastname={client?.attributes.last_name}
              firstname={client?.attributes.first_name}
              email={client?.attributes.user?.data?.attributes.email}
              Agency_name={
                client?.attributes.agency?.data?.attributes.Agency_name
              }
              favourites={client?.attributes.favourites}
              views={client?.attributes?.views}
              role={client?.attributes?.role}
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
                      await getPotentialsClients(pagination.page + 1);
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
                    await getPotentialsClients(pagination.page + 1);
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

export default PotentailClientFeed;
