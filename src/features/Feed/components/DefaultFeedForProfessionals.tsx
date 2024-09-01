"use client";
import { useContext, useEffect, useMemo, useState } from "react";
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
  const { sortingOption } = useContext<any>(FeedContext);
  const [currentPage, setCurrentPage] = useState<any>();
  const [data, setData] = useState<any>([]);
  const [pageCount, setPageCount] = useState<any>();
  const [pages, setPages] = useState<any>([]);
  const { myFilters } =
    useContext<any>(FeedContext);
  // const [originalCombinedData, setOriginalCombinedData] = useState([]);

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

  const sortedCombinedData = useMemo(() => {
    const array = [...data];

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
        {sortedCombinedData.map((i, index) => {
          return (i?.type === "property" && (!myFilters?.propertyType || (i?.attributes?.type?.toLowerCase() === myFilters?.propertyType?.toLowerCase()))) ? (
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
