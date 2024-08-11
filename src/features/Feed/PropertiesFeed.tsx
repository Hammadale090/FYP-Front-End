import React, { useContext, useEffect, useMemo, useState } from "react";
import FeedPropertyCard from "./components/FeedPropertyCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Listing } from "@/context/types";
import { BiLoaderAlt } from "react-icons/bi";
import { FeedContext } from "@/context/FeedContext";
import { useGetListings } from "@/hooks/useGetListings";
import { useGetPreferences } from "@/hooks/useGetPreferences";
import { applyFilter } from "@/lib/feed/properties/applyFilter";

type Props = {
  isProfessionalListingFeed?: boolean;
};

const PropertiesFeed = (props: Props) => {

  const { isProfessionalListingFeed } = props;

  const { sortingOption, myFilters } = useContext<any>(FeedContext);

  const properties = useGetListings(true, "", false, isProfessionalListingFeed);

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
    // ({ data, loading, pagination, getListings, paginatedData, currentPage, setCurrentPage } = useGetListings(true));
  }

  const [originalData, setOriginalData] = useState<any>();
  const [pages, setPages] = useState<any>([]);

  useEffect(() => {
    if (paginatedData) {
      // setOriginalData(paginatedData);
      const filtered_properties = applyFilter(paginatedData, myFilters);
      setOriginalData(filtered_properties);
    }
  }, [paginatedData, myFilters]);

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
      {/* the properties feed */}
      <div className="flex flex-wrap justify-center md:justify-start md:gap-8">
        {sortedData?.[currentPage]?.map((listing: Listing) => (
          <FeedPropertyCard
            key={listing?.id}
            id={listing?.id}
            title={listing?.attributes?.name}
            price={listing?.attributes?.price}
            currency={listing?.attributes?.currency}
            description={listing?.attributes?.description}
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
        ))}

        {loading && (
          <div className="w-full h-[600px]">
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

export default PropertiesFeed;
