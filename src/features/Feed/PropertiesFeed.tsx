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




  return (
    <div>
      {/* the properties feed */}
      <div className="flex flex-wrap justify-center md:justify-start md:gap-8">
        {
          (sortedCombinedData?.length < 1 && !loading) && (
            <div className="text-center text-gray-500 text-sm">Sorry, no properties match your preference. Please try adjusting your preference.</div>
          )
        }
        {(myFilters?.propertyType ? sortedCombinedData?.filter(listing => listing?.attributes?.type?.toLowerCase() === myFilters?.propertyType?.toLowerCase()) : sortedCombinedData)?.map((listing: Listing) => (
          <FeedPropertyCard
            key={listing?.id}
            id={listing?.id}
            title={listing?.attributes?.name}
            price={listing?.attributes?.price}
            currency={listing?.attributes?.currency}
            description={listing?.attributes?.description}
            banner={
              (listing?.attributes?.galleryWithUrls && listing?.attributes?.galleryWithUrls?.length > 0) ? listing?.attributes?.galleryWithUrls[0] :
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

export default PropertiesFeed;
